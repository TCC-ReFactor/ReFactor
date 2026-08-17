document.addEventListener("DOMContentLoaded", () => {
  initFeedCarousel();
});

function initFeedCarousel() {
  const track = document.getElementById("carousel-track");
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");
  const dotsWrap = document.getElementById("carousel-dots");

  if (!track || !dotsWrap) return;

  const cards = Array.from(track.children).filter((child) => child.classList.contains("post-card"));

  if (!cards.length) return;

  dotsWrap.innerHTML = cards
    .map((_, i) => `<button class="dot${i === 0 ? " is-active" : ""}" data-index="${i}" aria-label="Ir para publicação ${i + 1}"></button>`)
    .join("");

  const dots = Array.from(dotsWrap.children);

  function scrollToIndex(index) {
    const card = cards[index];
    if (!card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }

  function updateActiveDot() {
    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(cardCenter - trackCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    });

    dots.forEach((dot, i) => dot.classList.toggle("is-active", i === closestIndex));
  }

  prevBtn.addEventListener("click", () => {
    track.scrollBy({ left: -230, behavior: "smooth" });
  });

  nextBtn.addEventListener("click", () => {
    track.scrollBy({ left: 230, behavior: "smooth" });
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => scrollToIndex(Number(dot.dataset.index)));
  });

  track.addEventListener("scroll", () => {
    window.requestAnimationFrame(updateActiveDot);
  });
}
