document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const topNav = document.querySelector(".top-nav");
  const navLinks = document.querySelectorAll(".nav-links a");
  const yearEl = document.getElementById("year");

  const galleryImage = document.getElementById("paper-image");
  const paperTitle = document.getElementById("paper-title");
  const paperSummary = document.getElementById("paper-summary");
  const paperTags = document.getElementById("paper-tags");
  const paperLink = document.getElementById("paper-link");
  const paperType = document.getElementById("paper-type");
  const paperYear = document.getElementById("paper-year");
  const paperProgress = document.getElementById("paper-progress");
  const nextPaper = document.getElementById("next-paper");
  const prevPaper = document.getElementById("prev-paper");

  const slides = [
    {
      title: "Bio-inspired navigation systems for robots",
      summary: "Survey of bio-inspired strategies for robust navigation in GPS-denied, cluttered environments.",
      tags: ["Bio-robotics", "Navigation", "Survey"],
      type: "Journal",
      year: "2025",
      image: "figure/Bio-inspired navigation systems for robots.png",
      alt: "Figure from bio-inspired navigation systems paper",
      link: "https://doi.org/10.1038/s44222-025-00367-6",
    },
    {
      title: "Marine-Inspired Multimodal Sensor Fusion and Neuromorphic Processing for Autonomous Navigation",
      summary: "Neuromorphic processing and multimodal fusion (IMU/LiDAR/Vision) for unstructured, dynamic environments.",
      tags: ["Sensor fusion", "Neuromorphic", "Autonomy"],
      type: "Journal",
      year: "2025",
      image: "figure/Marine-Inspired Multimodal Sensor Fusion and Neuromorphic Processing for Autonomous Navigation.png",
      alt: "Sensor fusion workflow for autonomous navigation",
      link: "https://doi.org/10.3390/s25216627",
    },
    {
      title: "Neuromorphic Navigation for Autonomous Robots",
      summary: "Neuromorphic navigation stack for autonomous robots; device-scale implementation focus.",
      tags: ["Neuromorphic", "SLAM", "Robotics"],
      type: "Journal",
      year: "2025",
      image: "figure/Neuromorphic Navigation for Autonomous Robots.png",
      alt: "Neuromorphic navigation architecture diagram",
      link: "https://github.com/Chandan118/Chandan_Sheikder",
    },
  ];

  if (galleryImage && paperTitle && paperSummary && paperTags && paperLink && paperType && paperYear && paperProgress) {
    let current = 0;
    const duration = 30000;
    let timerId;

    const renderSlide = (index) => {
      const slide = slides[index];
      galleryImage.classList.remove("is-changing");
      void galleryImage.offsetWidth;
      galleryImage.classList.add("is-changing");

      galleryImage.setAttribute("src", slide.image);
      galleryImage.setAttribute("alt", slide.alt);
      paperTitle.textContent = slide.title;
      paperSummary.textContent = slide.summary;
      paperType.textContent = slide.type;
      paperYear.textContent = slide.year;
      paperLink.setAttribute("href", slide.link);

      paperTags.innerHTML = "";
      slide.tags.forEach((tag) => {
        const span = document.createElement("span");
        span.className = "tag";
        span.textContent = tag;
        paperTags.appendChild(span);
      });

      paperProgress.style.transition = "none";
      paperProgress.style.width = "0%";
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          paperProgress.style.transition = `width ${duration}ms linear`;
          paperProgress.style.width = "100%";
        });
      });
    };

    const setSlide = (next) => {
      current = (next + slides.length) % slides.length;
      renderSlide(current);
    };

    const restartTimer = () => {
      if (timerId) {
        clearInterval(timerId);
      }
      timerId = window.setInterval(() => {
        setSlide(current + 1);
      }, duration);
    };

    nextPaper?.addEventListener("click", () => {
      setSlide(current + 1);
      restartTimer();
    });

    prevPaper?.addEventListener("click", () => {
      setSlide(current - 1);
      restartTimer();
    });

    setSlide(0);
    restartTimer();
  }

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
