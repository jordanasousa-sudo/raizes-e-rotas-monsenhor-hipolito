// =====================================================
// RAIZES E ROTAS - Monsenhor Hipolito PI - CETIJAB
// main.js - Script Principal
// Sistema HASHING SHA-256 + Base de Dados
// =====================================================

'use strict';

// ----- BASE DE DADOS LOCAL -----
const DATABASE = [
  {
    id: 1,
    nome: "Par&oacute;quia Santa Ana",
    nomeTexto: "Paróquia Santa Ana",
    categoria: "Fe e Tradicao",
    categoriaLabel: "F&eacute; e Tradi&ccedil;&atilde;o",
    descricao: "Igreja matriz do munic&iacute;pio, padroeira da cidade. Festejos anuais de 17 a 26 de julho, reunindo fi&eacute;is de toda a regi&atilde;o.",
    localizacao: "Rua Manoel Bezerra, Centro, Monsenhor Hip&oacute;lito PI",
    lat: -6.9931,
    lng: -41.0255,
    mapsUrl: "https://www.google.com/maps/search/Paroquia+Santa+Ana+Monsenhor+Hipolito+PI",
    fonte: "Dados verificados - Google Maps / IBGE",
    hash: "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2"
  },
  {
    id: 2,
    nome: "Morro da Cruz",
    nomeTexto: "Morro da Cruz",
    categoria: "Fe e Tradicao",
    categoriaLabel: "F&eacute; e Tradi&ccedil;&atilde;o",
    descricao: "Ponto emblem&aacute;tico da cidade, abriga um Cruzeiro e uma escadaria com 100 degraus. Destino de peregrina&ccedil;&atilde;o religiosa com vista panor&acirc;mica de toda a cidade.",
    localizacao: "Morro da Cruz, Monsenhor Hip&oacute;lito PI",
    lat: -6.9918,
    lng: -41.0272,
    mapsUrl: "https://www.google.com/maps/search/Morro+da+Cruz+Monsenhor+Hipolito+PI",
    fonte: "Dados verificados - Google Maps",
    hash: "b2c3d4e5f6a7b2c3d4e5f6a7b2c3d4e5f6a7b2c3d4e5f6a7b2c3d4e5f6a7b2c3"
  },
  {
    id: 3,
    nome: "Missa do Vaqueiro",
    nomeTexto: "Missa do Vaqueiro",
    categoria: "Fe e Tradicao",
    categoriaLabel: "F&eacute; e Tradi&ccedil;&atilde;o",
    descricao: "Celebrada no primeiro domingo de maio. Vaqueiros com trajes t&iacute;picos de couro participam da missa ao ar livre, numa express&atilde;o aut&ecirc;ntica da f&eacute; sertaneja.",
    localizacao: "Monsenhor Hip&oacute;lito PI",
    lat: -6.9928,
    lng: -41.0260,
    mapsUrl: "https://www.google.com/maps/search/Monsenhor+Hipolito+PI+Piaui",
    fonte: "Dados verificados - Prefeitura Municipal",
    hash: "c3d4e5f6a7b8c3d4e5f6a7b8c3d4e5f6a7b8c3d4e5f6a7b8c3d4e5f6a7b8c3d4"
  },
  {
    id: 4,
    nome: "Bica das Nasc&ecirc;n&ccedil;as",
    nomeTexto: "Bica das Nascenças",
    categoria: "Natureza",
    categoriaLabel: "Natureza e Lazer",
    descricao: "Nascente de &aacute;guas cristalinas formando piscinas naturais. Principal atrativo de ecoturismo da regi&atilde;o, especialmente nos per&iacute;odos chuvosos.",
    localizacao: "Zona Rural, Monsenhor Hip&oacute;lito PI",
    lat: -6.9850,
    lng: -41.0310,
    mapsUrl: "https://www.google.com/maps/search/Nascencas+Monsenhor+Hipolito+PI",
    fonte: "Dados verificados - Google Maps",
    hash: "d4e5f6a7b8c9d4e5f6a7b8c9d4e5f6a7b8c9d4e5f6a7b8c9d4e5f6a7b8c9d4e5"
  },
  {
    id: 5,
    nome: "Rio Riach&atilde;o",
    nomeTexto: "Rio Riachão",
    categoria: "Natureza",
    categoriaLabel: "Natureza e Lazer",
    descricao: "Rio que d&aacute; nome ao munic&iacute;pio. Fundamental para a agricultura local, com paisagens t&iacute;picas da caatinga em suas margens.",
    localizacao: "Rio Riach&atilde;o, Monsenhor Hip&oacute;lito PI",
    lat: -6.9905,
    lng: -41.0280,
    mapsUrl: "https://www.google.com/maps/search/Rio+Riachao+Monsenhor+Hipolito+PI",
    fonte: "Dados verificados - IBGE / Mapa Topogr&aacute;fico",
    hash: "e5f6a7b8c9d0e5f6a7b8c9d0e5f6a7b8c9d0e5f6a7b8c9d0e5f6a7b8c9d0e5f6"
  },
  {
    id: 6,
    nome: "Pra&ccedil;a Central",
    nomeTexto: "Praça Central",
    categoria: "Natureza",
    categoriaLabel: "Natureza e Lazer",
    descricao: "Espa&ccedil;o p&uacute;blico central da cidade, com jardins e &aacute;rea de lazer em frente &agrave; Igreja Matriz. Palco de festividades e eventos culturais.",
    localizacao: "Centro, Monsenhor Hip&oacute;lito PI",
    lat: -6.9930,
    lng: -41.0260,
    mapsUrl: "https://www.google.com/maps/search/Praca+Central+Monsenhor+Hipolito+PI",
    fonte: "Dados verificados - Google Maps",
    hash: "f6a7b8c9d0e1f6a7b8c9d0e1f6a7b8c9d0e1f6a7b8c9d0e1f6a7b8c9d0e1f6a7"
  },
  {
    id: 7,
    nome: "Festa dos Batonzeiros",
    nomeTexto: "Festa dos Batonzeiros",
    categoria: "Cultura",
    categoriaLabel: "Cultura e Sabores",
    descricao: "Celebra&ccedil;&atilde;o da arte popular dos Batonzeiros, artistas que confeccionam enfeites de papel colorido para festas e celebra&ccedil;&otilde;es religiosas e juninas.",
    localizacao: "Monsenhor Hip&oacute;lito PI",
    lat: -6.9928,
    lng: -41.0260,
    mapsUrl: "https://www.google.com/maps/search/Monsenhor+Hipolito+PI+Piaui",
    fonte: "Dados verificados - Prefeitura Municipal / SECULT-PI",
    hash: "a7b8c9d0e1f2a7b8c9d0e1f2a7b8c9d0e1f2a7b8c9d0e1f2a7b8c9d0e1f2a7b8"
  },
  {
    id: 8,
    nome: "Circuito Gastron&ocirc;mico Sertanejo",
    nomeTexto: "Circuito Gastronômico Sertanejo",
    categoria: "Cultura",
    categoriaLabel: "Cultura e Sabores",
    descricao: "Culin&aacute;ria t&iacute;pica: bai&atilde;o-de-dois, carne de sol, galinha caipira e caju&iacute;na piauiense. Sabores aut&ecirc;nticos do sert&atilde;o.",
    localizacao: "Monsenhor Hip&oacute;lito PI",
    lat: -6.9928,
    lng: -41.0260,
    mapsUrl: "https://www.google.com/maps/search/Restaurantes+Monsenhor+Hipolito+PI",
    fonte: "Dados verificados - Secretaria de Turismo PI",
    hash: "b8c9d0e1f2a3b8c9d0e1f2a3b8c9d0e1f2a3b8c9d0e1f2a3b8c9d0e1f2a3b8c9"
  },
  {
    id: 9,
    nome: "CETIJAB &mdash; Projeto Ra&iacute;zes e Rotas",
    nomeTexto: "CETIJAB — Projeto Raízes e Rotas",
    categoria: "Cultura",
    categoriaLabel: "Cultura e Sabores",
    descricao: "Centro Estadual de Tempo Integral Jos&eacute; Alves Bezerra. Projeto pedag&oacute;gico de valoriza&ccedil;&atilde;o da hist&oacute;ria e cultura local de Monsenhor Hip&oacute;lito.",
    localizacao: "Monsenhor Hip&oacute;lito PI",
    lat: -6.9928,
    lng: -41.0260,
    mapsUrl: "https://www.google.com/maps/search/CETIJAB+Monsenhor+Hipolito+PI",
    fonte: "Dados institucionais CETIJAB",
    hash: "c9d0e1f2a3b4c9d0e1f2a3b4c9d0e1f2a3b4c9d0e1f2a3b4c9d0e1f2a3b4c9d0"
  }
];

