# Filippo Vicentini — AI/ML Portfolio

Personal portfolio focused on applied Artificial Intelligence and Machine Learning, with projects in Computer Vision, predictive modeling, Generative AI, data analysis, and industrial applications.

The website is intentionally built as a **static site** using HTML, CSS, and JavaScript only. It does not depend on OpenAI Sites, Node.js, npm, a database, or a backend.

## Project structure

```text
portfolio/
├── index.html
├── styles.css
├── script.js
├── filippo.jpg
├── cv-filippo-vicentini.pdf
├── favicon.svg
│
├── projects/
│   ├── industrial-processing-times.html
│   ├── yolo-technical-drawings.html
│   ├── rain-prediction.html
│   ├── amazon-sales.html
│   ├── robotics-anomaly-detection.html
│   └── single-vs-parallel-random-walk.html
│
└── images/
    ├── processing-times/
    ├── rain/
    ├── random-walk/
    └── yolo/
```

## Run locally

From the project folder, start a local Python web server.

### macOS / Linux

```bash
python3 -m http.server 5500
```

### Windows

```powershell
py -m http.server 5500
```

Then open:

```text
http://localhost:5500
```

Stop the server with:

```text
Ctrl + C
```

## Git repository

Remote repository:

```text
git@github.com:filippovicentini/portfolio.git
```

Main branch:

```text
main
```

Check the current repository status:

```bash
git status
```

Check the configured remote:

```bash
git remote -v
```

View recent commits:

```bash
git log --oneline --decorate -10
```

## Standard workflow for portfolio updates

After editing files in VS Code, first test the site locally.

Then check which files changed:

```bash
git status
```

Review the changes if needed:

```bash
git diff
```

Stage all changes:

```bash
git add .
```

Create a commit with a meaningful message:

```bash
git commit -m "Update portfolio"
```

Push the commit to GitHub:

```bash
git push
```

The usual workflow is therefore:

```text
Edit in VS Code
      ↓
Test on localhost
      ↓
git status
      ↓
git add .
      ↓
git commit -m "Description of the change"
      ↓
git push
      ↓
GitHub updated
```

## Example commit messages

Use short messages that describe what changed.

```bash
git commit -m "Add new machine learning project"
git commit -m "Update experience section"
git commit -m "Improve mobile navigation"
git commit -m "Update CV"
git commit -m "Add project visualizations"
git commit -m "Refine portfolio styling"
```

## Updating only the CV

Replace:

```text
cv-filippo-vicentini.pdf
```

with the new PDF while keeping the same filename.

Then:

```bash
git add cv-filippo-vicentini.pdf
git commit -m "Update CV"
git push
```

## Updating the profile photo

Replace:

```text
filippo.jpg
```

while keeping the same filename.

Then:

```bash
git add filippo.jpg
git commit -m "Update profile photo"
git push
```

## Adding a new project

A typical new project requires:

1. Add a new HTML page inside `projects/`.
2. Add images inside an appropriate folder under `images/`.
3. Add the project card to `index.html`.
4. Update Previous / Next project navigation if needed.
5. Test desktop and mobile layouts locally.
6. Commit and push the changes.

Example:

```bash
git status
git add .
git commit -m "Add new project case study"
git push
```

## If GitHub has newer changes

Before starting work on another computer, synchronize the local repository:

```bash
git pull
```

A safe workflow when switching computers is:

```bash
git pull
# edit files
git status
git add .
git commit -m "Description of the change"
git push
```

## Useful Git commands

Show changed files:

```bash
git status
```

Show unstaged changes:

```bash
git diff
```

Show staged changes:

```bash
git diff --staged
```

Show commit history:

```bash
git log --oneline --decorate --graph
```

Undo changes to a file that have not been committed:

```bash
git restore path/to/file
```

Remove a file from the staging area without deleting it:

```bash
git restore --staged path/to/file
```

## Important notes

- Never commit passwords, API keys, private SSH keys, tokens, or confidential company data.
- The private SSH key stored at `~/.ssh/id_ed25519` must never be added to this repository or shared.
- Company-related technical drawings shown in the YOLO case study are anonymized.
- Keep the project structure stable unless the corresponding HTML paths are updated.
- Test the site through `localhost` rather than opening `index.html` directly with `file://`.

## Current website features

- Responsive portfolio layout
- Featured project case studies
- Project detail pages
- Mobile navigation
- Command palette (`Ctrl + K` / `Cmd + K`)
- Cursor glow on featured projects
- Scroll reveal micro-animations
- Continuous "What I Build" marquee
- Scroll progress indicator
- Minimal contact section
- Static HTML/CSS/JavaScript architecture

## Deployment

The GitHub repository is the source of truth for the portfolio.

The hosting provider and custom domain will be configured separately. Once continuous deployment is connected to this repository, future updates will follow this workflow:

```text
VS Code → Git commit → GitHub push → automatic website deployment
```

---

© Filippo Vicentini
