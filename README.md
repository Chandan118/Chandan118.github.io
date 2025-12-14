# Personal site — Chandan Sheikder

Static, single-page profile (HTML/CSS/JS) populated with your CV, publications, patents, and links.

## Quick start
- **Edit content:** `index.html` (text, links, publications, patents, projects, experience). CV download points to `assets/cv.pdf`. Photo is `assets/profile.jpg` (also used as favicon).
- **Styling:** `styles.css` (colors and spacing via `:root` variables). Fonts loaded in `index.html`.
- **Preview locally:** `python3 -m http.server 8000` then open `http://localhost:8000`.

## Publish
- Current repo URL: `https://chandan118.github.io/Chandan_Sheikder/`.
- To serve at the root (`https://chandan118.github.io`), push the same `main` branch to a repo named `chandan118.github.io` and enable Pages (Source: `main`, Folder: `/ (root)`).
- After pushing, wait ~1–2 minutes for GitHub Pages to deploy, then hard refresh.

## Wiki
- `WIKI_PAGE.md` contains a ready-to-paste Home page for the GitHub wiki (contact, links, full pubs, patent, editorial role, projects, experience). Copy it into the repo wiki Home page to publish it.

## Files
- `index.html` — layout and content
- `styles.css` — theme and layout
- `main.js` — mobile nav toggle, footer year
- `assets/` — `cv.pdf`, `profile.jpg` (favicon), placeholders
