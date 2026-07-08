import os
import glob
from bs4 import BeautifulSoup
from PIL import Image

html_file = "/Users/chandansheikder/.gemini/antigravity-ide/scratch/demo_chandan/index.html"
with open(html_file, 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

base_dir = "/Users/chandansheikder/.gemini/antigravity-ide/scratch/user_website"

for img in soup.find_all('img'):
    src = img.get('src', '')
    
    # 1. Strip absolute URLs
    if src.startswith('https://chandan118.github.io/'):
        src = src.replace('https://chandan118.github.io/', '')
        img['src'] = src

    # 2. Resize local images
    if not src.startswith('http'):
        file_path = os.path.join(base_dir, src.lstrip('/'))
        if os.path.exists(file_path) and (file_path.endswith('.jpg') or file_path.endswith('.png') or file_path.endswith('.webp')):
            try:
                with Image.open(file_path) as im:
                    w, h = im.size
                    # Downscale if too large
                    max_dim = 800
                    if w > max_dim or h > max_dim:
                        if w > h:
                            new_w = max_dim
                            new_h = int((max_dim / w) * h)
                        else:
                            new_h = max_dim
                            new_w = int((max_dim / h) * w)
                        im = im.resize((new_w, new_h), Image.Resampling.LANCZOS)
                        im.save(file_path, quality=80)
                        w, h = new_w, new_h
                    img['width'] = str(w)
                    img['height'] = str(h)
            except Exception as e:
                pass

# Add aria-labels to slider links
for a in soup.find_all('a'):
    if not a.get('aria-label'):
        if a.find('img'):
            img = a.find('img')
            a['aria-label'] = img.get('alt', 'Link')

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(str(soup))
print("Final optimization complete!")
