# Personal site (Chandan Sheikder)

Single-page profile with content pulled from your CV. Runs on plain HTML/CSS/JS, ready for GitHub Pages.

## How to use

1) **Update content (if needed)**
   - Most details are already filled with your CV. Edit `index.html` to adjust text, links, or add more publications/projects.
   - Replace or update `assets/cv.pdf` if you have a newer version.

2) **Photo**
   - Your current photo is in `assets/profile.jpg`. Swap it with a new one if desired.

3) **Tweak the look**
   - Adjust colors and spacing in `styles.css` (see the `:root` variables at the top).
   - Fonts are loaded from Google Fonts in `index.html`; you can swap them for any other web-safe fonts.

4) **Preview locally**
   - From this folder run `python3 -m http.server 8000` and visit `http://localhost:8000` in your browser.

5) **Publish on GitHub Pages**
   - Create a repository named `your-username.github.io` on GitHub.
   - Copy these files into it, commit, and push.
   - In repo settings, enable GitHub Pages (Source: `main` branch, `/ (root)` folder). The site will be live at `https://your-username.github.io` shortly.

## Tips for good content

- Keep news items to one line each and include dates.
- For publications, add links for paper/code/project and note awards (spotlight, best paper, etc.).
- Add tags to projects (`ML`, `Systems`, `Robotics`, etc.) to help readers scan quickly.
- Include a short note for prospective students or collaborators in the Contact section.
