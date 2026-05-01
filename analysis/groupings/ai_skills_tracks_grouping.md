# Clasificación de Skills de IA para Product Managers

Este documento define la **taxonomía canónica de skills de IA** utilizada en el dashboard de PM Talent Landscape, en particular para la gráfica *"¿Qué skills de IA deberías aprender y dominar?"* de la Sección 05.

Los skills se extraen del campo `ai_skills_list` (array) de la tabla `product_management_consolidated` en BigQuery. Dado que LinkedIn permite texto libre en los requisitos de vacante, el mismo concepto aparece con **múltiples etiquetas distintas en español e inglés**. Este documento documenta la normalización aplicada.

**Total de menciones analizadas (PM roles con IA):** ~1,518 menciones únicas normalizadas

---

## 🗺️ Estructura de las 5 Rutas de Aprendizaje

Las 5 rutas están ordenadas de forma que representan una **progresión pedagógica sugerida** para un PM que quiere desarrollar su perfil de IA:

| Ruta | Color (Tema) | Total Menciones |
|------|-------------|----------------|
| ① Comprende la base conceptual | `#0ea5e9` Sky Blue | N=655 |
| ② Domina los modelos de lenguaje | `#91cc75` Green | N=320 |
| ③ Automatiza tu productividad | `#fac858` Yellow | N=284 |
| ④ Diseña sistemas agénticos | `#ee6666` Coral Red | N=198 |
| ⑤ Lidera con responsabilidad | `#73c0de` Light Blue | N=61 |

---

## 1. ① Comprende la base conceptual (N=655)

Fundamentos conceptuales de IA que todo PM debe entender antes de aplicar herramientas. No requieren saber programar, sino comprender **cómo piensan los modelos**, qué pueden generar y cuáles son sus límites.

*   **Etiquetas canónicas y sus sinónimos crudos del dataset:**

    *   `Machine Learning` (N=286)
        *   `Machine Learning` (N=195) ← etiqueta directa
        *   `AI/ML` (N=44)
        *   `AI/ML concepts` (N=17)
        *   `ML` (N=9)
        *   `Predictive Analytics` (N=6)
        *   `AI/ML Concepts` (N=2)
        *   `ML models` (N=2)
        *   `Data Science Models` (N=1)
        *   `ML lifecycle` (N=1)
        *   `AI/ML features` (N=1)
        *   `AI/ML tooling` (N=1)
        *   `Predictive Models` (N=1)
        *   `AI/Machine Learning solutions` (N=1)
        *   `Modelos predictivos` (N=1)
        *   `AI/ML platforms` (N=1)
        *   `AI/ML Infrastructure` (N=1)
        *   `AI/ML Workloads` (N=1)
        *   `Machine learning` (N=1)
        *   `Machine learning lifecycle` (N=1)
        *   `Model Lifecycle` (N=1)
        *   `AI/ML pipeline infrastructure` (N=1)
        *   `AI/ML tools` (N=1)
        *   `AI/ML Products` (N=1)
        *   `Machine Learning Models` (N=1)

    *   `IA (General)` (N=212)
        *   `AI` (N=162) ← etiqueta directa más frecuente
        *   `Artificial Intelligence` (N=35)
        *   `AI features` (N=2)
        *   `AI technologies` (N=2)
        *   `AI Native` (N=1)
        *   `IA para produto` (N=1) ← en portugués (Brasil)
        *   `Inteligencia Artificial` (N=1) ← en español
        *   `AI-Native` (N=1)
        *   `AI-first mindset` (N=1)
        *   `Inteligencia artificial` (N=1)
        *   `AI functionality` (N=1)
        *   `AI concepts` (N=1)
        *   `AI Trends` (N=1)
        *   `AI Capabilities` (N=1)
        *   `AI Technologies` (N=1)

    *   `NLP` (N=22) — Procesamiento de Lenguaje Natural
        *   `NLP` (N=20) ← etiqueta directa
        *   `AI/NLU` (N=1)
        *   `NLP/NLU` (N=1)

    *   `Computer Vision` (N=11)
        *   `Computer Vision` (N=11) ← sin sinónimos relevantes

    *   `Generative AI` (N=124) ← **movida a Fundamentos** (es un concepto base, no solo un stack técnico)
        *   `Generative AI` (N=107) ← etiqueta directa
        *   `GenAI` (N=16)
        *   `Generative Artificial Intelligence` (N=1)

---

## 2. ② Domina los modelos de lenguaje (N=320)

El stack técnico central de los LLMs. Engloba todo lo relacionado con cómo funcionan los modelos de lenguaje y las técnicas para usarlos efectivamente en productos. **Nota:** Generative AI se movió a Fundamentos por ser un concepto base más que un stack técnico.

