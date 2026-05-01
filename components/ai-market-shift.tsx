import React from 'react';
import { BarChart3, CloudCog, FlaskConical } from 'lucide-react';

export function AiMarketShift() {
  return (
    <div className="flex flex-col w-full mt-10 mb-8">
      {/* Header sin título grande, conectando directamente con el texto anterior */}
      <div className="mb-8">
        <p className="text-muted-foreground leading-relaxed">
          Al examinar la taxonomía a nivel microscópico, el análisis comparativo de 2,836 vacantes (1,339 EE.UU. | 1,497 LATAM) evidencia una divergencia estructural crítica. Es importante destacar que <strong>ambos mercados exigen competencias tecnológicas y de datos con igual intensidad</strong>, pero el <em>tipo</em> de habilidad solicitada cambia por completo. El mercado estadounidense opera como un indicador adelantado de la transformación del rol, demostrando cómo la adopción tecnológica desplaza el valor del PM desde la ejecución operativa hacia el juicio de producto y la agencia técnica pura.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Pilar 1 */}
        <div className="flex flex-col bg-background border border-border/60 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)' }} className="w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-md">
              <BarChart3 className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Hallazgo 1</span>
          </div>
          <h4 className="font-bold text-foreground text-base mb-2 leading-tight">
            De Operación de Dashboards a Estrategia Analítica
          </h4>
          <div className="text-xs text-muted-foreground bg-muted/40 p-2.5 rounded-md mb-4 border border-border/40">
            <strong className="text-foreground/80">Evidencia (Datos):</strong> LATAM prioriza la extracción y visualización operativa (SQL 12.8%, Power BI 5.7%, Tableau 5.3%). En EE.UU., estas herramientas decrecen (SQL cae a 8.1%, Tableau 2.4%), priorizando el análisis abstracto (Data Analysis 23.4%, Quantitative Analysis 2.1%).
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Aunque ambos mercados son "Data-Driven", la operatividad de construir dashboards se delega o automatiza en mercados maduros. El PM transiciona de un constructor de tableros a un consumidor crítico de datos. La competencia de alto valor se concentra en la definición de métricas, el razonamiento estructurado y la toma de decisiones empírica, no en la elaboración manual de la consulta técnica.
          </p>
        </div>

        {/* Pilar 2 */}
        <div className="flex flex-col bg-background border border-border/60 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div style={{ background: 'linear-gradient(135deg, #91cc75 0%, #16a34a 100%)' }} className="w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-md">
              <CloudCog className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Hallazgo 2</span>
          </div>
          <h4 className="font-bold text-foreground text-base mb-2 leading-tight">
            De Integración Legacy a Arquitecturas Nativas
          </h4>
          <div className="text-xs text-muted-foreground bg-muted/40 p-2.5 rounded-md mb-4 border border-border/40">
            <strong className="text-foreground/80">Evidencia (Tech):</strong> LATAM mantiene peticiones de integración legacy (ERP 2.5%, Middleware 2.1%). EE.UU. estandariza el conocimiento en lenguajes de programación e infraestructura (Python 2.5%, AWS 2.5%, CI/CD 1.1%, Snowflake 1.0%).
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Las fronteras del rol se expanden hacia un perfil "Full-Stack". El mercado exige alta agencia técnica: capacidad para comprender arquitecturas complejas, iterar modelos de datos y utilizar lenguajes estructurados como Python. El PM deja de ser un gestor de requerimientos pasivo para interactuar directamente con la infraestructura tecnológica subyacente.
          </p>
        </div>

        {/* Pilar 3 */}
        <div className="flex flex-col bg-background border border-border/60 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div style={{ background: 'linear-gradient(135deg, #fac858 0%, #ca8a04 100%)' }} className="w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-md">
              <FlaskConical className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Hallazgo 3</span>
          </div>
          <h4 className="font-bold text-foreground text-base mb-2 leading-tight">
            De Adopción de Herramientas a Modelado de Producto
          </h4>
          <div className="text-xs text-muted-foreground bg-muted/40 p-2.5 rounded-md mb-4 border border-border/40">
            <strong className="text-foreground/80">Evidencia (IA):</strong> LATAM registra búsquedas nominales de herramientas (ChatGPT 1.5%, Claude 1.9%). EE.UU. demanda comprensión de conceptos estructurales (Prompt Engineering 5.8%, Orquestación de Agentes 3.1%, AI/ML 2.5%).
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            El mercado emergente busca "usuarios" de IA; el mercado líder demanda constructores ("builders"). Frente a modelos probabilísticos, la redacción tradicional de PRDs es insuficiente. El mercado valora el "Product Judgment" y la capacidad de establecer evaluaciones sistemáticas ("Evals") para validar empíricamente que un modelo entregue un comportamiento confiable.
          </p>
        </div>
      </div>
      
    </div>
  );
}
