import React from 'react';
import { BarChart3, CloudCog, FlaskConical } from 'lucide-react';
import { NarrativeText } from './section-primitives';

export function AiMarketShift() {
  return (
    <div className="flex flex-col w-full mt-10 mb-8">
      {/* Header sin título grande, conectando directamente con el texto anterior */}
      <div className="mb-8">
        <NarrativeText>
          <p>
            Al examinar la taxonomía a nivel microscópico, el análisis comparativo de 2,836 vacantes (1,339 EE.UU. | 1,497 LATAM) evidencia una divergencia estructural crítica. Es importante destacar que <strong>ambos mercados exigen los dominios tecnológico y de datos con igual intensidad</strong>, pero el <em>tipo</em> de habilidad específica solicitada cambia por completo. El mercado estadounidense opera como un indicador adelantado de la transformación del rol, demostrando cómo la adopción tecnológica desplaza el valor del PM desde la ejecución operativa hacia el juicio de producto y la agencia técnica pura.
          </p>
        </NarrativeText>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Hallazgo 1 */}
        <div className="flex items-start gap-3 bg-muted/40 p-5 rounded-xl border border-border/40 shadow-sm">
          <span className="text-2xl leading-none pt-1">🤓</span>
          <div className="flex flex-col w-full">
            <h4 className="font-bold text-foreground text-base mb-3 leading-tight">
              De Operación de Dashboards a Estrategia Analítica
            </h4>
            
            <div className="h-px bg-border/60 mb-3 w-full" />
            
            <p className="text-sm text-foreground/90 mb-3 leading-relaxed">
              <strong className="text-foreground">Evidencia (Datos):</strong> LATAM prioriza la extracción y visualización operativa (SQL 12.8%, Power BI 5.7%, Tableau 5.3%). En EE.UU., estas herramientas decrecen (SQL cae a 8.1%, Tableau 2.4%), priorizando el análisis abstracto (Data Analysis 23.4%, Quantitative Analysis 2.1%).
            </p>
            
            <div className="h-px bg-border/60 mb-3 w-full" />
            
            <p className="text-sm text-muted-foreground leading-relaxed">
              Aunque ambos mercados son "Data-Driven", la operatividad de construir dashboards se delega o automatiza en mercados maduros. El PM transiciona de un constructor de tableros a un consumidor crítico de datos. La competencia de alto valor se concentra en la definición de métricas, el razonamiento estructurado y la toma de decisiones empírica, no en la elaboración manual de la consulta técnica.
            </p>
          </div>
        </div>

        {/* Hallazgo 2 */}
        <div className="flex items-start gap-3 bg-muted/40 p-5 rounded-xl border border-border/40 shadow-sm">
          <span className="text-2xl leading-none pt-1">🤓</span>
          <div className="flex flex-col w-full">
            <h4 className="font-bold text-foreground text-base mb-3 leading-tight">
              De Integración Legacy a Arquitecturas Nativas
            </h4>
            
            <div className="h-px bg-border/60 mb-3 w-full" />
            
            <p className="text-sm text-foreground/90 mb-3 leading-relaxed">
              <strong className="text-foreground">Evidencia (Tech):</strong> LATAM mantiene peticiones de integración legacy (ERP 2.5%, Middleware 2.1%). EE.UU. estandariza el conocimiento en lenguajes de programación e infraestructura (Python 2.5%, AWS 2.5%, CI/CD 1.1%, Snowflake 1.0%).
            </p>
            
            <div className="h-px bg-border/60 mb-3 w-full" />
            
            <p className="text-sm text-muted-foreground leading-relaxed">
              Las fronteras del rol se expanden hacia un perfil "Full-Stack". El mercado exige alta agencia técnica: capacidad para comprender arquitecturas complejas, iterar modelos de datos y utilizar lenguajes estructurados como Python. El PM deja de ser un gestor de requerimientos pasivo para interactuar directamente con la infraestructura tecnológica subyacente.
            </p>
          </div>
        </div>

        {/* Hallazgo 3 */}
        <div className="flex items-start gap-3 bg-muted/40 p-5 rounded-xl border border-border/40 shadow-sm">
          <span className="text-2xl leading-none pt-1">🤓</span>
          <div className="flex flex-col w-full">
            <h4 className="font-bold text-foreground text-base mb-3 leading-tight">
              De Adopción de Herramientas a Modelado de Producto
            </h4>
            
            <div className="h-px bg-border/60 mb-3 w-full" />
            
            <p className="text-sm text-foreground/90 mb-3 leading-relaxed">
              <strong className="text-foreground">Evidencia (IA):</strong> LATAM registra búsquedas nominales de herramientas (ChatGPT 1.5%, Claude 1.9%). EE.UU. demanda comprensión de conceptos estructurales (Prompt Engineering 5.8%, Orquestación de Agentes 3.1%, AI/ML 2.5%).
            </p>
            
            <div className="h-px bg-border/60 mb-3 w-full" />
            
            <p className="text-sm text-muted-foreground leading-relaxed">
              El mercado emergente busca "usuarios" de IA; el mercado líder demanda constructores ("builders"). Frente a modelos probabilísticos, la redacción tradicional de PRDs es insuficiente. El mercado valora el "Product Judgment" y la capacidad de establecer evaluaciones sistemáticas ("Evals") para validar empíricamente que un modelo entregue un comportamiento confiable.
            </p>
          </div>
        </div>
      </div>
      
    </div>
  );
}
