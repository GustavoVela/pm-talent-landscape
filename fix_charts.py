import os
import glob
import re

files = glob.glob('components/charts/*.tsx')
for file in files:
    with open(file, 'r') as f:
        content = f.read()
    
    modified = False

    # 1. Fix grid containLabel
    if 'grid: {' in content and 'containLabel' not in content:
        content = content.replace('grid: {', 'grid: {\n      containLabel: true,')
        modified = True
    elif 'grid: sharedGrid' in content:
        # For skills-industry-heatmap
        pass

    # 2. Fix Tooltip styling for Dark Mode
    # If the file has a tooltip but lacks textStyle/backgroundColor for dark mode, let's inject it if useTheme is present.
    # A lot of charts use a generic tooltip. Let's make sure it has CSS styles or textStyle.
    
    if modified:
        with open(file, 'w') as f:
            f.write(content)
        print(f"Fixed {file}")
