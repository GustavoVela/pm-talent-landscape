"use client"

/**
 * ai-skills-ranking-chart.tsx
 *
 * Ranking de barras: habilidades específicas de IA más demandadas.
 * Ej: LLMs/ChatGPT, Automatización, Análisis con IA, APIs, etc.
 */;

import React, { useState, useEffect, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { useTheme } from 'next-themes';

const THEME = {
  t1: { light: '#7dd3fc', dark: '#0ea5e9', label: '#0ea5e9' },
  t2: { light: '#b3e099', dark: '#91cc75', label: '#6aaa42' },
  t3: { light: '#fde68a', dark: '#fac858', label: '#b8861a' },
  t4: { light: '#fca5a5', dark: '#ee6666', label: '#ee6666' },
  t5: { light: '#bae6fd', dark: '#73c0de', label: '#3a8faf' },
};

const TRACKS = [
  {
    id: 'foundations', richKey: 't1', color: THEME.t1,
    label: '① Fundamentos',
    fullLabel: '① Comprende la base conceptual',
    skills: [
      { skill: 'Machine Learning',  count: 296, displayName: 'Machine Learning (cómo aprenden los modelos)', note: 'Entiende supervisado, no supervisado y por refuerzo — sin necesidad de saber programar.' },
      { skill: 'IA (General)',       count: 212, displayName: 'Inteligencia Artificial — conceptos base', note: 'Terminología, tipos de modelos y casos de uso reales en productos digitales.' },
      { skill: 'Generative AI',      count: 124, displayName: 'IA Generativa — texto, imagen, código, audio', note: 'El paraguas del mercado: entender qué puede generar la IA y cuáles son sus límites reales.' },
      { skill: 'NLP',               count: 22,  displayName: 'Procesamiento de Lenguaje Natural (NLP)', note: 'Cómo los modelos entienden y generan texto — la base de los LLMs y chatbots.' },
      { skill: 'Computer Vision',   count: 11,  displayName: 'Visión por Computadora', note: 'Modelos que interpretan imágenes y video — clave en retail, salud y manufactura.' },
    ],
  },
  {
    id: 'llms', richKey: 't2', color: THEME.t2,
    label: '② LLMs y Prompting',
    fullLabel: '② Domina los modelos de lenguaje',
    skills: [
      { skill: 'LLMs',             count: 157, displayName: 'Large Language Models (LLMs)', note: 'Qué son, cómo evaluarlos y cuándo usarlos — el nuevo mínimo del mercado.' },
      { skill: 'Prompt Engineering',count: 117, displayName: 'Prompt Engineering — instrucciones a la IA', note: 'Estructurar instrucciones para obtener outputs predecibles y útiles como PM.' },
      { skill: 'RAG',              count: 21,  displayName: 'RAG — memoria empresarial para LLMs', note: 'Retrieval-Augmented Generation: cómo conectar LLMs con tu base de conocimiento.' },
      { skill: 'Conversational AI', count: 14,  displayName: 'IA Conversacional y diseño de chatbots', note: 'Diseñar flujos de conversación inteligente — más allá del FAQ simple.' },
      { skill: 'Fine-tuning',      count: 11,  displayName: 'Fine-tuning — ajuste fino de modelos', note: 'Adaptar modelos a dominios específicos — saber cuándo vale la pena frente a RAG.' },
    ],
  },
  {
    id: 'productivity', richKey: 't3', color: THEME.t3,
    label: '③ Productividad',
    fullLabel: '③ Automatiza tu productividad diaria',
    skills: [
      { skill: 'AI Tools',              count: 77, displayName: 'Herramientas de IA — cuál usar y cuándo', note: 'Fluency general: saber qué herramienta aplica a cada tarea de PM.' },
      { skill: 'Automation',            count: 49, displayName: 'Automatización de tareas con IA', note: 'Reportes, clasificaciones y resúmenes automáticos — libera tiempo para decisiones.' },
      { skill: 'Claude',                count: 46, displayName: 'Claude — modelo de Anthropic', note: 'Muy usado para análisis extenso, redacción y síntesis de documentos largos.' },
      { skill: 'Cursor',                count: 30, displayName: 'Cursor, v0 y Windsurf — IDEs con IA integrada', note: 'Entornos de desarrollo con IA — clave si trabajas cerca de ingeniería.' },
      { skill: 'ChatGPT',               count: 26, displayName: 'ChatGPT — modelo de OpenAI', note: 'El estándar de referencia que todos los equipos esperan que conozcas.' },
      { skill: 'AI-assisted workflows', count: 25, displayName: 'Flujos de trabajo aumentados con IA', note: 'Integrar IA en discovery, roadmap, specs y retrospectivas.' },
      { skill: 'Copilots',              count: 20, displayName: 'Copilots — asistentes de Microsoft y GitHub', note: 'Asistentes IA integrados en el ecosistema de trabajo (365, Teams, código).' },
      { skill: 'Gemini',                count: 11, displayName: 'Gemini — modelo de Google', note: 'Emergente en entornos Google Workspace y GCP — crece rápido en LATAM.' },
    ],
  },
  {
    id: 'agents', richKey: 't4', color: THEME.t4,
    label: '④ Agentes',
    fullLabel: '④ Diseña sistemas agénticos',
    skills: [
      { skill: 'Agent Orchestration', count: 70, displayName: 'Orquestación de Agentes (LangChain, LlamaIndex)', note: 'Coordinar múltiples agentes especializados usando frameworks como LangChain o LlamaIndex.' },
      { skill: 'AI Agents',           count: 41, displayName: 'AI Agents — sistemas autónomos de IA', note: 'Diseñar y supervisar agentes que toman acciones sin supervisión humana constante.' },
      { skill: 'Agentic AI',          count: 70, displayName: 'IA Agéntica — sistemas que actúan solos', note: 'El concepto paraguas: sistemas de IA que planifican, deciden y ejecutan en múltiples pasos.' },
      { skill: 'AI Workflows',        count: 17, displayName: 'AI Workflows — flujos de trabajo con IA', note: 'Término de industria: pipelines donde la IA actúa, decide y ejecuta — no solo responde.' },
    ],
  },
  {
    id: 'governance', richKey: 't5', color: THEME.t5,
    label: '⑤ Gobernanza',
    fullLabel: '⑤ Lidera con responsabilidad',
    skills: [
      { skill: 'Responsible AI', count: 30, displayName: 'IA Responsable — ética y seguridad', note: 'Marco regulatorio y de seguridad para productos IA — ya es requisito explícito en vacantes.' },
      { skill: 'AI Ethics',      count: 20, displayName: 'Ética en IA — sesgo, fairness, transparencia', note: 'Lo preguntan en entrevistas de PM para productos de IA en roles senior y liderazgo.' },
      { skill: 'AI Strategy',    count: 11, displayName: 'Estrategia de IA para el negocio', note: 'Cómo priorizar, justificar y escalar iniciativas de IA alineadas al negocio.' },
    ],
  },
];

type FlatRow = {
  type: 'header' | 'skill' | 'spacer';
  key: string; displayName: string; count: number; note: string;
  trackId: string; richKey: string; color: typeof THEME.t1;
};

export function AiSkillsRankingChart() {
  const [mounted, setMounted] = useState(false);
  const [activeTrack, setActiveTrack] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === 'dark';
  const textColor = isDark ? '#9ca3af' : '#6b7280';
  const axisLineColor = isDark ? '#374151' : '#e5e7eb';

  const flatData = useMemo<FlatRow[]>(() => {
    const rows: FlatRow[] = [];
    const tracksToShow = activeTrack ? TRACKS.filter(t => t.id === activeTrack) : TRACKS;

    [...tracksToShow].reverse().forEach((track, ti) => {
      [...track.skills].reverse().forEach(s => {
        rows.push({ type: 'skill', key: s.skill, displayName: s.displayName, count: s.count, note: s.note, trackId: track.id, richKey: track.richKey, color: track.color });
      });
      rows.push({ type: 'header', key: `header-${track.id}`, displayName: track.fullLabel, count: 0, note: '', trackId: track.id, richKey: track.richKey, color: track.color });
      if (ti < tracksToShow.length - 1) {
        rows.push({ type: 'spacer', key: `spacer-${ti}`, displayName: '', count: 0, note: '', trackId: track.id, richKey: track.richKey, color: track.color });
      }
    });
    return rows;
  }, [activeTrack]);

  const option = useMemo(() => ({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis', axisPointer: { type: 'shadow' },
      backgroundColor: isDark ? '#1f2937' : '#ffffff',
      borderColor: isDark ? '#374151' : '#e5e7eb',
      textStyle: { color: isDark ? '#f9fafb' : '#111827', fontSize: 12 },
      formatter: (params: any) => {
        const d = flatData[params[0].dataIndex];
        if (!d || d.type !== 'skill') return '';
        const track = TRACKS.find(t => t.id === d.trackId);
        return `<div style="max-width:265px">
          <div style="font-weight:700;margin-bottom:3px">${d.displayName}</div>
          <div style="font-size:11px;color:${isDark ? '#9ca3af' : '#6b7280'};margin-bottom:5px">${track?.fullLabel}</div>
          <div style="margin-bottom:5px">Mencionado en <strong>${d.count}</strong> vacantes PM con IA</div>
          <div style="font-size:11px;border-top:1px solid ${isDark ? '#374151' : '#e5e7eb'};padding-top:5px">📚 ${d.note}</div>
        </div>`;
      }
    },
    grid: { left: '1%', right: '12%', top: '1%', bottom: '1%', containLabel: true },
    xAxis: {
      type: 'value',
      axisLabel: { color: textColor, fontSize: 10 },
      splitLine: { lineStyle: { color: axisLineColor, type: 'dashed' } },
      axisLine: { show: false }, axisTick: { show: false },
    },
    yAxis: {
      type: 'category',
      data: flatData.map(d => d.key),
      axisLine: { lineStyle: { color: axisLineColor } },
      axisTick: { show: false },
      axisLabel: {
        fontSize: 11, width: 265, overflow: 'truncate',
        formatter: (_val: string, index: number) => {
          const d = flatData[index];
          if (!d || d.type === 'spacer') return '';
          if (d.type === 'header') return `{${d.richKey}|${d.displayName}}`;
          return d.displayName;
        },
        rich: {
          t1: { color: THEME.t1.label, fontWeight: 700, fontSize: 11 },
          t2: { color: THEME.t2.label, fontWeight: 700, fontSize: 11 },
          t3: { color: THEME.t3.label, fontWeight: 700, fontSize: 11 },
          t4: { color: THEME.t4.label, fontWeight: 700, fontSize: 11 },
          t5: { color: THEME.t5.label, fontWeight: 700, fontSize: 11 },
        },
        color: textColor,
      },
    },
    series: [{
      type: 'bar', barMaxWidth: 18,
      data: flatData.map(d => {
        if (d.type !== 'skill') return { value: null };
        return {
          value: d.count,
          itemStyle: {
            color: { type: 'linear', x: 0, y: 0, x2: 1, y2: 0, colorStops: [{ offset: 0, color: d.color.light }, { offset: 1, color: d.color.dark }] },
            borderRadius: [0, 4, 4, 0],
          }
        };
      }),
      label: {
        show: true, position: 'right',
        formatter: (p: any) => p.data.value ? `${p.data.value} vacantes` : '',
        color: textColor, fontSize: 10, fontWeight: 600,
      },
      emphasis: { itemStyle: { shadowBlur: 8, shadowColor: 'rgba(14,165,233,0.3)' } }
    }],
  }), [flatData, isDark, textColor, axisLineColor]);

  const chartHeight = Math.max(320, flatData.length * 26 + 40);

  if (!mounted) return null;

  return (
    <div className="flex flex-col w-full">
      <div className="mb-5">
        <h3 className="text-xl font-bold text-foreground">¿Qué competencias de IA deberías aprender y dominar?</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Competencias extraídas directamente de las ofertas de trabajo para Product Managers, organizadas en 5 rutas de aprendizaje progresivo.
        </p>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setActiveTrack(null)}
          className={`text-xs px-3 py-1 rounded-full border transition-colors ${activeTrack === null ? 'bg-foreground text-background border-foreground' : 'bg-background text-muted-foreground border-border hover:border-foreground/50'}`}
        >
          Todas las rutas
        </button>
        {TRACKS.map(track => (
          <button
            key={track.id}
            onClick={() => setActiveTrack(activeTrack === track.id ? null : track.id)}
            className={`text-xs px-3 py-1 rounded-full border transition-colors ${activeTrack === track.id ? 'text-white border-transparent' : 'bg-background text-muted-foreground border-border hover:border-foreground/50'}`}
            style={activeTrack === track.id ? { backgroundColor: track.color.dark } : {}}
          >
            {track.label}
          </button>
        ))}
      </div>

      {/* 💡 Antes de explorar */}
      <div className="mb-4 w-full">
        <div className="text-xs text-muted-foreground leading-relaxed mb-3">
          <span className="font-bold text-foreground">💡 Antes de explorar: </span>
          Cada barra indica la frecuencia con la que se demanda una competencia específica en las vacantes, reflejando su prioridad en el mercado. Los encabezados en color marcan el inicio de cada ruta de aprendizaje, las cuales puedes visualizar individualmente usando los filtros superiores. Además, puedes pasar el cursor sobre cualquier barra para leer la descripción detallada de la competencia y entender por qué la industria la exige.
        </div>
        <div className="w-full h-px bg-border/60" />
      </div>

      {/* Chart */}
      <div style={{ height: `${chartHeight}px` }}>
        <ReactECharts option={option} notMerge={true} style={{ height: '100%', width: '100%' }} opts={{ renderer: 'svg' }} />
      </div>

      {/* Ver clasificación link */}
      <div className="mt-4 flex flex-col gap-2.5">
        <div className="h-px w-full bg-border/50" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-2">
          {[
            { label: 'Diccionario de estandarización de competencias de IA (rutas)', url: 'https://github.com/GustavoVela/pm-talent-landscape/blob/main/analysis/groupings/ai_skills_tracks_grouping.md' },
            { label: 'Diccionario de estandarización de taxonomía completa de IA', url: 'https://github.com/GustavoVela/pm-talent-landscape/blob/main/analysis/groupings/ai_skills_grouping.md' },
          ].map(({ label, url }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline text-[13px] w-fit"
            >
              {label} ↗
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
