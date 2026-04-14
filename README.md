# CODE//RED — Frontend Enhancement Project

> A real-world Git branching & frontend simulation project

![Version](https://img.shields.io/badge/version-1.0.0-e63232)
![License](https://img.shields.io/badge/license-MIT-333)
![HTML](https://img.shields.io/badge/HTML5-e63232)
![CSS](https://img.shields.io/badge/CSS3-e63232)
![JS](https://img.shields.io/badge/JavaScript-e63232)

---

## About

**CODE//RED** is a student frontend project designed to simulate real-world development workflows. Students fork this repository, create feature branches, enhance the UI/UX and functionality, and submit pull requests — exactly how professional teams work.

---

## Project Structure

```
frontend-enhancement-project/
├── assets/
│   ├── css/
│   │   └── styles.css          # Main stylesheet (black/red theme)
│   └── js/
│       └── script.js           # Cursor, 3D animation, scroll reveal, form
├── components/
│   ├── navbar.html             # Reusable navbar component
│   └── footer.html             # Reusable footer component
├── docs/
│   └── student-guide.md        # Complete step-by-step student guide
├── pages/
│   ├── about.html              # About page with timeline
│   └── contact.html            # Contact page with validated form
├── index.html                  # Main landing page (3D hero)
├── MAIN-TASK.md                # Full project instructions
└── README.md                   # This file
```

---

## Tech Stack

- **HTML5** — Semantic structure
- **CSS3** — Custom properties, animations, Grid, Flexbox
- **Vanilla JavaScript** — Cursor, scroll animations, form validation
- **Three.js (r128)** — 3D hero animation (icosahedron + particles)
- **Google Fonts** — Space Grotesk (main type) + JetBrains Mono (code/accents)

---

## Features

- 🔴 Custom red/black cyberpunk aesthetic
- 🎯 Custom cursor with ring trail
- 🌐 3D animated icosahedron + particles (Three.js)
- 📜 Scroll-triggered reveal animations
- 📱 Fully responsive (mobile hamburger menu)
- 🖥️ Interactive terminal block with blinking cursor
- ✅ Contact form with live validation
- 🔢 Animated counters on scroll
- 📊 Animated rubric progress bars
- ✍️ Typewriter effect in hero headline

---

## Getting Started

### Clone and open:
```bash
git clone https://github.com/aldonaire/frontend-enhancement-project.git
cd frontend-enhancement-project
```
Open `index.html` in your browser — no build tools required.

### Student workflow:
```bash
git checkout -b feature/lastname-frontend-enhancement
# make your changes
git add .
git commit -m "feat: your enhancement here"
git push origin feature/lastname-frontend-enhancement
# then open a Pull Request on GitHub
```

---

## Contributing (Students)

1. Fork this repo
2. Create branch: `feature/<lastname>-frontend-enhancement`
3. Make 3+ improvements
4. Commit with meaningful messages
5. Push and open a Pull Request to `aldonaire/main`

See [`docs/student-guide.md`](docs/student-guide.md) for the full walkthrough.

---

## License

MIT — feel free to use and learn from this project.

---

*Built with ❤️ and a lot of `git commit`s.*
