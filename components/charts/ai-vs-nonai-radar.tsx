"use client"

/**
 * ai-vs-nonai-radar.tsx
 *
 * Radar comparativo: perfil de dominios de roles con IA vs. sin IA.
 * Muestra cómo difiere la demanda de Técnico, Datos, Negocio, UX/UI y Core PM.
 */;

import React, { useState, useEffect, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { useTheme } from 'next-themes';
import { Cpu, Database, Palette, Target, Briefcase, Info, TrendingUp, Minus } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Alert, AlertDescription } from '@/components/ui/alert';

// ─── Data from BigQuery ────────────────────────────────────────────────────
// is_pm_role = true | Con IA: ai_skills_list > 0 (N=832) | Sin IA: = 0 (N=2,004)
const DATA = {
  'Roles de PM con IA': { corePm: 97.1, datos: 71.8, ia: 100.0, tecnico: 56.7, negocio: 69.1, ux: 49.3, n: 832  },
  'Roles de PM sin IA': { corePm: 93.1, datos: 41.9, ia: 0.0,   tecnico: 26.7, negocio: 69.9, ux: 29.2, n: 2004 },
};

// Theme colors in order: 1st = sky blue, 4th = coral red
const COLOR_AI   = '#0ea5e9'; // 1st theme color
const COLOR_NOAI = '#91cc75'; // 2nd theme color

const INDICATORS = [
  { name: 'Core PM',  key: 'corePm'  },
  { name: 'Datos',    key: 'datos'   },
  { name: 'IA / GenAI', key: 'ia'   },
  { name: 'Técnico',  key: 'tecnico' },
  { name: 'Negocio',  key: 'negocio' },
  { name: 'UX / UI',  key: 'ux'     },
];

// Cards — exclude IA (definitional), sorted by absolute gap desc
const CARDS = [
  {
    label:    'Técnico',
    ai:       56.7,
    noai:     26.7,
    gap:      30.0,
    icon:     Cpu,
    iconCls:  'text-foreground',
    note:     'El doble de exigencia técnica. Roles de Product Management con IA esperan que puedas hablar de APIs, arquitectura de ML e infraestructura. Es el dominio que más diferencia a los dos perfiles y el que más esfuerzo requiere desarrollar.',
  },
  {
    label:    'Datos',
    ai:       71.8,
    noai:     41.9,
    gap:      29.9,
    icon:     Database,
    iconCls:  'text-foreground',
    note:     'Co-requisito inseparable de la IA. Roles con IA esperan que trabajes directamente con datos: SQL, analytics y ciencia de datos aplicada. No es un plus — es el nuevo piso del rol de producto.',
  },
  {
    label:    'UX / UI',
    ai:       49.3,
    noai:     29.2,
    gap:      20.1,
    icon:     Palette,
    iconCls:  'text-foreground',
    note:     'Los productos con IA requieren más diseño intencional: trust signals, error states claros y feedback loops bien pensados. La experiencia de usuario en IA no se diseña sola — y el mercado lo sabe.',
  },
  {
    label:    'Core PM',
    ai:       97.1,
    noai:     93.1,
    gap:      4.0,
    icon:     Target,
    iconCls:  'text-foreground',
    note:     'Los fundamentos del rol no se deprecan. Discovery, roadmap y agilidad siguen siendo no negociables en ambos perfiles. La IA amplifica el rol de producto, no lo reemplaza. Lo que ya sabes sigue valiendo.',
  },
  {
    label:    'Negocio',
    ai:       69.1,
    noai:     69.9,
    gap:      -0.8,
    icon:     Briefcase,
    iconCls:  'text-foreground',
    note:     'El criterio de negocio pesa prácticamente igual en ambos perfiles. Las empresas con IA siguen valorando el juicio estratégico, el P&L y la visión de mercado al mismo nivel que antes. La inteligencia de negocio no se automatiza.',
  },
];

