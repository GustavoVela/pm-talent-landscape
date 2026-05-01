from google.cloud import bigquery

client = bigquery.Client(project='v3l4-493018')

queries = {
    "1. GLOBAL AI PREMIUM": """
        SELECT
            CASE WHEN ARRAY_LENGTH(ai_skills_list) > 0 THEN 'Con IA' ELSE 'Sin IA' END AS perfil,
            COUNT(salary_min_usd) as N_vacantes,
            ROUND(AVG(salary_min_usd), 0) as avg_min_usd,
            ROUND(AVG(salary_max_usd), 0) as avg_max_usd
        FROM `v3l4-493018.jobs.product_management_consolidated`
        WHERE is_pm_role = true AND salary_min_usd IS NOT NULL
        GROUP BY perfil
    """,
    "2. POR MERCADO (TOP 5 CON MÁS DATOS)": """
        WITH Base AS (
            SELECT
                country,
                CASE WHEN ARRAY_LENGTH(ai_skills_list) > 0 THEN 'Con_IA' ELSE 'Sin_IA' END AS perfil,
                salary_min_usd,
                salary_max_usd
            FROM `v3l4-493018.jobs.product_management_consolidated`
            WHERE is_pm_role = true AND salary_min_usd IS NOT NULL
        )
        SELECT
            country,
            COUNT(*) as N_total,
            COUNTIF(perfil = 'Con_IA') as N_IA,
            COUNTIF(perfil = 'Sin_IA') as N_NoIA,
            ROUND(AVG(CASE WHEN perfil = 'Con_IA' THEN salary_min_usd END), 0) as ia_min_usd,
            ROUND(AVG(CASE WHEN perfil = 'Sin_IA' THEN salary_min_usd END), 0) as no_ia_min_usd,
            ROUND(AVG(CASE WHEN perfil = 'Con_IA' THEN salary_max_usd END), 0) as ia_max_usd,
            ROUND(AVG(CASE WHEN perfil = 'Sin_IA' THEN salary_max_usd END), 0) as no_ia_max_usd
        FROM Base
        GROUP BY country
        HAVING N_total > 5
        ORDER BY N_total DESC
        LIMIT 5
    """,
    "3. POR SENIORITY": """
        WITH Base AS (
            SELECT
                seniority_level,
                CASE WHEN ARRAY_LENGTH(ai_skills_list) > 0 THEN 'Con_IA' ELSE 'Sin_IA' END AS perfil,
                salary_min_usd,
                salary_max_usd
            FROM `v3l4-493018.jobs.product_management_consolidated`
            WHERE is_pm_role = true AND salary_min_usd IS NOT NULL AND seniority_level IS NOT NULL
        )
        SELECT
            seniority_level,
            COUNT(*) as N_total,
            COUNTIF(perfil = 'Con_IA') as N_IA,
            COUNTIF(perfil = 'Sin_IA') as N_NoIA,
            ROUND(AVG(CASE WHEN perfil = 'Con_IA' THEN salary_min_usd END), 0) as ia_min_usd,
            ROUND(AVG(CASE WHEN perfil = 'Sin_IA' THEN salary_min_usd END), 0) as no_ia_min_usd
        FROM Base
        GROUP BY seniority_level
        ORDER BY N_total DESC
    """
}

for title, q in queries.items():
    print(f"\n--- {title} ---")
    results = client.query(q).result()
    for row in results:
        print(dict(row))


query_industry = """
    WITH UNNESTED AS (
        SELECT 
            ind,
            CASE WHEN ARRAY_LENGTH(ai_skills_list) > 0 THEN 'Con_IA' ELSE 'Sin_IA' END AS perfil,
            salary_min_usd,
            salary_max_usd
        FROM `v3l4-493018.jobs.product_management_consolidated`,
        UNNEST(job_industries) as ind
        WHERE is_pm_role = true AND salary_min_usd IS NOT NULL
    )
    SELECT
        ind as Industry,
        COUNT(*) as N_total,
        COUNTIF(perfil = 'Con_IA') as N_IA,
        COUNTIF(perfil = 'Sin_IA') as N_NoIA,
        ROUND(AVG(CASE WHEN perfil = 'Con_IA' THEN salary_min_usd END), 0) as ia_min_usd,
        ROUND(AVG(CASE WHEN perfil = 'Sin_IA' THEN salary_min_usd END), 0) as no_ia_min_usd
    FROM UNNESTED
    GROUP BY Industry
    HAVING N_total > 20
    ORDER BY N_total DESC
"""
print("\n--- 4. POR INDUSTRIA (Top) ---")
for row in client.query(query_industry).result():
    print(dict(row))
