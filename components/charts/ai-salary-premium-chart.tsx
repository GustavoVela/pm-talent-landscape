"use client";

import React, { useState, useEffect, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { useTheme } from 'next-themes';
import { TrendingUp } from 'lucide-react';
import {
  TooltipProvider,
} from '@/components/ui/tooltip';

// Datos controlados SOLO para el mercado de Estados Unidos para evitar sesgos geográficos
const DATA = [
  { level: 'Director / VP', total: 308, noAi: { min: 185408, max: 258908, n: 189 }, ai: { min: 208143, max: 279279, n: 119 } },
  { level: 'Senior / Lead', total: 261, noAi: { min: 138727, max: 200489, n: 133 }, ai: { min: 171968, max: 234010, n: 128 } },
  { level: 'Mid-Level',     total: 169, noAi: { min: 100778, max: 139597, n: 130 }, ai: { min: 115073, max: 158687, n:  39 } },
  { level: 'Junior',        total: 153, noAi: { min:  41021, max:  54918, n: 118 }, ai: { min:  55305, max:  88935, n:  35 } },
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
    
    // Arrays para las "Velas" (Barras Flotantes)
    // Para lograr el efecto, usamos una barra transparente base, y una barra visible apilada.
    const noAiBase  = DATA.map(d => ({ value: d.noAi.min }));
    const noAiRange = DATA.map(d => ({ value: d.noAi.max - d.noAi.min, realMin: d.noAi.min, realMax: d.noAi.max, vacantes: d.noAi.n }));
    
    const aiBase    = DATA.map(d => ({ value: d.ai.min }));
    const aiRange   = DATA.map(d => ({ value: d.ai.max - d.ai.min, realMin: d.ai.min, realMax: d.ai.max, vacantes: d.ai.n }));

    return {
      backgroundColor: 'transparent',
      grid: { left: '3%', right: '12%', bottom: '18%', top: '8%', containLabel: true },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        backgroundColor: isDark ? '#1f2937' : '#ffffff',
        borderColor: isDark ? '#374151' : '#e5e7eb',
        textStyle: { color: isDark ? '#f9fafb' : '#111827', fontSize: 12 },
        formatter: (params: any[]) => {
          // El tooltip interceptará las 4 series (2 bases transparentes, 2 rangos). 
          // Solo extraemos la data de las series de Rango.
          const rangeNoAi = params.find(p => p.seriesName === 'Roles de PM sin IA');
          const rangeAi   = params.find(p => p.seriesName === 'Roles de PM con IA');
          const levelName = params[0].name;

          if (!rangeNoAi || !rangeAi) return '';

          const formatUSD = (val: number) => `$${(val / 1000).toFixed(0)}k`;

          return `<div style="min-width: 240px;">
            <div style="font-weight: 700; margin-bottom: 8px; color: ${labelColor}; padding-bottom: 4px; border-bottom: 1px solid ${gridColor}">
              Nivel: ${levelName}
            </div>
            
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 4px;">
              <span style="color: ${COLOR_NOAI}; font-weight: 600;">Banda sin IA</span>
              <strong>${formatUSD(rangeNoAi.data.realMin)} - ${formatUSD(rangeNoAi.data.realMax)}</strong>
            </div>
            <div style="font-size: 10px; color: ${textColor}; text-align: right; margin-bottom: 8px;">
              (${rangeNoAi.data.vacantes} vacantes)
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 4px;">
              <span style="color: ${COLOR_AI}; font-weight: 600;">Banda con IA</span>
              <strong>${formatUSD(rangeAi.data.realMin)} - ${formatUSD(rangeAi.data.realMax)}</strong>
            </div>
            <div style="font-size: 10px; color: ${textColor}; text-align: right; margin-bottom: 8px;">
              (${rangeAi.data.vacantes} vacantes)
            </div>
          </div>`;
        }
      },
      legend: {
        bottom: 0,
        textStyle: { color: textColor, fontSize: 11, fontWeight: 600 },
        itemWidth: 16, itemHeight: 16, borderRadius: 4,
        data: ['Roles de PM sin IA', 'Roles de PM con IA']
      },
      xAxis: {
        type: 'value',
        axisLabel: { 
          color: textColor, 
          formatter: (value: number) => `$${value >= 1000 ? (value/1000) + 'k' : value}` 
        },
        name: 'Banda Salarial Anual (USD)',
        nameLocation: 'middle',
        nameGap: 30,
        nameTextStyle: { color: textColor, fontSize: 11, fontWeight: 500 },
        splitLine: { lineStyle: { color: gridColor, type: 'dashed' } },
        min: 'dataMin' // Empieza en el dato más bajo para destacar la barra
      },
      yAxis: {
        type: 'category',
        data: levels,
        axisLabel: { color: labelColor, fontWeight: 600, fontSize: 12, fontFamily: 'var(--font-sans), sans-serif' },
        axisLine: { lineStyle: { color: gridColor } },
        axisTick: { show: false }
      },
      series: [
        // ---- GRUPO: SIN IA ----
        {
          name: 'Base Invisible Sin IA',
          type: 'bar',
          stack: 'NoAiStack',
          itemStyle: { borderColor: 'transparent', color: 'transparent' },
          data: noAiBase,
          barWidth: 14,
          barGap: '20%' // Separación entre los dos stacks
        },
        {
          name: 'Roles de PM sin IA',
          type: 'bar',
          stack: 'NoAiStack',
          data: noAiRange,
          itemStyle: { 
            color: {
              type: 'linear', x: 0, y: 0, x2: 1, y2: 0,
              colorStops: [{ offset: 0, color: '#bbf7d0' }, { offset: 1, color: '#91cc75' }]
            }, 
            borderRadius: 4 
          }, // Bordes redondeados en la "vela"
          label: {
            show: true,
            position: 'right',
            formatter: (params: any) => `${params.data.vacantes} vacantes`,
            color: textColor,
            fontSize: 10
          }
        },

        // ---- GRUPO: CON IA ----
        {
          name: 'Base Invisible Con IA',
          type: 'bar',
          stack: 'AiStack',
          itemStyle: { borderColor: 'transparent', color: 'transparent' },
          data: aiBase,
          barWidth: 14
        },
        {
          name: 'Roles de PM con IA',
          type: 'bar',
          stack: 'AiStack',
          data: aiRange,
          itemStyle: { 
            color: {
              type: 'linear', x: 0, y: 0, x2: 1, y2: 0,
              colorStops: [{ offset: 0, color: '#38bdf8' }, { offset: 1, color: '#0ea5e9' }]
            }, 
            borderRadius: 4 
          },
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
            Distribución de bandas salariales anualizadas (USD) según nivel de seniority.
          </p>
        </div>

        {/* 💡 Antes de explorar */}
        <div className="mb-5 w-full">
          <div className="text-[13px] text-muted-foreground leading-relaxed mb-3">
            <span className="font-medium text-foreground">💡 Antes de explorar: </span>
            <ul className="list-disc list-inside space-y-1 mt-2 ml-1">
              <li>Analizamos ~900 vacantes PM que transparentan su banda salarial (Mínimo y Máximo) en Estados Unidos.</li>
              <li>Dado que Estados Unidos paga salarios superiores y publica más roles de IA, un promedio global generaría una "Paradoja de Simpson". Por eso esta gráfica aísla exclusivamente el mercado de EE.UU. como indicador adelantado.</li>
              <li><strong>Dato Curioso de Transparencia:</strong> En nuestra muestra, el <strong>67%</strong> de las vacantes de Producto en EE.UU. publican su salario abiertamente, frente a un alarmante <strong>5.3%</strong> en LATAM. Esta disparidad justifica el uso de EE.UU. como benchmark central.</li>
            </ul>
          </div>
          <div className="w-full h-px bg-border/60" />
        </div>

        {/* Main layout: chart left, cards right */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 xl:gap-8 items-center border border-border/50 rounded-xl p-4 bg-background">
          {/* Bar Chart */}
          <div className="h-[360px] w-full">
            <ReactECharts
              option={option}
              notMerge={true}
              style={{ height: '100%', width: '100%' }}
              opts={{ renderer: 'svg' }}
            />
          </div>

          {/* Insight cards */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-foreground mb-1">Crecimiento del Piso Salarial</h4>
            {DATA.slice().reverse().map(row => {
              // Premium calculado sobre el piso salarial (min)
              const premiumPct = Math.round(((row.ai.min - row.noAi.min) / row.noAi.min) * 100);
              return (
                <div key={row.level} className="rounded-lg border border-border/60 bg-background px-4 py-3 flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-foreground">{row.level}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">N = {row.total}</p>
                  </div>
                  <div className="flex flex-col items-end gap-0.5">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-lg font-bold text-emerald-500">+{premiumPct}%</span>
                    </div>
                    <span className="text-[9px] text-muted-foreground">Premium en el piso</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Narrative callout */}
        <div className="mt-5 rounded-lg border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/60 dark:bg-emerald-950/20 px-4 py-3 text-sm text-emerald-900 dark:text-emerald-200 leading-relaxed">
          <strong>📊 El hallazgo clave:</strong> Visualizado como "velas" (rango mínimo a máximo), el efecto es evidente. 
          El piso salarial de un PM con IA (el inicio de la barra azul) suele estar muy por encima del piso de un rol tradicional. 
          En niveles iniciales (Junior), adquirir competencias de IA <strong>eleva el piso salarial en un brutal +35%</strong>,
          demostrando que la IA funciona como un acelerador temprano de carrera.
        </div>
      </div>
    </TooltipProvider>
  );
}
