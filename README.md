# Frontend Enhancement Project — Documentation

**Student:** Jeremiah  
**Branch:** `feature/jeremiah-enhancement`  
**Repository:** [aldonaire/frontend-enhancement-project](https://github.com/aldonaire/frontend-enhancement-project)

---

## Tools Used

| Tool | Purpose |
|------|---------|
| **Visual Studio Code** | Code editor for writing and replacing project files |
| **GitHub Desktop** | GUI for managing the repository and publishing the branch |
| **Git (Git Bash)** | Command-line tool for creating branches, committing, and pushing changes |

---

## Improvements Made

### 1. UI/UX Enhancements
- Added a full hero section with headline, subtext, badge label, and call-to-action buttons
- Replaced the basic `alert()` popup with a smooth toast notification
- Added hover animations and gradient reveal effects on feature cards

### 2. Responsive Design
- Hero section stacks vertically on mobile screens
- Feature cards grid collapses from 4 columns to 1 column on small screens
- Buttons go full-width on mobile
- Hamburger menu appears on screens below 768px

### 3. New Components
- Floating visual cards in the hero section with CSS animations
- Morphing blob background effect
- CTA (Call to Action) section
- Fully styled contact form with focus states
- Consistent navbar and footer across all pages

### 4. Better Styling
- Dark theme using CSS custom properties (`--bg`, `--accent`, `--surface`, etc.)
- `Syne` display font paired with `DM Sans` body font
- Scroll-triggered fade-in animations on feature cards
- Navbar shadow effect on scroll
- Cohesive color palette with lime accent (`#c8f542`) and purple (`#7b61ff`)

---

## Challenges Encountered

### ❌ Git Not Recognized in PowerShell
**Error:**
```
git : The term 'git' is not recognized as the name of a cmdlet, function,
script file, or operable program.
```
**Solution:** Git was not installed on the machine. Downloaded and installed Git from [git-scm.com](https://git-scm.com/download/win), then used **Git Bash** instead of PowerShell.

---

### ❌ Permission Denied (403) When Pushing
**Error:**
```
remote: Permission to aldonaire/frontend-enhancement-project.git denied to ItsmeEremiyaaaa.
fatal: unable to access 'https://github.com/aldonaire/frontend-enhancement-project.git/': 
The requested URL returned error: 403
```
**Cause:** The GitHub account `ItsmeEremiyaaaa` was not added as a collaborator to the repository. Authentication was also attempted in an **Incognito browser window**, which prevented credentials from saving properly.

**Solution:** 
- Switched from Incognito to a normal browser window for GitHub authentication
- Used **GitHub Desktop → Publish Branch** as an alternative to the terminal push command
- Requested collaborator access from the repository owner (aldonaire)

---

## How to Run the Project

1. Clone the repository:
```bash
git clone https://github.com/aldonaire/frontend-enhancement-project.git
```
2. Open the project folder in VS Code
3. Open `index.html` in your browser (or use Live Server extension)

---
