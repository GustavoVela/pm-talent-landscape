"use client";

import React, { useState, useEffect, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { useTheme } from 'next-themes';

// ─── Data from BigQuery ────────────────────────────────────────────────────
// Filtered: is_pm_role = true
// Con IA:  ARRAY_LENGTH(ai_skills_list) > 0  → N=832 vacantes
// Sin IA:  ARRAY_LENGTH(ai_skills_list) = 0  → N=2,004 vacantes
// Values = % of vacantes in each group that mention the pillar
const DATA = {
  'PM con IA':  { corePm: 97.1, datos: 71.8, ia: 100.0, tecnico: 56.7, negocio: 69.1, ux: 49.3, n: 832  },
  'PM sin IA':  { corePm: 93.1, datos: 41.9, ia: 0.0,   tecnico: 26.7, negocio: 69.9, ux: 29.2, n: 2004 },
};

const INDICATORS = [
  { name: 'Core PM',    max: 100, key: 'corePm'  },
  { name: 'Datos',      max: 100, key: 'datos'   },
  { name: 'IA / GenAI', max: 100, key: 'ia'      },
  { name: 'Técnico',   max: 100, key: 'tecnico'  },
  { name: 'Negocio',    max: 100, key: 'negocio' },
  { name: 'UX / UI',   max: 100, key: 'ux'       },
];

// Theme colors: Con IA = #0ea5e9 (sky), Sin IA = #9a60b4 (purple)
const COLOR_AI   = '#0ea5e9';
const COLOR_NOAI = '#9a60b4';

// Computed gaps for insight cards
const GAPS = INDICATORS.map(ind => ({
  label: ind.name,
  ai:    DATA['PM con IA'][ind.key as keyof typeof DATA['PM con IA']] as number,
  noai:  DATA['PM sin IA'][ind.key as keyof typeof DATA['PM sin IA']] as number,
  gap:   Math.round(((DATA['PM con IA'][ind.key as keyof typeof DATA['PM con IA']] as number) - (DATA['PM sin IA'][ind.key as keyof typeof DATA['PM sin IA']] as number)) * 10) / 10,
})).sort((a, b) => Math.abs(b.gap) - Math.abs(a.gap));

export function AiVsNonAiRadar() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === 'dark';
  const textColor    = isDark ? '#9ca3af' : '#4b5563';
  const gridColor    = isDark ? '#1f2937' : '#f1f5f9';
  const lineColor    = isDark ? '#374151' : '#e2e8f0';
  const labelColor   = isDark ? '#f1f5f9' : '#0f172a';

  const option = useMemo(() => ({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: isDark ? '#1f2937' : '#ffffff',
      borderColor: isDark ? '#374151' : '#e5e7eb',
      textStyle: { color: isDark ? '#f9fafb' : '#111827', fontSize: 12 },
      formatter: (params: any) => {
        const vals = params.value as number[];
        const isAi = params.seriesName === 'PM con IA';
        const color = isAi ? COLOR_AI : COLOR_NOAI;
        const n = isAi ? 832 : 2004;
        const rows = INDICATORS.map((ind, i) => `
          <div style="display:flex;justify-content:space-between;gap:16px;padding:2px 0">
            <span style="color:${textColor}">${ind.name}</span>
            <strong>${vals[i]}%</strong>
          </div>`).join('');
        return `<div style="min-width:200px">
          <div style="font-weight:700;margin-bottom:6px;color:${color}">${params.seriesName}</div>
          <div style="font-size:11px;color:${textColor};margin-bottom:6px">${n.toLocaleString()} vacantes analizadas</div>
          ${rows}
        </div>`;
      }
    },
    legend: {
      bottom: 0,
      textStyle: { color: textColor, fontSize: 12, fontWeight: 600 },
      itemWidth: 20, itemHeight: 3,
      data: [
        { name: 'PM con IA',  icon: 'rect' },
        { name: 'PM sin IA',  icon: 'rect' },
      ]
    },
    radar: {
      indicator: INDICATORS.map(ind => ({ name: ind.name, max: 100 })),
      shape: 'polygon',
      splitNumber: 4,
      center: ['50%', '48%'],
      radius: '68%',
      startAngle: 90,
      axisName: {
        color: labelColor,
        fontSize: 12,
        fontWeight: 700,
        fontFamily: 'var(--font-sans), sans-serif',
      },
      splitLine:  { lineStyle: { color: lineColor, width: 1 } },
      splitArea:  { areaStyle: { color: [gridColor, 'transparent', gridColor, 'transparent'] } },
      axisLine:   { lineStyle: { color: lineColor } },
    },
    series: [{
      type: 'radar',
      data: [
        {
          name: 'PM con IA',
          value: INDICATORS.map(ind => DATA['PM con IA'][ind.key as keyof typeof DATA['PM con IA']]),
          symbol: 'circle', symbolSize: 5,
          lineStyle: { color: COLOR_AI, width: 2.5 },
          areaStyle: { color: COLOR_AI, opacity: 0.12 },
          itemStyle: { color: COLOR_AI },
        },
        {
          name: 'PM sin IA',
          value: INDICATORS.map(ind => DATA['PM sin IA'][ind.key as keyof typeof DATA['PM sin IA']]),
          symbol: 'circle', symbolSize: 5,
          lineStyle: { color: COLOR_NOAI, width: 2, type: 'dashed' },
          areaStyle: { color: COLOR_NOAI, opacity: 0.07 },
          itemStyle: { color: COLOR_NOAI },
        },
      ]
    }],
  }), [isDark, textColor, gridColor, lineColor, labelColor]);

  if (!mounted) return null;

  return (
    <div className="flex flex-col w-full">
      {/* Title */}
      <div className="mb-5">
        <h3 className="text-xl font-bold text-foreground">Perfil de PM con IA vs. PM sin IA</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Comparativa del perfil de competencias exigido en vacantes que requieren skills de IA versus las que no.
          Basado en {(832 + 2004).toLocaleString()} vacantes PM analizadas.
        </p>
      </div>

      {/* 💡 Antes de explorar */}
      <div className="mb-5 text-xs text-muted-foreground bg-muted/40 border border-border/40 rounded-md px-3 py-2.5">
        <p className="font-bold text-foreground/80 mb-1.5">💡 Antes de explorar</p>
        <ul className="list-disc list-inside space-y-1 leading-relaxed">
          <li>Cuanto más hacia el exterior cae el vértice, más frecuente es ese pilar en las vacantes de ese perfil.</li>
          <li><span style={{ color: COLOR_AI }} className="font-semibold">Azul (continuo)</span> = vacantes con requisitos de IA · <span style={{ color: COLOR_NOAI }} className="font-semibold">Morado (punteado)</span> = vacantes sin IA.</li>
          <li>La brecha entre los dos polígonos indica cuánto <em>más</em> debes desarrollar ese pilar para competir en roles de IA.</li>
        </ul>
      </div>

      {/* Radar chart */}
      <div className="h-[420px] w-full">
        <ReactECharts option={option} notMerge={true} style={{ height: '100%', width: '100%' }} opts={{ renderer: 'svg' }} />
      </div>

      {/* Insight cards — sorted by gap descending */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
        {GAPS.map(g => {
          const isNeutral = Math.abs(g.gap) < 5;
          const isPositive = g.gap > 0;
          return (
            <div key={g.label} className={`rounded-lg border px-4 py-3 ${isNeutral ? 'border-border/40 bg-muted/20' : 'border-border/60 bg-background'}`}>
              <p className="text-xs text-muted-foreground mb-1 font-medium">{g.label}</p>
              <div className="flex items-end gap-2">
                <span className="text-lg font-bold text-foreground">{g.ai}%</span>
                <span className={`text-xs font-semibold pb-0.5 ${isNeutral ? 'text-muted-foreground' : isPositive ? 'text-sky-500' : 'text-purple-500'}`}>
                  {isNeutral ? '≈ igual' : `+${g.gap}pp`}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">vs {g.noai}% sin IA</p>
            </div>
          );
        })}
      </div>

      {/* Narrative callout */}
      <div className="mt-5 rounded-lg border border-sky-200 dark:border-sky-900 bg-sky-50/60 dark:bg-sky-950/30 px-4 py-3 text-sm text-sky-900 dark:text-sky-200 leading-relaxed">
        <strong>📊 El hallazgo clave:</strong> convertirse en PM de IA no cancela lo que ya sabes — lo amplifica.
        El pilar de <strong>Negocio</strong> pesa prácticamente igual en ambos perfiles (69% vs 70%).
        El pilar de <strong>Core PM</strong> también. Pero el umbral de <strong>Datos</strong> (+30pp) y <strong>Técnico</strong> (+30pp) prácticamente se duplica.
        La IA no reemplaza el criterio de producto — eleva el piso de lo que debes saber.
      </div>
    </div>
  );
}
