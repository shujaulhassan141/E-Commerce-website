import re

# Fix styles.css
print("Fixing styles.css...")
with open('css/styles.css', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix padding: 24px 24px should be 24px 64px (1.5rem 4rem)
content = content.replace("padding: 24px 24px;", "padding: 24px 64px;")

with open('css/styles.css', 'w', encoding='utf-8') as f:
    f.write(content)

# Fix responsive.css
print("Fixing responsive.css...")
with open('css/responsive.css', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace all corrupted PowerShell code with 16px (1rem default)
content = re.sub(r" param\(\) \[math\]::Round\(\[decimal\]\.Groups\[1\]\.Value \* 16, 2\)\.ToString\(\) \+ 'px' ", "16px", content)
content = re.sub(r"  param\(\) \[math\]::Round\(\[decimal\]\.Groups\[1\]\.Value \* 16, 2\)\.ToString\(\) \+ 'px'   param\(\) \[math\]::Round\(\[decimal\]\.Groups\[1\]\.Value \* 16, 2\)\.ToString\(\) \+ 'px' ", "16px", content)

# Fix specific values based on context
content = content.replace("font-size: 16px;", "font-size: 40px;")  # 2.5rem for main-title
content = content.replace("font-size: 40px;\r\n    }", "font-size: 32px;\r\n    }")  # 2rem for typewriter-text

with open('css/responsive.css', 'w', encoding='utf-8') as f:
    f.write(content)

print("Both CSS files fixed successfully!")
