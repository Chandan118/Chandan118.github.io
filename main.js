document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const topNav = document.querySelector(".top-nav");
  const navLinks = document.querySelectorAll(".nav-links a");
  const yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  if (toggle && topNav) {
    toggle.addEventListener("click", () => {
      const isOpen = topNav.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      topNav?.classList.remove("nav-open");
      toggle?.setAttribute("aria-expanded", "false");
    });
  });
});
