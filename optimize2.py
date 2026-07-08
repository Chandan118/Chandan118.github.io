import os
from bs4 import BeautifulSoup
from PIL import Image

html_file = "/Users/chandansheikder/.gemini/antigravity-ide/scratch/demo_chandan/index.html"
with open(html_file, 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

# 1. Preload profile image
head = soup.find('head')
preload_img = soup.new_tag('link', rel='preload', **{'as': 'image'}, href='assets/images/profile.webp')
head.append(preload_img)

# 2. Fix render-blocking CSS
for link in soup.find_all('link', rel='stylesheet'):
    if 'font-awesome' in link.get('href', ''):
        link['media'] = 'print'
        link['onload'] = "this.media='all'"
    if 'typekit' in link.get('href', ''):
        link['media'] = 'print'
        link['onload'] = "this.media='all'"

# 3. Fix remote image src & add dimensions
for img in soup.find_all('img'):
    src = img.get('src', '')
    if src.startswith('https://chandan118.github.io/'):
        src = src.replace('https://chandan118.github.io/', '')
        img['src'] = src
        
    # Get dimensions for ALL local images
    if not src.startswith('http'):
        file_path = os.path.join("/Users/chandansheikder/.gemini/antigravity-ide/scratch/user_website", src.lstrip('/'))
        if os.path.exists(file_path):
            try:
                with Image.open(file_path) as im:
                    w, h = im.size
                    img['width'] = str(w)
                    img['height'] = str(h)
            except Exception as e:
                pass

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(str(soup))
print("Optimization complete!")
