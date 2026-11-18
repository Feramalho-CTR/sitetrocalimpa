// ===================== NAVBAR SCROLL =====================
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) navbar.classList.add("scrolled");
  else navbar.classList.remove("scrolled");
  updateActiveNav();
});

hamburger && hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  hamburger.classList.toggle("active");
});

// Close menu on link click
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    hamburger.classList.remove("active");
  });
});

// ===================== ACTIVE NAV LINK =====================
function updateActiveNav() {
  const sections = ["inicio","como-funciona","beneficios","sobre","numeros","contato"];
  let current = "inicio";
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 120) current = id;
  });
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) link.classList.add("active");
  });
}

// ===================== COUNTER ANIMATION =====================
function animateCounter(el) {
  const target = parseInt(el.getAttribute("data-target"));
  const prefix = el.getAttribute("data-prefix") || "";
  const suffix = el.getAttribute("data-suffix") || "";
  const duration = 2000;
  const start = performance.now();
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(eased * target);
    if (target >= 10000) {
      el.textContent = prefix + value.toLocaleString("pt-BR") + suffix;
    } else {
      el.textContent = prefix + value + suffix;
    }
    if (progress < 1) requestAnimationFrame(update);
    else {
      if (target >= 10000) el.textContent = prefix + target.toLocaleString("pt-BR") + suffix;
      else el.textContent = prefix + target + suffix;
    }
  }
  requestAnimationFrame(update);
}

// ===================== INTERSECTION OBSERVER =====================
const observed = new Set();
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !observed.has(entry.target)) {
      observed.add(entry.target);
      entry.target.classList.add("visible");
      // Animate counters in hero
      if (entry.target.classList.contains("hero-stats")) {
        entry.target.querySelectorAll(".stat-number").forEach(el => animateCounter(el));
      }
    }
  });
}, { threshold: 0.15 });

// Observe hero stats
const heroStats = document.getElementById("hero-stats");
if (heroStats) observer.observe(heroStats);

// Observe cards
document.querySelectorAll(".step-card, .beneficio-card, .ano-card, .mini-card, .breakeven-card, .impacto-banner").forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(24px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, 100);
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  cardObserver.observe(el);
});

// Stagger step cards
const stepCards = document.querySelectorAll(".step-card");
stepCards.forEach((card, i) => {
  card.style.transitionDelay = (i * 0.15) + "s";
});

// Stagger ano cards
const anoCards = document.querySelectorAll(".ano-card");
anoCards.forEach((card, i) => {
  card.style.transitionDelay = (i * 0.12) + "s";
});

// ===================== MVV TABS =====================
document.querySelectorAll(".mvv-tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const tab = btn.getAttribute("data-tab");
    document.querySelectorAll(".mvv-tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".mvv-panel").forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
    const panel = document.getElementById("panel-" + tab);
    if (panel) panel.classList.add("active");
  });
});

// ===================== FINANCEIRO TABS =====================
document.querySelectorAll(".fin-tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const tab = btn.getAttribute("data-fintab");
    document.querySelectorAll(".fin-tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".fin-tab-panel").forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
    const panel = document.getElementById("fin-panel-" + tab);
    if (panel) panel.classList.add("active");
  });
});

// ===================== FORM SUBMIT =====================
const form = document.getElementById("contato-form");
const formSuccess = document.getElementById("form-success");
form && form.addEventListener("submit", (e) => {
  e.preventDefault();
  const btn = document.getElementById("btn-form-submit");
  btn.textContent = "Enviando...";
  btn.style.opacity = "0.7";
  setTimeout(() => {
    btn.textContent = "Mensagem enviada!";
    if (formSuccess) formSuccess.style.display = "block";
    form.reset();
    setTimeout(() => {
      btn.textContent = "Enviar solicitacao";
      btn.style.opacity = "1";
    }, 3000);
  }, 1200);
});

// ===================== SMOOTH SCROLL =====================
document.querySelectorAll("a[href^='#']").forEach(anchor => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ===================== PARALLAX HERO ORBS =====================
document.addEventListener("mousemove", (e) => {
  const orbs = document.querySelectorAll(".hero-orb");
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  orbs.forEach((orb, i) => {
    const factor = (i + 1) * 0.4;
    orb.style.transform = `translate(${x * factor}px, ${y * factor}px) scale(1)`;
  });
});
