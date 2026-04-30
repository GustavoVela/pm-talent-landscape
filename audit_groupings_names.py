import re
import json
import glob
import os

def parse_markdown_categories(filepath):
    categories = set()
    with open(filepath, 'r') as f:
        for line in f:
            header_match = re.match(r'^##\s+(.+)', line.strip())
            if header_match:
                name = header_match.group(1).strip()
                categories.add(name)
    return categories

sunburst_file = '/Users/gustavovelazuniga/Desarrollo/pm-talent-landscape/components/charts/competency-sunburst-chart.tsx'
with open(sunburst_file, 'r') as f:
    content = f.read()
    
json_match = re.search(r'const treeData = ({.*?});', content, re.DOTALL)
if json_match:
    tree_data = json.loads(json_match.group(1))
else:
    print("Could not parse treeData from sunburst chart")
    exit(1)

sunburst_categories = {}
for parent in tree_data['children']:
    parent_name = parent['name'].split('\n')[0].strip()
    sunburst_categories[parent_name] = set()
    for child in parent['children']:
        sunburst_categories[parent_name].add(child['raw_name'])

md_files = glob.glob('/Users/gustavovelazuniga/Desarrollo/pm-talent-landscape/data/groupings/*_skills_grouping.md')

for md_file in md_files:
    basename = os.path.basename(md_file)
    print(f"\n--- Auditing {basename} ---")
    md_cats = parse_markdown_categories(md_file)
    
    if 'ai' in basename: parent_key = 'AI'
    elif 'business' in basename: parent_key = 'Business'
    elif 'core_pm' in basename: parent_key = 'Core PM'
    elif 'data' in basename: parent_key = 'Data'
    elif 'technical' in basename: parent_key = 'Technical'
    elif 'ux_ui' in basename: parent_key = 'UX/UI'
    else: continue

    if parent_key not in sunburst_categories:
        print(f"Parent {parent_key} not found in sunburst data")
        continue
        
    sunburst_data = sunburst_categories[parent_key]
    
    missing_in_sunburst = md_cats - sunburst_data
    extra_in_sunburst = sunburst_data - md_cats
            
    if not missing_in_sunburst and not extra_in_sunburst:
        print("✅ PERFECT MATCH (Categories match exactly)")
    else:
        if missing_in_sunburst:
            print("❌ In MD but missing in Sunburst:")
            for x in sorted(missing_in_sunburst): print(f"   - {x}")
        if extra_in_sunburst:
            print("❌ In Sunburst but missing in MD:")
            for x in sorted(extra_in_sunburst): print(f"   - {x}")

