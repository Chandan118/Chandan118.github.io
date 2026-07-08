import re

html_file = "/Users/chandansheikder/.gemini/antigravity-ide/scratch/demo_chandan/index.html"
with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

if '<main>' not in html:
    html = html.replace('<body id="body">\n        <div id="main">', '<body id="body">\n        <main>\n        <div id="main">')
    # If the exact spacing above fails, try a looser replace
    if '<main>' not in html:
        html = re.sub(r'<body id="body">\s*<div id="main">', '<body id="body">\n        <main>\n        <div id="main">', html)
    html = html.replace('</body>', '</main>\n    </body>')

def force_logo_width(match):
    tag = match.group(0)
    if 'slider-fig' not in tag and 'profile.webp' not in tag:
        if 'width: 100%' not in tag:
            tag = tag.replace('style="height: auto;"', 'style="height: auto; width: 100%;"')
            tag = tag.replace('style="height: auto; ', 'style="height: auto; width: 100%; ')
    return tag

html = re.sub(r'<img [^>]+>', force_logo_width, html)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html)
print("Landmark and bulletproof styling applied.")
