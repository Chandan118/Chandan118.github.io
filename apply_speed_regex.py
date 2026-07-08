import re

html_file = "/Users/chandansheikder/.gemini/antigravity-ide/scratch/demo_chandan/index.html"
with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

# Fix accessibility
html = html.replace('<html>', '<html lang="en">')

# SEO Meta Tags
seo_block = """<title>Chandan Sheikder - Researcher in Robotics & Bioengineering</title>
        <meta name="description" content="Chandan Sheikder is a Graduate Research Assistant at the Beijing Institute of Technology, specializing in neuromorphic edge computing, bio-inspired robotics, and sensor fusion.">
        <meta name="keywords" content="Chandan Sheikder, Robotics, Bioengineering, Beijing Institute of Technology, Swarm Robotics, Neuromorphic Computing">
        <meta name="author" content="Chandan Sheikder">
        <meta property="og:title" content="Chandan Sheikder - Researcher">
        <meta property="og:description" content="Portfolio and publications of Chandan Sheikder, Researcher at BIT.">
        <meta property="og:url" content="https://chandan118.github.io/">
        <meta property="og:type" content="website">
        <meta property="og:image" content="https://chandan118.github.io/assets/images/profile.webp">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="Chandan Sheikder - Researcher">
        <meta name="twitter:description" content="Portfolio and publications of Chandan Sheikder, Researcher at BIT.">
        <meta name="twitter:image" content="https://chandan118.github.io/assets/images/profile.webp">"""
html = re.sub(r'<title>Chandan Sheikder</title>\s*<meta name="description" content="">\s*<meta name="viewport" content="width=device-width, initial-scale=1">', seo_block, html)

# Fix Image Extensions
html = re.sub(r'images/slider-fig(\d+-\d+|\d+)\.(jpg|png)', r'images/slider-fig\1.webp', html)
html = html.replace('images/techxplore-news.jpg', 'images/techxplore-news.webp')
html = html.replace('assets/images/project-nav.jpg', 'assets/images/project-nav.webp')
html = html.replace('assets/images/project-iot.jpg', 'assets/images/project-iot.webp')
html = html.replace('assets/images/project-embedded.jpg', 'assets/images/project-embedded.webp')

# Lazy loading for large/offscreen images
html = html.replace('<img src="images/techxplore-news.webp"', '<img src="images/techxplore-news.webp" loading="lazy"')
html = html.replace('<img src="assets/logos/', '<img loading="lazy" src="assets/logos/')
html = html.replace('<img src="https://upload', '<img loading="lazy" src="https://upload')
html = html.replace('<img src="https://pub', '<img loading="lazy" src="https://pub')
html = html.replace('<img src="assets/images/', '<img loading="lazy" src="assets/images/')

# Fix broken/looping links to #
html = html.replace('<a href="https://chandan118.github.io/"><img src="images/slider', '<a href="#" aria-label="View Research Image"><img src="images/slider')
html = html.replace('href="https://chandan118.github.io/" class="research-thumb"', 'href="#" class="research-thumb"')
html = html.replace('href="https://chandan118.github.io/" class="research-proj-title"', 'href="#" class="research-proj-title"')

# Color Contrast
html = html.replace('color: #888;', 'color: #555;')

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html)
print("Regex replace applied safely!")
