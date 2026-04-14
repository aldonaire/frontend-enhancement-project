function initTheme() {
  const saved = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon(saved);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
  showToast(`Switched to ${next} mode`, 'success');
}

function updateThemeIcon(theme) {
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.textContent = theme === 'dark' ? '☀' : '☾';
  });
}

function toggleMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!hamburger || !mobileNav) return;
  mobileNav.classList.toggle('open');
  hamburger.textContent = mobileNav.classList.contains('open') ? '✕' : '☰';
}

function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileNav.classList.toggle('open');
    hamburger.textContent = mobileNav.classList.contains('open') ? '✕' : '☰';
  });

  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
      mobileNav.classList.remove('open');
      hamburger.textContent = '☰';
    }
  });
}

function setActiveNav() {
  const currentPath = window.location.pathname;
  const isPages = currentPath.includes('/pages/') || currentPath.includes('\\pages\\');
  const prefix = isPages ? '../' : '';
  const currentFile = currentPath.split('/').pop().split('\\').pop() || 'index.html';
  
  const navItems = [
    { name: 'Home', href: prefix + 'index.html', active: currentFile === 'index.html' || currentFile === '' },
    { name: 'About', href: prefix + 'pages/about.html', active: currentFile === 'about.html' },
    { name: 'Contact', href: prefix + 'pages/contact.html', active: currentFile === 'contact.html' }
  ];
  
  const navLinks = document.getElementById('nav-links');
  const mobileNav = document.getElementById('mobile-nav');
  
  if (navLinks) {
    navLinks.innerHTML = navItems.map(item => 
      `<li><a href="${item.href}" class="${item.active ? 'active' : ''}">${item.name}</a></li>`
    ).join('');
  }
  
  if (mobileNav) {
    mobileNav.innerHTML = navItems.map(item => 
      `<a href="${item.href}" class="${item.active ? 'active' : ''}">${item.name}</a>`
    ).join('');
  }
}

function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const icons = { success: '✓', error: '✕', info: 'ℹ' };
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span class="toast-icon">${icons[type] || icons.info}</span>${message}`;
  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

function initCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pre = btn.closest('.code-wrap')?.querySelector('pre');
      if (!pre) return;
      navigator.clipboard.writeText(pre.innerText.trim()).then(() => {
        const orig = btn.textContent;
        btn.textContent = 'copied!';
        showToast('Copied to clipboard', 'success');
        setTimeout(() => { btn.textContent = orig; }, 2000);
      });
    });
  });
}

function initAccordions() {
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      const isOpen = item.classList.contains('open');
      trigger.closest('.accordion')?.querySelectorAll('.accordion-item.open')
        .forEach(el => el.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

function openModal(id) {
  const overlay = document.getElementById(id);
  if (!overlay) return;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  const overlay = document.getElementById(id);
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function initModals() {
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal(overlay.id);
    });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(m => closeModal(m.id));
    }
  });
}

function validateField(field) {
  const value = field.value.trim();
  const errorEl = field.parentElement.querySelector('.field-error');
  let valid = true;
  let msg = '';
  if (field.hasAttribute('required') && !value) {
    valid = false; msg = 'This field is required.';
  } else if (field.type === 'email' && value) {
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(value)) { valid = false; msg = 'Please enter a valid email address.'; }
  } else if (field.dataset.minLength && value.length < parseInt(field.dataset.minLength)) {
    valid = false; msg = `Minimum ${field.dataset.minLength} characters required.`;
  }
  field.classList.toggle('error', !valid);
  if (errorEl) { errorEl.textContent = msg; errorEl.classList.toggle('show', !valid); }
  return valid;
}

function initFormValidation() {
  document.querySelectorAll('form[data-validate]').forEach(form => {
    const fields = form.querySelectorAll('input[required], textarea[required], input[type="email"]');
    fields.forEach(f => {
      f.addEventListener('blur', () => validateField(f));
      f.addEventListener('input', () => { if (f.classList.contains('error')) validateField(f); });
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let allValid = true;
      fields.forEach(f => { if (!validateField(f)) allValid = false; });
      if (allValid) {
        const btn = form.querySelector('[type="submit"]');
        const origText = btn?.textContent;
        if (btn) { btn.textContent = 'Sending…'; btn.disabled = true; }
        setTimeout(() => {
          showToast('Message sent successfully!', 'success');
          form.reset();
          fields.forEach(f => f.classList.remove('error'));
          if (btn) { btn.textContent = origText; btn.disabled = false; }
        }, 1200);
      } else {
        showToast('Please fix the errors above.', 'error');
      }
    });
  });
}

function initChecklists() {
  const items = document.querySelectorAll('.check-item');
  if (!items.length) return;
  items.forEach((item, i) => {
    if (localStorage.getItem(`check-${i}`) === '1') item.classList.add('done');
    item.addEventListener('click', () => {
      item.classList.toggle('done');
      localStorage.setItem(`check-${i}`, item.classList.contains('done') ? '1' : '0');
      updateChecklistProgress();
    });
  });
  updateChecklistProgress();
}

function updateChecklistProgress() {
  const items = document.querySelectorAll('.check-item');
  const done = document.querySelectorAll('.check-item.done').length;
  const total = items.length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const fill = document.querySelector('.progress-fill');
  const count = document.querySelector('.ccount');
  const pctEl = document.querySelector('.progress-pct');
  if (fill) fill.style.width = pct + '%';
  if (count) count.textContent = `${done} / ${total} completed`;
  if (pctEl) pctEl.textContent = pct + '%';
}

function initRubricBars() {
  const bars = document.querySelectorAll('.bar-inner[data-width]');
  if (!bars.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(bar => observer.observe(bar));
}

function initScrollAnimations() {
  const els = document.querySelectorAll('[data-animate]');
  if (!els.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-up');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => observer.observe(el));
}

function loadComponent(id, file) {
  const el = document.getElementById(id);
  if (!el) return;
  fetch(file)
    .then(res => { if (!res.ok) throw new Error('Not found'); return res.text(); })
    .then(html => { el.innerHTML = html; })
    .then(() => {
      setActiveNav();
      initMobileNav();
      initTheme();
    })
    .catch(() => {});
}

window.toggleTheme = toggleTheme;
window.toggleMobileNav = toggleMobileNav;
window.openModal = openModal;
window.closeModal = closeModal;
window.loadComponent = loadComponent;

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setActiveNav();
  initMobileNav();
  initCopyButtons();
  initAccordions();
  initModals();
  initFormValidation();
  initChecklists();
  initRubricBars();
  initScrollAnimations();
});