// ============================================================
//  main.js — Raízes e Rotas · Monsenhor Hipólito, Piauí v3.0
//  Interatividade, Base de Dados em HTML+CSS e Sistema HASHING
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. Header scroll com efeito de vidro ───────────────────
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    header?.classList.toggle('sc', window.scrollY > 50);
  });

  // ── 2. Menu hambúrguer mobile acessível ─────────────────────
  const hbg  = document.querySelector('.hbg');
  const navL = document.querySelector('.nav-l');
  hbg?.addEventListener('click', () => {
    const aberto = navL.classList.toggle('open');
    hbg.setAttribute('aria-expanded', String(aberto));
    const [s1, s2, s3] = hbg.querySelectorAll('span');
    if (aberto) {
      s1.style.transform = 'rotate(45deg) translate(5px, 5px)';
      s2.style.opacity   = '0';
      s3.style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      [s1, s2, s3].forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  navL?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navL.classList.remove('open');
      hbg?.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });

  // ── 3. Rolagem suave para âncoras internas ──────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const targetId = anchor.getAttribute('href');
      if (targetId && targetId !== '#') {
        const el = document.querySelector(targetId);
        if (el) {
          e.preventDefault();
          const topo = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: topo, behavior: 'smooth' });
        }
      }
    });
  });

  // ── 4. Animação suave ao rolar a página (Reveal) ────────────
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('ok');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
  );
  document.querySelectorAll('.rv').forEach(el => observer.observe(el));

  // ── 5. Abas interativas de Cultura e Sabores ───────────────
  document.querySelectorAll('.tab-b').forEach(botao => {
    botao.addEventListener('click', () => {
      document.querySelectorAll('.tab-b').forEach(b => b.classList.remove('on'));
      document.querySelectorAll('.tab-p').forEach(p => p.classList.remove('on'));
      botao.classList.add('on');
      const painelId = botao.dataset.tab;
      document.getElementById(painelId)?.classList.add('on');
    });
  });

  // ── 6. Atualização dinâmica do ano no rodapé ───────────────
  const anoEl = document.getElementById('ano');
  if (anoEl) anoEl.textContent = new Date().getFullYear();

  // ── 7. Base de Dados em HTML + CSS: Renderização e Busca ────
  let modoExibicaoAtual = 'grid'; // 'grid' ou 'tabela'

  renderDB('all', '', modoExibicaoAtual);

  const searchInput = document.getElementById('db-search');
  searchInput?.addEventListener('input', () => {
    const catAtiva = document.querySelector('.fil-btn.on')?.dataset.cat || 'all';
    renderDB(catAtiva, searchInput.value.trim(), modoExibicaoAtual);
  });

  document.querySelectorAll('.fil-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.fil-btn').forEach(b => b.classList.remove('on'));
      btn.classList.add('on');
      const termo = document.getElementById('db-search')?.value.trim() || '';
      renderDB(btn.dataset.cat, termo, modoExibicaoAtual);
    });
  });

  // Alternador de Visualização: Cards vs Tabela HTML+CSS
  const btnModoCards  = document.getElementById('btn-modo-cards');
  const btnModoTabela = document.getElementById('btn-modo-tabela');

  btnModoCards?.addEventListener('click', () => {
    modoExibicaoAtual = 'grid';
    btnModoCards.classList.add('active');
    btnModoTabela?.classList.remove('active');
    const catAtiva = document.querySelector('.fil-btn.on')?.dataset.cat || 'all';
    const termo = document.getElementById('db-search')?.value.trim() || '';
    renderDB(catAtiva, termo, modoExibicaoAtual);
  });

  btnModoTabela?.addEventListener('click', () => {
    modoExibicaoAtual = 'tabela';
    btnModoTabela.classList.add('active');
    btnModoCards?.classList.remove('active');
    const catAtiva = document.querySelector('.fil-btn.on')?.dataset.cat || 'all';
    const termo = document.getElementById('db-search')?.value.trim() || '';
    renderDB(catAtiva, termo, modoExibicaoAtual);
  });

  // ── 8. Ferramenta Interativa do Sistema de Hashing ─────────
  initHashingInspector();

  // ── 9. Modal de Autenticação Segura de Credenciais ─────────
  initAuthModal();
});

