function showAlert() {
  alert("Button clicked!");
}

// Optional: Load components (basic simulation)
document.addEventListener("DOMContentLoaded", () => {
  const inPages = location.pathname.includes('/pages/') || location.pathname.includes('\\pages\\');
  const prefix = inPages ? '../' : '';
  loadComponent("navbar", prefix + "components/navbar.html", attachNavHandlers);
  loadComponent("footer", prefix + "components/footer.html");
});

function loadComponent(id, file, cb) {
  fetch(file)
    .then(res => res.text())
    .then(data => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = data;
      if (typeof cb === 'function') cb();
    })
    .catch(err => {
      console.error('Error loading component', file, err);
    });
}

function attachNavHandlers(){
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if(toggle && links){
    toggle.addEventListener('click', ()=>{
      links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
    });
  }
  // Set correct relative hrefs for nav/footer links (works from root and /pages/)
  const inPages = location.pathname.includes('/pages/') || location.pathname.includes('\\pages\\');
  document.querySelectorAll('[data-target]').forEach(a=>{
    const t = a.dataset.target;
    if(t === 'home') a.href = inPages ? '../index.html' : './index.html';
    if(t === 'about') a.href = inPages ? 'about.html' : 'pages/about.html';
    if(t === 'contact') a.href = inPages ? 'contact.html' : 'pages/contact.html';
  });

  // Smooth scroll for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      e.preventDefault();
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if(el) el.scrollIntoView({behavior:'smooth'});
    })
  });
}

