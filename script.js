// ========================================
// THEME TOGGLE - DARK MODE ONLY (COMMENTED OUT)
// ========================================
// Light mode theme toggle functionality has been disabled
// All code below is commented to keep portfolio in dark mode only

// const htmlEl = document.documentElement;
// const themeToggle = document.getElementById("themeToggle");
// const themeIcon = document.getElementById("themeIcon");
// const modeLabel = document.querySelector(".mode-label");
// const storedTheme = localStorage.getItem("theme") || "dark";

// htmlEl.setAttribute("data-theme", storedTheme);
// updateThemeButton(storedTheme);

// themeToggle.addEventListener("click", () => {
//   const current = htmlEl.getAttribute("data-theme");
//   const next = current === "dark" ? "light" : "dark";
//   htmlEl.setAttribute("data-theme", next);
//   localStorage.setItem("theme", next);
//   updateThemeButton(next);
// });

// function updateThemeButton(theme) {
//   if (theme === "dark") {
//     themeIcon.textContent = "🌙";
//     modeLabel.textContent = "Dark";
//   } else {
//     themeIcon.textContent = "☀️";
//     modeLabel.textContent = "Light";
//   }
// }

// ========================================
// MOBILE NAVIGATION
// ========================================
const navBurger = document.getElementById("navBurger");
const navDrawer = document.getElementById("navDrawer");

navBurger?.addEventListener("click", () => {
  navDrawer.classList.toggle("open");
});

navDrawer?.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navDrawer.classList.remove("open");
  });
});

// ========================================
// SMOOTH SCROLLING
// ========================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ========================================
// ACTIVE NAV LINK ON SCROLL
// ========================================
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function setActiveLink() {
  let currentId = "";
  const offset = 120;

  sections.forEach((section) => {
    const top = section.offsetTop;
    if (pageYOffset >= top - offset) {
      currentId = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || !href.startsWith("#")) return;

    const id = href.slice(1);
    if (id === currentId) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", setActiveLink);
setActiveLink();

// ========================================
// REVEAL ON SCROLL
// ========================================
const revealElements = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((el) => observer.observe(el));

// ========================================
// ANIMATED COUNTERS (HERO STATS)
// FIX: Properly handles counter animation
// ========================================
const counters = document.querySelectorAll(".counter");
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        // Check if counter hasn't been animated yet
        if (!el.dataset.animated) {
          animateCounter(el);
          el.dataset.animated = "true";
        }
        counterObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.4 }
);

counters.forEach((c) => counterObserver.observe(c));

function animateCounter(el) {
  const target = parseInt(el.getAttribute("data-target"), 10);

  // Validate target is a number
  if (isNaN(target)) {
    console.warn("Counter element missing valid data-target attribute:", el);
    return;
  }

  let current = 0;
  const duration = 900;
  const stepTime = 16;
  const steps = duration / stepTime;
  const increment = target / steps;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, stepTime);
}