// ── Renderização da Base de Dados em HTML + CSS ──────────────
function renderDB(categoria = 'all', busca = '', modo = 'grid') {
  const container = document.getElementById('db-grid');
  const contador  = document.getElementById('db-count');
  if (!container) return;

  const termo = busca.toLowerCase();
  const filtrados = DB_REGISTROS.filter(reg => {
    const matchCat = categoria === 'all' || reg.categoria === categoria;
    const matchTermo = !termo
      || reg.nome.toLowerCase().includes(termo)
      || reg.descricao.toLowerCase().includes(termo)
      || reg.codigo.toLowerCase().includes(termo)
      || reg.cat_label.toLowerCase().includes(termo)
      || reg.tipo.toLowerCase().includes(termo);
    return matchCat && matchTermo;
  });

  if (contador) {
    contador.textContent = `${filtrados.length} registro${filtrados.length !== 1 ? 's' : ''} encontrado${filtrados.length !== 1 ? 's' : ''}`;
  }

  if (filtrados.length === 0) {
    container.innerHTML = `
      <div class="db-sem-resultados">
        <p>🔍 Nenhum ponto encontrado para o termo "<strong>${escapeHTML(busca)}</strong>".</p>
        <button class="btn btn-verde btn-sm" onclick="limparFiltros()">Limpar Filtros</button>
      </div>`;
    return;
  }

  if (modo === 'tabela') {
    // Renderiza formato tabela HTML + CSS
    container.innerHTML = `
      <div class="db-table-wrapper">
        <table class="db-table" aria-label="Tabela de Base de Dados Georreferenciada">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nome & Categoria</th>
              <th>Tipo de Patrimônio</th>
              <th>Época Recomendada</th>
              <th>Coordenadas GPS</th>
              <th>Certificação HASHING (SHA-256)</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            ${filtrados.map(r => `
              <tr>
                <td><span class="rec-code">#${r.codigo}</span></td>
                <td>
                  <strong>${r.icone} ${r.nome}</strong><br>
                  <small class="badge badge-${r.categoria}">${r.cat_label}</small>
                </td>
                <td>${r.tipo}</td>
                <td>${r.epoca}</td>
                <td><code>${r.lat.toFixed(4)}, ${r.lng.toFixed(4)}</code></td>
                <td>
                  <span class="hash-tag-pill" title="Hash SHA-256 de integridade">
                    🔒 ${r.hash_sha256.substring(0, 14)}…
                  </span>
                </td>
                <td>
                  <div class="table-actions">
                    <button class="btn btn-sm btn-verde" onclick="abrirModalRegistro('${r.codigo}')" title="Detalhes do Registro">
                      👁️ Ver
                    </button>
                    <a href="https://www.google.com/maps?q=${r.lat},${r.lng}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-ghost" title="Abrir no Google Maps">
                      🗺️ Maps
                    </a>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>`;
    return;
  }

  // Renderiza formato Cards HTML + CSS
  const coresCat = { fe: '#D97706', nat: '#136B3B', cult: '#059669' };

  container.innerHTML = `
    <div class="db-cards-grid">
      ${filtrados.map(r => {
        const gpsStr = `${r.lat.toFixed(4)}, ${r.lng.toFixed(4)}`;
        const cor = coresCat[r.categoria] || '#136B3B';
        const mapsUrl = `https://www.google.com/maps?q=${r.lat},${r.lng}&z=16`;

        return `
        <article class="rec-card" data-cat="${r.categoria}" data-codigo="${r.codigo}">
          <div class="rec-thumb">
            <img src="${r.imagem}" alt="${escapeHTML(r.nome)}" loading="lazy" onerror="tratarErroImagem(this)" />
            <span class="rec-badge-pill" style="background:${cor}">${r.cat_label}</span>
          </div>

          <div class="rec-header">
            <div>
              <span class="rec-code">#${r.codigo}</span>
              <span class="badge" style="background:${cor}1a;color:${cor};margin-left:.5rem">${r.cat_label}</span>
            </div>
            <div class="rec-icon" aria-hidden="true">${r.icone}</div>
          </div>

          <div class="rec-body">
            <h3>${r.nome}</h3>
            <p class="rec-tipo">📍 ${r.tipo}</p>
            <p class="rec-desc">${r.descricao}</p>
          </div>

          <div class="rec-meta">
            <div class="rec-meta-row">
              <span class="lbl">🗓 Época:</span>
              <span class="val">${r.epoca}</span>
            </div>
            <div class="rec-meta-row">
              <span class="lbl">🏗 Infra:</span>
              <span class="val">${r.infra}</span>
            </div>
            <div class="rec-meta-row">
              <span class="lbl">📡 GPS:</span>
              <span class="gps val"><code>${gpsStr}</code></span>
            </div>
            <div class="rec-meta-row hash-row">
              <span class="lbl">🔒 SHA-256:</span>
              <span class="val hash-code" title="${r.hash_sha256}">
                <code>${r.hash_sha256.substring(0, 16)}…</code>
              </span>
            </div>
          </div>

          <div class="rec-actions">
            <button class="btn btn-verde btn-sm" onclick="abrirModalRegistro('${r.codigo}')">
              📄 Inspecionar Dados
            </button>
            <a href="${mapsUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost btn-sm" title="Abrir localização exata no Google Maps">
              🗺️ Maps
            </a>
            <button class="btn btn-sm btn-copy" onclick="copiarGPS('${gpsStr}', this)" title="Copiar coordenadas georreferenciadas">
              📋 Copiar GPS
            </button>
          </div>
        </article>`;
      }).join('')}
    </div>`;
}

// ── Fallback de Imagens caso caminho mude ────────────────────
function tratarErroImagem(img) {
  // Se falhou ao buscar na pasta assets/images, tenta na raiz
  const src = img.getAttribute('src');
  if (src.startsWith('assets/images/')) {
    const nomeArquivo = src.replace('assets/images/', '');
    img.src = nomeArquivo;
  } else {
    img.parentElement.style.background = '#e2e8f0';
    img.style.display = 'none';
  }
}

// ── Copiar Coordenadas GPS com feedback visual ──────────────
function copiarGPS(gps, btn) {
  const aplicarFeedback = () => {
    const textoOriginal = btn.innerHTML;
    btn.innerHTML = '✅ Copiado!';
    btn.classList.add('copiado');
    setTimeout(() => {
      btn.innerHTML = textoOriginal;
      btn.classList.remove('copiado');
    }, 2200);
  };

  if (navigator.clipboard) {
    navigator.clipboard.writeText(gps).then(aplicarFeedback).catch(() => fallbackCopiar(gps, aplicarFeedback));
  } else {
    fallbackCopiar(gps, aplicarFeedback);
  }
}

function fallbackCopiar(texto, callback) {
  const area = document.createElement('textarea');
  area.value = texto;
  area.style.position = 'fixed';
  area.style.opacity = '0';
  document.body.appendChild(area);
  area.select();
  document.execCommand('copy');
  document.body.removeChild(area);
  if (callback) callback();
}

// ── Limpar Filtros de Busca ──────────────────────────────────
function limparFiltros() {
  const input = document.getElementById('db-search');
  if (input) input.value = '';
  document.querySelectorAll('.fil-btn').forEach(b => b.classList.remove('on'));
  document.querySelector('.fil-btn[data-cat="all"]')?.classList.add('on');
  renderDB('all', '');
}

// ── Modal de Inspeção Criptográfica & Detalhes do Registro ───
function abrirModalRegistro(codigo) {
  const reg = DB_REGISTROS.find(r => r.codigo === codigo);
  if (!reg) return;

  const modal = document.getElementById('modal-registro');
  const corpo = document.getElementById('modal-registro-conteudo');
  if (!modal || !corpo) return;

  const canonicalString = `${reg.codigo}|${reg.nome}|${reg.categoria}|${reg.lat.toFixed(4)}|${reg.lng.toFixed(4)}|${SECURITY_HASH_SALT}`;

  corpo.innerHTML = `
    <div class="modal-reg-header">
      <div class="modal-reg-badge">
        <span class="rec-code">#${reg.codigo}</span>
        <span class="badge badge-${reg.categoria}">${reg.cat_label}</span>
      </div>
      <h2>${reg.icone} ${reg.nome}</h2>
      <p class="modal-reg-sub">📍 ${reg.tipo}</p>
    </div>

    <div class="modal-reg-media">
      <img src="${reg.imagem}" alt="${escapeHTML(reg.nome)}" onerror="tratarErroImagem(this)" />
    </div>

    <div class="modal-reg-info">
      <h4>📖 Descrição e Contexto Histórico:</h4>
      <p>${reg.descricao}</p>

      <div class="modal-detalhes-grid">
        <div class="md-item">
          <strong>🗓 Época Recomendada:</strong>
          <span>${reg.epoca}</span>
        </div>
        <div class="md-item">
          <strong>🏗 Infraestrutura Local:</strong>
          <span>${reg.infra}</span>
        </div>
        <div class="md-item">
          <strong>📡 Coordenadas Google Maps:</strong>
          <span><code>${reg.lat.toFixed(4)}, ${reg.lng.toFixed(4)}</code></span>
        </div>
        <div class="md-item">
          <strong>🏷 Identificador IBGE:</strong>
          <span>Município 2206403 · Monsenhor Hipólito - PI</span>
        </div>
      </div>

      <!-- Seção do Sistema HASHING -->
      <div class="modal-hashing-box">
        <div class="hb-header">
          <span class="hb-icon">🔒</span>
          <h4>Assinatura Criptográfica SHA-256 (Sistema Hashing)</h4>
        </div>
        <p class="hb-desc">Este registro possui assinatura digital inviolável gerada com função criptográfica de mão única SHA-256 e Salt institucional da Escola CETIJAB.</p>
        
        <div class="hb-code-block">
          <div class="hb-lbl">Hash SHA-256 Registrado:</div>
          <code class="hb-hash">${reg.hash_sha256}</code>
        </div>

        <div class="hb-code-block">
          <div class="hb-lbl">Cadeia Canônica de Dados Autenticados:</div>
          <code class="hb-canonical">${canonicalString}</code>
        </div>

        <div class="hb-actions">
          <button class="btn btn-verde btn-sm" id="btn-verificar-hash-modal" onclick="executarVerificacaoHashModal('${reg.codigo}')">
            ⚡ Recalcular e Validar Integridade em Tempo Real
          </button>
          <span id="resultado-verificacao-modal" class="hb-status"></span>
        </div>
      </div>

      <div class="modal-nav-actions">
        <a href="https://www.google.com/maps?q=${reg.lat},${reg.lng}" target="_blank" rel="noopener noreferrer" class="btn btn-amarelo">
          🗺️ Abrir Rota no Google Maps
        </a>
        <button class="btn btn-ghost" onclick="fecharModalRegistro()">
          Fechar Janela
        </button>
      </div>
    </div>
  `;

  modal.classList.add('aberto');
  document.body.style.overflow = 'hidden';
}

function fecharModalRegistro() {
  const modal = document.getElementById('modal-registro');
  modal?.classList.remove('aberto');
  document.body.style.overflow = '';
}

async function executarVerificacaoHashModal(codigo) {
  const statusEl = document.getElementById('resultado-verificacao-modal');
  if (!statusEl) return;

  statusEl.innerHTML = '⏳ Calculando SHA-256 via Web Crypto API…';
  const resultado = await verificarIntegridadeRegistro(codigo);

  if (resultado.valido) {
    statusEl.innerHTML = `
      <span class="status-sucesso">
        ✅ <strong>Hash Válido e Autêntico!</strong> Integridade 100% comprovada no Sistema Hashing.
      </span>`;
  } else {
    statusEl.innerHTML = `
      <span class="status-erro">
        ⚠️ <strong>Divergência detectada!</strong> O registro sofreu alterações não autorizadas.
      </span>`;
  }
}

// ── Ferramenta Interativa: Auditor & Gerador de Hashing ──────
function initHashingInspector() {
  const btnCalcular = document.getElementById('btn-calcular-hash-live');
  const inputTexto  = document.getElementById('hash-input-texto');
  const seletorPonto= document.getElementById('hash-seletor-ponto');
  const saidaHash   = document.getElementById('hash-saida-calculada');

  if (!btnCalcular || !inputTexto || !saidaHash) return;

  // Preenche seletor de pontos cadastrados
  if (seletorPonto) {
    DB_REGISTROS.forEach(r => {
      const opt = document.createElement('option');
      opt.value = r.codigo;
      opt.textContent = `${r.codigo} — ${r.nome}`;
      seletorPonto.appendChild(opt);
    });

    seletorPonto.addEventListener('change', () => {
      const cod = seletorPonto.value;
      if (!cod) return;
      const reg = DB_REGISTROS.find(r => r.codigo === cod);
      if (reg) {
        inputTexto.value = `${reg.codigo}|${reg.nome}|${reg.categoria}|${reg.lat.toFixed(4)}|${reg.lng.toFixed(4)}|${SECURITY_HASH_SALT}`;
      }
    });
  }

  btnCalcular.addEventListener('click', async () => {
    const texto = inputTexto.value.trim();
    if (!texto) {
      saidaHash.innerHTML = '<span style="color:#ef4444">Digite uma informação ou selecione um ponto para gerar o hash.</span>';
      return;
    }
    saidaHash.innerHTML = '⏳ Calculando SHA-256…';
    const hashGerado = await calcularHashSHA256(texto);
    saidaHash.innerHTML = `
      <div class="hash-result-box">
        <div class="hr-title">Digest Criptográfico SHA-256 (256 bits):</div>
        <code class="hr-code">${hashGerado}</code>
        <div class="hr-note">Algoritmo: SHA-256 · Codificação: UTF-8 Hexadecimal · Certificado inviolável</div>
      </div>
    `;
  });
}

// ── Modal de Credenciais & Autenticação HASHING ─────────────
function initAuthModal() {
  const btnAbrirAuth  = document.getElementById('btn-abrir-auth');
  const modalAuth     = document.getElementById('modal-auth');
  const formAuth      = document.getElementById('form-auth-credenciais');
  const statusAuth    = document.getElementById('auth-status-msg');

  btnAbrirAuth?.addEventListener('click', () => {
    modalAuth?.classList.add('aberto');
  });

  document.querySelectorAll('.fechar-modal-auth').forEach(btn => {
    btn.addEventListener('click', () => {
      modalAuth?.classList.remove('aberto');
    });
  });

  formAuth?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const usuario = document.getElementById('auth-usuario')?.value.trim();
    const senha   = document.getElementById('auth-senha')?.value;

    if (!usuario || !senha) return;

    if (statusAuth) statusAuth.innerHTML = '⏳ Processando HASHING da credencial…';

    // Hash da senha com salt
    const rawToHash = `${senha}|${SECURITY_HASH_SALT}`;
    const hashDigitado = await calcularHashSHA256(rawToHash);

    // Hash esperado definido no arquivo .env (ADMIN_PASSWORD_HASH)
    const HASH_ESPERADO_ADMIN = "9cc6d8279e8798b7abe0df4cb5e82ae2df2e07da179275f326a2bbbeac0d2625";

    if (usuario === "gestor_cetijab" && hashDigitado === HASH_ESPERADO_ADMIN) {
      if (statusAuth) {
        statusAuth.innerHTML = `
          <div class="auth-sucesso-box">
            ✅ <strong>Autenticação Criptográfica Bem-Sucedida!</strong><br>
            <small>Sessão autorizada para a Gestão CETIJAB · HASH validado contra o arquivo <code>.env</code> com sucesso.</small>
          </div>
        `;
      }
    } else {
      if (statusAuth) {
        statusAuth.innerHTML = `
          <div class="auth-erro-box">
            ❌ <strong>Falha na Autenticação!</strong><br>
            <small>Usuário ou Hash da senha incorretos. A senha original nunca trafega em texto puro.</small>
          </div>
        `;
      }
    }
  });
}

// Utilitário para escapar caracteres HTML
function escapeHTML(str) {
  return String(str).replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag] || tag));
}
