const siteConfig = window.siteConfig ?? { nav: [], owner: "" };
const seoConfig = window.seoConfig ?? { pages: {} };

const body = document.body;
const currentPage = body.dataset.page || "home";
const isNestedPage = window.location.pathname.includes("/pages/");
const relativePrefix = isNestedPage ? "../" : "";

const nav = document.querySelector("[data-nav]");
const navMenu = document.querySelector("[data-nav-menu]");
const navBrand = document.querySelector("[data-nav-brand]");
const navToggle = document.querySelector(".nav__toggle");

const resolveHref = (href) => {
  if (!href) return "#";
  if (/^(https?:|mailto:|tel:)/i.test(href)) return href;
  if (href.startsWith("#")) return href;
  return `${relativePrefix}${href}`;
};

const activeIds = new Set([currentPage]);
const currentHash = window.location.hash.replace("#", "");
if (currentPage === "home" && currentHash) {
  activeIds.add(currentHash);
}

if (navMenu && siteConfig.nav?.length) {
  navMenu.innerHTML = "";
  siteConfig.nav.forEach((item) => {
    const link = document.createElement("a");
    link.textContent = item.label;
    link.href = resolveHref(item.href);
    if (activeIds.has(item.id)) {
      link.dataset.active = "true";
    }
    navMenu.appendChild(link);
  });
  navMenu.setAttribute("data-open", "false");
}

if (navBrand) {
  navBrand.textContent = siteConfig.owner || navBrand.textContent;
  navBrand.href = resolveHref("index.html#top");
}

const closeNavMenu = () => {
  navMenu?.setAttribute("data-open", "false");
  navToggle?.setAttribute("aria-expanded", "false");
};

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.getAttribute("data-open") === "true";
    navMenu.setAttribute("data-open", String(!isOpen));
    navToggle.setAttribute("aria-expanded", String(!isOpen));
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeNavMenu();
    });
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeNavMenu();
  }
});

const yearTarget = document.getElementById("year");
if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

const applySeoMetadata = () => {
  const meta = seoConfig.pages?.[currentPage] ?? {};
  const resolvedTitle = meta.title || seoConfig.defaultTitle;
  const resolvedDescription = meta.description || seoConfig.defaultDescription;

  if (resolvedTitle) {
    document.title = resolvedTitle;
  }

  if (resolvedDescription) {
    let descriptionTag = document.querySelector('meta[name="description"]');
    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.name = "description";
      document.head.appendChild(descriptionTag);
    }
    descriptionTag.setAttribute("content", resolvedDescription);
  }

  const canonicalHref = `${window.location.origin}${window.location.pathname}`;
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement("link");
    canonicalLink.setAttribute("rel", "canonical");
    document.head.appendChild(canonicalLink);
  }

  canonicalLink.setAttribute("href", canonicalHref);
};

applySeoMetadata();
