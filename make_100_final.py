import re

html_file = "/Users/chandansheikder/.gemini/antigravity-ide/scratch/demo_chandan/index.html"
with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Inline style.css
with open('/Users/chandansheikder/.gemini/antigravity-ide/scratch/demo_chandan/style.css', 'r', encoding='utf-8') as f:
    css = f.read()
if '<style>' not in html:
    html = html.replace('<link rel="stylesheet" href="style.css" />', f'<style>{css}</style>')
html = html.replace('<link rel="preload" href="style.css" as="style">', '')

# 2. Add Preconnects for external fonts
preconnects = """<link rel="preconnect" href="https://use.typekit.net" crossorigin>
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>"""
if 'preconnect' not in html:
    html = html.replace('<head>', '<head>\n        ' + preconnects)

# 3. Add SEO tags safely
seo_block = """<title>Chandan Sheikder - Researcher in Robotics & Bioengineering</title>
        <meta charset="utf-8" />
        <meta name="description" content="Chandan Sheikder is a Graduate Research Assistant at the Beijing Institute of Technology, specializing in neuromorphic edge computing, bio-inspired robotics, and sensor fusion.">
        <meta name="viewport" content="width=1000">
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
# Find and replace the old title/meta block
old_block_pattern = r'<title>.*?</title>\s*<meta charset="utf-8" />\s*<meta name="description" content="[^"]*">\s*<meta name="viewport" content="width=1000">'
html = re.sub(old_block_pattern, seo_block, html, flags=re.DOTALL)

# 4. Color contrast
html = html.replace('color: #888;', 'color: #555;')

# 5. Fetch priority & lazy loading
if 'fetchpriority="high"' not in html:
    html = html.replace('src="assets/images/profile.webp"', 'src="assets/images/profile.webp" fetchpriority="high"')

def lazy_img(match):
    tag = match.group(0)
    if 'profile.webp' in tag: return tag
    if 'loading=' in tag: return tag
    return tag.replace('<img ', '<img loading="lazy" ')

html = re.sub(r'<img [^>]+>', lazy_img, html)

# 6. Re-add aria-labels to slider and research thumbs
def aria_adder(match):
    tag = match.group(0)
    if 'aria-label=' in tag: return tag
    alt_match = re.search(r'alt="([^"]+)"', tag)
    alt = alt_match.group(1) if alt_match else 'Link'
    return tag.replace('<a ', f'<a aria-label="{alt}" ')

html = re.sub(r'<a[^>]+href="#"[^>]*>.*?<img[^>]+>.*?</a>', aria_adder, html, flags=re.DOTALL)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html)
print("Finished comprehensive optimization.")
