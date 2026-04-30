# Centralización y Mapeo de Roles de Producto (Job Groupings)

Durante el proceso de extracción de vacantes, nos enfrentamos a una gran variabilidad en los nombres de los cargos (`job_titles`) utilizados por las empresas en LinkedIn. Para poder realizar un análisis estadístico coherente y comparar responsabilidades, agrupamos más de 20 títulos dispares en categorías estandarizadas.

A continuación, se detalla el diccionario de mapeo utilizado para centralizar la nomenclatura, junto con una breve descripción de la naturaleza de cada rol consolidado.

## 1. Product Manager
El rol central y orquestador del ciclo de vida del producto. Esta es la categoría más amplia, ya que absorbe tanto las variaciones de *seniority* (antigüedad) como las especializaciones técnicas que, en su núcleo, siguen requiriendo el mismo abanico de habilidades de gestión de producto.
*   **Roles Crudos Mapeados a esta categoría:**
    *   `Product Manager`
    *   `Junior Product Manager`
    *   `Intern Product Manager`
    *   `Senior Product Manager`
    *   `Principal Product Manager`
    *   `Group Product Manager`
    *   `Technical Product Manager`
    *   `Senior Technical Product Manager`
    *   `AI Product Manager`
    *   `Data Product Manager`
    *   `Platform Product Manager`

## 2. Product Owner
Rol tradicionalmente originado en los marcos de trabajo ágiles (Scrum). Se enfoca más en la ejecución táctica, la gestión del *backlog* y el enlace directo con el equipo de desarrollo, a diferencia del enfoque estratégico comercial del Product Manager.
*   **Roles Crudos Mapeados a esta categoría:**
    *   `Product Owner`
    *   `Senior Product Owner`

## 3. Product Designer
El especialista encargado de la experiencia de usuario (UX) y el diseño de interfaces (UI). Aunque colabora estrechamente con el PM, su enfoque principal es la usabilidad, la arquitectura de la información y la respuesta emocional del usuario frente al software.
*   **Roles Crudos Mapeados a esta categoría:**
    *   `Product Designer`
    *   `Senior Product Designer`

## 4. Product Marketing Manager (PMM)
El puente entre el producto y el mercado. Este rol se especializa en la estrategia de salida al mercado (Go-To-Market), el posicionamiento, la comunicación del valor del producto a los clientes y el análisis competitivo.
*   **Roles Crudos Mapeados a esta categoría:**
    *   `Product Marketing Manager`
    *   `Senior Product Marketing Manager`

## 5. Product Operations Manager (Product Ops)
Un rol emergente encargado de optimizar el ecosistema del equipo de producto. Facilitan la infraestructura de datos, estandarizan herramientas, gestionan el *feedback* cualitativo de los clientes a escala y liberan a los PMs de tareas operativas para que puedan enfocarse en la estrategia.
*   **Roles Crudos Mapeados a esta categoría:**
    *   `Product Operations Manager`
    *   `Product Operations Lead`

## 6. Liderazgo y Dirección Ejecutiva
Estos roles representan la escala de liderazgo dentro de la jerarquía de producto. Su enfoque pasa de gestionar funcionalidades individuales a gestionar portafolios enteros de productos, liderar equipos de PMs y definir la visión estratégica a nivel compañía.

*   **Product Lead:** El primer paso en el liderazgo, a menudo gestionando un área clave o a un grupo pequeño de PMs mientras sigue teniendo contribuciones individuales.
    *   *Mapeo:* `Product Lead` -> `Product Lead`
*   **Head of Product:** Líder general de la disciplina de producto, responsable de la visión global y la cultura del equipo, típicamente en empresas en etapa de crecimiento o startups grandes.
    *   *Mapeo:* `Head of Product` -> `Head of Product`
*   **Director of Product:** Rol ejecutivo de nivel medio-alto en empresas maduras o *Enterprise*, encargado de alinear la estrategia de producto con los grandes objetivos de negocio (P&L).
    *   *Mapeo:* `Director of Product` -> `Director of Product`
*   **Vice President of Product (VP):** Ejecutivo responsable de establecer la dirección a largo plazo del departamento de producto y de su impacto directo en el mercado.
    *   *Mapeo:* `Vice President of Product` -> `Vice President of Product`
*   **Chief Product Officer (CPO):** La máxima autoridad de producto. Pertenece al *C-Suite* y rinde cuentas directamente al CEO. Define hacia dónde pivotará la compañía a nivel de oferta de valor.
    *   *Mapeo:* `Chief Product Officer` -> `Chief Product Officer`
