/* ============================================================
   DevPath Academy — script.js
   Functions: componentLoader · darkMode · navbar · faq
              scrollAnimations · pricingToggle · contactForm
   ============================================================ */

// ─── Component Loader ──────────────────────────────────────
async function loadComponents() {
  const placeholders = document.querySelectorAll('[data-component]');

  for (const el of placeholders) {
    const src = el.getAttribute('data-src');
    if (!src) continue;
    try {
      const res = await fetch(src);
      if (!res.ok) throw new Error(`Cannot load: ${src}`);
      const html = await res.text();
      el.outerHTML = html;
    } catch (err) {
      console.warn('[DevPath] Component load failed:', err.message);
    }
  }

  // Initialize after components are injected into the DOM
  initNavbar();
  setActiveNavLink();
}

// ─── Dark Mode ─────────────────────────────────────────────
function initDarkMode() {
  const saved = localStorage.getItem('devpath-theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);

  // Event delegation — button is injected by loadComponents()
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#darkToggle')) return;
    const current = document.documentElement.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('devpath-theme', next);
  });
}

// ─── Navbar ────────────────────────────────────────────────
function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (!navbar) return;

  // Scroll: add shadow class
  const onScroll = () => navbar.classList.toggle('navbar--scrolled', window.scrollY > 24);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  // Hamburger toggle
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks?.classList.toggle('open');
  });

  // Close menu when a link is clicked
  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('active');
      navLinks?.classList.remove('open');
    });
  });
}

function setActiveNavLink() {
  const path = window.location.pathname;
  document.querySelectorAll('.navbar__links a').forEach(link => {
    const href = link.getAttribute('href') || '';
    // Match current page
    if (
      (path.endsWith('index.html') || path === '/' || path.endsWith('/')) && href.includes('index.html') ||
      path.includes('about')   && href.includes('about')   ||
      path.includes('contact') && href.includes('contact')
    ) {
      link.classList.add('active');
    }
  });
}

// ─── FAQ Accordion ─────────────────────────────────────────
function initFAQ() {
  const items = document.querySelectorAll('.faq__item');

  items.forEach(item => {
    const btn = item.querySelector('.faq__question');

    btn?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all
      items.forEach(i => i.classList.remove('open'));
      // Open clicked (unless it was already open)
      if (!isOpen) item.classList.add('open');
    });

    // Keyboard accessibility
    btn?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });
}

// ─── Scroll-triggered Animations ───────────────────────────
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

// ─── Pricing Toggle (Monthly / Yearly) ─────────────────────
function initPricingToggle() {
  const toggle = document.getElementById('billingToggle');
  if (!toggle) return;

  toggle.addEventListener('change', () => {
    const yearly = toggle.checked;

    document.querySelectorAll('[data-monthly]').forEach(el => {
      el.textContent = yearly
        ? el.getAttribute('data-yearly')
        : el.getAttribute('data-monthly');
    });

    document.querySelectorAll('.price-period').forEach(el => {
      el.textContent = yearly ? '/ year' : '/ month';
    });
  });
}

// ─── Contact Form ───────────────────────────────────────────
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    const requiredFields = form.querySelectorAll('[required]');
    let valid = true;
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = '#ef4444';
        valid = false;
        field.addEventListener('input', () => (field.style.borderColor = ''), { once: true });
      }
    });
    if (!valid) return;

    // Simulate send
    const btn      = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled    = true;

    setTimeout(() => {
      btn.textContent    = 'Message sent! ✓';
      btn.style.background = '#a3e635';
      btn.style.color      = '#0d0d0f';

      setTimeout(() => {
        btn.textContent      = original;
        btn.disabled         = false;
        btn.style.background = '';
        btn.style.color      = '';
        form.reset();
      }, 3000);
    }, 1000);
  });
}

// ─── Smooth scroll for anchor links ────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 70; // navbar height
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

// ─── Boot ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();

  loadComponents().then(() => {
    initFAQ();
    initScrollAnimations();
    initPricingToggle();
    initContactForm();
    initSmoothScroll();
  });
});
