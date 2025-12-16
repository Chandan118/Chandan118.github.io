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
      title: "Marine-Inspired Multimodal Sensor Fusion",
      summary: "Neuromorphic processing with IMU/LiDAR/Vision fusion for autonomous navigation in unstructured environments.",
      tags: ["Sensor fusion", "Neuromorphic", "Autonomy"],
      type: "Journal",
      year: "2025",
      image: "figure/sensor.png",
      alt: "Sensor fusion figure from marine-inspired navigation paper",
      link: "https://doi.org/10.3390/s25216627",
    },
    {
      title: "Bio-inspired Navigation Systems for Robots",
      summary: "Surveying bio-inspired navigation strategies for resilient operation in GPS-denied, cluttered environments.",
      tags: ["Bio-robotics", "SLAM", "Survey"],
      type: "Journal",
      year: "2025",
      image: "figure/nature.png",
      alt: "Bio-inspired navigation illustration",
      link: "https://doi.org/10.1038/s44222-025-00367-6",
    },
    {
      title: "Calcium Imaging & Soft Robotics Interfaces",
      summary: "In-progress work on coupling calcium imaging with soft robotic actuation for responsive medical systems.",
      tags: ["Calcium imaging", "Soft robotics", "Medical"],
      type: "Preprint",
      year: "2025",
      image: "figure/cell.png",
      alt: "Calcium imaging visualization with soft robot overlay",
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
