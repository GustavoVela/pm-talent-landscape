import os
import glob
import re

files = glob.glob('components/charts/*.tsx')

for file in files:
    with open(file, 'r') as f:
        content = f.read()
    
    modified = False

    # Look for grid: { and make sure it has containLabel
    # Find all grid blocks
    # A simple string replace if 'grid: {' is used
    if 'grid: {' in content and 'containLabel: true' not in content:
        content = content.replace('grid: {', 'grid: {\n      containLabel: true,')
        modified = True
    
    if modified:
        with open(file, 'w') as f:
            f.write(content)
        print(f"Fixed grid in {file}")
