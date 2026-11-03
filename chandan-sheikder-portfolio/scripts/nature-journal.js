/**
 * Nature Journal Interactive UI Controller
 * Chandan Sheikder Bio-Robotics Research Archive
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Navigation Toggle
  const mobileToggle = document.querySelector(".nature-mobile-toggle");
  const navLinks = document.querySelector(".nature-nav-links");

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      const isExpanded = navLinks.classList.contains("open");
      mobileToggle.setAttribute("aria-expanded", isExpanded);
    });
  }

  // 2. Lightbox Modal Controller for Paper Figures
  const modal = document.getElementById("nature-modal");
  const modalImg = document.getElementById("nature-modal-img");
  const modalTitle = document.getElementById("nature-modal-title");
  const modalCaption = document.getElementById("nature-modal-caption");
  const modalClose = document.getElementById("nature-modal-close");
  const modalDoiLink = document.getElementById("nature-modal-doi");

  function openFigureModal(src, title, caption, doi) {
    if (!modal) return;
    if (modalImg) modalImg.src = src;
    if (modalTitle) modalTitle.textContent = title;
    if (modalCaption) modalCaption.textContent = caption;
    if (modalDoiLink) {
      if (doi && doi !== "#") {
        modalDoiLink.href = doi;
        modalDoiLink.style.display = "inline-flex";
      } else {
        modalDoiLink.style.display = "none";
      }
    }
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeFigureModal() {
    if (!modal) return;
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  // Attach click listener to all figure boxes
  document.querySelectorAll("[data-figure-box]").forEach((box) => {
    box.addEventListener("click", () => {
      const img = box.querySelector("img");
      const src = box.dataset.fullSrc || (img ? img.src : "");
      const title = box.dataset.figureTitle || "Scientific Figure";
      const caption = box.dataset.figureCaption || "";
      const doi = box.dataset.doi || "#";
      openFigureModal(src, title, caption, doi);
    });
  });

  if (modalClose) {
    modalClose.addEventListener("click", closeFigureModal);
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeFigureModal();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.classList.contains("active")) {
      closeFigureModal();
    }
  });

  // 3. Category Filter Chips
  const filterChips = document.querySelectorAll(".nature-filter-chip");
  const articles = document.querySelectorAll("[data-filter-item]");
  const searchInput = document.querySelector(".nature-search-input");

  let currentCategory = "all";
  let searchQuery = "";

  function applyFilters() {
    articles.forEach((item) => {
      const itemCategory = item.dataset.category || "";
      const itemText = item.textContent.toLowerCase();

      const matchesCategory =
        currentCategory === "all" ||
        itemCategory.includes(currentCategory);

      const matchesSearch =
        !searchQuery || itemText.includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        item.style.display = "";
      } else {
        item.style.display = "none";
      }
    });
  }

  filterChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      filterChips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      currentCategory = chip.dataset.filter || "all";
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      applyFilters();
    });
  }

  // 4. BibTeX Citation Copier with Toast
  const toast = document.getElementById("nature-toast");
  const toastMsg = document.getElementById("nature-toast-msg");

  function showToast(message) {
    if (!toast) return;
    if (toastMsg) toastMsg.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3200);
  }

  document.querySelectorAll("[data-bibtex]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const bibtex = btn.dataset.bibtex;
      if (navigator.clipboard && bibtex) {
        navigator.clipboard.writeText(bibtex).then(() => {
          showToast("BibTeX citation copied to clipboard!");
        }).catch(() => {
          showToast("Citation ready for copying.");
        });
      } else {
        showToast("Citation copied!");
      }
    });
  });
});
