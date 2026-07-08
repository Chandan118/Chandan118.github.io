import os
from bs4 import BeautifulSoup

html_file = "/Users/chandansheikder/.gemini/antigravity-ide/scratch/demo_chandan/index.html"
with open(html_file, 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

# 1. Remove width and height from all images to fix CSS layout distortion
for img in soup.find_all('img'):
    if img.has_attr('width'):
        del img['width']
    if img.has_attr('height'):
        del img['height']

# 2. Restore normal CSS loading for font-awesome and typekit
for link in soup.find_all('link', rel='stylesheet'):
    if link.has_attr('media') and link['media'] == 'print':
        del link['media']
    if link.has_attr('onload'):
        del link['onload']

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(str(soup))
print("Restored styling!")
