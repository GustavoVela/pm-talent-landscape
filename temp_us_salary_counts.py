from google.cloud import bigquery
client = bigquery.Client(project='v3l4-493018')

q = """
WITH Base AS (
    SELECT
        CASE 
            WHEN seniority_level IN ('Executive', 'Director') THEN 'Director / VP'
            WHEN seniority_level = 'Lead' THEN 'Senior / Lead'
            WHEN seniority_level = 'Senior' THEN 'Senior / Lead'
            ELSE seniority_level 
        END as level,
        CASE WHEN ARRAY_LENGTH(ai_skills_list) > 0 THEN 'Con_IA' ELSE 'Sin_IA' END AS perfil,
        salary_min_usd
    FROM `v3l4-493018.jobs.product_management_consolidated`
    WHERE is_pm_role = true 
      AND salary_min_usd IS NOT NULL 
      AND country = 'US'
      AND seniority_level IS NOT NULL
)
SELECT
    level,
    COUNTIF(perfil = 'Sin_IA') as n_noAi,
    COUNTIF(perfil = 'Con_IA') as n_ai
FROM Base
GROUP BY level
"""
for row in client.query(q).result():
    print(dict(row))
