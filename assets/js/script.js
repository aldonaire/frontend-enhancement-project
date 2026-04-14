// Load navbar and footer dynamically
async function loadComponent(id, file) {
  try {
    const response = await fetch(file);
    const html = await response.text();
    document.getElementById(id).innerHTML = html;
  } catch (error) {
    console.error(`Error loading ${file}:`, error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadComponent('navbar-placeholder', 'navbar.html');
  loadComponent('footer-placeholder', 'footer.html');

  // Animated green dots background
  function initDots() {
    const container = document.getElementById('dotContainer');
    if (!container) return;
    const dotCount = 50;
    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      const size = Math.random() * 6 + 2;
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
      dot.style.left = `${Math.random() * 100}%`;
      dot.style.top = `${Math.random() * 100}%`;
      const duration = Math.random() * 18 + 10;
      const delay = Math.random() * 12;
      dot.style.animationDuration = `${duration}s`;
      dot.style.animationDelay = `${delay}s`;
      dot.style.opacity = Math.random() * 0.5 + 0.2;
      container.appendChild(dot);
    }
  }
  initDots();

  // Fade-up observer
  const fadeElements = document.querySelectorAll('.fade-up');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  fadeElements.forEach(el => fadeObserver.observe(el));

  // Active nav link highlighting (only on same page)
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPath.split('/').pop()) {
      link.classList.add('active');
    }
  });

  // Parallax effect on hero image
  const heroImg = document.querySelector('.hero-img');
  const heroContainer = document.querySelector('.hero-right');
  if (heroContainer && heroImg) {
    document.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX / window.innerWidth - 0.5;
      const mouseY = e.clientY / window.innerHeight - 0.5;
      const moveX = mouseX * 12;
      const moveY = mouseY * 12;
      heroImg.style.transform = `translate(${moveX * 0.3}px, ${moveY * 0.2}px)`;
      const badge = document.querySelector('.floating-badge');
      if (badge) badge.style.transform = `translate(${moveX * 0.5}px, ${moveY * 0.3}px)`;
      const circular = document.querySelector('.circular-glow');
      if (circular) circular.style.transform = `translate(calc(-50% + ${moveX * 0.2}px), calc(-50% + ${moveY * 0.2}px))`;
    });
  }

  // Smooth scroll for internal anchor links (only on index.html)
  const seeWorkBtn = document.getElementById('seeHowWeWork');
  if (seeWorkBtn) {
    seeWorkBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectsSection = document.getElementById('projects');
      if (projectsSection) projectsSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Handle contact form submission (prevent default)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you! We will get back to you soon.');
      contactForm.reset();
    });
  }
});