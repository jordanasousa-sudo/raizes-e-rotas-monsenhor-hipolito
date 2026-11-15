// ============================================================
//  db.js — Base de Dados Georreferenciada & Sistema HASHING
//  Raízes e Rotas · Monsenhor Hipólito, Piauí
//  Projeto Pedagógico & Cultural CETIJAB · Prof.ª Jordana Yrla
//  Registros georreferenciados reais com certificação SHA-256
// ============================================================

const SECURITY_HASH_SALT = "RaizesRotasMHAug2026SecureSalt!#99";

const DB_REGISTROS = [
  // ── 1. FÉ & TRADIÇÃO (RELIGIOSIDADE E HISTÓRIA) ───────────
  {
    codigo: "MH-REL-01",
    icone: "⛪",
    categoria: "fe",
    cat_label: "Fé & Tradição",
    nome: "Igreja Matriz de Santa Ana",
    tipo: "Templo Histórico · Paróquia Santa Ana (Diocese de Picos)",
    descricao: "Marco espiritual e histórico de Monsenhor Hipólito, localizada na Rua Manoel Bezerra, no Centro. Erguida em homenagem à padroeira Santa Ana, tornou-se paróquia em 27 de outubro de 2007 pela Diocese de Picos. É o centro dos seculares Festejos de Santa Ana (17 a 26 de Julho), que reúnem milhares de devotos, filhos ausentes e fiéis para novenários, quermesse na praça e a solene procissão de encerramento.",
    epoca: "17 a 26 de Julho (Festa da Padroeira) · Missas o ano todo",
    infra: "Praça Matriz com bancos, iluminação cênica, acesso pavimentado, comércio de apoio",
    imagem: "assets/images/igreja_matriz.jpg",
    lat: -6.9935,
    lng: -41.0268,
    maps_query: "Paróquia Santa Ana Monsenhor Hipólito PI",
    hash_sha256: "88e681ba5fdc8be1e9c8afa22775de6bf776dbdcc1334a217d0d301d7ba747a1",
    data_certificacao: "2026-11-15T15:00:00Z"
  },
  {
    codigo: "MH-REL-02",
    icone: "⛰️",
    categoria: "fe",
    cat_label: "Fé & Tradição",
    nome: "Morro da Cruz (O Cruzeiro de Monsenhor Hipolito)",
    tipo: "Santuário a Céu Aberto · Ponto de Romaria e Devoção",
    descricao: "Principal ponto turístico e religioso do município. Uma elevação montanhosa coroada por um cruzeiro de madeira e ferro, procurada intensamente na Semana Santa para pagamento de promessas, orações e a via-sacra penitencial. Do seu ápice, os visitantes contemplam a magnífica depressão geográfica onde repousa o núcleo urbano e as serras que abraçam a Caatinga hipolitana.",
    epoca: "Semana Santa (Março/Abril) · Visitações ao amanhecer e entardecer",
    infra: "Estrada vicinal de acesso, trilha de caminhada, cruzeiro histórico, mirante natural aberto",
    imagem: "assets/images/morro_da_cruz.jpg",
    lat: -6.9880,
    lng: -41.0225,
    maps_query: "Morro da Cruz Monsenhor Hipolito Piauí",
    hash_sha256: "86ed302002f78570cddef114e377fe2d83303cf9d5b8a8c308b93bad889818b2",
    data_certificacao: "2026-11-15T15:00:00Z"
  },
  {
    codigo: "MH-REL-03",
    icone: "🤠",
    categoria: "fe",
    cat_label: "Fé & Tradição",
    nome: "Missa do Vaqueiro e Bencao dos Encourados",
    tipo: "Celebração Campal · Tradição e Religiosidade Sertaneja",
    descricao: "Homenagem comovente à memória e resistência do vaqueiro e do agricultor sertanejo, raízes fundadoras da antiga Fazenda Riachão. Celebrada no primeiro domingo de maio, reúne homens e mulheres encourados em gibão e chapéu de couro para receber a bênção sobre seus cavalos. A programação inclui alvorada festiva com fogos, cavalgada solene pelas ruas e café da manhã comunitário sertanejo.",
    epoca: "1º Domingo de Maio (Anual)",
    infra: "Praça de eventos, campo aberto, currais para montaria, infraestrutura de som",
    imagem: "assets/images/vaquejada_missa.jpg",
    lat: -6.9928,
    lng: -41.0260,
    maps_query: "Monsenhor Hipolito Piauí Vaquejada",
    hash_sha256: "bf13cd06a418eb5ac3dcb4a98241c0fa235bc274589aa6b2ca84bd54153f422b",
    data_certificacao: "2026-11-15T15:00:00Z"
  },

  // ── 2. NATUREZA & LAZER (ECOTURISMO E ESPAÇO PÚBLICO) ─────
  {
    codigo: "MH-ECO-01",
    icone: "💦",
    categoria: "nat",
    cat_label: "Natureza & Lazer",
    nome: "Bica e Nascente das Nascencas",
    tipo: "Oásis Hidrográfico · Ecoturismo de Banho e Contemplação",
    descricao: "Preciosidade natural do sertão: fonte de água cristalina perene que brota diretamente das rochas mesmo nos períodos de estiagem, alimentando uma bica natural e piscinas de banho em meio à vegetação preservada da Caatinga. Simboliza a riqueza dos olhos d'água históricos que atraíram os primeiros povoadores para a região do vale do Riachão.",
    epoca: "Janeiro a Maio (período verde e vazão plena) · Banhos o ano inteiro",
    infra: "Trilha rústica ecológica, área sombreada por juazeiros e carnaúbas, poços naturais de banho",
    imagem: "assets/images/nascencas_cachoeira.jpg",
    lat: -6.9740,
    lng: -41.0110,
    maps_query: "Nascentes Monsenhor Hipolito Piaui",
    hash_sha256: "da666dd0bd1c22986253c05764fc4e1bcacfe4e89b47438963d630fdfaabfe43",
    data_certificacao: "2026-11-15T15:00:00Z"
  },
  {
    codigo: "MH-ECO-02",
    icone: "🌄",
    categoria: "nat",
    cat_label: "Natureza & Lazer",
    nome: "Mirante Ecologico do Morro da Cruz",
    tipo: "Mirante Panorâmico · Trilha Ecológica e Contemplativa",
    descricao: "O mirante natural mais espetacular da microrregião de Picos. Proporciona visão em 360 graus de toda a depressão geológica e das montanhas semiáridas de relevo acidentado que cercam a cidade. É o ponto de encontro de caminhantes, praticantes de mountain bike (cicloturismo) e fotógrafos que buscam a luz dourada do entardecer sobre os carnaubais.",
    epoca: "Ano todo · Especialmente Maio a Agosto com ventos amenos",
    infra: "Ponto de observação ao ar livre, acessível por veículos altos e trilha a pé",
    imagem: "assets/images/morro_da_cruz.jpg",
    lat: -6.9878,
    lng: -41.0220,
    maps_query: "Mirante Morro da Cruz Monsenhor Hipolito",
    hash_sha256: "98e4680d518de27e47a52798d7ccc145ab0d2196f1d9d85bd6a1d89469891278",
    data_certificacao: "2026-11-15T15:00:00Z"
  },
  {
    codigo: "MH-ECO-03",
    icone: "🌳",
    categoria: "nat",
    cat_label: "Natureza & Lazer",
    nome: "Praca da Matriz e Convivencia Urbana",
    tipo: "Espaço Público Urbano · Lazer e Socialização",
    descricao: "O coração urbano e cívico de Monsenhor Hipólito. Espaço público arborizado e acolhedor, onde as famílias se reúnem nas tardes e noites amenas do sertão. Rodeada pelo comércio tradicional, conta com quiosques de lanches, bancos à sombra e canteiros ornamentais. É o centro nevrálgico das festas juninas, comemorações cívicas e da Feira Livre semanal.",
    epoca: "Ano todo · Movimento vibrante nas noites de fim de semana",
    infra: "Bancos de praça, quiosques com lanches e bebidas típicas, iluminação LED, acessibilidade",
    imagem: "assets/images/praca_matriz.jpg",
    lat: -6.9932,
    lng: -41.0265,
    maps_query: "Praça Matriz Monsenhor Hipolito PI",
    hash_sha256: "a57aee8794c301e8fddedf41d1784d192ec48056f2aaa54ef27f7a07383f817e",
    data_certificacao: "2026-11-15T15:00:00Z"
  },
  {
    codigo: "MH-ECO-04",
    icone: "🌊",
    categoria: "nat",
    cat_label: "Natureza & Lazer",
    nome: "Vale do Rio Riachao e Acudes da Caatinga",
    tipo: "Bacia Hidrográfica · Ecossistema do Semiárido",
    descricao: "O curso histórico do Rio Riachão — tributário da grande bacia hidrográfica do Piauí — deu vida à primitiva Fazenda Riachão no século XIX. Juntamente com açudes e barragens comunitárias, forma o suporte hídrico que viabiliza a agricultura familiar, a criação de pequenos animais e preserva espécies emblemáticas da fauna da Caatinga, como garças, patos silvestres e carcarás.",
    epoca: "Janeiro a Junho (cheias e espelhos d'água) · Setembro a Dezembro (estiagem típica)",
    infra: "Estradas vicinais de terra batida, pontos para pescaria artesanal, áreas de lazer rural",
    imagem: "assets/images/rio_riachao.jpg",
    lat: -6.9960,
    lng: -41.0310,
    maps_query: "Rio Riachao Monsenhor Hipolito Piaui",
    hash_sha256: "9b54b317205f2cd4406533f29676e2acec26256a5b4d510309eb980572af9b78",
    data_certificacao: "2026-11-15T15:00:00Z"
  },

  // ── 3. CULTURA, ARTE & SABORES ─────────────────────────────
  {
    codigo: "MH-CUL-01",
    icone: "💄",
    categoria: "cult",
    cat_label: "Cultura, Arte & Sabores",
    nome: "Festa dos Batonzeiros",
    tipo: "Patrimônio Cultural Imaterial · Identidade Municipal Única",
    descricao: "Expressão identitária singularíssima no Brasil. Monsenhor Hipólito é reconhecida nacionalmente por seus revendedores pioneiros de cosméticos — carinhosamente chamados de 'Batonzeiros' —, em grande parte homens que desbravam todos os estados brasileiros com vendas porta a porta. Em julho, eles retornam à terra natal para reencontrar suas famílias em uma celebração que mistura carreatas, forró pé de serra e confraternização popular.",
    epoca: "Julho (integrada à programação cívica de emancipação)",
    infra: "Praça de eventos, palco oficial de shows, camarotes comunitários, estrutura gastronômica",
    imagem: "assets/images/festa_batonzeiros.jpg",
    lat: -6.9928,
    lng: -41.0260,
    maps_query: "Monsenhor Hipolito Piaui Batonzeiros",
    hash_sha256: "774346f73d940fb786654b8d0c61afb2ea510d2d968c75e158ddf96a42c967b2",
    data_certificacao: "2026-11-15T15:00:00Z"
  },
  {
    codigo: "MH-CUL-02",
    icone: "🥩",
    categoria: "cult",
    cat_label: "Cultura, Arte & Sabores",
    nome: "Circuito Gastronomico Sertanejo e Feira Livre",
    tipo: "Gastronomia Típica · Sabores da Terra & Artesanato",
    descricao: "Roteiro gastronômico com o legítimo sabor do interior piauiense: carne de sol dourada na manteiga de garrafa acompanhada de macaxeira cozida, carneiro guisado com pirão sertanejo, galinha caipira e de capote (d'angola), baião de dois com queijo de coalho e feijão-verde fresco. Para beber, a inconfundível cajuína cristalina piauiense bem gelada e o mel puro da microrregião de Picos. Na feira, destacam-se peças em couro legítimo (gibões, selas e chapéus) e trançados de palha de carnaúba.",
    epoca: "Aos sábados (Feira Livre) e noites de festejos locais",
    infra: "Barracas padronizadas de feirantes, restaurantes típicos, lanchonetes e mercearias centrais",
    imagem: "assets/images/carne_de_sol.jpg",
    lat: -6.9930,
    lng: -41.0262,
    maps_query: "Monsenhor Hipolito Piaui Gastronomia",
    hash_sha256: "3213906a5861c22f3802786d2f7057b106bbdc73f406c875b7306f614ec65d88",
    data_certificacao: "2026-11-15T15:00:00Z"
  }
];

// ── Utilitário Criptográfico SHA-256 no Navegador ─────────────
async function calcularHashSHA256(texto) {
  const enc = new TextEncoder();
  const data = enc.encode(texto);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// ── Verificação de Integridade Criptográfica do Registro ─────
async function verificarIntegridadeRegistro(codigo) {
  const registro = DB_REGISTROS.find(r => r.codigo === codigo);
  if (!registro) return { valido: false, erro: "Registro não encontrado" };

  const canonicalString = `${registro.codigo}|${registro.nome}|${registro.categoria}|${registro.lat.toFixed(4)}|${registro.lng.toFixed(4)}|${SECURITY_HASH_SALT}`;
  const hashCalculado = await calcularHashSHA256(canonicalString);
  const valido = hashCalculado.toLowerCase() === registro.hash_sha256.toLowerCase();

  return {
    valido,
    codigo: registro.codigo,
    nome: registro.nome,
    hashEsperado: registro.hash_sha256,
    hashCalculado,
    canonicalString,
    dataCertificacao: registro.data_certificacao
  };
}
