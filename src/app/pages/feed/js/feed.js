document.addEventListener("DOMContentLoaded", () => {
  renderAds(ads);
  initThemeToggle();
  initFilters();
});

/* -renderização dos cards  */

function renderAds(list) {
  const container = document.getElementById("ad-list");
  if (!container) return;

  if (!list.length) {
    container.innerHTML = `<li class="ad-list__empty">Nenhum anúncio encontrado para os filtros selecionados.</li>`;
    return;
  }

  container.innerHTML = list
    .map(
      (ad) => `
      <li class="ad-card">
        <a class="ad-card__thumbnail" href="ad-detail.html?id=${ad.id}" aria-hidden="true" tabindex="-1">
          <img src="${ad.photo}" alt="" loading="lazy" />
        </a>
        <div class="ad-card__body">
          <div class="ad-card__header">
            <p class="ad-card__title">${ad.title}</p>
            <span class="condition-tag">${conditionLabels[ad.condicao] || ""}</span>
          </div>
          <p class="ad-card__description">${ad.description}</p>
          <div class="ad-card__footer">
            <div class="ad-card__seller">
              <span class="avatar" style="--avatar-a:#7fd996;--avatar-b:#1c6b3a;">${initials(ad.op)}</span>
              <span class="ad-card__seller-name">${ad.op}</span>
              <span class="ad-card__time">${ad.time}</span>
            </div>
            <a class="btn btn--primary ad-card__link" href="ad-detail.html?id=${ad.id}">Ver Anúncio →</a>
          </div>
        </div>
      </li>`
    )
    .join("");
}

/* filtros da sidebar (categoria e condição)  */

function initFilters() {
  const sortSelect = document.getElementById("sort-select");
  const priceSelect = document.getElementById("price-select");
  const categoriaChecks = document.querySelectorAll('#category-filters input[type="checkbox"]');
  const condicaoChecks = document.querySelectorAll('#condition-filters input[type="checkbox"]');
  const searchInput = document.getElementById("search-input");

  function applyFilters() {
    const activeCategorias = Array.from(categoriaChecks)
      .filter((c) => c.checked)
      .map((c) => c.value);
    const activeCondicoes = Array.from(condicaoChecks)
      .filter((c) => c.checked)
      .map((c) => c.value);
    const term = (searchInput?.value || "").trim().toLowerCase();

    let filtered = ads.filter(
      (ad) =>
        activeCategorias.includes(ad.categoria) &&
        activeCondicoes.includes(ad.condicao) &&
        ad.title.toLowerCase().includes(term)
    );

    if (sortSelect?.value === "recentes") {
      filtered = filtered.slice().reverse();
    }

    if (priceSelect?.value === "crescente") {
      filtered = filtered.slice().sort((a, b) => a.price - b.price);
    } else if (priceSelect?.value === "decrescente") {
      filtered = filtered.slice().sort((a, b) => b.price - a.price);
    }

    renderAds(filtered);
  }

  [...categoriaChecks, ...condicaoChecks].forEach((input) =>
    input.addEventListener("change", applyFilters)
  );
  sortSelect?.addEventListener("change", applyFilters);
  priceSelect?.addEventListener("change", applyFilters);
  searchInput?.addEventListener("input", applyFilters);
}