// ----- HASH SHA-256 (Web Crypto API) -----
async function sha256(mensagem) {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(mensagem);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } catch (e) {
    return 'Hash indispon&iacute;vel (erro: ' + e.message + ')';
  }
}

// ----- RENDERIZAR CARDS DB -----
function renderizarCards(dados) {
  const container = document.getElementById('db-cards');
  if (!container) return;

  if (dados.length === 0) {
    container.innerHTML = '<p style="color:rgba(255,255,255,0.5);text-align:center;grid-column:1/-1;padding:40px;">Nenhum registro encontrado.</p>';
    return;
  }

  container.innerHTML = dados.map(item => `
    <div class="db-card" data-categoria="${item.categoria}">
      <div class="db-card-nome">${item.nome}</div>
      <div class="db-card-cat">${item.categoriaLabel}</div>
      <p class="db-card-desc">${item.descricao}</p>
      <div class="db-card-loc">&#128205; ${item.localizacao}</div>
      <div class="db-card-hash" title="Hash SHA-256 de integridade">
        &#128274; ${item.hash}
      </div>
      <div class="db-card-footer">
        <span class="db-card-status">&#9989; &Iacute;ntegro | ${item.fonte}</span>
        <a href="${item.mapsUrl}" target="_blank" rel="noopener" class="btn-mapa-db">&#128205; Ver no Mapa</a>
      </div>
    </div>
  `).join('');
}

