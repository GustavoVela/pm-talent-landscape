"use client";

import React, { useState, useEffect, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { useTheme } from 'next-themes';

// Theme colors in exact order from styles/echarts-theme.json
// gradient: lighter (left/offset-0) → darker (right/offset-1)
const THEME = {
  t1: { light: '#7dd3fc', dark: '#0ea5e9' }, // 1st — sky blue
  t2: { light: '#b3e099', dark: '#91cc75' }, // 2nd — green
  t3: { light: '#fde68a', dark: '#fac858' }, // 3rd — yellow
  t4: { light: '#fca5a5', dark: '#ee6666' }, // 4th — coral red
  t5: { light: '#bae6fd', dark: '#73c0de' }, // 5th — light blue
};

// ─── 5 Learning tracks ────────────────────────────────────────────────────
const TRACKS = [
  {
    id: 'foundations',
    label: '① Comprende la base conceptual',
    shortLabel: '① Fundamentos',
    color: THEME.t1,
    skills: [
      { skill: 'Machine Learning',  count: 296, note: 'El concepto más demandado. Entiende cómo aprenden los modelos: supervisado, no supervisado y por refuerzo.' },
      { skill: 'IA (General)',       count: 212, note: 'Literacy básica: terminología, tipos de modelos y casos de uso reales en productos.' },
      { skill: 'NLP',               count: 22,  note: 'Procesamiento de lenguaje natural — clave para chatbots, búsqueda y análisis de texto.' },
      { skill: 'Computer Vision',   count: 11,  note: 'Para productos con imagen, video o detección visual. Creciente en retail, salud y manufactura.' },
    ],
  },
  {
    id: 'llms',
    label: '② Domina los modelos de lenguaje',
    shortLabel: '② LLMs y GenAI',
    color: THEME.t2,
    skills: [
      { skill: 'LLMs',              count: 157, note: 'Saber qué son, cómo evaluarlos y cuándo usarlos es el nuevo estándar mínimo para PMs.' },
      { skill: 'Generative AI',     count: 124, note: 'El paraguas del mercado: imagen, texto, código, audio — el PM debe entender sus alcances y límites.' },
      { skill: 'Prompt Engineering',count: 117, note: 'Skill transversal: estructurar prompts para obtener outputs predecibles y útiles.' },
      { skill: 'RAG',               count: 21,  note: 'Retrieval-Augmented Generation: cómo dar a los LLMs acceso a tu base de conocimiento empresarial.' },
      { skill: 'Conversational AI', count: 14,  note: 'Diseño de flujos de conversación inteligente, chatbots y asistentes.' },
      { skill: 'Fine-tuning',       count: 11,  note: 'Adaptar modelos preentrenados a dominios específicos — entender cuándo vale la pena.' },
    ],
  },
  {
    id: 'productivity',
    label: '③ Automatiza tu productividad',
    shortLabel: '③ Productividad',
    color: THEME.t3,
    skills: [
      { skill: 'AI Tools',              count: 77, note: 'Fluency con herramientas: saber cuál usar para cada tarea de PM (spec, research, análisis).' },
      { skill: 'Automation',            count: 48, note: 'Automatizar tareas repetitivas: reportes, clasificación, resúmenes — libera tiempo para decisiones.' },
      { skill: 'Claude',                count: 46, note: 'El modelo de Anthropic — muy usado para análisis, redacción y síntesis de documentos largos.' },
      { skill: 'ChatGPT',               count: 26, note: 'El estándar de referencia; los equipos esperan que lo conozcas bien.' },
      { skill: 'AI-assisted workflows', count: 25, note: 'Integrar IA en tu flujo de trabajo: discovery, roadmap, specs y retrospectivas.' },
      { skill: 'Cursor',                count: 30, note: 'Editor con IA integrada (también Windsurf, v0, Replit). Fundamental si trabajas cerca de ingeniería.' },
      { skill: 'Copilots',              count: 20, note: 'Asistentes integrados en el ecosistema (GitHub, Microsoft 365, Notion AI).' },
      { skill: 'Gemini',                count: 11, note: 'El modelo de Google — emergente en entornos Google Workspace y GCP.' },
    ],
  },
  {
    id: 'agents',
    label: '④ Diseña sistemas agénticos',
    shortLabel: '④ Agentes',
    color: THEME.t4,
    skills: [
      { skill: 'Agent Orchestration', count: 111, note: 'Coordinar múltiples agentes especializados (LangChain, LlamaIndex, sistemas multi-agente).' },
      { skill: 'Agentic AI',          count: 70,  note: 'Sistemas que toman acciones autónomas en múltiples pasos sin intervención humana constante.' },
      { skill: 'Agentic Workflows',   count: 19,  note: 'Orquestar flujos donde la IA actúa, decide y ejecuta — no solo responde.' },
    ],
  },
  {
    id: 'governance',
    label: '⑤ Lidera con responsabilidad',
    shortLabel: '⑤ Gobernanza',
    color: THEME.t5,
    skills: [
      { skill: 'Responsible AI', count: 30, note: 'Marco ético, regulatorio y de seguridad para productos con IA — ya es un requisito explícito en muchas vacantes.' },
      { skill: 'AI Ethics',      count: 20, note: 'Bias, fairness, transparencia — las preguntan en entrevistas de PM para productos de IA.' },
      { skill: 'AI Strategy',    count: 11, note: 'Cómo priorizar, justificar y escalar iniciativas de IA alineadas al negocio.' },
    ],
  },
];

export function AiSkillsRankingChart() {
  const [mounted, setMounted] = useState(false);
  const [activeTrack, setActiveTrack] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === 'dark';
  const textColor = isDark ? '#9ca3af' : '#6b7280';
  const axisLineColor = isDark ? '#374151' : '#e5e7eb';

  // Flatten with spacers between tracks
  const flatData = useMemo(() => {
    const rows: {
      skill: string; count: number; note: string;
      trackId: string; color: { light: string; dark: string }; isSpacer?: boolean;
    }[] = [];
    const tracksToShow = activeTrack ? TRACKS.filter(t => t.id === activeTrack) : TRACKS;
    [...tracksToShow].reverse().forEach((track, ti) => {
      [...track.skills].reverse().forEach(s => {
        rows.push({ skill: s.skill, count: s.count, note: s.note, trackId: track.id, color: track.color });
      });
      if (ti < tracksToShow.length - 1) {
        rows.push({ skill: '  ', count: 0, note: '', trackId: track.id, color: track.color, isSpacer: true });
      }
    });
    return rows;
  }, [activeTrack]);

  const option = useMemo(() => ({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: isDark ? '#1f2937' : '#ffffff',
      borderColor: isDark ? '#374151' : '#e5e7eb',
      textStyle: { color: isDark ? '#f9fafb' : '#111827', fontSize: 12 },
      formatter: (params: any) => {
        const d = flatData[params[0].dataIndex];
        if (d?.isSpacer || !d?.count) return '';
        const track = TRACKS.find(t => t.id === d.trackId);
        return `
          <div style="max-width:260px">
            <div style="font-weight:700;margin-bottom:4px">${d.skill}</div>
            <div style="font-size:11px;color:${isDark ? '#9ca3af' : '#6b7280'};margin-bottom:6px">${track?.shortLabel || ''}</div>
            <div style="margin-bottom:6px">Mencionado en <strong>${d.count}</strong> vacantes PM con IA</div>
            <div style="font-size:11px;border-top:1px solid ${isDark ? '#374151' : '#e5e7eb'};padding-top:6px;color:${isDark ? '#d1d5db' : '#374151'}">
              📚 ${d.note}
            </div>
          </div>`;
      }
    },
    grid: { left: '1%', right: '12%', top: '2%', bottom: '2%', containLabel: true },
    xAxis: {
      type: 'value',
      axisLabel: { color: textColor, fontSize: 10 },
      splitLine: { lineStyle: { color: axisLineColor, type: 'dashed' } },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'category',
      data: flatData.map(d => d.skill),
      axisLabel: {
        color: (val: string) => val.trim() === '' ? 'transparent' : textColor,
        fontSize: 11,
        width: 180,
        overflow: 'truncate',
      },
      axisLine: { lineStyle: { color: axisLineColor } },
      axisTick: { show: false },
    },
    series: [{
      type: 'bar',
      barMaxWidth: 20,
      data: flatData.map(d => ({
        value: d.isSpacer ? null : d.count,
        itemStyle: {
          color: d.isSpacer ? 'transparent' : {
            type: 'linear', x: 0, y: 0, x2: 1, y2: 0,
            // lighter on LEFT (offset 0), darker on RIGHT (offset 1)
            colorStops: [
              { offset: 0, color: d.color.light },
              { offset: 1, color: d.color.dark },
            ]
          },
          borderRadius: [0, 4, 4, 0],
        }
      })),
      label: {
        show: true,
        position: 'right',
        formatter: (p: any) => p.data.value ? `${p.data.value}` : '',
        color: textColor,
        fontSize: 10,
        fontWeight: 600,
      },
      emphasis: {
        itemStyle: { shadowBlur: 8, shadowColor: 'rgba(14,165,233,0.3)' }
      }
    }],
  }), [flatData, isDark, textColor, axisLineColor]);

  const chartHeight = Math.max(300, flatData.length * 27 + 40);

  if (!mounted) return null;

  return (
    <div className="flex flex-col w-full">
      {/* Title */}
      <div className="mb-5">
        <h3 className="text-xl font-bold text-foreground">¿Qué skills de IA deberías aprender y dominar?</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Skills extraídas de vacantes PM con demanda de IA, agrupadas en 5 rutas de aprendizaje.
          Pasa el cursor sobre cualquier barra para ver por qué ese skill importa.
        </p>
      </div>

      {/* Track filter pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setActiveTrack(null)}
          className={`text-xs px-3 py-1 rounded-full border transition-colors ${
            activeTrack === null
              ? 'bg-foreground text-background border-foreground'
              : 'bg-background text-muted-foreground border-border hover:border-foreground/50'
          }`}
        >
          Todas las rutas
        </button>
        {TRACKS.map(track => (
          <button
            key={track.id}
            onClick={() => setActiveTrack(activeTrack === track.id ? null : track.id)}
            className={`text-xs px-3 py-1 rounded-full border transition-colors ${
              activeTrack === track.id
                ? 'text-white border-transparent'
                : 'bg-background text-muted-foreground border-border hover:border-foreground/50'
            }`}
            style={activeTrack === track.id ? { backgroundColor: track.color.dark } : {}}
          >
            {track.shortLabel}
          </button>
        ))}
      </div>

      {/* 💡 Antes de explorar — BEFORE the chart */}
      <div className="mb-4 text-xs text-muted-foreground bg-muted/40 border border-border/40 rounded-md px-3 py-2.5">
        <p className="font-bold text-foreground/80 mb-1.5">💡 Antes de explorar</p>
        <ul className="list-disc list-inside space-y-1 leading-relaxed">
          <li>Cada barra indica cuántas vacantes PM mencionan ese skill. El número no dice <em>cuánto</em> tienes que saber, sino <em>qué tan urgente</em> es que lo entiendas.</li>
          <li>Usa los filtros de ruta para concentrarte en el área que más te interesa: fundamentos, herramientas del día a día, agentes o gobernanza.</li>
          <li>Pasa el cursor sobre cualquier skill para leer una nota de contexto que explica qué es y por qué el mercado lo pide.</li>
        </ul>
      </div>

      {/* Chart */}
      <div style={{ height: `${chartHeight}px` }}>
        <ReactECharts
          option={option}
          notMerge={true}
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'svg' }}
        />
      </div>

      {/* Track legend below chart */}
      <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3 pt-3 border-t border-border/40">
        {TRACKS.map(track => (
          <div key={track.id} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="w-2.5 h-2.5 rounded-sm inline-block flex-shrink-0"
              style={{ background: track.color.dark }} />
            {track.label}
          </div>
        ))}
      </div>
    </div>
  );
}
