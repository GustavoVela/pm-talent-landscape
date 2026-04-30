import re
import json
import glob
import os

def parse_markdown_grouping(filepath):
    categories = {}
    total = 0
    current_category = None
    with open(filepath, 'r') as f:
        for line in f:
            # Match headers like "### Artificial Intelligence (General) (209)"
            header_match = re.match(r'^###\s+(.+)\s+\((\d+)\)', line.strip())
            if header_match:
                name = header_match.group(1).strip()
                count = int(header_match.group(2))
                categories[name] = count
                total += count
    return categories, total

sunburst_file = '/Users/gustavovelazuniga/Desarrollo/pm-talent-landscape/components/charts/competency-sunburst-chart.tsx'
with open(sunburst_file, 'r') as f:
    content = f.read()
    
# Extract JSON
json_match = re.search(r'const treeData = ({.*?});', content, re.DOTALL)
if json_match:
    tree_data = json.loads(json_match.group(1))
else:
    print("Could not parse treeData from sunburst chart")
    exit(1)

sunburst_categories = {}
for parent in tree_data['children']:
    parent_name = parent['name'].split('\n')[0].strip()
    sunburst_categories[parent_name] = {}
    for child in parent['children']:
        sunburst_categories[parent_name][child['raw_name']] = child['value']

md_files = glob.glob('/Users/gustavovelazuniga/Desarrollo/pm-talent-landscape/data/groupings/*_skills_grouping.md')

for md_file in md_files:
    basename = os.path.basename(md_file)
    print(f"\n--- Auditing {basename} ---")
    md_cats, md_total = parse_markdown_grouping(md_file)
    
    # Map filenames to sunburst parent names
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
    
    # Compare
    missing_in_sunburst = []
    mismatch_counts = []
    
    for cat, count in md_cats.items():
        if cat not in sunburst_data:
            missing_in_sunburst.append(f"{cat} ({count})")
        elif sunburst_data[cat] != count:
            mismatch_counts.append(f"{cat}: MD has {count}, Sunburst has {sunburst_data[cat]}")
            
    extra_in_sunburst = []
    for cat, count in sunburst_data.items():
        if cat not in md_cats:
            extra_in_sunburst.append(f"{cat} ({count})")
            
    if not missing_in_sunburst and not mismatch_counts and not extra_in_sunburst:
        print("✅ PERFECT MATCH")
    else:
        if missing_in_sunburst:
            print("❌ In MD but missing in Sunburst:")
            for x in missing_in_sunburst: print(f"   - {x}")
        if extra_in_sunburst:
            print("❌ In Sunburst but missing in MD:")
            for x in extra_in_sunburst: print(f"   - {x}")
        if mismatch_counts:
            print("❌ Count Mismatches:")
            for x in mismatch_counts: print(f"   - {x}")

