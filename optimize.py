import os
import glob
from bs4 import BeautifulSoup
from PIL import Image

# Install dependencies if missing
os.system("pip install beautifulsoup4 Pillow")

html_file = "/Users/chandansheikder/.gemini/antigravity-ide/scratch/demo_chandan/index.html"
with open(html_file, 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

# 1. Add lang to html
html_tag = soup.find('html')
if html_tag:
    html_tag['lang'] = 'en'

# 2. Optimize images
for img in soup.find_all('img'):
    src = img.get('src')
    if not src: continue
    
    # Check if local file
    if src.startswith('http'):
        pass
    else:
        file_path = os.path.join("/Users/chandansheikder/.gemini/antigravity-ide/scratch/demo_chandan", src)
        if os.path.exists(file_path):
            try:
                # Convert to webp if it's large (like slider images)
                if file_path.endswith('.jpg') or file_path.endswith('.png'):
                    new_src = src.rsplit('.', 1)[0] + '.webp'
                    new_path = file_path.rsplit('.', 1)[0] + '.webp'
                    with Image.open(file_path) as im:
                        im.save(new_path, 'webp', quality=80)
                    img['src'] = new_src
                    src = new_src
                    file_path = new_path
                    
                with Image.open(file_path) as im:
                    w, h = im.size
                    if not img.get('width'):
                        img['width'] = str(w)
                    if not img.get('height'):
                        img['height'] = str(h)
            except Exception as e:
                print(f"Error processing {file_path}: {e}")

    # Add lazy loading for all but top images
    if 'profile' not in src and 'slider' not in src:
        img['loading'] = 'lazy'
        
    # Add generic alt text if empty
    if not img.get('alt'):
        img['alt'] = src.split('/')[-1].split('.')[0].replace('-', ' ').title() + " Logo or Preview"

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(str(soup))
print("Optimization complete!")
