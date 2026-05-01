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
        salary_min_usd,
        salary_max_usd
    FROM `v3l4-493018.jobs.product_management_consolidated`
    WHERE is_pm_role = true 
      AND salary_min_usd IS NOT NULL 
      AND salary_max_usd IS NOT NULL
      AND country = 'US'
      AND seniority_level IS NOT NULL
)
SELECT
    level,
    perfil,
    COUNT(*) as N,
    ROUND(AVG(salary_min_usd), 0) as min_usd,
    ROUND(AVG(salary_max_usd), 0) as max_usd
FROM Base
GROUP BY level, perfil
ORDER BY 
    CASE level 
        WHEN 'Junior' THEN 1 
        WHEN 'Mid-Level' THEN 2 
        WHEN 'Senior / Lead' THEN 3 
        WHEN 'Director / VP' THEN 4 
    END, perfil
"""
for row in client.query(q).result():
    print(dict(row))
