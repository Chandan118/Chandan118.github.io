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
  const langToggle = document.getElementById("lang-toggle");
  const revealTargets = document.querySelectorAll(".card, .hero, .gallery");

  const slides = [
    {
      title: "Bio-inspired navigation systems for robots",
      titleZh: "面向机器人的仿生导航系统",
      summary: "Survey of bio-inspired strategies for robust navigation in GPS-denied, cluttered environments.",
      summaryZh: "综述仿生导航策略，在无 GPS、杂乱环境中实现稳健导航。",
      tags: ["Bio-robotics", "Navigation", "Survey"],
      tagsZh: ["仿生机器人", "导航", "综述"],
      type: "Journal",
      year: "2025",
      image: "figure/Bio-inspired navigation systems for robots.png",
      alt: "Figure from bio-inspired navigation systems paper",
      link: "https://doi.org/10.1038/s44222-025-00367-6",
    },
    {
      title: "Marine-Inspired Multimodal Sensor Fusion and Neuromorphic Processing for Autonomous Navigation",
      titleZh: "受海洋启发的多模态传感融合与类脑处理自主导航",
      summary: "Neuromorphic processing and multimodal fusion (IMU/LiDAR/Vision) for unstructured, dynamic environments.",
      summaryZh: "类脑处理与多模态融合（IMU/激光雷达/视觉），面向非结构化、动态环境的自主导航。",
      tags: ["Sensor fusion", "Neuromorphic", "Autonomy"],
      tagsZh: ["传感融合", "类脑", "自主导航"],
      type: "Journal",
      year: "2025",
      image: "figure/Marine-Inspired Multimodal Sensor Fusion and Neuromorphic Processing for Autonomous Navigation.png",
      alt: "Sensor fusion workflow for autonomous navigation",
      link: "https://doi.org/10.3390/s25216627",
    },
    {
      title: "Neuromorphic Navigation for Autonomous Robots",
      titleZh: "自主机器人的类脑导航",
      summary: "Neuromorphic navigation stack for autonomous robots; device-scale implementation focus.",
      summaryZh: "自主机器人类脑导航栈，关注器件级实现。",
      tags: ["Neuromorphic", "SLAM", "Robotics"],
      tagsZh: ["类脑", "SLAM", "机器人"],
      type: "Journal",
      year: "2025",
      image: "figure/Neuromorphic Navigation for Autonomous Robots.png",
      alt: "Neuromorphic navigation architecture diagram",
      link: "https://github.com/Chandan118/Chandan_Sheikder",
    },
    {
      title: "A Neuromorphic Framework for Bio-Inspired Navigation in Autonomous Robots",
      titleZh: "自主机器人仿生导航的类脑框架",
      summary: "Cell Reports Physical Science submission (revision) detailing a neuromorphic navigation framework.",
      summaryZh: "Cell Reports Physical Science 修订稿，详细阐述类脑导航框架。",
      tags: ["Neuromorphic", "Navigation", "Robotics"],
      tagsZh: ["类脑", "导航", "机器人"],
      type: "Journal",
      year: "2025",
      image: "figure/A Neuromorphic Framework for Bio-Inspired Navigation in Autonomous Robots.png",
      alt: "Neuromorphic framework for bio-inspired navigation",
      link: "mailto:chandan@bit.edu.cn",
    },
    {
      title: "Autonomous Space Exploration, Interplanetary Communication Latency, Ethical AI Protocols",
      titleZh: "自主太空探索、星际通信时延与伦理 AI 协议",
      summary: "Accepted Q1 journal paper on autonomy and AI protocols for extreme environments.",
      summaryZh: "Q1 期刊已录用：极端环境下的自主性与 AI 协议。",
      tags: ["Autonomy", "Space", "AI safety"],
      tagsZh: ["自主性", "太空", "AI 安全"],
      type: "Journal",
      year: "2025",
      image: "figure/Autonomous Space Exploration, Interplanetary Communication Latency.png",
      alt: "Autonomous space exploration and AI latency study",
      link: "mailto:chandan@bit.edu.cn",
    },
    {
      title: "Bio-inspired and Soft Robotics for Autonomous Wind Energy Operations",
      titleZh: "面向风能运维的仿生与柔性机器人",
      summary: "Comprehensive review of bio-inspired and soft robotic methods for inspection and repair in wind energy.",
      summaryZh: "综述风能运维中的仿生与柔性机器人检测、修复方法。",
      tags: ["Soft robotics", "Wind energy", "Review"],
      tagsZh: ["柔性机器人", "风能", "综述"],
      type: "Journal",
      year: "2025",
      image: "figure/Bio-inspired and Soft Robotics for Autonomous Wind Energy Operations.png",
      alt: "Soft robotics for wind energy operations overview",
      link: "mailto:chandan@bit.edu.cn",
    },
    {
      title: "Soft Computing Techniques Applied to Adaptive Hybrid Navigation Methods for Tethered Robots",
      titleZh: "软计算在系缆机器人自适应混合导航中的应用",
      summary: "Hybrid navigation with soft computing for tethered robots in dynamic environments.",
      summaryZh: "使用软计算实现系缆机器人在动态环境中的自适应混合导航。",
      tags: ["Soft computing", "Navigation", "Tethered robots"],
      tagsZh: ["软计算", "导航", "系缆机器人"],
      type: "Conference",
      year: "2023",
      image: "figure/Soft Computing Techniques Applied to Adaptive Hybrid Navigation Methods for Tethered Robots.png",
      alt: "Adaptive hybrid navigation for tethered robots",
      link: "mailto:chandan@bit.edu.cn",
    },
  ];

  const staticCopy = {
    en: {
      "nav.about": "About",
      "nav.news": "News",
      "nav.gallery": "Research Gallery",
      "nav.publications": "Publications",
      "nav.projects": "Projects",
      "nav.experience": "Experience",
      "nav.contact": "Contact",
      "gallery.eyebrow": "Research Collection",
      "gallery.title": "Paper Visuals & Highlights",
      "gallery.lede": "Snapshots from my published and in-progress papers. The carousel advances automatically every 30 seconds with a smooth crossfade and ambient glow.",
      "gallery.github": "View on GitHub",
      "gallery.scholar": "Google Scholar",
      "gallery.legend": "Live slide · rotates every 30s",
      "gallery.prev": "← Prev",
      "gallery.next": "Next →",
    },
    zh: {
      "nav.about": "简介",
      "nav.news": "动态",
      "nav.gallery": "研究画廊",
      "nav.publications": "发表",
      "nav.projects": "项目",
      "nav.experience": "经历",
      "nav.contact": "联系",
      "gallery.eyebrow": "研究合集",
      "gallery.title": "论文可视化与亮点",
      "gallery.lede": "已发表与在研论文的快照，轮播每 30 秒自动切换，平滑渐变并带有光晕效果。",
      "gallery.github": "查看 GitHub",
      "gallery.scholar": "谷歌学术",
      "gallery.legend": "当前幻灯片 · 每 30 秒轮换",
      "gallery.prev": "← 上一页",
      "gallery.next": "下一页 →",
    },
  };

  const i18nElements = document.querySelectorAll("[data-i18n]");
  const preferZh = (navigator.language || "").toLowerCase().startsWith("zh");
  let currentLang = localStorage.getItem("lang") || (preferZh ? "zh" : "en");

  const applyStaticCopy = () => {
    i18nElements.forEach((el) => {
      const key = el.dataset.i18n;
      const text = staticCopy[currentLang]?.[key];
      if (text) {
        el.textContent = text;
      }
    });
    if (nextPaper) nextPaper.textContent = staticCopy[currentLang]?.["gallery.next"] || "Next →";
    if (prevPaper) prevPaper.textContent = staticCopy[currentLang]?.["gallery.prev"] || "← Prev";
    if (langToggle) langToggle.textContent = currentLang === "en" ? "中文" : "EN";
    document.documentElement.setAttribute("lang", currentLang === "zh" ? "zh" : "en");
  };

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
    applyStaticCopy();

    const renderSlide = (index) => {
      const slide = slides[index];
      const useZh = currentLang === "zh";
      const title = useZh && slide.titleZh ? slide.titleZh : slide.title;
      const summary = useZh && slide.summaryZh ? slide.summaryZh : slide.summary;
      const tags = useZh && slide.tagsZh ? slide.tagsZh : slide.tags;

      galleryImage.classList.remove("is-changing");
      void galleryImage.offsetWidth;
      galleryImage.classList.add("is-changing");

      galleryImage.setAttribute("src", slide.image);
      galleryImage.setAttribute("alt", slide.alt);
      paperTitle.textContent = title;
      paperSummary.textContent = summary;
      paperType.textContent = slide.type;
      paperYear.textContent = slide.year;
      paperLink.setAttribute("href", slide.link);

      paperTags.innerHTML = "";
      tags.forEach((tag) => {
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

  if (langToggle) {
    applyStaticCopy();
    langToggle.addEventListener("click", () => {
      currentLang = currentLang === "en" ? "zh" : "en";
      localStorage.setItem("lang", currentLang);
      applyStaticCopy();
    });
  } else {
    applyStaticCopy();
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
