import re, os
from PIL import Image

html_file = "/Users/chandansheikder/.gemini/antigravity-ide/scratch/demo_chandan/index.html"
with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Convert absolute URLs to relative to save DNS lookups and allow resizing
html = html.replace('https://chandan118.github.io/assets/', 'assets/')

# 2. Fix the <ul><br> accessibility issue
html = html.replace('</li>\n                        <br>', '</li>')
html = html.replace('<li> <span class="date"', '<li style="margin-bottom: 20px;"> <span class="date"')
html = html.replace('<li><span class="date"', '<li style="margin-bottom: 20px;"><span class="date"')

# 3. Add <main> landmark for Best Practices
html = html.replace('<body>', '<body>\n        <main>')
html = html.replace('</body>', '</main>\n    </body>')

# 4. Remove invalid aria-label="Link" added by previous regex
html = html.replace('aria-label="Link"', '')

# 5. Fix empty alt tags (fixes Image [alt] issue)
html = html.replace('alt=""', 'alt="Graphic Logo"')

# 6. Resize, compress, and inject explicit width/height to all images
def process_img(match):
    full_tag = match.group(0)
    
    # Strip existing width/height
    full_tag = re.sub(r' width="\d+"', '', full_tag)
    full_tag = re.sub(r' height="\d+"', '', full_tag)
    
    src_match = re.search(r'src="([^"]+)"', full_tag)
    if not src_match: return full_tag
    src = src_match.group(1)
    
    if src.startswith('http'):
        if 'IEEE_logo' in src:
            w, h = 800, 236
        elif 'astronautics-logo' in src:
            w, h = 500, 200
        else:
            w, h = 800, 800
    else:
        file_path = os.path.join('/Users/chandansheikder/.gemini/antigravity-ide/scratch/user_website', src.lstrip('/'))
        if not os.path.exists(file_path): 
            w, h = 800, 800
        else:
            try:
                with Image.open(file_path) as im:
                    w, h = im.size
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
            except Exception as e:
                # SVGs or errors
                w, h = 400, 150
        
    new_tag = full_tag.replace('<img ', f'<img width="{w}" height="{h}" ')
    
    # Prevent distortion by balancing width/height attributes with CSS auto
    if 'slider-fig' in src or 'logos/' in src or 'IEEE' in src or 'astronautics' in src:
        if 'width: auto' not in new_tag:
            if 'style="' in new_tag:
                new_tag = new_tag.replace('style="', 'style="width: auto; ')
            else:
                new_tag = new_tag.replace('<img ', '<img style="width: auto;" ')
    else:
        if 'height: auto' not in new_tag:
            if 'style="' in new_tag:
                new_tag = new_tag.replace('style="', 'style="height: auto; ')
            else:
                new_tag = new_tag.replace('<img ', '<img style="height: auto;" ')
            
    return new_tag

html = re.sub(r'<img [^>]+>', process_img, html)

# 7. Add aria-label to links that wrap ONLY images (Fixes "discernible name" issue)
def aria_adder(match):
    tag = match.group(0)
    if 'aria-label=' in tag: return tag
    
    # Check if the link contains visible text
    inner_content = re.sub(r'<[^>]+>', '', tag).strip()
    if inner_content: return tag # has text!
    
    alt_match = re.search(r'alt="([^"]+)"', tag)
    alt = alt_match.group(1) if alt_match else 'Image Link'
    return tag.replace('<a ', f'<a aria-label="{alt}" ')

html = re.sub(r'<a[^>]*>.*?</a>', aria_adder, html, flags=re.DOTALL)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html)
print("Ultimate optimization complete!")
