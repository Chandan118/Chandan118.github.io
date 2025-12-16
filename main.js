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
  const langToggles = document.querySelectorAll(".lang-toggle");
  const revealTargets = document.querySelectorAll(".card, .hero, .gallery");

  let rerenderGallery = null;

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
      "hero.role": "Graduate Research Assistant · Bio-Robotics",
      "hero.name": "Chandan Sheikder",
      "hero.lead": "Researches bio-inspired swarm robotics, autonomous navigation frameworks, and medical robotics with a focus on sensor fusion, neuromorphic approaches, and ROS/Gazebo simulation.",
      "hero.location": "Beijing, China",
      "hero.emailCta": "Email",
      "hero.cvCta": "Download CV",
      "about.title": "About",
      "about.p1": "I am a Graduate Research Assistant and MEng candidate in Mechanical Engineering (Thesis) at the Beijing Institute of Technology. I work on bio-inspired swarm robotics and autonomous navigation frameworks designed for complex, GPS-denied environments.",
      "about.p2": "Research focus. Bio-robotics, animal-inspired navigation, medical robots, and calcium imaging. I develop sensor fusion pipelines (IMU, LiDAR, vision), SLAM/navigation stacks in ROS/Gazebo, and neuromorphic processing for robust autonomy.",
      "about.p3": "Open to collaborations. Interested in joint work on navigation, autonomous systems, and bio-inspired robotics. Prospective students or collaborators: please email with a short note on your project interests.",
      "news.title": "News",
      "news.item1": "Leading a robot navigation and positioning system project at BIT, focusing on dynamic obstacles, unstructured terrain, and adaptive sensing.",
      "news.item2": "Architecting a smart wheelchair walker with a cloud platform for real-time monitoring and remote assistance.",
      "news.item3": "Started Graduate Research Assistantship at BIT; working on bio-inspired swarm robotics and GPS-denied navigation.",
      "pubs.title": "Selected Publications",
      "patents.title": "Patents",
      "service.title": "Special Issue Editor",
      "projects.title": "Projects",
      "experience.title": "Experience & Education",
      "contact.title": "Let us collaborate",
      "contact.lede": "Interested in collaborations on robotics, navigation, and bio-inspired systems. Email is best for project ideas, student inquiries, or partnerships.",
      "contact.email": "Email me",
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
      "hero.role": "研究助理 · 仿生机器人",
      "hero.name": "Chandan Sheikder",
      "hero.lead": "从事仿生群体机器人、自主导航框架和医疗机器人研究，聚焦传感融合、类脑方法与 ROS/Gazebo 仿真。",
      "hero.location": "中国 北京",
      "hero.emailCta": "发送邮件",
      "hero.cvCta": "下载简历",
      "about.title": "简介",
      "about.p1": "我是北京理工大学机械工程（学术型硕士）研究助理，研究仿生群体机器人与自主导航框架，面向复杂、无 GPS 的环境。",
      "about.p2": "研究方向：仿生机器人、动物启发导航、医疗机器人、钙成像。开发传感融合流程（IMU/激光雷达/视觉）、ROS/Gazebo 的 SLAM/导航栈，以及类脑处理以提升鲁棒自主能力。",
      "about.p3": "合作意向：欢迎在导航、自主系统、仿生机器人方面合作。学生或合作伙伴可邮件简述项目兴趣。",
      "news.title": "动态",
      "news.item1": "负责 BIT 机器人导航与定位系统项目，聚焦动态障碍、非结构化地形与自适应感知。",
      "news.item2": "构建智能助行车及云平台，实现实时监控与远程辅助。",
      "news.item3": "开启 BIT 研究助理工作，面向仿生群体机器人与无 GPS 导航。",
      "pubs.title": "代表性论文",
      "patents.title": "专利",
      "service.title": "特刊编辑",
      "projects.title": "项目",
      "experience.title": "经历与教育",
      "contact.title": "欢迎合作",
      "contact.lede": "期待在机器人、导航、仿生系统方面合作。项目想法、学生咨询或合作伙伴请邮件联系。",
      "contact.email": "给我写信",
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
    langToggles.forEach((btn) => {
      btn.textContent = currentLang === "en" ? "中文" : "EN";
    });
    document.documentElement.setAttribute("lang", currentLang === "zh" ? "zh" : "en");
  };

  const isSmallScreen = window.matchMedia("(max-width: 820px)").matches;

  if (isSmallScreen && revealTargets.length > 0) {
    revealTargets.forEach((el) => el.classList.add("in-view"));
  } else if ("IntersectionObserver" in window && revealTargets.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
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

    rerenderGallery = () => renderSlide(current);

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

  if (langToggles.length > 0) {
    applyStaticCopy();
    langToggles.forEach((btn) => {
      btn.addEventListener("click", () => {
        currentLang = currentLang === "en" ? "zh" : "en";
        localStorage.setItem("lang", currentLang);
        applyStaticCopy();
        if (typeof rerenderGallery === "function") {
          rerenderGallery();
        }
      });
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
