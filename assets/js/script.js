/* ═══════════════════════════════════════════════════════════════
   LUMINARY — script.js
   Handles: component loading, navbar, scroll reveal,
            counter animation, smooth scroll, mobile menu,
            active nav link, contact form
═══════════════════════════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────────────────────────
   1. COMPONENT LOADER
   Fetches navbar.html and footer.html and injects them into
   their respective containers, then bootstraps all features.
───────────────────────────────────────────────────────────── */
async function loadComponent(id, url) {
  const container = document.getElementById(id);
  if (!container) return;

  try {
    const res  = await fetch(url);
    const html = await res.text();
    container.innerHTML = html;
  } catch (err) {
    console.warn(`[Luminary] Could not load component: ${url}`, err);
  }
}

async function initComponents() {
  await Promise.all([
    loadComponent('navbar-container', 'components/navbar.html'),
    loadComponent('footer-container',  'components/footer.html'),
  ]);

  // Set footer year
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Boot all features after components are in the DOM
  initNavbar();
  initMobileMenu();
  initActiveNavLink();
  initScrollReveal();
  initCounters();
  initContactForm();
}

/* ─────────────────────────────────────────────────────────────
   2. NAVBAR — scroll state
───────────────────────────────────────────────────────────── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastY = window.scrollY;

  const onScroll = () => {
    const y = window.scrollY;

    // Add "scrolled" class after 60px
    navbar.classList.toggle('scrolled', y > 60);

    // Hide navbar on scroll down, show on scroll up
    if (y > lastY && y > 120) {
      navbar.style.transform = 'translateY(-100%)';
      navbar.style.transition = 'transform 0.4s cubic-bezier(0.4,0,0.2,1), background 0.35s, box-shadow 0.35s, backdrop-filter 0.35s';
    } else {
      navbar.style.transform = 'translateY(0)';
    }

    lastY = y;
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Run once on init
}

/* ─────────────────────────────────────────────────────────────
   3. MOBILE MENU
───────────────────────────────────────────────────────────── */
function initMobileMenu() {
  const toggle  = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (!toggle || !navMenu) return;

  const close = () => {
    toggle.classList.remove('active');
    navMenu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  toggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    toggle.classList.toggle('active', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  navMenu.querySelectorAll('.navbar__link').forEach(link => {
    link.addEventListener('click', close);
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !navMenu.contains(e.target)) close();
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

/* ─────────────────────────────────────────────────────────────
   4. ACTIVE NAV LINK — updates on scroll using IntersectionObserver
───────────────────────────────────────────────────────────── */
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.navbar__link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${id}`
          );
        });
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ─────────────────────────────────────────────────────────────
   5. SCROLL REVEAL
   Observes elements with .reveal-up / .reveal-left / .reveal-right
   and adds .in-view when they enter the viewport.
───────────────────────────────────────────────────────────── */
function initScrollReveal() {
  const revealEls = document.querySelectorAll(
    '.reveal-up, .reveal-left, .reveal-right'
  );
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target); // Animate once
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach((el) => observer.observe(el));
}

/* ─────────────────────────────────────────────────────────────
   6. COUNTER ANIMATION
   Elements with [data-target] count up from 0 when visible.
───────────────────────────────────────────────────────────── */
function initCounters() {
  const counters = document.querySelectorAll('[data-target]');
  if (!counters.length) return;

  const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

  const animateCounter = (el) => {
    const target   = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1800;
    const start    = performance.now();

    const tick = (now) => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      el.textContent = Math.round(easeOutQuart(progress) * target);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

/* ─────────────────────────────────────────────────────────────
   7. SMOOTH SCROLL for anchor links
   Accounts for the sticky navbar height.
───────────────────────────────────────────────────────────── */
function initSmoothScroll() {
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;

    e.preventDefault();

    const navbarH = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--navbar-h'),
      10
    ) || 72;

    const offsetTop = target.getBoundingClientRect().top + window.scrollY - navbarH - 20;

    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
  });
}

/* ─────────────────────────────────────────────────────────────
   8. CONTACT FORM
───────────────────────────────────────────────────────────── */
function initContactForm() {
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    const inputs = form.querySelectorAll('[required]');
    let valid = true;
    inputs.forEach((input) => {
      if (!input.value.trim()) {
        valid = false;
        input.style.borderColor = '#f87171';
        setTimeout(() => { input.style.borderColor = ''; }, 2000);
      }
    });
    if (!valid) return;

    // Simulate send (replace with real API call)
    const btn = form.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<span>Sending…</span>';
    btn.style.opacity = '0.7';

    setTimeout(() => {
      form.reset();
      btn.innerHTML = originalHTML;
      btn.disabled = false;
      btn.style.opacity = '';

      if (success) {
        success.classList.add('visible');
        setTimeout(() => success.classList.remove('visible'), 5000);
      }
    }, 1500);
  });

  // Remove red on focus
  form.querySelectorAll('input, textarea').forEach((el) => {
    el.addEventListener('focus', () => { el.style.borderColor = ''; });
  });
}

/* ─────────────────────────────────────────────────────────────
   9. CURSOR GLOW — subtle gold glow that follows the cursor
   (desktop only, disabled on touch devices)
───────────────────────────────────────────────────────────── */
function initCursorGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return; // Skip on touch

  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    pointer-events: none;
    width: 320px;
    height: 320px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: left 0.15s ease, top 0.15s ease, opacity 0.3s ease;
    z-index: 0;
    opacity: 0;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top  = `${e.clientY}px`;
    glow.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
  });
}

/* ─────────────────────────────────────────────────────────────
   10. FEATURE CARD TILT — subtle 3D tilt on hover
───────────────────────────────────────────────────────────── */
function initCardTilt() {
  const cards = document.querySelectorAll('.feature-card');
  if (!cards.length) return;
  if (window.matchMedia('(pointer: coarse)').matches) return;

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top  + rect.height / 2;
      const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -5;
      const rotateY = ((e.clientX - centerX) / (rect.width  / 2)) *  5;

      card.style.transform = `
        translateY(-6px)
        perspective(600px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
      `;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ─────────────────────────────────────────────────────────────
   11. INIT — entry point
───────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', async () => {
  // Load navbar + footer, then boot the rest
  await initComponents();

  // Features that don't depend on injected components
  initSmoothScroll();
  initCursorGlow();

  // Card tilt needs a short delay so DOM is settled
  setTimeout(initCardTilt, 200);
});