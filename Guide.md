# Student Guide — CODE//RED

> Frontend Enhancement Project · Complete Walkthrough

---

## Overview

This guide walks you through everything you need to complete the Frontend Enhancement Project — from setting up your environment to submitting your Pull Request.

---

## Prerequisites

Before you start, make sure you have:

- A **GitHub account** — [github.com](https://github.com)
- **Git installed** — [git-scm.com](https://git-scm.com)
- A code editor — **VS Code** recommended ([code.visualstudio.com](https://code.visualstudio.com))
- Basic knowledge of HTML, CSS, and JavaScript

---

## Step-by-Step Workflow

### Step 1 — Fork the Repository

1. Go to: `https://github.com/aldonaire/frontend-enhancement-project`
2. Click **Fork** in the top-right corner
3. Leave settings as default and click **Create fork**
4. You now have your own copy at: `https://github.com/YOUR_USERNAME/frontend-enhancement-project`

---

### Step 2 — Clone Your Fork

Open your terminal and run:

```bash
git clone https://github.com/YOUR_USERNAME/frontend-enhancement-project.git
cd frontend-enhancement-project
```

---

### Step 3 — Create Your Feature Branch

Replace `lastname` with your actual last name:

```bash
git checkout -b feature/lastname-frontend-enhancement
```

**Rules:**
- Branch name must follow this exact format
- Never work directly on `main`
- Only one branch per student

---

### Step 4 — Make Your Enhancements

You must implement **at least 3 improvements**. Choose from the categories below:

#### UI/UX Improvements
- Improve layout (spacing, alignment, visual hierarchy)
- Add responsive design (mobile-friendly breakpoints)
- Enhance typography and color system
- Add CSS animations or transitions

#### Functional Enhancements
- Add a new interactive component (modal, dropdown, accordion)
- Improve navigation (sticky navbar, sidebar, breadcrumbs)
- Add form validation with user feedback
- Improve loading states or feedback indicators

#### Code Optimization
- Clean and organize HTML structure
- Reduce redundant CSS/JS
- Improve code readability (comments, naming)
- Basic performance improvements

---

### Step 5 — Commit Your Changes

After each meaningful change, commit with a descriptive message:

```bash
git add .
git commit -m "feat: add responsive hamburger navbar for mobile"
```

**Commit message conventions:**

| Prefix | Use for |
|--------|---------|
| `feat:` | New feature or enhancement |
| `fix:` | Bug fix |
| `style:` | CSS/visual changes only |
| `docs:` | Documentation updates |
| `refactor:` | Code restructuring |

**Good examples:**
```
feat: improved navbar responsiveness
feat: added modal component for image preview
fix: corrected footer alignment on mobile
style: updated color variables to match brand
docs: updated README with features list
```

**Bad examples (avoid these):**
```
update file
changes
asdfgh
final version
```

---

### Step 6 — Push Your Branch

```bash
git push origin feature/lastname-frontend-enhancement
```

---

### Step 7 — Create a Pull Request

1. Go to your fork on GitHub: `https://github.com/YOUR_USERNAME/frontend-enhancement-project`
2. You'll see a banner: **"Compare & pull request"** — click it
3. Make sure the settings are:
   - **Base repository:** `aldonaire/frontend-enhancement-project`
   - **Base branch:** `main`
   - **Head repository:** `YOUR_USERNAME/frontend-enhancement-project`
   - **Compare branch:** `feature/lastname-frontend-enhancement`
4. Write a clear PR description (see template below)
5. Click **Create pull request**

**PR Description Template:**
```markdown
## Changes Made
- Added responsive navbar with hamburger menu
- Improved color contrast for accessibility
- Added hover animations on cards

## Tools Used
- HTML5, CSS3, JavaScript (vanilla)
- Google Fonts (JetBrains Mono)

## Screenshots
[Add before/after screenshots here]

## Challenges
- Had difficulty with CSS specificity for overrides
- Learned to use CSS custom properties for theming
```

---

## Documentation Requirements

Update the `README.md` in your branch (or create a separate `DOCUMENTATION.md`) with:

1. **Features Added** — List each enhancement with a brief description
2. **Tools Used** — HTML, CSS, JS libraries, fonts, etc.
3. **Challenges Encountered** — What was hard? What did you learn?

This section is worth **15 points**. Don't skip it.

---

## Grading Rubric

| Criteria | Points |
|----------|--------|
| Git Usage (branching, commits, PR) | 25 pts |
| UI/UX Improvements | 25 pts |
| Functional Enhancements | 20 pts |
| Code Quality & Organization | 15 pts |
| Documentation | 15 pts |
| **Total** | **100 pts** |

---

## Bonus Challenges (Optional)

These don't affect your base grade but demonstrate advanced skills:

- **Dark Mode Toggle** — CSS variables + localStorage
- **API Integration** — Weather API, quotes API, GitHub API
- **Framework** — Rewrite components in React or Vue

---

## Common Git Issues & Fixes

**Problem:** `fatal: remote origin already exists`
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/repo.git
```

**Problem:** Accidentally committed to main
```bash
git checkout -b feature/lastname-frontend-enhancement
git push origin feature/lastname-frontend-enhancement
```

**Problem:** Need to pull latest changes from instructor's repo
```bash
git remote add upstream https://github.com/aldonaire/frontend-enhancement-project.git
git fetch upstream
git merge upstream/main
```

---

## File Structure

```
frontend-enhancement-project/
├── assets/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── script.js
├── components/
│   ├── navbar.html
│   └── footer.html
├── docs/
│   └── student-guide.md
├── pages/
│   ├── about.html
│   └── contact.html
├── index.html
├── MAIN-TASK.md
└── README.md
```

---

## Questions?

Use the [Contact page](../pages/contact.html) or reach out directly on GitHub via an issue on the main repo.

Good luck — now go build something great. 🔴