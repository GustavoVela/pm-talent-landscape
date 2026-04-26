# Agrupación y Mapeo Geográfico de Ciudades (Location Groupings)

Durante la extracción de datos desde las plataformas de empleo, los reclutadores ingresan las ubicaciones de formas muy dispares, utilizando áreas metropolitanas, delegaciones, condados o municipios periféricos. Para que el análisis de polos tecnológicos tenga validez estadística, se implementó un sistema de mapeo ("clustering") en BigQuery que consolida estas ubicaciones granulares hacia su **ciudad principal**.

A continuación, se detalla la lógica de consolidación y todas las áreas que convergen en una misma ciudad:

## Latinoamérica (Polos Tecnológicos)

**Mexico City (Ciudad de México y Área Metropolitana)**
*   Mexico City
*   CDMX
*   Huixquilucan
*   Naucalpan
*   Tlalnepantla
*   Atizapán
*   Benito Juárez
*   Coyoacán
*   Azcapotzalco
*   Cuajimalpa
*   Polanco
*   Miguel Hidalgo
*   Iztapalapa

**São Paulo (Brasil)**
*   São Paulo
*   Osasco
*   Barueri

**Bogotá (Colombia)**
*   Bogotá / Bogota
*   Chía
*   Funza
*   Candelaria

**Lima (Perú)**
*   Lima
*   San Isidro
*   Miraflores
*   La Molina
*   Surco

**Santiago (Chile)**
*   Santiago
*   Las Condes
*   Providencia
*   Vitacura
*   Huechuraba

**Monterrey (México)**
*   Monterrey
*   Apodaca
*   San Pedro
*   Santa Catarina
*   Guadalupe

**Guadalajara (México)**
*   Guadalajara
*   Zapopan
*   Tlaquepaque

**Medellín (Colombia)**
*   Medellín / Medellin
*   Envigado
*   Sabaneta
*   Rionegro

**Otras ciudades mapeadas en LatAm:**
*   Buenos Aires, Argentina
*   Brasília, Brasil
*   Rio de Janeiro, Brasil
*   Cali, Colombia
*   Belo Horizonte, Brasil
*   Querétaro, México (Incluye variaciones sin acento)
*   Curitiba, Brasil
*   Fortaleza, Brasil
*   Florianópolis, Brasil
*   Blumenau, Brasil
*   Barranquilla, Colombia
*   Cartagena, Colombia
*   Arequipa, Perú
*   Porto Alegre, Brasil

---

## Estados Unidos (Tech Hubs)

**San Francisco Bay Area**
*   San Francisco
*   Bay Area
*   San Jose
*   Palo Alto
*   Mountain View
*   Sunnyvale
*   Oakland
*   Santa Clara
*   Menlo Park
*   San Mateo
*   Cupertino
*   Redwood City

**New York**
*   New York / NYC
*   Brooklyn
*   Manhattan

**Los Angeles**
*   Los Angeles
*   Santa Monica
*   Beverly Hills
*   Irvine
*   Pasadena
*   Culver City

**Seattle**
*   Seattle
*   Bellevue
*   Redmond

**Dallas**
*   Dallas
*   Fort Worth
*   Plano
*   Irving
*   Frisco

**Miami**
*   Miami
*   Coral Gables
*   Fort Lauderdale

**Denver**
*   Denver
*   Boulder

**Boston**
*   Boston
*   Cambridge

**Washington, D.C.**
*   Washington

**Otras ciudades mapeadas en EE.UU:**
*   Austin
*   Chicago
*   Atlanta
*   Philadelphia
*   San Diego
*   Charlotte
*   Houston
