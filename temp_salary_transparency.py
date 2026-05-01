from google.cloud import bigquery
client = bigquery.Client(project='v3l4-493018')

q = """
WITH Base AS (
    SELECT
        CASE 
            WHEN country = 'US' THEN 'Estados Unidos'
            WHEN country IN ('MX', 'BR', 'CO', 'CL', 'PE', 'AR') THEN 'LATAM (Principales)'
            ELSE 'Otros'
        END AS region,
        COUNT(*) as total_vacantes,
        COUNTIF(salary_min_usd IS NOT NULL) as vacantes_con_salario
    FROM `v3l4-493018.jobs.product_management_consolidated`
    WHERE is_pm_role = true
    GROUP BY region
)
SELECT 
    region,
    total_vacantes,
    vacantes_con_salario,
    ROUND((vacantes_con_salario / total_vacantes) * 100, 1) as porcentaje_transparencia
FROM Base
ORDER BY total_vacantes DESC
"""
for row in client.query(q).result():
    print(dict(row))
