// ============================================================
// CODE//RED — Main Script
// ============================================================

// --- Custom Cursor ---
(function initCursor() {
  const cursor = document.querySelector('.cursor');
  const ring = document.querySelector('.cursor-ring');
  if (!cursor || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  (function animRing() {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0'; ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1'; ring.style.opacity = '1';
  });
})();

// --- Navbar Scroll Effect ---
(function initNavbar() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
})();

// --- Hamburger Menu ---
(function initHamburger() {
  const btn = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!btn || !mobileNav) return;
  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });
  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !mobileNav.contains(e.target)) {
      btn.classList.remove('open');
      mobileNav.classList.remove('open');
    }
  });
})();

// --- THREE.JS Hero 3D ---
(function initThreeJS() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const W = canvas.offsetWidth, H = canvas.offsetHeight;
  const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
  camera.position.set(0, 0, 5);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Main wireframe icosahedron
  const icoGeo = new THREE.IcosahedronGeometry(1.6, 1);
  const icoEdges = new THREE.EdgesGeometry(icoGeo);
  const icoMat = new THREE.LineBasicMaterial({ color: 0xe63232, transparent: true, opacity: 0.6 });
  const ico = new THREE.LineSegments(icoEdges, icoMat);
  scene.add(ico);

  // Outer ring torus
  const torusGeo = new THREE.TorusGeometry(2.4, 0.008, 4, 80);
  const torusMat = new THREE.LineBasicMaterial({ color: 0x660000, transparent: true, opacity: 0.4 });
  const torus = new THREE.LineSegments(new THREE.EdgesGeometry(torusGeo), torusMat);
  torus.rotation.x = Math.PI / 3;
  scene.add(torus);

  // Floating particles
  const partCount = 120;
  const partGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(partCount * 3);
  for (let i = 0; i < partCount; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 14;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
  }
  partGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const partMat = new THREE.PointsMaterial({ color: 0xe63232, size: 0.025, transparent: true, opacity: 0.5 });
  const particles = new THREE.Points(partGeo, partMat);
  scene.add(particles);

  // Orbit lines (decorative grid rings)
  for (let i = 0; i < 3; i++) {
    const r = 1.0 + i * 0.6;
    const rGeo = new THREE.TorusGeometry(r, 0.005, 4, 64);
    const rMat = new THREE.LineBasicMaterial({ color: 0x330000, transparent: true, opacity: 0.3 });
    const ring = new THREE.LineSegments(new THREE.EdgesGeometry(rGeo), rMat);
    ring.rotation.x = Math.PI / 2;
    ring.userData.speed = 0.0008 + i * 0.0004;
    ring.userData.axis = new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize();
    scene.add(ring);
  }

  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  window.addEventListener('resize', () => {
    const w = canvas.offsetWidth, h = canvas.offsetHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });

  let t = 0;
  (function animate() {
    t += 0.005;
    ico.rotation.x += 0.003;
    ico.rotation.y += 0.004;
    ico.rotation.z += 0.001;
    torus.rotation.z += 0.002;
    particles.rotation.y += 0.0005;

    // Subtle mouse parallax
    ico.rotation.y += (mouseX * 0.02 - ico.rotation.y) * 0.02;
    camera.position.x += (mouseX * 0.3 - camera.position.x) * 0.02;
    camera.position.y += (-mouseY * 0.2 - camera.position.y) * 0.02;
    camera.lookAt(scene.position);

    // Breathe scale
    const s = 1 + Math.sin(t * 0.5) * 0.04;
    ico.scale.set(s, s, s);

    // Opacity pulse on particles
    partMat.opacity = 0.3 + Math.sin(t) * 0.2;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  })();
})();

// --- Scroll Reveal ---
(function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = e.target.dataset.delay || 0;
        setTimeout(() => e.target.classList.add('visible'), delay * 1000);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal, .feature-card, .step-item, .timeline-content, .bonus-card, .stat-item').forEach(el => {
    observer.observe(el);
  });
})();

// --- Staggered children delay ---
(function initStagger() {
  document.querySelectorAll('[data-stagger]').forEach(parent => {
    parent.children && Array.from(parent.children).forEach((child, i) => {
      child.dataset.delay = (i * 0.1).toFixed(1);
    });
  });
})();

// --- Animated Counters ---
(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const dur = 1800;
        const start = performance.now();
        obs.unobserve(el);

        (function tick(now) {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.floor(eased * target) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        })(start);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => obs.observe(c));
})();

// --- Rubric Bar Animations ---
(function initRubricBars() {
  const bars = document.querySelectorAll('.pts-bar-fill');
  if (!bars.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.width + '%';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(b => obs.observe(b));
})();

// --- Typewriter Effect ---
(function initTypewriter() {
  const el = document.querySelector('[data-typewriter]');
  if (!el) return;
  const words = JSON.parse(el.dataset.typewriter);
  let wi = 0, ci = 0, deleting = false;

  function type() {
    const word = words[wi];
    if (!deleting) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) { deleting = true; setTimeout(type, 1800); return; }
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
    }
    setTimeout(type, deleting ? 60 : 100);
  }
  setTimeout(type, 1200);
})();

// --- Contact Form Validation ---
(function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  function validate(input) {
    const group = input.closest('.form-group');
    if (!group) return true;
    const val = input.value.trim();
    let valid = true;

    if (input.required && !val) valid = false;
    if (input.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) valid = false;

    group.classList.toggle('error', !valid);
    group.classList.toggle('success', valid && val.length > 0);
    return valid;
  }

  form.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('blur', () => validate(input));
    input.addEventListener('input', () => {
      if (input.closest('.form-group').classList.contains('error')) validate(input);
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    let allValid = true;
    form.querySelectorAll('.form-control').forEach(input => {
      if (!validate(input)) allValid = false;
    });

    if (allValid) {
      const btn = form.querySelector('.btn-primary');
      const orig = btn.textContent;
      btn.textContent = '✓ Sent!';
      btn.style.background = '#16a34a';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
        form.querySelectorAll('.form-group').forEach(g => {
          g.classList.remove('success', 'error');
        });
      }, 3000);
    }
  });
})();

// --- Active Nav Link ---
(function initActiveNav() {
  const links = document.querySelectorAll('.nav-links a, .mobile-nav a');
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === currentPath || (currentPath === '' && href === 'index.html') ||
        (href.includes(currentPath) && currentPath !== 'index.html')) {
      link.classList.add('active');
    }
  });
})();