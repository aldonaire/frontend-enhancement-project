/* ================================================================
   NEXARA STUDIO — Shared JavaScript
   ================================================================ */

'use strict';

/* ── NAVBAR: scroll effect & mobile toggle ── */
const initNavbar = () => {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-menu a');

  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('click', e => {
      if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* Active link highlighting */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === currentPath || (currentPath === 'index.html' && href === '#')) {
      link.classList.add('active');
    }
  });
};

/* ── SCROLL REVEAL ── */
const initScrollReveal = () => {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  items.forEach(item => observer.observe(item));
};

/* ── CURSOR TRAIL (subtle) ── */
const initCursorTrail = () => {
  if (window.matchMedia('(hover: none)').matches) return;

  const trail = document.createElement('div');
  trail.style.cssText = `
    position: fixed;
    width: 8px;
    height: 8px;
    background: rgba(189,106,158,0.5);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: transform 0.1s, opacity 0.3s;
    opacity: 0;
  `;
  document.body.appendChild(trail);

  let mx = 0, my = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    trail.style.left = mx + 'px';
    trail.style.top = my + 'px';
    trail.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => { trail.style.opacity = '0'; });
};

/* ── COUNTER ANIMATION ── */
const animateCounter = (el) => {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const start = performance.now();

  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 4);
    const current = Math.round(target * ease * 10) / 10;
    el.textContent = (Number.isInteger(target) ? Math.round(current) : current.toFixed(1)) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
};

const initCounters = () => {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => {
    el.dataset.target = el.textContent.replace(/[^0-9.]/g, '');
    el.dataset.suffix = el.textContent.replace(/[0-9.]/g, '').trim();
    observer.observe(el);
  });
};

/* ── CONTACT FORM ── */
const initContactForm = () => {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  const submitBtn = form.querySelector('[type="submit"]');
  const feedbackEl = document.querySelector('#form-feedback');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.querySelector('#name')?.value.trim();
    const email = form.querySelector('#email')?.value.trim();
    const message = form.querySelector('#message')?.value.trim();
    const errors = [];

    if (!name || name.length < 2) errors.push('Please enter your full name.');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Please enter a valid email address.');
    if (!message || message.length < 10) errors.push('Your message must be at least 10 characters.');

    if (errors.length) {
      showFeedback(feedbackEl, errors.join(' '), 'error');
      return;
    }

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    /* Simulate async send */
    await new Promise(r => setTimeout(r, 1400));

    showFeedback(feedbackEl, '✓ Message sent! We\'ll get back to you within 24 hours.', 'success');
    form.reset();
    submitBtn.textContent = 'Send Message';
    submitBtn.disabled = false;
  });
};

const showFeedback = (el, message, type) => {
  if (!el) return;
  el.textContent = message;
  el.className = 'form-feedback ' + type;
  el.style.display = 'block';
  setTimeout(() => {
    el.style.opacity = '0';
    setTimeout(() => { el.style.display = 'none'; el.style.opacity = '1'; }, 400);
  }, 4000);
};

/* ── PARALLAX BLOBS ── */
const initParallax = () => {
  const blobs = document.querySelectorAll('[data-parallax]');
  if (!blobs.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    blobs.forEach(blob => {
      const speed = parseFloat(blob.dataset.parallax) || 0.2;
      blob.style.transform = `translateY(${sy * speed}px)`;
    });
  }, { passive: true });
};

/* ── SMOOTH ANCHOR SCROLL ── */
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
};

/* ── TYPING EFFECT ── */
const initTyping = () => {
  const el = document.querySelector('[data-typing]');
  if (!el) return;

  const words = (el.dataset.typing || '').split(',').map(w => w.trim()).filter(Boolean);
  if (!words.length) return;

  let wordIdx = 0, charIdx = 0, deleting = false;

  const tick = () => {
    const word = words[wordIdx];
    el.textContent = deleting ? word.slice(0, charIdx--) : word.slice(0, charIdx++);

    if (!deleting && charIdx > word.length) {
      setTimeout(() => { deleting = true; tick(); }, 1800);
      return;
    }
    if (deleting && charIdx < 0) {
      deleting = false;
      wordIdx = (wordIdx + 1) % words.length;
    }

    setTimeout(tick, deleting ? 50 : 90);
  };

  tick();
};

/* ── PRELOADER ── */
const initPreloader = () => {
  const loader = document.querySelector('#preloader');
  if (!loader) return;

  window.addEventListener('load', () => {
    loader.style.opacity = '0';
    loader.style.transition = 'opacity 0.5s';
    setTimeout(() => loader.remove(), 500);
  });
};

/* ── INIT ALL ── */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initCounters();
  initContactForm();
  initParallax();
  initSmoothScroll();
  initTyping();
  initCursorTrail();
  initPreloader();
});
