import React from 'react';
import { Telescope, BarChart3, CloudCog, FlaskConical } from 'lucide-react';

export function AiMarketShift() {
  return (
    <div className="flex flex-col w-full mt-10 mb-8">
      {/* Header */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
          Transición del Rol: EE.UU. vs. LATAM
        </h3>
        <p className="text-muted-foreground mt-2 leading-relaxed">
          El análisis comparativo de 2,836 vacantes (1,339 EE.UU. | 1,497 LATAM) evidencia una divergencia estructural en las competencias requeridas. El mercado estadounidense opera como un indicador adelantado de la transformación del rol, demostrando cómo la adopción tecnológica desplaza el valor del PM desde la ejecución operativa hacia el juicio de producto y la agencia técnica.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Pilar 1 */}
        <div className="flex flex-col bg-background border border-border/60 rounded-xl p-5 shadow-sm">
          <div style={{ backgroundColor: '#0ea5e9' }} className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 text-white shadow-sm">
            <BarChart3 className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-foreground text-base mb-2 leading-tight">
            1. De Operación de Dashboards a Estrategia Analítica
          </h4>
          <div className="text-xs text-muted-foreground bg-muted/40 p-2.5 rounded-md mb-4 border border-border/40">
            <strong className="text-foreground/80">Evidencia (Datos):</strong> LATAM prioriza herramientas operativas (SQL 12.8%, Power BI 5.7%, Tableau 5.3%). En EE.UU., estas herramientas decrecen (Tableau 2.4%), priorizando competencias abstractas (Data Analysis 23.4%, Quantitative Analysis 2.1%).
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            La operatividad de Inteligencia de Negocios (BI) se delega o automatiza en mercados maduros. El PM transiciona de un constructor de dashboards a un consumidor crítico de datos. La competencia de alto valor se concentra en la definición de métricas, el razonamiento estructurado y la toma de decisiones empírica, no en la elaboración de la consulta técnica.
          </p>
        </div>

        {/* Pilar 2 */}
        <div className="flex flex-col bg-background border border-border/60 rounded-xl p-5 shadow-sm">
          <div style={{ backgroundColor: '#91cc75' }} className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 text-white shadow-sm">
            <CloudCog className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-foreground text-base mb-2 leading-tight">
            2. De Integración Legacy a Arquitecturas Nativas
          </h4>
          <div className="text-xs text-muted-foreground bg-muted/40 p-2.5 rounded-md mb-4 border border-border/40">
            <strong className="text-foreground/80">Evidencia (Tech):</strong> LATAM mantiene peticiones de integración legacy (ERP 2.5%, Middleware 2.1%). EE.UU. estandariza lenguajes de programación e infraestructura (Python 2.5%, AWS 2.5%, CI/CD 1.1%, Snowflake 1.0%).
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Las fronteras del rol se expanden hacia un perfil "Full-Stack". El mercado exige alta agencia técnica: capacidad para comprender arquitecturas complejas, iterar modelos de datos y utilizar lenguajes estructurados como Python. El PM deja de ser un gestor de requerimientos pasivo para interactuar directamente con la infraestructura tecnológica.
          </p>
        </div>

        {/* Pilar 3 */}
        <div className="flex flex-col bg-background border border-border/60 rounded-xl p-5 shadow-sm">
          <div style={{ backgroundColor: '#fac858' }} className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 text-white shadow-sm">
            <FlaskConical className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-foreground text-base mb-2 leading-tight">
            3. De Adopción de Herramientas a Modelado de Producto
          </h4>
          <div className="text-xs text-muted-foreground bg-muted/40 p-2.5 rounded-md mb-4 border border-border/40">
            <strong className="text-foreground/80">Evidencia (IA):</strong> LATAM registra búsquedas nominales de herramientas (ChatGPT 1.5%, Claude 1.9%). EE.UU. demanda conceptos estructurales (Prompt Engineering 5.8%, Orquestación de Agentes 3.1%, AI/ML 2.5%).
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            El mercado emergente busca "usuarios" de IA; el mercado líder demanda constructores ("builders"). Frente a modelos probabilísticos, la redacción tradicional de PRDs es insuficiente. El mercado valora el "Product Judgment" y la capacidad de establecer evaluaciones sistemáticas ("Evals") para validar que un modelo entregue un comportamiento confiable y alineado al negocio.
          </p>
        </div>
      </div>
      
    </div>
  );
}
