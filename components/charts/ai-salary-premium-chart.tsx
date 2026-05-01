"use client";

import React, { useState, useEffect, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { useTheme } from 'next-themes';
import { Info, TrendingUp } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// Datos controlados SOLO para el mercado de Estados Unidos para evitar sesgos geográficos
const DATA = [
  { level: 'Director / VP', total: 310, noAi: 186085, ai: 208143, n_noAi: 191, n_ai: 119 },
  { level: 'Senior / Lead', total: 262, noAi: 138737, ai: 171968, n_noAi: 134, n_ai: 128 },
  { level: 'Mid-Level',     total: 171, noAi: 100615, ai: 115073, n_noAi: 132, n_ai:  39 },
  { level: 'Junior',        total: 154, noAi:  41021, ai:  56963, n_noAi: 118, n_ai:  36 },
];

const COLOR_AI   = '#0ea5e9'; // Tema: 1ro (Azul)
const COLOR_NOAI = '#91cc75'; // Tema: 2do (Verde)

export function AiSalaryPremiumChart() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  useEffect(() => setMounted(true), []);

  const isDark     = resolvedTheme === 'dark';
  const textColor  = isDark ? '#9ca3af' : '#4b5563';
  const gridColor  = isDark ? '#374151' : '#e2e8f0';
  const labelColor = isDark ? '#f1f5f9' : '#0f172a';

  const option = useMemo(() => {
    const levels = DATA.map(d => d.level);
    const noAiData = DATA.map(d => ({ value: d.noAi, vacantes: d.n_noAi }));
    const aiData = DATA.map(d => ({ value: d.ai, vacantes: d.n_ai }));

    return {
      backgroundColor: 'transparent',
      grid: { left: '3%', right: '4%', bottom: '18%', top: '8%', containLabel: true },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        backgroundColor: isDark ? '#1f2937' : '#ffffff',
        borderColor: isDark ? '#374151' : '#e5e7eb',
        textStyle: { color: isDark ? '#f9fafb' : '#111827', fontSize: 12 },
        formatter: (params: any[]) => {
          const levelName = params[0].name;
          const dataRow = DATA.find(d => d.level === levelName);
          if (!dataRow) return '';
          
          const premiumPct = Math.round(((dataRow.ai - dataRow.noAi) / dataRow.noAi) * 100);
          
          return `<div style="min-width: 220px;">
            <div style="font-weight: 700; margin-bottom: 8px; color: ${labelColor}; padding-bottom: 4px; border-bottom: 1px solid ${gridColor}">
              Nivel: ${levelName}
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 4px;">
              <span style="color: ${COLOR_NOAI}; font-weight: 600;">Roles sin IA</span>
              <strong>$${dataRow.noAi.toLocaleString()} USD</strong>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 8px;">
              <span style="color: ${COLOR_AI}; font-weight: 600;">Roles con IA</span>
              <strong>$${dataRow.ai.toLocaleString()} USD</strong>
            </div>
            <div style="background: ${isDark ? '#374151' : '#f1f5f9'}; padding: 4px 8px; border-radius: 4px; display: inline-block; font-size: 11px;">
              <strong style="color: #10b981;">+${premiumPct}%</strong> de AI Premium
            </div>
          </div>`;
        }
      },
      legend: {
        bottom: 0,
        textStyle: { color: textColor, fontSize: 11, fontWeight: 600 },
        itemWidth: 16, itemHeight: 16, borderRadius: 4,
        data: ['Roles de PM sin IA (Vacantes=575)', 'Roles de PM con IA (Vacantes=322)']
      },
      xAxis: {
        type: 'value',
        axisLabel: { 
          color: textColor, 
          formatter: (value: number) => `$${value >= 1000 ? (value/1000) + 'k' : value}` 
        },
        name: 'Salario Base Anual (USD)',
        nameLocation: 'middle',
        nameGap: 30,
        nameTextStyle: { color: textColor, fontSize: 11, fontWeight: 500 },
        splitLine: { lineStyle: { color: gridColor, type: 'dashed' } }
      },
      yAxis: {
        type: 'category',
        data: levels,
        axisLabel: { color: labelColor, fontWeight: 600, fontSize: 12, fontFamily: 'var(--font-sans), sans-serif' },
        axisLine: { lineStyle: { color: gridColor } },
        axisTick: { show: false }
      },
      series: [
        {
          name: 'Roles de PM sin IA (Vacantes=575)',
          type: 'bar',
          data: noAiData,
          itemStyle: { color: COLOR_NOAI, borderRadius: [0, 4, 4, 0] },
          barWidth: 14,
          barGap: '15%',
          label: {
            show: true,
            position: 'right',
            formatter: (params: any) => `${params.data.vacantes} vacantes`,
            color: textColor,
            fontSize: 10
          }
        },
        {
          name: 'Roles de PM con IA (Vacantes=322)',
          type: 'bar',
          data: aiData,
          itemStyle: { color: COLOR_AI, borderRadius: [0, 4, 4, 0] },
          barWidth: 14,
          label: {
            show: true,
            position: 'right',
            formatter: (params: any) => `${params.data.vacantes} vacantes`,
            color: textColor,
            fontSize: 10
          }
        }
      ]
    };
  }, [isDark, textColor, gridColor, labelColor]);

  if (!mounted) return null;

  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex flex-col w-full">
        {/* Header */}
        <div className="mb-5">
          <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
            El "AI Premium" en Compensación <TrendingUp className="w-5 h-5 text-emerald-500" />
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Diferencia en la oferta salarial base anualizada (USD) según el nivel de seniority.
          </p>
        </div>

        {/* 💡 Antes de explorar */}
        <div className="mb-5 text-xs text-muted-foreground bg-muted/40 border border-border/40 rounded-md px-3 py-2.5">
          <p className="font-bold text-foreground/80 mb-1.5">💡 Antes de explorar</p>
          <ul className="list-disc list-inside space-y-1 leading-relaxed">
            <li>Analizamos 897 vacantes PM que transparentan su banda salarial en Estados Unidos.</li>
            <li>Dado que Estados Unidos paga salarios superiores y publica más roles de IA, un promedio global generaría una "Paradoja de Simpson". Por eso esta gráfica aisla exclusivamente el mercado de EE.UU. como indicador adelantado.</li>
            <li><strong>Dato Curioso de Transparencia:</strong> En nuestra muestra, el <strong>67%</strong> de las vacantes de Producto en EE.UU. publican su salario abiertamente, frente a un alarmante <strong>5.3%</strong> en LATAM. La falta de transparencia salarial en nuestra región nos obliga a usar a EE.UU. como benchmark.</li>
          </ul>
        </div>

        {/* Main layout: chart left, cards right */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 xl:gap-8 items-center border border-border/50 rounded-xl p-4 bg-background">
          {/* Bar Chart */}
          <div className="h-[320px] w-full">
            <ReactECharts
              option={option}
              notMerge={true}
              style={{ height: '100%', width: '100%' }}
              opts={{ renderer: 'svg' }}
            />
          </div>

          {/* Insight cards */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-foreground mb-1">Crecimiento (Premium)</h4>
            {DATA.slice().reverse().map(row => {
              const premiumPct = Math.round(((row.ai - row.noAi) / row.noAi) * 100);
              return (
                <div key={row.level} className="rounded-lg border border-border/60 bg-background px-4 py-3 flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-foreground">{row.level}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">N = {row.total}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    <span className="text-lg font-bold text-emerald-500">+{premiumPct}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Narrative callout */}
        <div className="mt-5 rounded-lg border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/60 dark:bg-emerald-950/20 px-4 py-3 text-sm text-emerald-900 dark:text-emerald-200 leading-relaxed">
          <strong>📊 El hallazgo clave:</strong> El mercado recompensa de forma agresiva la transición a IA en las etapas tempranas de la carrera. 
          Un rol Junior o Senior ve un premium salarial de entre el <strong>+24% y +39%</strong>. Para roles directivos, el incremento es menor (+12%) 
          porque el salario ya asume un liderazgo estratégico avanzado.
        </div>
      </div>
    </TooltipProvider>
  );
}