*   **Etiquetas canónicas y sus sinónimos crudos del dataset:**

    *   `LLMs` (N=157) — Large Language Models
        *   `LLMs` (N=136) ← etiqueta directa
        *   `LLM` (N=9)
        *   `Foundation Models` (N=2)
        *   `LLM integrations` (N=1)
        *   `AI/LLM integrations` (N=1)
        *   `Agentic LLM products` (N=1)
        *   `Multimodal LLMs` (N=1)
        *   `LLM evaluation` (N=1)
        *   `LLM APIs` (N=1)
        *   `Multimodal foundation models` (N=1)
        *   `LLM selection` (N=1)
        *   `AI/LLMs` (N=1)
        *   `Large Language Models` (N=1) ← nombre completo en inglés

    *   `Generative AI` — ⚠️ *Movida al Track 1 (Fundamentos). Ver sección anterior.*

    *   `Prompt Engineering` (N=117)
        *   `Prompt Engineering` (N=110) ← etiqueta directa
        *   `Prompts` (N=1)
        *   `Task prompts` (N=1)
        *   `Prompt generation` (N=1)
        *   `AI Prompt Design` (N=1)
        *   `Prompt design` (N=1)
        *   `Prompting` (N=1)
        *   `Prompt creation` (N=1)

    *   `RAG` (N=21) — Retrieval-Augmented Generation
        *   `RAG` (N=21) ← sin sinónimos relevantes

    *   `Conversational AI` (N=14)
        *   `Conversational AI` (N=13) ← etiqueta directa
        *   `Bots conversacionales` (N=1) ← en español

    *   `Fine-tuning` (N=11) — Ajuste fino de modelos
        *   `Fine-tuning` (N=9) ← etiqueta directa
        *   `RLHF` (N=1) — Reinforcement Learning from Human Feedback
        *   `Model Fine-tuning` (N=1)

---

## 3. ③ Automatiza tu productividad (N=284)

Skills orientadas a **aplicar IA en el trabajo diario del PM**: herramientas, modelos específicos y flujos de trabajo aumentados con IA. El énfasis es en el uso práctico, no en el entendimiento teórico.

*   **Etiquetas canónicas y sus sinónimos crudos del dataset:**

    *   `AI Tools` (N=77) — Herramientas de IA en general
        *   `AI Tools` (N=29) ← etiqueta directa
        *   `AI tools` (N=35)
        *   `AI Tools Integration` (N=2)
        *   `AI tooling strategy` (N=2)
        *   `AI Research Tools` (N=1)
        *   `AI tools for design` (N=1)
        *   `AI tools in design workflows` (N=1)
        *   `AI Tooling Enablement` (N=1)
        *   `AI Assistants` (N=1)
        *   `AI assisted tools` (N=1)
        *   `AI Productivity Tools` (N=1)
        *   `AI tooling` (N=1)
        *   `AI PM tools` (N=1)

    *   `Automation` (N=49) — Automatización con IA
        *   `Automation` (N=35) ← etiqueta directa
        *   `Intelligent Automation` (N=6)
        *   `Automation Tools` (N=2)
        *   `Automated orchestration` (N=1)
        *   `Automatización` (N=1) ← en español
        *   `Automation workflows` (N=1)
        *   `Workflow automation` (N=1)
        *   `Workflow Automation` (N=1)
        *   `DevOps automation` (N=1)

    *   `Claude` (N=46) — Modelo de Anthropic
        *   `Claude` (N=36) ← etiqueta directa
        *   `Claude Code` (N=9)
        *   `ClaudeAI` (N=1)

    *   `Cursor` (N=30) — IDEs y herramientas de coding con IA integrada
        *   `Cursor` (N=19) ← etiqueta directa
        *   `v0` (N=7) — herramienta de Vercel para UI
        *   `v0.dev` (N=1)
        *   `Windsurf` (N=1) — IDE de Codeium
        *   `Kiro` (N=1) — IDE de Amazon
        *   `Replit Agent` (N=1) — agente de Replit

    *   `ChatGPT` (N=26)
        *   `ChatGPT` (N=25) ← etiqueta directa
        *   `ChatGPT Enterprise` (N=1)

    *   `AI-assisted workflows` (N=25) — Flujos de trabajo aumentados con IA
        *   `AI-assisted workflows` (N=14) ← etiqueta directa
        *   `AI-enabled workflows` (N=5)
        *   `AI-augmented workflow` (N=1)
        *   `AI-assisted products` (N=1)
        *   `AI-assisted decisioning` (N=1)
        *   `AI-assisted development` (N=1)
        *   `AI-assisted analytics` (N=1)
        *   `AI-augmented workflows` (N=1)

    *   `Copilots` (N=20) — Asistentes integrados (GitHub, Microsoft 365)
        *   `Copilots` (N=12) ← etiqueta directa
        *   `Copilot` (N=7)
        *   `Copilot solutions` (N=1)

    *   `Gemini` (N=11) — Modelo de Google
        *   `Gemini` (N=11) ← sin sinónimos relevantes

