/* =============================================
   NEXUS — script.js
   Three.js 3D scene + UI interactions
   ============================================= */

/* ── Component loader (navbar + footer) ── */
async function loadComponent(id, file) {
  try {
    const res = await fetch(file);
    if (!res.ok) return;
    const html = await res.text();
    document.getElementById(id).innerHTML = html;
    highlightActiveNav();
  } catch (e) {
    console.warn('Component load failed:', file);
  }
}

function highlightActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.remove('active');
    const href = a.getAttribute('href') || '';
    if (
      (path.endsWith('index.html') || path === '/' || path.endsWith('/')) && href.includes('index')
    ) {
      a.classList.add('active');
    } else if (path.includes('about') && href.includes('about')) {
      a.classList.add('active');
    } else if (path.includes('contact') && href.includes('contact')) {
      a.classList.add('active');
    }
  });
}

/* ── Scroll reveal ── */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay || 0;
        setTimeout(() => el.classList.add('visible'), parseInt(delay));
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal, .feature-card').forEach(el => observer.observe(el));
}

/* ── Three.js 3D Scene ── */
function initThreeScene() {
  const canvas = document.getElementById('three-canvas');
  if (!canvas) return;

  const container = document.getElementById('canvas-container');
  const w = container.clientWidth;
  const h = container.clientHeight;

  // Renderer
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(w, h);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;

  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
  camera.position.set(0, 0.5, 4.5);

  // OrbitControls
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.minPolarAngle = Math.PI * 0.2;
  controls.maxPolarAngle = Math.PI * 0.75;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.8;

  // Lighting
  const ambient = new THREE.AmbientLight(0x8866ff, 0.6);
  scene.add(ambient);

  const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
  keyLight.position.set(4, 6, 4);
  keyLight.castShadow = true;
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0x8b5cf6, 1.8);
  fillLight.position.set(-5, 2, -3);
  scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0x60a5fa, 1.2);
  rimLight.position.set(0, -4, -4);
  scene.add(rimLight);

  const pointLight = new THREE.PointLight(0x8b5cf6, 3, 8);
  pointLight.position.set(0, 2, 2);
  scene.add(pointLight);

  // Load GLTF
  const loader = new THREE.GLTFLoader();
  let model = null;

  // Try both possible paths (root vs pages subfolder)
  const modelPaths = [
    'assets/lottie/laptop.glb',
    '../assets/lottie/laptop.glb'
  ];

  function tryLoad(index) {
    if (index >= modelPaths.length) {
      loadFallback(scene);
      return;
    }
    loader.load(
      modelPaths[index],
      (gltf) => {
        model = gltf.scene;

        // Center and scale model
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.2 / maxDim;

        model.scale.setScalar(scale);
        model.position.sub(center.multiplyScalar(scale));
        model.position.y -= 0.2;

        // Enhance materials
        model.traverse(child => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            if (child.material) {
              child.material.envMapIntensity = 1.2;
              if (child.material.metalness !== undefined) {
                child.material.metalness = Math.max(child.material.metalness, 0.4);
              }
            }
          }
        });

        scene.add(model);

        // Play animations if any
        if (gltf.animations && gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(model);
          gltf.animations.forEach(clip => mixer.clipAction(clip).play());
          animationMixers.push(mixer);
        }
      },
      undefined,
      () => tryLoad(index + 1)
    );
  }

  const animationMixers = [];
  tryLoad(0);

  // Fallback geometry if model doesn't load
  function loadFallback(scene) {
    const geo = new THREE.BoxGeometry(1.8, 1.1, 0.08, 1, 1, 1);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x1a1a2e,
      metalness: 0.8,
      roughness: 0.2
    });
    const lid = new THREE.Mesh(geo, mat);
    lid.position.y = 0.6;
    lid.rotation.x = -0.3;
    scene.add(lid);

    const baseGeo = new THREE.BoxGeometry(1.8, 0.08, 1.2);
    const base = new THREE.Mesh(baseGeo, mat);
    scene.add(base);

    console.warn('laptop.glb not found — showing fallback shape. Make sure the file is at: assets/lottie/laptop.glb');
  }

  // Floating particles
  const particleCount = 400;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 12;
  }
  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0x8b5cf6,
    size: 0.02,
    transparent: true,
    opacity: 0.45
  });
  scene.add(new THREE.Points(particleGeo, particleMat));

  // Clock for mixers
  const clock = new THREE.Clock();
  let t = 0;

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    t += delta;

    animationMixers.forEach(m => m.update(delta));
    controls.update();

    // Gentle bob
    if (model) {
      model.position.y += Math.sin(t * 0.8) * 0.0003;
    }

    pointLight.position.x = Math.sin(t * 0.6) * 2;
    pointLight.position.y = Math.cos(t * 0.4) * 1.5 + 1;

    renderer.render(scene, camera);
  }
  animate();

  // Resize handler
  window.addEventListener('resize', () => {
    const nw = container.clientWidth;
    const nh = container.clientHeight;
    camera.aspect = nw / nh;
    camera.updateProjectionMatrix();
    renderer.setSize(nw, nh);
  });

  // Pause autorotate on user interaction
  controls.addEventListener('start', () => { controls.autoRotate = false; });
  controls.addEventListener('end', () => {
    setTimeout(() => { controls.autoRotate = true; }, 2000);
  });
}

/* ── Contact form validation ── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    form.querySelectorAll('[required]').forEach(field => {
      const err = form.querySelector(`[data-for="${field.id}"]`);
      if (!field.value.trim()) {
        field.style.borderColor = 'rgba(248,113,113,0.6)';
        if (err) err.classList.add('show');
        valid = false;
      } else {
        field.style.borderColor = '';
        if (err) err.classList.remove('show');
      }
    });

    const email = form.querySelector('#email');
    if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      email.style.borderColor = 'rgba(248,113,113,0.6)';
      const err = form.querySelector('[data-for="email"]');
      if (err) { err.textContent = 'Enter a valid email address.'; err.classList.add('show'); }
      valid = false;
    }

    if (valid) {
      const success = document.getElementById('form-success');
      if (success) success.classList.add('show');
      form.reset();
      setTimeout(() => success && success.classList.remove('show'), 5000);
    }
  });

  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('input', () => {
      field.style.borderColor = '';
      const err = form.querySelector(`[data-for="${field.id}"]`);
      if (err) err.classList.remove('show');
    });
  });
}

/* ── Navbar scroll effect ── */
function initNavbarScroll() {
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    if (window.scrollY > 60) {
      navbar.style.background = 'rgba(8, 8, 16, 0.95)';
    } else {
      navbar.style.background = 'rgba(8, 8, 16, 0.7)';
    }
  });
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', async () => {
  await Promise.all([
    loadComponent('navbar-placeholder', 'components/navbar.html'),
    loadComponent('footer-placeholder', 'components/footer.html')
  ]);

  initNavbarScroll();
  initScrollReveal();
  initThreeScene();
  initContactForm();
});