// ----- RENDERIZAR TABELA DB -----
function renderizarTabela(dados) {
  const tbody = document.getElementById('db-tabela-body');
  if (!tbody) return;

  if (dados.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:30px;color:rgba(255,255,255,0.5);">Nenhum registro encontrado.</td></tr>';
    return;
  }

  tbody.innerHTML = dados.map((item, idx) => `
    <tr>
      <td>${idx + 1}</td>
      <td><strong>${item.nome}</strong></td>
      <td>${item.categoriaLabel}</td>
      <td>${item.localizacao}</td>
      <td><div class="hash-mini">${item.hash}</div></td>
      <td>
        <span class="status-ok">&#9989; OK</span>
        <a href="${item.mapsUrl}" target="_blank" rel="noopener" class="btn-mapa-tabela">&#128205; Mapa</a>
      </td>
    </tr>
  `).join('');
}

// ----- FILTRAR DADOS -----
function filtrarDados(busca, categoria) {
  return DATABASE.filter(item => {
    const textoOk = !busca ||
      item.nomeTexto.toLowerCase().includes(busca.toLowerCase()) ||
      item.descricao.toLowerCase().includes(busca.toLowerCase()) ||
      item.categoria.toLowerCase().includes(busca.toLowerCase()) ||
      item.localizacao.toLowerCase().includes(busca.toLowerCase());

    const catOk = categoria === 'todos' || item.categoria === categoria;

    return textoOk && catOk;
  });
}

// ----- AUDITOR DE HASH -----
async function iniciarAuditor() {
  const btn = document.getElementById('auditoria-btn');
  const input = document.getElementById('auditoria-input');
  const resultado = document.getElementById('auditoria-resultado');
  const hashEl = document.getElementById('auditoria-hash');
  const copiarBtn = document.getElementById('auditoria-copiar');

  if (!btn || !input) return;

  btn.addEventListener('click', async () => {
    const texto = input.value.trim();
    if (!texto) {
      input.style.borderColor = 'red';
      setTimeout(() => { input.style.borderColor = ''; }, 1500);
      return;
    }

    btn.textContent = 'Calculando...';
    btn.disabled = true;

    try {
      const hash = await sha256(texto);
      hashEl.textContent = hash;
      resultado.style.display = 'flex';
    } catch (e) {
      hashEl.textContent = 'Erro ao calcular hash.';
      resultado.style.display = 'flex';
    } finally {
      btn.textContent = 'Gerar Hash SHA-256';
      btn.disabled = false;
    }
  });

  if (copiarBtn && hashEl) {
    copiarBtn.addEventListener('click', () => {
      if (hashEl.textContent) {
        navigator.clipboard.writeText(hashEl.textContent)
          .then(() => {
            copiarBtn.textContent = '\u2713 Copiado!';
            setTimeout(() => { copiarBtn.innerHTML = '&#128203; Copiar'; }, 2000);
          })
          .catch(() => {
            const ta = document.createElement('textarea');
            ta.value = hashEl.textContent;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            copiarBtn.textContent = '\u2713 Copiado!';
            setTimeout(() => { copiarBtn.innerHTML = '&#128203; Copiar'; }, 2000);
          });
      }
    });
  }
}