---

## 4. ④ Diseña sistemas agénticos (N=198)

La **próxima ola** del mercado. Sistemas que no solo responden sino que actúan de forma autónoma. Se divide en tres conceptos distintos que el mercado empieza a diferenciar.

*   **Cambios de taxonomía respecto a versión anterior:**
    *   `Agent Orchestration` y `AI Agents` se **separaron**: antes estaban fusionados en una sola etiqueta.
    *   `Agentic Workflows` fue **renombrado a `AI Workflows`** — término más establecido en la industria.

*   **Etiquetas canónicas y sus sinónimos crudos del dataset:**

    *   `Agent Orchestration` (N=70) — Frameworks de orquestación multi-agente
        *   `Agent Orchestration` (N=43) ← etiqueta directa
        *   `Multi-agent services` (N=1)
        *   `Sistemas multiagentes` (N=1) ← en español
        *   `Agent frameworks` (N=1)
        *   `Agentic coding frameworks` (N=1)
        *   `AI orchestration` (N=1)
        *   `Multi-agent orchestration` (N=1)
        *   `Agent-based workflows` (N=1)
        *   `LangChain` (N=1) — framework de orquestación
        *   `LlamaIndex` (N=1) — framework de orquestación
        *   `Agentic architectures` (N=1)
        *   `AI agent frameworks` (N=1)
        *   `Multi-Agent systems` (N=1)
        *   `Agent-based systems` (N=1)
        *   `Agentic Workforces` (N=1)
        *   `Agentic Systems` (N=1)
        *   `Agentic patterns` (N=1)
        *   `Agentic tools` (N=1)

    *   `AI Agents` (N=41) — ⚠️ *Separado de Agent Orchestration*
        *   `AI Agents` (N=28) ← etiqueta directa
        *   `Agents` (N=8)
        *   `AI agents` (N=5)
        *   `AI Agent` (N=1)
        *   `AI coding agent` (N=1)
        *   `AI-driven agents` (N=1)
        *   `Agentes autónomos` (N=1) ← en español
        *   `Autonomous systems` (N=1)
        *   `Coding Agents` (N=1)
        *   `AI/agents` (N=1)

    *   `Agentic AI` (N=70)
        *   `Agentic AI` (N=70) ← sin sinónimos; etiqueta muy estable

    *   `AI Workflows` (N=17) — ⚠️ *Antes: "Agentic Workflows" — renombrado a término de industria*
        *   `Agentic Workflows` (N=8) ← etiqueta más frecuente en el dataset
        *   `Agentic workflows` (N=5)
        *   `Intelligent workflows` (N=1)
        *   `Agentic tool use` (N=1)
        *   `Function calling` (N=1)

---

## 5. ⑤ Lidera con responsabilidad (N=61)

Skills de **gobernanza, ética y estrategia** que posicionan al PM como líder de iniciativas de IA, no solo como usuario. Ya aparecen de forma explícita en requisitos de vacante senior y de liderazgo.

*   **Etiquetas canónicas y sus sinónimos crudos del dataset:**

    *   `Responsible AI` (N=30) — Marco ético y regulatorio
        *   `Responsible AI` (N=28) ← etiqueta directa
        *   `Responsible AI Practices` (N=2)

    *   `AI Ethics` (N=20) — Ética en IA (bias, fairness, transparencia)
        *   `AI Ethics` (N=14) ← etiqueta directa
        *   `Ethical AI` (N=2)
        *   `Bias Analysis` (N=1)
        *   `Ética de la IA` (N=1) ← en español
        *   `AI Assurance` (N=1)
        *   `AI ethics` (N=1)

    *   `AI Strategy` (N=11) — Estrategia de IA a nivel negocio
        *   `AI Strategy` (N=11) ← sin sinónimos relevantes

---

## Notas metodológicas

1. **Fuente de datos:** campo `ai_skills_list` (ARRAY\<STRING\>) de `v3l4-493018.jobs.product_management_consolidated`, filtrado por `is_pm_role = true`.
2. **Normalización:** se aplicó un diccionario de ~80 reglas para unificar sinónimos en español, inglés y portugués en una etiqueta canónica única.
3. **Umbral de inclusión:** solo se incluyen skills canónicas con N ≥ 5 menciones para evitar ruido estadístico.
4. **Skills excluidas:** skills demasiado específicas, de empresas concretas (Einstein AI, NowAssist, Agentforce, Snowflake Cortex), o demasiado genéricas (Quality Assurance, Prototyping) fueron descartadas de la gráfica pero existen en el dataset.
5. **Fecha de corte del dataset:** los datos corresponden a las vacantes capturadas en la versión actual del dataset de BigQuery.
