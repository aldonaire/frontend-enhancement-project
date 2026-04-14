function loadComponent(id, file) {
  fetch(file)
    .then(res => res.text())
    .then(html => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = html;
      if (id === 'navbar') initNavbar();
    })
    .catch(() => {

      if (id === 'navbar') renderNavbar();
      if (id === 'footer') renderFooter();
    });
}

function renderNavbar() {
  const el = document.getElementById('navbar');
  if (!el) return;
  el.innerHTML = `
    <nav>
      <div class="nav-logo">FE<span>.</span>Project</div>
      <ul class="nav-links" id="navLinks">
        <li><a href="../index.html">Home</a></li>
        <li><a href="../pages/about.html">About</a></li>
        <li><a href="../pages/contact.html">Contact</a></li>
        <li><a href="#" class="nav-cta">View on GitHub ↗</a></li>
      </ul>
      <div class="nav-toggle" id="navToggle" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </div>
    </nav>
  `;
  initNavbar();
}

function renderFooter() {
  const el = document.getElementById('footer');
  if (!el) return;
  el.innerHTML = `
    <footer>
      <div class="footer-logo">FE<span>.</span>Project</div>
      <ul class="footer-links">
        <li><a href="../index.html">Home</a></li>
        <li><a href="../pages/about.html">About</a></li>
        <li><a href="../pages/contact.html">Contact</a></li>
      </ul>
      <span class="footer-copy">© 2025 Frontend Enhancement Project</span>
    </footer>
  `;
}

function initNavbar() {
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
  });

  // Close menu on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
}

// --- Toast Notification (replaces showAlert) ---
function showAlert() {
  // Remove existing toast if any
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <strong>🚀 Ready to build!</strong><br>
    <span style="color: var(--text-muted); font-size:0.85rem;">Clone the repo and start your branch.</span>
  `;
  document.body.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });

  // Auto-dismiss
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// --- Scroll: Navbar shadow ---
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (!nav) return;
  nav.style.boxShadow = window.scrollY > 20
    ? '0 8px 40px rgba(0,0,0,0.4)'
    : 'none';
});

// --- Intersection Observer: Fade-in on scroll ---
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.feature-card').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(32px)';
  el.style.transition = `opacity 0.5s ${i * 0.1}s ease, transform 0.5s ${i * 0.1}s ease`;
  observer.observe(el);
});

// --- Contact form handler (on contact page) ---
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('✅ Message sent! We\'ll get back to you soon.');
    contactForm.reset();
  });
}

function showToast(msg) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = msg;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  loadComponent('navbar', 'components/navbar.html');
  loadComponent('footer', 'components/footer.html');
});