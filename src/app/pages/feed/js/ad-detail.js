document.addEventListener("DOMContentLoaded", () => {
  const ad = findAd();
  renderAd(ad);
  initThemeToggle();
});

/*  Localiza o anúncio pelo id na URL (?id=...)  */

function findAd() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  return ads.find((a) => a.id === id) || ads[0];
}

/* Renderização  */

function renderAd(ad) {
  const container = document.getElementById("ad-detail-content");
  if (!ad || !container) return;

  document.title = `PTP - ${ad.title}`;

  // Usa a mesma foto do produto para simular 3 fotos/ângulos no carrossel
  // (front-end apenas — ok repetir até existirem múltiplos uploads reais).

  const photoCount = 3;
  const photos = Array.from({ length: photoCount }, (_, i) => i);

  container.innerHTML = `
    <div class="ad-detail__main">

      <div class="gallery">
        <div class="gallery__viewport" id="gallery-viewport">
          ${photos
            .map(
              (i) => `
            <div class="gallery__slide${i === 0 ? " is-active" : ""}" data-index="${i}">
              <img src="${ad.photo}" alt="Foto de ${ad.title}" />
            </div>`
            )
            .join("")}

          <button class="gallery__button gallery__button--previous" id="gallery-prev" type="button" aria-label="Foto anterior">
            <svg viewBox="0 0 24 24" fill="none"><path d="M15 5l-7 7 7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <button class="gallery__button gallery__button--next" id="gallery-next" type="button" aria-label="Próxima foto">
            <svg viewBox="0 0 24 24" fill="none"><path d="M9 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </div>

        <div class="gallery__dots" id="gallery-dots">
          ${photos
            .map((i) => `<button class="pagination-dot${i === 0 ? " is-active" : ""}" data-index="${i}" aria-label="Ir para foto ${i + 1}"></button>`)
            .join("")}
        </div>
      </div>

      <aside class="ad-detail__info">
        <p class="ad-detail__price">${formatBRL(ad.price)}</p>

        <div class="seller">
          <span class="avatar avatar--seller" style="--avatar-a:#7fd996;--avatar-b:#1c6b3a;">${initials(ad.op)}</span>
          <div>
            <p class="seller__name">${ad.op}</p>
            <p class="seller__time">${ad.time}</p>
          </div>
        </div>

        <div class="ad-detail__condition">
          <p class="ad-detail__label">Condição</p>
          <p class="ad-detail__item-state">Estado do item: <span class="condition-tag">${ad.estado}</span></p>
        </div>

        <button class="btn btn--primary btn--buy" type="button">
          Comprar agora
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 4h2l1.6 9.6A2 2 0 0 0 9.57 15.4h7.86a2 2 0 0 0 1.97-1.66L20.5 7H6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10" cy="19" r="1.4" fill="currentColor"/><circle cx="17.5" cy="19" r="1.4" fill="currentColor"/></svg>
        </button>
      </aside>

    </div>

    <div class="ad-detail__body">
      <h1 class="ad-detail__title">${ad.title}</h1>
      <p class="ad-detail__description-label">Descrição</p>
      <p class="ad-detail__description">${ad.fullDescription}</p>
    </div>
  `;

  initGallery(photoCount);
}

/*  Carrossel de fotos */

function initGallery(photoCount) {
  const slides = document.querySelectorAll(".gallery__slide");
  const dots = document.querySelectorAll("#gallery-dots .pagination-dot");
  const prevBtn = document.getElementById("gallery-prev");
  const nextBtn = document.getElementById("gallery-next");

  let current = 0;

  function goTo(index) {
    current = (index + photoCount) % photoCount;
    slides.forEach((slide, i) => slide.classList.toggle("is-active", i === current));
    dots.forEach((dot, i) => dot.classList.toggle("is-active", i === current));
  }

  prevBtn?.addEventListener("click", () => goTo(current - 1));
  nextBtn?.addEventListener("click", () => goTo(current + 1));
  dots.forEach((dot) => dot.addEventListener("click", () => goTo(Number(dot.dataset.index))));
}
