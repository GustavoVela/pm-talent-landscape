import glob
import re

for file in glob.glob('components/charts/*.tsx'):
    with open(file, 'r') as f:
        content = f.read()
    
    if 'isDark' in content and 'const isDark' not in content:
        # Find the start of the component function block. It usually has 'export function Name(...) {'
        # Let's find the first opening brace of the export function
        match = re.search(r'export function [A-Za-z]+\(.*?\)\s*\{', content, re.DOTALL)
        if match:
            start_index = match.end()
            injection = '\n  const { resolvedTheme } = useTheme();\n  const isDark = resolvedTheme === "dark";'
            content = content[:start_index] + injection + content[start_index:]
            with open(file, 'w') as f:
                f.write(content)
            print(f"Fixed isDark in {file}")

