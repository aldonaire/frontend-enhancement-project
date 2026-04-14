# Frontend Enhancement Project (React)

This project is a frontend enhancement assignment that uses a real Git workflow:
fork -> branch -> develop -> push -> pull request.

## Project Goal

Enhance the existing website with modern UI/UX, interaction improvements, and cleaner frontend code while following proper Git branching practices.

## Tech Stack

- React + Vite
- React Router
- Framer Motion
- Lucide React icons
- CSS (responsive + light/dark theme)

## Fork and Git Workflow (Required)

Follow this exactly from `MAIN-TASK.md`:

1. **Fork the repository** on GitHub (top-right **Fork** button).
2. **Clone your fork**:
   ```bash
   git clone https://github.com/<your-username>/frontend-enhancement-project.git
   cd frontend-enhancement-project
   ```
3. **Create your feature branch**:
   ```bash
   git checkout -b feature/<lastname>-frontend-enhancement
   ```
4. **Implement at least 3 frontend improvements** (UI/UX + functionality + optimization).
5. **Commit with meaningful messages**:
   ```bash
   git add .
   git commit -m "feat: improve navbar responsiveness and mobile menu"
   ```
6. **Push your branch**:
   ```bash
   git push origin feature/<lastname>-frontend-enhancement
   ```
7. **Open a Pull Request** from your fork to the base repository:
   - base repository: `aldonaire/frontend-enhancement-project`
   - base branch: `main`
   - head repository: `<your-username>/frontend-enhancement-project`
   - compare branch: `feature/<lastname>-frontend-enhancement`

## Local Development

Install and run:

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Current Project Structure

- `index.html` - Vite HTML entry
- `src/main.jsx` - React app bootstrap with router
- `src/App.jsx` - global layout, theme handling, routes
- `src/components/Navbar.jsx` - navigation, mobile menu, theme toggle
- `src/components/Footer.jsx` - multi-column professional footer
- `src/pages/HomePage.jsx` - landing page sections, modal, testimonials carousel
- `src/pages/AboutPage.jsx` - brand story and professional about layout
- `src/pages/ContactPage.jsx` - contact info, map, and contact form
- `src/styles.css` - global styles, responsive system, section and component styles

## Deliverables Checklist

- [ ] Work done in a feature branch (not `main`)
- [ ] Pull Request created to base repository
- [ ] At least 3 meaningful frontend improvements completed
- [ ] README updated with summary of work
- [ ] UI tested on desktop and mobile view

## Notes

- Do not push directly to `main`.
- Keep commits clear and specific (avoid messages like "update file").
- Test before every push.

