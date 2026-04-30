function showAlert() {
  alert("Button clicked!");
}

// Optional: Load components (basic simulation)
document.addEventListener("DOMContentLoaded", () => {
  loadComponent("navbar", "components/navbar.html");
  loadComponent("footer", "components/footer.html");
});

function loadComponent(id, file) {
  fetch(file)
    .then(res => res.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
<<<<<<< HEAD
    });
}
=======
      if (id === "navbar") initNav();
    });
}

function initNav(){
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-menu');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('open');
  });

  // Adjust navbar links so they resolve correctly when pages are served
  // from the project root or opened from the `pages/` subfolder.
  (function adjustNavLinks(){
    const links = document.querySelectorAll('.site-nav a');
    if (!links.length) return;
    const inPagesFolder = location.pathname.split('/').includes('pages');
    links.forEach(a=>{
      const href = a.getAttribute('href');
      if (!href) return;
      // If we're in a page inside /pages/, make links point up one level when needed
      if (inPagesFolder){
        if (href === 'index.html') a.setAttribute('href','../index.html');
        else if (href.startsWith('pages/')) a.setAttribute('href','../'+href);
      } else {
        // If we're at root, ensure we don't have leading ../
        if (href.startsWith('../')) a.setAttribute('href', href.replace(/^(\.\.\/)+/, ''));
      }
    });
  })();

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({behavior:'smooth'});
    });
  });
}

/* Weather fetching and rendering using Open-Meteo (no API key required) */
function fetchWeatherByCoords(lat, lon){
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`;
  return fetch(url).then(r=>r.json());
}

function weatherCodeToIcon(code){
  // Simplified mapping based on Open-Meteo weathercode
  const map = {
    0: ['☀️','Clear'],
    1: ['🌤️','Mainly clear'],
    2: ['⛅','Partly cloudy'],
    3: ['☁️','Overcast'],
    45: ['🌫️','Fog'],
    48: ['🌫️','Depositing rime fog'],
    51: ['🌦️','Drizzle light'],
    53: ['🌦️','Drizzle moderate'],
    55: ['🌧️','Drizzle dense'],
    61: ['🌧️','Rain slight'],
    63: ['🌧️','Rain moderate'],
    65: ['🌧️','Rain heavy'],
    71: ['🌨️','Snow slight'],
    73: ['🌨️','Snow moderate'],
    75: ['🌨️','Snow heavy'],
    80: ['🌧️','Rain showers'],
    95: ['⛈️','Thunderstorm']
  };
  return map[code] || ['❓','Unknown'];
}

function renderWeather(data, lat, lon){
  const elTemp = document.getElementById('weather-temp');
  const elDesc = document.getElementById('weather-desc');
  const elIcon = document.getElementById('weather-icon');
  const elLoc = document.getElementById('weather-loc');
  // Populate main card (if present)
  if (!data || !data.current_weather) {
    if (elTemp) elTemp.textContent = '--°C';
    if (elDesc) elDesc.textContent = 'No data';
  } else {
    const cur = data.current_weather;
    const c = weatherCodeToIcon(cur.weathercode);
    if (elIcon) elIcon.textContent = c[0];
    if (elDesc) elDesc.textContent = c[1] + ` • Wind ${Math.round(cur.windspeed)} km/h`;
    if (elTemp) elTemp.textContent = Math.round(cur.temperature) + '°C';
    if (elLoc) elLoc.textContent = `Lat ${lat.toFixed(2)} · Lon ${lon.toFixed(2)}`;
  }

  // Populate navbar compact widget
  const navIcon = document.getElementById('nav-weather-icon');
  const navTemp = document.getElementById('nav-weather-temp');
  const navLoc = document.getElementById('nav-weather-loc');
  if (navIcon && navTemp && navLoc && data && data.current_weather){
    const cur = data.current_weather;
    const c = weatherCodeToIcon(cur.weathercode);
    navIcon.textContent = c[0];
    navTemp.textContent = Math.round(cur.temperature) + '°C';
    navLoc.textContent = `${lat.toFixed(1)},${lon.toFixed(1)}`;
  }
}

function initWeather(){
  const elDesc = document.getElementById('weather-desc');
  const navIcon = document.getElementById('nav-weather-icon');
  // Proceed if either the main weather card or the navbar weather widget exists
  if (!elDesc && !navIcon) return;
  // Try geolocation first
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(pos=>{
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      fetchWeatherByCoords(lat, lon).then(data=>renderWeather(data, lat, lon)).catch(()=>{
        elDesc.textContent = 'Unable to fetch weather';
      });
    }, err=>{
      // fallback to a default location (New York)
      const lat = 40.71, lon = -74.01;
      fetchWeatherByCoords(lat, lon).then(data=>renderWeather(data, lat, lon));
    }, {timeout:8000});
  } else {
    const lat = 40.71, lon = -74.01;
    fetchWeatherByCoords(lat, lon).then(data=>renderWeather(data, lat, lon));
  }
}

// Ensure weather init runs after components load
const originalLoadComponent = loadComponent;
function loadComponent(id, file){
  // Try fetching the provided path, but fall back for pages nested in subfolders
  function fetchWithFallback(path){
    return fetch(path).then(res=>{
      if (res.ok) return res.text();
      // try one level up
      return fetch('../'+path).then(r2=>{ if (r2.ok) return r2.text();
        return fetch('../../'+path).then(r3=>{ if (r3.ok) return r3.text(); throw new Error('Not found'); });
      });
    });
  }

  fetchWithFallback(file)
    .then(data => {
      document.getElementById(id).innerHTML = data;
      if (id === "navbar"){
        initNav();
        // initialize weather once navbar is present
        initWeather();
      }
      if (id === "footer") initNav();
    }).catch(err=>{
      console.warn('Failed to load component', file, err);
    });
}

/* Contact form handler (simulated) */
function initContact(){
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if (!name || !email || !message){
      alert('Please complete all fields.');
      return;
    }
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(()=>{
      form.reset();
      btn.textContent = original;
      btn.disabled = false;
      alert('Message sent (simulated). Thank you!');
    }, 900);
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  initContact();
});
>>>>>>> 7ef74c7 (feat: initial frontend enhancement project setup)
