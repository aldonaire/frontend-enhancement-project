/**
 * script.js — Frontend Enhancement Project
 * Features: dark mode, mobile nav, modal, form validation, scroll animations, counter
 */

// ─── DARK MODE ──────────────────────────────────────────────────────────────
(function initTheme() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();

const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle?.querySelector('.theme-icon');

function getCurrentTheme() {
  return document.documentElement.getAttribute('data-theme');
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  if (themeIcon) themeIcon.textContent = theme === 'dark' ? '☀' : '☾';
}

// Set initial icon
if (themeIcon) {
  themeIcon.textContent = getCurrentTheme() === 'dark' ? '☀' : '☾';
}

themeToggle?.addEventListener('click', () => {
  setTheme(getCurrentTheme() === 'dark' ? 'light' : 'dark');
});


// ─── MOBILE NAV ─────────────────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger?.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  navLinks.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close nav on link click
navLinks?.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});


// ─── MODAL ──────────────────────────────────────────────────────────────────
const modalOverlay = document.getElementById('modal-overlay');
const openModalBtn = document.getElementById('open-modal');
const closeModalBtn = document.getElementById('modal-close');
const cancelModalBtn = document.getElementById('modal-cancel');
const confirmModalBtn = document.getElementById('modal-confirm');

function openModal() {
  modalOverlay.removeAttribute('hidden');
  requestAnimationFrame(() => modalOverlay.classList.add('active'));
  document.body.style.overflow = 'hidden';
  closeModalBtn.focus();
}

function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
  setTimeout(() => modalOverlay.setAttribute('hidden', ''), 250);
  openModalBtn.focus();
}

openModalBtn?.addEventListener('click', openModal);
closeModalBtn?.addEventListener('click', closeModal);
cancelModalBtn?.addEventListener('click', closeModal);
confirmModalBtn?.addEventListener('click', closeModal);

// Close on backdrop click
modalOverlay?.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

// Close on ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modalOverlay.hasAttribute('hidden')) closeModal();
});

// Focus trap inside modal
modalOverlay?.addEventListener('keydown', (e) => {
  if (e.key !== 'Tab') return;
  const focusable = modalOverlay.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
    e.preventDefault();
    (e.shiftKey ? last : first).focus();
  }
});


// ─── FORM VALIDATION ────────────────────────────────────────────────────────
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

function showError(fieldId, errorId, message) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  field.classList.add('error');
  error.textContent = message;
  return false;
}

function clearError(fieldId, errorId) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  field.classList.remove('error');
  error.textContent = '';
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Real-time clearing on input
['name', 'email', 'message'].forEach(id => {
  document.getElementById(id)?.addEventListener('input', () => {
    clearError(id, `${id}-error`);
    formSuccess.textContent = '';
  });
});

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  // Clear all
  ['name', 'email', 'message'].forEach(id => clearError(id, `${id}-error`));

  if (!name) {
    showError('name', 'name-error', 'Please enter your name.');
    valid = false;
  } else if (name.length < 2) {
    showError('name', 'name-error', 'Name must be at least 2 characters.');
    valid = false;
  }

  if (!email) {
    showError('email', 'email-error', 'Please enter your email address.');
    valid = false;
  } else if (!validateEmail(email)) {
    showError('email', 'email-error', 'Please enter a valid email (e.g. you@example.com).');
    valid = false;
  }

  if (!message) {
    showError('message', 'message-error', 'Please write a message before submitting.');
    valid = false;
  } else if (message.length < 10) {
    showError('message', 'message-error', 'Message should be at least 10 characters.');
    valid = false;
  }

  if (valid) {
    const submitBtn = contactForm.querySelector('[type="submit"]');
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

    // Simulate async submit
    setTimeout(() => {
      contactForm.reset();
      formSuccess.textContent = '✓ Message sent! We\'ll get back to you soon.';
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;
    }, 1200);
  }
});


// ─── SCROLL REVEAL (cards) ───────────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.card').forEach(card => revealObserver.observe(card));


// ─── ANIMATED COUNTERS ───────────────────────────────────────────────────────
function animateCounter(el, target, duration = 1500) {
  const start = performance.now();
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      animateCounter(el, target);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-target]').forEach(el => {
  counterObserver.observe(el);
});


// ─── CTA BUTTON ─────────────────────────────────────────────────────────────
document.getElementById('cta-btn')?.addEventListener('click', () => {
  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
});


// ─── LEGACY showAlert (kept for backward compat) ─────────────────────────────
function showAlert() {
  alert('Enhanced! The old button still works.');
}
