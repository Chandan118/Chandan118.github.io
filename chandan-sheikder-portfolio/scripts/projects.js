const filterButtons = document.querySelectorAll("[data-filter]");
const projectCards = document.querySelectorAll("[data-project-card]");

const applyProjectFilter = (filter) => {
  projectCards.forEach((card) => {
    const topics = (card.getAttribute("data-project-topics") || "")
      .split(",")
      .map((topic) => topic.trim().toLowerCase())
      .filter(Boolean);

    const isVisible = filter === "all" || topics.includes(filter.toLowerCase());
    card.hidden = !isVisible;
    card.classList.toggle("is-hidden", !isVisible);
  });
};

const resetActiveStates = () => {
  filterButtons.forEach((button) => {
    button.dataset.active = "false";
  });
};

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter-value") || "all";
    resetActiveStates();
    button.dataset.active = "true";
    applyProjectFilter(filter);
  });
});

if (filterButtons.length) {
  const initial = Array.from(filterButtons).find((button) => button.dataset.active === "true");
  applyProjectFilter(initial?.getAttribute("data-filter-value") || "all");
}
