import os
import glob
import re

files = [
    'components/charts/job-titles-chart.tsx',
    'components/charts/market-city-chart.tsx',
    'components/charts/market-country-chart.tsx',
    'components/charts/market-employment-chart.tsx',
    'components/charts/market-industry-chart.tsx',
    'components/charts/market-seniority-chart.tsx',
    'components/charts/sample-quality-chart.tsx',
    'components/charts/sample-recency-chart.tsx',
    'components/charts/competency-sunburst-chart.tsx'
]

for file in files:
    if not os.path.exists(file):
        continue
    
    with open(file, 'r') as f:
        content = f.read()
    
    modified = False

    # Check if useTheme is imported
    if 'useTheme' not in content:
        content = content.replace("import ReactECharts", "import { useTheme } from 'next-themes';\nimport ReactECharts")
        modified = True
    
    # Check if isDark is defined
    if 'const isDark' not in content and 'const { resolvedTheme }' not in content:
        # inject it right after component declaration
        content = re.sub(r'(export function [A-Za-z]+\(\) \{)', r'\1\n  const { resolvedTheme } = useTheme();\n  const isDark = resolvedTheme === "dark";', content)
        modified = True
    
    # Update tooltip
    if 'tooltip: {' in content and 'backgroundColor: isDark' not in content:
        replacement = '''tooltip: {
      backgroundColor: isDark ? '#1f2937' : '#ffffff',
      borderColor: isDark ? '#374151' : '#e5e7eb',
      textStyle: { color: isDark ? '#f9fafb' : '#111827', fontSize: 12 },'''
        content = content.replace('tooltip: {', replacement, 1)
        modified = True
    
    if modified:
        with open(file, 'w') as f:
            f.write(content)
        print(f"Fixed {file}")
