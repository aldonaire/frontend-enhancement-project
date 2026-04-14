# Project Title

Frontend Enhancement Using Git Branching

## Project Overview

Students will collaborate using Git by creating their own branches from a central repository. Each student will enhance the frontend of an existing website by adding new features, improving UI/UX, or optimizing design.

This project simulates real-world development workflows using version control.

## Learning Objectives

By the end of this project, students will be able to:

Use Git branching effectively
Apply frontend development skills (HTML, CSS, JavaScript)
Improve UI/UX design of an existing system
Perform pull requests and basic code reviews
Resolve merge conflicts (basic level)

### Project Requirements

#### Step 1: Fork the Repository 

1. Go to your repo on GitHub
2. Click Fork (top-right)
3. This creates:

_theirusername/frontend-enhancement-project_

#### Step 2: Clone Their Fork

_git clone https://github.com/theirusername/frontend-enhancement-project.git
cd frontend-enhancement-project_

#### Step 3: Create a Branch

_git checkout -b feature/<lastname>-frontend-enhancement_

#### Step 4: Enhancements
##### Students must implement at least 3 improvements:

###### UI/UX Improvements (choose any)
 
Improve layout (spacing, alignment)
Add responsive design (mobile-friendly)
Enhance typography and colors
Add animations or transitions

###### Functional Enhancements

Add a new interactive component (e.g., modal, dropdown)
Improve navigation (navbar, sidebar)
Add form validation
Improve loading or feedback indicators

###### Optimization

Clean and organize code
Reduce redundant CSS/JS
Improve performance (basic)

#### Step 5: Commit Changes Properly

Students must follow proper commit messages:

_git add .
git commit -m "feat: improved navbar responsiveness"_

#### Step 6: Push Branch

_git push origin feature/'branch-name'_

#### Step 7: Create Pull Request

1. Go to their fork on GitHub
2. Click “Compare & pull request”
3. Make sure:

_base repository: aldonaire/frontend-enhancement-project
base branch: main

head repository: theirusername/frontend-enhancement-project
compare: feature/<branch-name>_

### Deliverables

Each student must submit:
#### GitHub Branch
#### Pull Request
#### Short Documentation (README update or separate file):

Features added
Tools used
Challenges encountered

### Grading Rubric (100 pts)
Criteria Points
Git Usage (branching, commits, PR) 25 pts
UI/UX Improvements 25 pts
Functionality Enhancements 20 pts
Code Quality & Organization 15 pts
Documentation 15 pts

### Rules & Guidelines
Do NOT push directly to main
Work only on your assigned branch
Keep commits meaningful (no "update file")
Avoid breaking existing functionality
Test before pushing

#### Bonus Challenges (Optional)
Dark mode toggle
API integration (e.g., weather, quotes)
Use a frontend framework (React, Vue – optional advanced)
