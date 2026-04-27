const body = document.body;
const header = document.querySelector(".site-header");
const loader = document.querySelector(".loader");
const progress = document.querySelector(".scroll-progress");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const backToTop = document.querySelector(".back-to-top");
const typingTarget = document.querySelector(".typing-text");
const cursorDot = document.querySelector(".cursor-dot");
const cursorGlow = document.querySelector(".cursor-glow");
const heroBg = document.querySelector(".hero-bg");
const transitionLayer = document.querySelector(".page-transition");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const lowPowerDevice =
  reducedMotion ||
  (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
  (navigator.deviceMemory && navigator.deviceMemory <= 4);
const finePointer = matchMedia("(pointer: fine)").matches;
const saveData = navigator.connection && navigator.connection.saveData;

if (lowPowerDevice) {
  body.classList.add("reduce-effects");
}

const phrases = [
  "premium websites.",
  "smooth interactions.",
  "responsive interfaces.",
  "future-ready products.",
];

let phraseIndex = 0;
let letterIndex = 0;
let deleting = false;

window.addEventListener("load", () => {
  loader.classList.add("hidden");
  setTimeout(() => loader.remove(), 600);

  if (!lowPowerDevice && !saveData) {
    const loadWhenIdle = window.requestIdleCallback || ((callback) => setTimeout(callback, 700));
    loadWhenIdle(loadGsapEnhancements);
  }
});

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

async function loadGsapEnhancements() {
  if (window.gsap) return;

  try {
    await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js");
    await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js");

    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.to(".hero-visual", {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    }
  } catch (error) {
    return;
  }
}

function typeLoop() {
  const currentPhrase = phrases[phraseIndex];
  typingTarget.textContent = currentPhrase.slice(0, letterIndex);

  if (!deleting && letterIndex < currentPhrase.length) {
    letterIndex += 1;
    setTimeout(typeLoop, 72);
    return;
  }

  if (!deleting && letterIndex === currentPhrase.length) {
    deleting = true;
    setTimeout(typeLoop, 1200);
    return;
  }

  if (deleting && letterIndex > 0) {
    letterIndex -= 1;
    setTimeout(typeLoop, 38);
    return;
  }

  deleting = false;
  phraseIndex = (phraseIndex + 1) % phrases.length;
  setTimeout(typeLoop, 240);
}

function updateScrollUI() {
  const scrollTop = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

  progress.style.width = `${scrolled}%`;
  header.classList.toggle("scrolled", scrollTop > 24);
  backToTop.classList.toggle("visible", scrollTop > 640);

  heroBg.style.transform = `translateY(${scrollTop * 0.12}px)`;
}

let scrollTicking = false;

function requestScrollUpdate() {
  if (scrollTicking) return;

  scrollTicking = true;
  requestAnimationFrame(() => {
    updateScrollUI();
    scrollTicking = false;
  });
}

function initFallbackReveal() {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  document.querySelectorAll(".reveal, .skill-card").forEach((element) => {
    revealObserver.observe(element);
  });
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const target = Number(counter.dataset.target);
      const duration = 1300;
      const start = performance.now();

      function animateCounter(time) {
        const progressValue = Math.min((time - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progressValue, 3);
        counter.textContent = Math.floor(eased * target);

        if (progressValue < 1) {
          requestAnimationFrame(animateCounter);
        } else {
          counter.textContent = `${target}+`;
        }
      }

      requestAnimationFrame(animateCounter);
      counterObserver.unobserve(counter);
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll(".counter").forEach((counter) => {
  counterObserver.observe(counter);
});

menuToggle.addEventListener("click", () => {
  const isOpen = body.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && body.classList.contains("menu-open")) {
    body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.focus();
  }
});

function runPageTransition(callback) {
  if (!window.gsap || lowPowerDevice) {
    callback();
    return;
  }

  gsap
    .timeline()
    .set(transitionLayer, { transformOrigin: "top", opacity: 1 })
    .to(transitionLayer, { scaleY: 1, duration: 0.28, ease: "power2.inOut" })
    .add(callback)
    .set(transitionLayer, { transformOrigin: "bottom" })
    .to(transitionLayer, { scaleY: 0, duration: 0.36, ease: "power3.out", delay: 0.08 })
    .set(transitionLayer, { opacity: 0 });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId.length < 2) return;

    const target = document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();

    if (link.closest(".nav-links")) {
      body.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }

    runPageTransition(() => {
      target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    });
  });
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: lowPowerDevice ? "auto" : "smooth" });
});

document.querySelector(".contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const button = event.currentTarget.querySelector("button");
  const originalText = button.textContent;

  button.textContent = "Message Sent";
  event.currentTarget.reset();

  setTimeout(() => {
    button.textContent = originalText;
  }, 1800);
});

if (finePointer && !lowPowerDevice) {
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    let tiltFrame = 0;

    card.addEventListener("pointermove", (event) => {
      if (tiltFrame) return;

      tiltFrame = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rotateX = (y / rect.height - 0.5) * -8;
        const rotateY = (x / rect.width - 0.5) * 8;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        card.style.setProperty("--mx", `${(x / rect.width) * 100}%`);
        card.style.setProperty("--my", `${(y / rect.height) * 100}%`);
        tiltFrame = 0;
      });
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
      if (tiltFrame) {
        cancelAnimationFrame(tiltFrame);
        tiltFrame = 0;
      }
    });
  });
}

if (finePointer && !lowPowerDevice) {
  document.querySelectorAll(".project-card, .service-card, .skill-card, .contact-form, .stats-panel").forEach((card) => {
    let glowFrame = 0;

    card.addEventListener("pointermove", (event) => {
      if (glowFrame) return;

      glowFrame = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${((event.clientX - rect.left) / rect.width) * 100}%`);
        card.style.setProperty("--my", `${((event.clientY - rect.top) / rect.height) * 100}%`);
        glowFrame = 0;
      });
    });
  });
}

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navItems.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-45% 0px -45% 0px" }
);

sections.forEach((section) => sectionObserver.observe(section));

if (finePointer && !lowPowerDevice) {
  let pointerFrame = 0;
  let pointerX = 0;
  let pointerY = 0;

  window.addEventListener(
    "pointermove",
    (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;

      if (pointerFrame) return;

      pointerFrame = requestAnimationFrame(() => {
        cursorDot.style.left = `${pointerX}px`;
        cursorDot.style.top = `${pointerY}px`;
        cursorGlow.style.left = `${pointerX}px`;
        cursorGlow.style.top = `${pointerY}px`;
        heroBg.style.setProperty("--mx", `${(pointerX / window.innerWidth) * 100}%`);
        heroBg.style.setProperty("--my", `${(pointerY / window.innerHeight) * 100}%`);
        pointerFrame = 0;
      });
    },
    { passive: true }
  );

  document.querySelectorAll("a, button, input, textarea, [data-tilt]").forEach((element) => {
    element.addEventListener("mouseenter", () => cursorGlow.classList.add("active"));
    element.addEventListener("mouseleave", () => cursorGlow.classList.remove("active"));
  });
}

window.addEventListener("scroll", requestScrollUpdate, { passive: true });
window.addEventListener("resize", requestScrollUpdate);

initFallbackReveal();
typeLoop();
updateScrollUI();