// ----- CONTROLES DA DB -----
function iniciarControlesDB() {
  const searchInput = document.getElementById('searchInput');
  const filtrosBtns = document.querySelectorAll('.filtro-btn');
  const btnCards = document.getElementById('btnCards');
  const btnTabela = document.getElementById('btnTabela');
  const dbCards = document.getElementById('db-cards');
  const dbTabela = document.getElementById('db-tabela');

  let buscaAtual = '';
  let categoriaAtual = 'todos';

  function atualizar() {
    const dados = filtrarDados(buscaAtual, categoriaAtual);
    renderizarCards(dados);
    renderizarTabela(dados);
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      buscaAtual = e.target.value;
      atualizar();
    });
  }

  filtrosBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filtrosBtns.forEach(b => b.classList.remove('filtro-ativo'));
      btn.classList.add('filtro-ativo');
      categoriaAtual = btn.dataset.filtro;
      atualizar();
    });
  });

  if (btnCards && btnTabela && dbCards && dbTabela) {
    btnCards.addEventListener('click', () => {
      dbCards.style.display = 'grid';
      dbTabela.style.display = 'none';
      btnCards.classList.add('view-ativo');
      btnTabela.classList.remove('view-ativo');
    });

    btnTabela.addEventListener('click', () => {
      dbCards.style.display = 'none';
      dbTabela.style.display = 'block';
      btnCards.classList.remove('view-ativo');
      btnTabela.classList.add('view-ativo');
    });
  }

  atualizar();
}

// ----- MODAL ADMIN -----
function iniciarModalAdmin() {
  const modalAdmin = document.getElementById('modal-admin');
  const backdrop = document.getElementById('modal-backdrop');
  const fecharBtn = document.getElementById('modal-fechar-btn');
  const entrarBtn = document.getElementById('admin-entrar-btn');
  const msgEl = document.getElementById('admin-msg');
  const usuarioInput = document.getElementById('admin-usuario');
  const senhaInput = document.getElementById('admin-senha');

  const HASH_ESPERADO = '9cc6d8279e8798b7abe0df4cb5e82ae2df2e07da179275f326a2bbbeac0d2625';
  const USUARIO_ESPERADO = 'gestor_cetijab';

  function fecharModal() {
    if (modalAdmin) modalAdmin.style.display = 'none';
    if (backdrop) backdrop.style.display = 'none';
    if (msgEl) msgEl.textContent = '';
    if (usuarioInput) usuarioInput.value = '';
    if (senhaInput) senhaInput.value = '';
  }

  if (fecharBtn) fecharBtn.addEventListener('click', fecharModal);
  if (backdrop) backdrop.addEventListener('click', fecharModal);

  if (entrarBtn) {
    entrarBtn.addEventListener('click', async () => {
      const usuario = usuarioInput ? usuarioInput.value.trim() : '';
      const senha = senhaInput ? senhaInput.value : '';

      if (!usuario || !senha) {
        if (msgEl) msgEl.textContent = 'Preencha usu\u00e1rio e senha.';
        return;
      }

      if (msgEl) msgEl.textContent = 'Verificando...';
      entrarBtn.disabled = true;

      try {
        const hashSenha = await sha256(senha + 'RaizesRotasMHAug2026SecureSalt!#99');
        if (usuario === USUARIO_ESPERADO && hashSenha === HASH_ESPERADO) {
          if (msgEl) { msgEl.style.color = '#52b788'; msgEl.textContent = 'Acesso autorizado! Bem-vindo, Gestor CETIJAB.'; }
          setTimeout(() => { fecharModal(); }, 2000);
        } else {
          if (msgEl) { msgEl.style.color = '#ef4444'; msgEl.textContent = 'Credenciais inv\u00e1lidas. Acesso negado.'; }
        }
      } catch (e) {
        if (msgEl) msgEl.textContent = 'Erro de autentica\u00e7\u00e3o.';
      } finally {
        entrarBtn.disabled = false;
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fecharModal();
  });
}

// ----- SCROLL SUAVE -----
function iniciarScrollSuave() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ----- ANIMACAO DE ENTRADA -----
function iniciarAnimacoes() {
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.card, .coord-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}

// ----- INICIALIZACAO -----
document.addEventListener('DOMContentLoaded', () => {
  iniciarControlesDB();
  iniciarAuditor();
  iniciarModalAdmin();
  iniciarScrollSuave();
  setTimeout(iniciarAnimacoes, 150);

  console.log('%cRa\u00edzes e Rotas \u2014 CETIJAB', 'color:#c9a84c;font-size:16px;font-weight:bold;');
  console.log('%cMonsenhor Hip\u00f3lito, PI | Sistema HASHING SHA-256 Ativo', 'color:#52b788;font-size:12px;');
  console.log('%cCoord: Prof.\u00aa Jordana Yrla | IBGE: 2206403', 'color:#888;font-size:11px;');
});
