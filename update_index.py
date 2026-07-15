import re

file_path = 'index.html'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Change H1 tags to H2 tags
# Looking at the grep output, the 4 tags are:
# <h1>News / Experience</h1>
# <h1>Publications</h1>
# <h1>Projects</h1>
# <h1>Peer Review and Editor</h1>
content = content.replace('<h1>News / Experience</h1>', '<h2>News / Experience</h2>')
content = content.replace('<h1>Publications</h1>', '<h2>Publications</h2>')
content = content.replace('<h1>Projects</h1>', '<h2>Projects</h2>')
content = content.replace('<h1>Peer Review and Editor</h1>', '<h2>Peer Review and Editor</h2>')

# 2. Fix the TechXplore broken link
content = content.replace(
    '<a href="https://techxplore.com/news/2025-11-nature-robots-traverse-complex-environments.html">',
    '<a href="#" aria-label="Article currently unavailable">'
)

# 3. Add alt to profile image
# The tag is: <img style="height: auto;" width="800" height="800" src="assets/images/profile.webp">
content = content.replace(
    '<img style="height: auto;" width="800" height="800" src="assets/images/profile.webp">',
    '<img style="height: auto;" width="800" height="800" src="assets/images/profile.webp" alt="Chandan Sheikder Profile Photo">'
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated index.html")
