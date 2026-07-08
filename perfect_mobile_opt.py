import re, os
from PIL import Image

html_file = "/Users/chandansheikder/.gemini/antigravity-ide/scratch/demo_chandan/index.html"
with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

def process_img(match):
    full_tag = match.group(0)
    src_match = re.search(r'src="([^"]+)"', full_tag)
    if not src_match: return full_tag
    src = src_match.group(1)
    if src.startswith('http'): return full_tag
    
    file_path = os.path.join('/Users/chandansheikder/.gemini/antigravity-ide/scratch/user_website', src.lstrip('/'))
    if not os.path.exists(file_path): return full_tag
    
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
        print(f"Error processing {file_path}: {e}")
        return full_tag
    
    new_tag = full_tag
    if 'width="' not in new_tag:
        new_tag = new_tag.replace('<img ', f'<img width="{w}" height="{h}" ')
    
    if 'height: 140px' in new_tag:
        new_tag = new_tag.replace('height: 140px;', 'height: 140px; width: auto;')
    else:
        if 'style="' in new_tag:
            new_tag = new_tag.replace('style="', 'style="height: auto; ')
        else:
            new_tag = new_tag.replace('<img ', '<img style="height: auto;" ')
            
    return new_tag

html = re.sub(r'<img [^>]+>', process_img, html)

preload_tags = """<head>
        <link rel="preload" href="assets/images/profile.webp" as="image">
        <link rel="preload" href="style.css" as="style">
        <link rel="preload" href="https://use.typekit.net/quv7bsd.css" as="style">
        <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" as="style">"""
html = html.replace('<head>', preload_tags)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html)
print("Regex optimization complete!")
