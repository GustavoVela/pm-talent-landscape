from google.cloud import bigquery
from collections import Counter
import json

client = bigquery.Client(project='v3l4-493018')

q = """
SELECT
    CASE 
        WHEN country = 'US' THEN 'US'
        WHEN country IN ('MX', 'BR', 'CO', 'CL', 'PE', 'AR') THEN 'LATAM'
        ELSE 'Other'
    END as region,
    technical_skills_list,
    data_skills_list,
    ai_skills_list
FROM `v3l4-493018.jobs.product_management_consolidated`
WHERE is_pm_role = true
"""

us_tech = Counter()
us_data = Counter()
latam_tech = Counter()
latam_data = Counter()

us_total = 0
latam_total = 0

for row in client.query(q).result():
    region = row.region
    tech = row.technical_skills_list or []
    data = row.data_skills_list or []
    ai = row.ai_skills_list or []
    
    if region == 'US':
        us_total += 1
        for s in tech: us_tech[s] += 1
        for s in data: us_data[s] += 1
        for s in ai: us_data[s] += 1 # we can put ai in tech/data or separate. Let's keep them separate.
    elif region == 'LATAM':
        latam_total += 1
        for s in tech: latam_tech[s] += 1
        for s in data: latam_data[s] += 1

print(f"Total US: {us_total}")
print(f"Total LATAM: {latam_total}")

print("\n--- TOP TECH SKILLS ---")
print("US:")
for k, v in us_tech.most_common(15): print(f"  {k}: {v} ({(v/us_total)*100:.1f}%)")
print("\nLATAM:")
for k, v in latam_tech.most_common(15): print(f"  {k}: {v} ({(v/latam_total)*100:.1f}%)")

print("\n--- TOP DATA SKILLS ---")
print("US:")
for k, v in us_data.most_common(15): print(f"  {k}: {v} ({(v/us_total)*100:.1f}%)")
print("\nLATAM:")
for k, v in latam_data.most_common(15): print(f"  {k}: {v} ({(v/latam_total)*100:.1f}%)")

