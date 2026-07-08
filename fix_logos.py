import re

html_file = "/Users/chandansheikder/.gemini/antigravity-ide/scratch/demo_chandan/index.html"
with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

def fix_img(match):
    tag = match.group(0)
    src_match = re.search(r'src="([^"]+)"', tag)
    if not src_match: return tag
    src = src_match.group(1)
    
    # If it's a slider image, we WANT width: auto
    if 'slider-fig' in src:
        return tag
        
    # If it's anything else (logos, thumbnails), we want height: auto, NOT width: auto
    tag = tag.replace('style="width: auto;', 'style="height: auto;')
    tag = tag.replace('width: auto;', '') # catch any remainders
    
    # ensure it has height: auto
    if 'height: auto' not in tag:
        if 'style="' in tag:
            tag = tag.replace('style="', 'style="height: auto; ')
        else:
            tag = tag.replace('<img ', '<img style="height: auto;" ')
            
    return tag

html = re.sub(r'<img [^>]+>', fix_img, html)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html)
print("Logo sizes fixed!")
