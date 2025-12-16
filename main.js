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
  const revealTargets = document.querySelectorAll(".card, .hero, .gallery");

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
    {
      title: "A Neuromorphic Framework for Bio-Inspired Navigation in Autonomous Robots",
      summary: "Cell Reports Physical Science submission (revision) detailing a neuromorphic navigation framework.",
      tags: ["Neuromorphic", "Navigation", "Robotics"],
      type: "Journal",
      year: "2025",
      image: "figure/A Neuromorphic Framework for Bio-Inspired Navigation in Autonomous Robots.png",
      alt: "Neuromorphic framework for bio-inspired navigation",
      link: "mailto:chandan@bit.edu.cn",
    },
    {
      title: "Autonomous Space Exploration, Interplanetary Communication Latency, Ethical AI Protocols",
      summary: "Accepted Q1 journal paper on autonomy and AI protocols for extreme environments.",
      tags: ["Autonomy", "Space", "AI safety"],
      type: "Journal",
      year: "2025",
      image: "figure/Autonomous Space Exploration, Interplanetary Communication Latency.png",
      alt: "Autonomous space exploration and AI latency study",
      link: "mailto:chandan@bit.edu.cn",
    },
    {
      title: "Bio-inspired and Soft Robotics for Autonomous Wind Energy Operations",
      summary: "Comprehensive review of bio-inspired and soft robotic methods for inspection and repair in wind energy.",
      tags: ["Soft robotics", "Wind energy", "Review"],
      type: "Journal",
      year: "2025",
      image: "figure/Bio-inspired and Soft Robotics for Autonomous Wind Energy Operations.png",
      alt: "Soft robotics for wind energy operations overview",
      link: "mailto:chandan@bit.edu.cn",
    },
    {
      title: "Soft Computing Techniques Applied to Adaptive Hybrid Navigation Methods for Tethered Robots",
      summary: "Hybrid navigation with soft computing for tethered robots in dynamic environments.",
      tags: ["Soft computing", "Navigation", "Tethered robots"],
      type: "Conference",
      year: "2023",
      image: "figure/Soft Computing Techniques Applied to Adaptive Hybrid Navigation Methods for Tethered Robots.png",
      alt: "Adaptive hybrid navigation for tethered robots",
      link: "mailto:chandan@bit.edu.cn",
    },
  ];

  if ("IntersectionObserver" in window && revealTargets.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    revealTargets.forEach((el) => {
      el.classList.add("reveal");
      observer.observe(el);
    });
  } else {
    revealTargets.forEach((el) => el.classList.add("in-view"));
  }

  if (galleryImage && paperTitle && paperSummary && paperTags && paperLink && paperType && paperYear && paperProgress) {
    let current = 0;
    const duration = 30000;
    let timerId;
    const gallerySection = document.getElementById("gallery");

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

    const stopTimer = () => {
      if (timerId) {
        clearInterval(timerId);
      }
      timerId = null;
    };

    const startTimer = () => {
      stopTimer();
      timerId = window.setInterval(() => setSlide(current + 1), duration);
    };

    nextPaper?.addEventListener("click", () => {
      setSlide(current + 1);
      startTimer();
    });

    prevPaper?.addEventListener("click", () => {
      setSlide(current - 1);
      startTimer();
    });

    gallerySection?.addEventListener("mouseenter", stopTimer);
    gallerySection?.addEventListener("mouseleave", startTimer);
    gallerySection?.addEventListener("focusin", stopTimer);
    gallerySection?.addEventListener("focusout", startTimer);

    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        setSlide(current + 1);
        startTimer();
      }
      if (event.key === "ArrowLeft") {
        setSlide(current - 1);
        startTimer();
      }
    });

    setSlide(0);
    startTimer();
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
