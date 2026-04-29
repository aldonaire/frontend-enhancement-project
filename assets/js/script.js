function showAlert() {
  alert("Thanks — this starter is ready to extend.");
}

async function loadComponent(id, file) {
  try{
    const res = await fetch(file);
    if(!res.ok) throw new Error('Network response was not ok');
    const data = await res.text();
    const el = document.getElementById(id);
    if(el) el.innerHTML = data;
  } catch(err){
    console.error('Failed to load component', file, err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Apply saved theme early so styles render correctly
  const savedTheme = localStorage.getItem('theme');
  if(savedTheme === 'dark') document.documentElement.setAttribute('data-theme','dark');

  loadComponent("navbar", "components/navbar.html");
  loadComponent("footer", "components/footer.html");

  // Attach demo button handler
  const demo = document.getElementById('demoButton');
  if(demo) demo.addEventListener('click', showAlert);

  // Delegate: wait a tick for navbar to load, then wire toggle
  setTimeout(() => {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.getElementById('primary-navigation');
    if(toggle && nav){
      toggle.addEventListener('click', () => {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!expanded));
        if(!expanded){
          nav.style.display = 'flex';
        } else {
          nav.style.display = '';
        }
      });
    }
    // Theme toggle wiring (navbar loads dynamically)
    const themeBtn = document.getElementById('themeToggle');
    if(themeBtn){
      // Reflect current theme on the button (theme applied earlier)
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      themeBtn.setAttribute('aria-pressed', String(isDark));
      themeBtn.textContent = isDark ? '☀️' : '🌙';
      themeBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        localStorage.setItem('theme', next);
        themeBtn.setAttribute('aria-pressed', String(next === 'dark'));
        themeBtn.textContent = next === 'dark' ? '☀️' : '🌙';
      });
    }
  }, 150);

  // Apply theme function
  function applyTheme(theme){
    if(theme === 'dark'){
      document.documentElement.setAttribute('data-theme','dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }

  // Contact form handling (if present)
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const name = contactForm.name?.value?.trim();
      const email = contactForm.email?.value?.trim();
      const message = contactForm.message?.value?.trim();
      if(!name || !email || !message){
        alert('Please complete all fields.');
        return;
      }
      if(btn) btn.disabled = true;
      // Simulate submit (replace with real endpoint as needed)
      console.log('Contact form submitted', {name,email,message});
      await new Promise(r => setTimeout(r, 600));
      contactForm.innerHTML = '<div style="padding:18px"><h3>Thanks — message sent</h3><p class="text-muted">We\'ll respond to you shortly.</p></div>';
    });
  }

  // Quotes widget: try to use Vue if available, otherwise simple fetch
  const mountQuotes = async () => {
    const container = document.getElementById('quoteApp');
    if(!container) return;
    const fallbackQuotes = [
      {content: "The best way to get started is to quit talking and begin doing.", author: 'Walt Disney'},
      {content: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: 'Winston Churchill'},
      {content: "Do something today that your future self will thank you for.", author: ''},
      {content: "Push yourself, because no one else is going to do it for you.", author: ''},
      {content: "Great things never come from comfort zones.", author: ''}
    ];

    const fetchQuote = async () => {
      try{
        const res = await fetch('https://api.quotable.io/random');
        if(!res.ok) throw new Error('Quote fetch failed');
        const data = await res.json();
        if(!data || !data.content) throw new Error('Invalid quote data');
        return {content: data.content, author: data.author || ''};
      } catch(e){
        console.warn('Quotes API failed, using local fallback', e);
        // pick a random fallback quote
        return fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
      }
    };

    if(window.Vue){
      const { createApp, ref, onMounted } = Vue;
      createApp({
        setup(){
          const quote = ref('Loading quote...');
          const author = ref('');
          const load = async () => {
            const q = await fetchQuote();
            quote.value = q.content;
            author.value = q.author || '';
          };
          onMounted(load);
          return {quote,author,load};
        },
        template: `<div style="padding:16px;background:var(--card);border-radius:10px;box-shadow:var(--shadow);text-align:center">
                    <blockquote style="font-style:italic;margin:0 0 8px">{{ quote }}</blockquote>
                    <div class="text-muted">— {{ author }}</div>
                    <div style="margin-top:10px"><button @click="load" class="btn secondary">New Quote</button></div>
                  </div>`
      }).mount('#quoteApp');
    } else {
      // Fallback: simple fetch into container
      container.innerHTML = '<div style="padding:16px;background:var(--card);border-radius:10px;box-shadow:var(--shadow);text-align:center">Loading quote...</div>';
      const q = await fetchQuote();
      container.innerHTML = `<div style="padding:16px;background:var(--card);border-radius:10px;box-shadow:var(--shadow);text-align:center">
        <blockquote style="font-style:italic;margin:0 0 8px">${q.content}</blockquote>
        <div class="text-muted">— ${q.author || ''}</div>
      </div>`;
    }
  };
  mountQuotes();
});
