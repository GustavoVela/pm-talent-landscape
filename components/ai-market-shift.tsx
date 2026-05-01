import React from 'react';
import { Telescope, BrainCircuit, HeartHandshake, Wrench, Lightbulb, ShieldCheck } from 'lucide-react';

export function AiMarketShift() {
  return (
    <div className="flex flex-col w-full mt-12 mb-8">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-semibold mb-3">
          <Telescope className="w-3.5 h-3.5" />
          Conclusión de Mercado
        </div>
        <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
          La Bola de Cristal: El Futuro del Rol PM
        </h3>
        <p className="text-muted-foreground mt-2 max-w-3xl leading-relaxed">
          Al contrastar las habilidades más demandadas en Estados Unidos frente a LATAM, se hace evidente una transición filosófica en la disciplina. Mientras nuestra región sigue anclada en la operatividad, el mercado líder ya está exigiendo el <strong>"Modo Humano"</strong> y la <strong>Alta Agencia</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Pilar 1 */}
        <div className="flex flex-col bg-background border border-border/60 rounded-xl p-5 hover:border-purple-500/50 transition-colors shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-foreground text-base mb-2 leading-tight">
            1. Del "Dashboarding" al Modo Humano
          </h4>
          <div className="text-xs text-muted-foreground bg-muted/40 p-2.5 rounded-md mb-4 border border-border/40">
            <strong className="text-foreground/80">📊 La Data:</strong> En LATAM, SQL (13%) y Power BI dominan las vacantes. En EE.UU., estas herramientas casi desaparecen del top técnico del PM.
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            La IA ahora puede generar dashboards e insumos operativos en segundos. El valor del PM se desplaza hacia las "Tough Skills": la <strong>empatía profunda</strong>, la conexión emocional con el usuario y el pensamiento crítico. El PM deja de ser un ejecutor de queries para convertirse en el defensor del ser humano en una sala llena de algoritmos.
          </p>
        </div>

        {/* Pilar 2 */}
        <div className="flex flex-col bg-background border border-border/60 rounded-xl p-5 hover:border-purple-500/50 transition-colors shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4 text-emerald-600 dark:text-emerald-400">
            <Wrench className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-foreground text-base mb-2 leading-tight">
            2. De Gestor de ERP a "Full-Stack Builder"
          </h4>
          <div className="text-xs text-muted-foreground bg-muted/40 p-2.5 rounded-md mb-4 border border-border/40">
            <strong className="text-foreground/80">📊 La Data:</strong> LATAM aún exige ERPs y Middleware clásico. EE.UU. demanda Python (el nuevo SQL), Cloud e integraciones continuas (CI/CD).
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Las fronteras entre diseño, ingeniería y producto colapsan. Emerge el PM como una <strong>"Triple Amenaza" de Alta Agencia</strong>: un constructor capaz de usar IA para prototipar rápidamente, que no tiene miedo de leer código y que no espera que las condiciones sean perfectas para iterar. La curiosidad insaciable reemplaza al conocimiento estático.
          </p>
        </div>

        {/* Pilar 3 */}
        <div className="flex flex-col bg-background border border-border/60 rounded-xl p-5 hover:border-purple-500/50 transition-colors shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-4 text-amber-600 dark:text-amber-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-foreground text-base mb-2 leading-tight">
            3. De Usar ChatGPT a Construir "Evals"
          </h4>
          <div className="text-xs text-muted-foreground bg-muted/40 p-2.5 rounded-md mb-4 border border-border/40">
            <strong className="text-foreground/80">📊 La Data:</strong> LATAM busca "usuarios" nombrando explícitamente a ChatGPT/Claude. EE.UU. exige Orquestación de Agentes, Prompt Engineering y Responsible AI.
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Dado que los LLMs son probabilísticos, los PRDs tradicionales no bastan. La habilidad central es tener <strong>"Product Taste"</strong> y saber escribir "Evals" (evaluaciones rigurosas) para medir comportamientos. El PM se vuelve un editor estratégico que domina la ambigüedad, guiando a la máquina hacia la visión correcta del producto.
          </p>
        </div>
      </div>
      
    </div>
  );
}
