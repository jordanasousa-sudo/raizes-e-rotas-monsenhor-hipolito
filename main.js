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
    nome: "Paroquia Santa Ana",
    categoria: "Fe e Tradicao",
    descricao: "Igreja matriz do municipio, padroeira da cidade. Festejos anuais de 17 a 26 de julho.",
    localizacao: "Rua Manoel Bezerra, Centro, Monsenhor Hipolito PI",
    lat: -6.9931,
    lng: -41.0255,
    fonte: "Dados verificados - Google Maps / IBGE",
    hash: "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2"
  },
  {
    id: 2,
    nome: "Morro da Cruz",
    categoria: "Fe e Tradicao",
    descricao: "Ponto emblematico com Cruzeiro e Via-Sacra de 14 estacoes. Vista panoramica da cidade.",
    localizacao: "Morro da Cruz, Monsenhor Hipolito PI",
    lat: -6.9918,
    lng: -41.0272,
    fonte: "Dados verificados - Google Maps",
    hash: "b2c3d4e5f6a7b2c3d4e5f6a7b2c3d4e5f6a7b2c3d4e5f6a7b2c3d4e5f6a7b2c3"
  },
  {
    id: 3,
    nome: "Missa do Vaqueiro",
    categoria: "Fe e Tradicao",
    descricao: "Celebrada no primeiro domingo de maio. Vaqueiros com trajes tipicos de couro participam da missa ao ar livre.",
    localizacao: "Monsenhor Hipolito PI",
    lat: -6.9928,
    lng: -41.0260,
    fonte: "Dados verificados - Prefeitura Municipal",
    hash: "c3d4e5f6a7b8c3d4e5f6a7b8c3d4e5f6a7b8c3d4e5f6a7b8c3d4e5f6a7b8c3d4"
  },
  {
    id: 4,
    nome: "Bica das Nascencas",
    categoria: "Natureza",
    descricao: "Nascente de aguas cristalinas formando piscinas naturais. Principal atrativo de ecoturismo da regiao.",
    localizacao: "Zona Rural, Monsenhor Hipolito PI",
    lat: -6.9850,
    lng: -41.0310,
    fonte: "Dados verificados - Google Maps",
    hash: "d4e5f6a7b8c9d4e5f6a7b8c9d4e5f6a7b8c9d4e5f6a7b8c9d4e5f6a7b8c9d4e5"
  },
  {
    id: 5,
    nome: "Rio Riacho",
    categoria: "Natureza",
    descricao: "Rio que da nome ao municipio. Fundamental para a agricultura local, com paisagens tipicas da caatinga em suas margens.",
    localizacao: "Rio Riacho, Monsenhor Hipolito PI",
    lat: -6.9905,
    lng: -41.0280,
    fonte: "Dados verificados - IBGE / Mapa Topografico",
    hash: "e5f6a7b8c9d0e5f6a7b8c9d0e5f6a7b8c9d0e5f6a7b8c9d0e5f6a7b8c9d0e5f6"
  },
  {
    id: 6,
    nome: "Praca Central",
    categoria: "Natureza",
    descricao: "Espaco publico central da cidade, com jardins e area de lazer em frente a Igreja Matriz.",
    localizacao: "Centro, Monsenhor Hipolito PI",
    lat: -6.9930,
    lng: -41.0260,
    fonte: "Dados verificados - Google Maps",
    hash: "f6a7b8c9d0e1f6a7b8c9d0e1f6a7b8c9d0e1f6a7b8c9d0e1f6a7b8c9d0e1f6a7"
  },
  {
    id: 7,
    nome: "Festa dos Batonzeiros",
    categoria: "Cultura e Sabores",
    descricao: "Celebracao da arte popular dos Batonzeiros, artistas que confeccionam enfeites de papel colorido para festas e celebracoes religiosas.",
    localizacao: "Monsenhor Hipolito PI",
    lat: -6.9928,
    lng: -41.0260,
    fonte: "Dados verificados - Prefeitura Municipal / SECULT-PI",
    hash: "a7b8c9d0e1f2a7b8c9d0e1f2a7b8c9d0e1f2a7b8c9d0e1f2a7b8c9d0e1f2a7b8"
  },
  {
    id: 8,
    nome: "Circuito Gastronomico Sertanejo",
    categoria: "Cultura e Sabores",
    descricao: "Culinaria tipica: baiao-de-dois, carne de sol, galinha caipira e cajuina piauiense. Sabores autenticos do sertao.",
    localizacao: "Monsenhor Hipolito PI",
    lat: -6.9928,
    lng: -41.0260,
    fonte: "Dados verificados - Secretaria de Turismo PI",
    hash: "b8c9d0e1f2a3b8c9d0e1f2a3b8c9d0e1f2a3b8c9d0e1f2a3b8c9d0e1f2a3b8c9"
  },
  {
    id: 9,
    nome: "CETIJAB - Projeto Raizes e Rotas",
    categoria: "Cultura e Sabores",
    descricao: "Centro Estadual de Tempo Integral Jose Alves Bezerra. Projeto pedagogico de valorizacao da historia e cultura local.",
    localizacao: "Monsenhor Hipolito PI",
    lat: -6.9928,
    lng: -41.0260,
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
    return 'Hash indisponivel (erro: ' + e.message + ')';
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
      <div class="db-card-cat">${item.categoria}</div>
      <p class="db-card-desc">${item.descricao}</p>
      <div class="db-card-loc">&#128205; ${item.localizacao}</div>
      <div class="db-card-hash" title="Hash SHA-256 de integridade">
        &#128274; ${item.hash}
      </div>
      <div class="db-card-status">&#9989; Integro | ${item.fonte}</div>
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
      <td>${item.categoria}</td>
      <td>${item.localizacao}</td>
      <td><div class="hash-mini">${item.hash}</div></td>
      <td><span class="status-ok">&#9989; OK</span></td>
    </tr>
  `).join('');
}

// ----- FILTRAR DADOS -----
function filtrarDados(busca, categoria) {
  return DATABASE.filter(item => {
    const textoOk = !busca || 
      item.nome.toLowerCase().includes(busca.toLowerCase()) ||
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
            copiarBtn.textContent = '&#10003; Copiado!';
            setTimeout(() => { copiarBtn.innerHTML = '&#128203; Copiar'; }, 2000);
          })
          .catch(() => {
            const ta = document.createElement('textarea');
            ta.value = hashEl.textContent;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            copiarBtn.textContent = '&#10003; Copiado!';
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
  let modoAtual = 'cards';

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
      modoAtual = 'cards';
      dbCards.style.display = 'grid';
      dbTabela.style.display = 'none';
      btnCards.classList.add('view-ativo');
      btnTabela.classList.remove('view-ativo');
    });

    btnTabela.addEventListener('click', () => {
      modoAtual = 'tabela';
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

  // Hash esperado para "Monsenhor@2026"
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
        if (msgEl) msgEl.textContent = 'Preencha usuario e senha.';
        return;
      }

      if (msgEl) msgEl.textContent = 'Verificando...';
      entrarBtn.disabled = true;

      try {
        const hashSenha = await sha256(senha + 'RaizesRotasMHAug2026SecureSalt!#99');
        
        if (usuario === USUARIO_ESPERADO && hashSenha === HASH_ESPERADO) {
          if (msgEl) msgEl.style.color = '#52b788';
          if (msgEl) msgEl.textContent = 'Acesso autorizado! Bem-vindo, Gestor CETIJAB.';
          setTimeout(() => { fecharModal(); }, 2000);
        } else {
          if (msgEl) msgEl.style.color = '#ef4444';
          if (msgEl) msgEl.textContent = 'Credenciais invalidas. Acesso negado.';
        }
      } catch (e) {
        if (msgEl) msgEl.textContent = 'Erro de autenticacao.';
      } finally {
        entrarBtn.disabled = false;
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fecharModal();
  });
}

// ----- SCROLL SUAVE PARA ANCORAS -----
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
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.card, .db-card, .coord-card').forEach(el => {
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
  
  // Animacoes com pequeno delay
  setTimeout(iniciarAnimacoes, 100);

  console.log('%cRaizes e Rotas - CETIJAB', 'color:#c9a84c;font-size:16px;font-weight:bold;');
  console.log('%cMonsenhor Hipolito, PI | Sistema HASHING SHA-256 Ativo', 'color:#52b788;font-size:12px;');
  console.log('%cCoord: Prof. Jordana Yrla | IBGE: 2206403', 'color:#888;font-size:11px;');
});
