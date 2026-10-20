/*
   Dados de exemplo dos anúncios, compartilhados entre a listagem
   (anuncios.html) e o detalhe do anúncio (anuncio.html).
   Front-end apenas — no futuro isso virá da API do back-end.

   As fotos em img/ são apenas ilustrativas e podem se repetir entre
   anúncios diferentes até que existam uploads reais de cada produto.
*/

const ads = [
  {
    id: "notebook-thinkpad",
    title: "Notebook Thinkpad",
    op: "Irineu Oliveira",
    description: "Notebook usado, ideal para o dia a dia, com ótima performance e bateria em bom estado.",
    fullDescription: "Notebook Lenovo Intel Core i5 8350u, 8GB Ddr4, Ssd M.2 256gb. Aparelho revisado e testado, funcionando perfeitamente, ideal para trabalho, estudos e tarefas do dia a dia.",
    price: 1200,
    time: "Há dias",
    estado: "Semi-Novo",
    categoria: "notebook",
    condicao: "usado",
    photo: "img/notebook.png",
  },
  {
    id: "monitor-lg-ultrawide",
    title: "Monitor LG UltraWide 29\u2033",
    op: "Larissa M.",
    description: "Monitor seminovo, tela sem manchas ou pixels mortos, ótimo para produtividade e jogos leves.",
    fullDescription: "Monitor LG UltraWide de 29 polegadas, resolução Full HD, entradas HDMI e DisplayPort. Tela sem manchas, queimaduras ou pixels mortos. Acompanha cabo de energia e suporte original.",
    price: 850,
    time: "Há 5h",
    estado: "Seminovo",
    categoria: "monitores",
    condicao: "usado",
    photo: "img/monitor.png",
  },
  {
    id: "desktop-gamer-positivo",
    title: "Desktop Gamer Positivo",
    op: "Gabriel T.",
    description: "Computador completo e pronto para uso, com upgrade recente de memória RAM.",
    fullDescription: "Computador completo, gabinete + monitor + teclado + mouse. Processador Ryzen 5, 16GB de RAM (upgrade recente), SSD 480GB. Pronto para uso, ideal para trabalho e jogos leves.",
    price: 2100,
    time: "Há 1 dia",
    estado: "Usado",
    categoria: "desktop",
    condicao: "usado",
    photo: "img/desktop.png",
  },
  {
    id: "teclado-redragon",
    title: "Teclado Mecânico Redragon",
    op: "Camila A.",
    description: "Teclado mecânico com leve desgaste em algumas teclas; switches funcionando perfeitamente.",
    fullDescription: "Teclado mecânico Redragon, switches azuis, iluminação RGB. Apresenta leve desgaste na pintura de algumas teclas (estético), mas todos os switches funcionam perfeitamente.",
    price: 180,
    time: "Há 1 dia",
    estado: "Com avarias estéticas",
    categoria: "perifericos",
    condicao: "avarias",
    photo: "img/notebook.png",
  },
  {
    id: "gpu-gtx1660",
    title: "Placa de Vídeo GTX 1660",
    op: "Vitor H.",
    description: "Placa de vídeo usada, testada e funcionando, ótima para jogos em 1080p.",
    fullDescription: "Placa de vídeo GTX 1660 6GB, usada e testada, sem histórico de mineração. Ótimo desempenho para jogos em 1080p nas configurações altas.",
    price: 950,
    time: "Há 2 dias",
    estado: "Usado",
    categoria: "componentes",
    condicao: "usado",
    photo: "img/desktop.png",
  },
  {
    id: "mouse-logitech-g203",
    title: "Mouse Logitech G203",
    op: "João V.",
    description: "Produto novo, ainda lacrado na caixa original — comprado em promoção e não utilizado.",
    fullDescription: "Mouse Logitech G203, novo e lacrado na caixa original. Comprado em promoção e nunca utilizado. Acompanha nota fiscal.",
    price: 120,
    time: "Há 3 dias",
    estado: "Novo (lacrado)",
    categoria: "perifericos",
    condicao: "novo",
    photo: "img/monitor.png",
  },
];

const conditionLabels = {
  novo: "Novo",
  usado: "Usado",
  avarias: "Com avarias",
};

function formatBRL(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function initials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