export function AiVsNonAiRadar() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  useEffect(() => setMounted(true), []);

  const isDark     = resolvedTheme === 'dark';
  const textColor  = isDark ? '#9ca3af' : '#4b5563';
  const gridColor  = isDark ? '#1f2937' : '#f1f5f9';
  const lineColor  = isDark ? '#374151' : '#e2e8f0';
  const labelColor = isDark ? '#f1f5f9' : '#0f172a';

  const option = useMemo(() => ({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: isDark ? '#1f2937' : '#ffffff',
      borderColor: isDark ? '#374151' : '#e5e7eb',
      textStyle: { color: isDark ? '#f9fafb' : '#111827', fontSize: 12 },
      formatter: (params: any) => {
        const vals = params.value as number[];
        const isAi = params.seriesName === 'Roles de PM con IA (Vacantes=832)';
        const color = isAi ? COLOR_AI : COLOR_NOAI;
        const n = isAi ? 832 : 2004;
        const rows = INDICATORS.map((ind, i) => `
          <div style="display:flex;justify-content:space-between;gap:16px;padding:2px 0">
            <span style="color:${textColor}">${ind.name}</span>
            <strong>${vals[i]}%</strong>
          </div>`).join('');
        return `<div style="min-width:200px">
          <div style="font-weight:700;margin-bottom:5px;color:${color}">${isAi ? 'Roles de Product Management con IA' : 'Roles de Product Management sin IA'}</div>
          <div style="font-size:11px;color:${textColor};margin-bottom:6px">${n.toLocaleString()} vacantes analizadas</div>
          ${rows}
        </div>`;
      }
    },
    legend: {
      bottom: 0,
      textStyle: { color: textColor, fontSize: 11, fontWeight: 600 },
      itemWidth: 20, itemHeight: 3,
      data: [
        { name: 'Roles de PM con IA (Vacantes=832)',  icon: 'rect' },
        { name: 'Roles de PM sin IA (Vacantes=2,004)',  icon: 'rect' },
      ]
    },
    radar: {
      indicator: INDICATORS.map(ind => ({ name: ind.name, max: 100 })),
      shape: 'polygon',
      splitNumber: 4,
      center: ['50%', '47%'],
      radius: '70%',
      startAngle: 90,
      axisName: {
        color: labelColor,
        fontSize: 11,
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
          name: 'Roles de PM con IA (Vacantes=832)',
          value: INDICATORS.map(ind => DATA['Roles de PM con IA'][ind.key as keyof typeof DATA['Roles de PM con IA']]),
          symbol: 'circle', symbolSize: 5,
          lineStyle: { color: COLOR_AI, width: 2.5 },
          areaStyle: { color: COLOR_AI, opacity: 0.12 },
          itemStyle: { color: COLOR_AI },
        },
        {
          name: 'Roles de PM sin IA (Vacantes=2,004)',
          value: INDICATORS.map(ind => DATA['Roles de PM sin IA'][ind.key as keyof typeof DATA['Roles de PM sin IA']]),
          symbol: 'circle', symbolSize: 5,
          lineStyle: { color: COLOR_NOAI, width: 2, type: 'dashed' },
          areaStyle: { color: COLOR_NOAI, opacity: 0.08 },
          itemStyle: { color: COLOR_NOAI },
        },
      ]
    }],
  }), [isDark, textColor, gridColor, lineColor, labelColor]);

  if (!mounted) return null;

  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex flex-col w-full">
        {/* Title */}
        <div className="mb-5">
          <h3 className="text-xl font-bold text-foreground">
            ¿En qué se diferencia el perfil de una vacante para un PM tradicional frente a una con requerimiento en IA?
          </h3>
        </div>

        {/* 💡 Antes de explorar */}
        <div className="mb-5 w-full">
          <div className="text-xs text-muted-foreground leading-relaxed mb-3">
            <span className="font-bold text-foreground">💡 Antes de explorar: </span>
            Cuanto más hacia el exterior cae el vértice, más frecuente es ese dominio. La línea <span style={{ color: COLOR_AI }} className="font-semibold">azul continua</span> representa roles con IA, mientras que la <span style={{ color: COLOR_NOAI }} className="font-semibold">verde punteada</span> representa roles tradicionales. Puedes pasar el cursor sobre cada tarjeta a la derecha para ver la interpretación detallada de la brecha.
          </div>
          <div className="w-full h-px bg-border/60" />
        </div>

        {/* Main layout: radar left, cards right */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 xl:gap-8 items-center border border-border/50 rounded-xl p-4 bg-background">
          {/* Radar */}
          <div className="h-[400px] w-full">
            <ReactECharts
              option={option}
              notMerge={true}
              style={{ height: '100%', width: '100%' }}
              opts={{ renderer: 'svg' }}
            />
          </div>

          {/* Insight cards */}
          <div className="flex flex-col gap-2.5">
            {CARDS.map(card => {
              const Icon = card.icon;
              const isNeutral = Math.abs(card.gap) < 5;
              const isPositive = card.gap > 0;

              return (
                <div
                  key={card.label}
                  className={`rounded-lg border px-4 py-3 ${
                    isNeutral
                      ? 'border-border/40 bg-muted/20'
                      : 'border-border/60 bg-background'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    {/* Left: icon + label + values */}
                    <div className="flex items-start gap-2.5 min-w-0">
                      <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${card.iconCls}`} />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-foreground leading-tight">{card.label}</p>
                        <div className="flex items-end gap-1.5 mt-1">
                          <span className="text-lg font-bold text-foreground leading-none">{card.ai}%</span>
                          <span className={`text-xs font-semibold pb-px ${
                            isNeutral ? 'text-muted-foreground' : isPositive ? 'text-emerald-500' : 'text-red-500'
                          }`}>
                            {isNeutral ? '≈ igual' : `+${card.gap}pp`}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">vs {card.noai}% sin IA</p>
                      </div>
                    </div>

                    {/* Right: trend icon + shadcn tooltip */}
                    <div className="flex items-center gap-1 flex-shrink-0 mt-0.5">
                      {isNeutral
                        ? <Minus className="w-3.5 h-3.5 text-muted-foreground" />
                        : <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                      }
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help hover:text-foreground transition-colors" />
                        </TooltipTrigger>
                        <TooltipContent
                          side="left"
                          className="max-w-xs text-xs leading-relaxed"
                        >
                          {card.note}
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Narrative callout */}
        <div className="mt-6 w-full">
          <Alert className="w-full border-border/50 bg-muted/50 shadow-sm grid-cols-[auto_1fr] gap-x-3">
            <span className="text-base leading-none translate-y-[2px]">🤓</span>
            <AlertDescription className="text-foreground text-[14px] leading-relaxed w-full">
              <div className="w-full">
                Adquirir competencias de IA no cancela lo que ya sabe un profesional de producto — lo amplifica.
                El dominio de <strong>Negocio</strong> pesa prácticamente igual en ambos perfiles (69% vs 70%), al igual que el dominio de <strong>Core PM</strong>. Pero el umbral de <strong>Datos</strong> (+30pp) y <strong>Técnico</strong> (+30pp) prácticamente se duplica en los roles con requerimiento de IA. La IA no reemplaza el criterio de producto ni la visión estratégica del rol; simplemente eleva el piso de lo que se exige dominar.
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </TooltipProvider>
  );
}
