from google.cloud import bigquery
client = bigquery.Client(project='v3l4-493018')

q = """
WITH Base AS (
    SELECT
        CASE 
            WHEN seniority_level IN ('Executive', 'Director') THEN 'Director / VP'
            WHEN seniority_level = 'Lead' THEN 'Senior'
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
    COUNT(*) as N,
    ROUND(AVG(CASE WHEN perfil = 'Sin_IA' THEN salary_min_usd END), 0) as noAi,
    ROUND(AVG(CASE WHEN perfil = 'Con_IA' THEN salary_min_usd END), 0) as ai
FROM Base
GROUP BY level
ORDER BY 
    CASE level 
        WHEN 'Junior' THEN 1 
        WHEN 'Mid-Level' THEN 2 
        WHEN 'Senior' THEN 3 
        WHEN 'Director / VP' THEN 4 
    END
"""
for row in client.query(q).result():
    print(dict(row))
