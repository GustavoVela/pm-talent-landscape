# Normalización de Monedas y Compensación Salarial (Currencies Grouping)

Uno de los desafíos al realizar un análisis de mercado laboral a nivel continental es la disparidad en las monedas utilizadas para ofertar la compensación salarial. Para poder realizar cruces de datos comparables y entender las brechas de compensación entre Estados Unidos y Latinoamérica, fue necesario establecer un **estándar base unificado en Dólares Estadounidenses (USD)**.

## Proceso de Conversión
Durante el pipeline de ingesta de datos en BigQuery, el modelo de Inteligencia Artificial (LLM) lee el texto original de la vacante y extrae tres valores crudos:
*   `salary_min`: Límite inferior del rango salarial publicado.
*   `salary_max`: Límite superior del rango salarial publicado.
*   `salary_currency`: La moneda en la que se expresó originalmente (ej. "MXN", "BRL").

Una vez extraídos estos valores, se ejecuta un script SQL de estandarización al construir la vista `product_management_consolidated`. Este script divide los valores crudos por tasas de cambio ("Exchange Rates") predefinidas.

## Tasas de Cambio Utilizadas
Las siguientes tasas de cambio fueron implementadas estáticamente como "snapshots" representativos del valor de mercado al momento del análisis:

| Moneda Original | Código de Divisa | Tasa de Cambio Aplicada | Lógica de Conversión en BQ |
| :--- | :---: | :--- | :--- |
| **Dólar Estadounidense** | `USD` | **1.00** | `salary_min` (Base) |
| **Peso Mexicano** | `MXN` | **17.30** | `salary_min / 17.30` |
| **Real Brasileño** | `BRL` | **5.01** | `salary_min / 5.01` |
| **Peso Colombiano** | `COP` | **3584.00** | `salary_min / 3584.0` |
| **Peso Chileno** | `CLP` | **896.00** | `salary_min / 896.0` |
| **Peso Argentino** | `ARS` | **1393.00** | `salary_min / 1393.0` |
| **Sol Peruano** | `PEN` / `SOL` | **3.45** | `salary_min / 3.45` |
| **Euro** | `EUR` | **0.86** | `salary_min / 0.86` |
| **Libra Esterlina** | `GBP` | **0.74** | `salary_min / 0.74` |

> **Nota Metodológica:** Para los roles que indicaban la moneda como "SOL" o "Soles", se centralizaron hacia el código oficial `PEN` antes de aplicar la división de 3.45. Esta normalización nos permitió crear los campos de análisis limpios `salary_min_usd` y `salary_max_usd`.
