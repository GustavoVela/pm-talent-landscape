"use client";

import React, { useState, useEffect, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { useTheme } from 'next-themes';

const SERIES_DATA = [
  { name: 'Brasil',        color: '#fac858', values: [96.3, 37.4, 24.6, 53.2, 39.1, 64.9] },
  { name: 'Chile',         color: '#fc8452', values: [86.8, 32.4, 20.3, 48.9, 31.9, 70.9] },
  { name: 'Colombia',      color: '#0ea5e9', values: [94.0, 38.8, 27.9, 41.3, 36.3, 64.2] },
  { name: 'México',        color: '#91cc75', values: [91.8, 30.4, 23.1, 43.1, 38.8, 66.3] },
  { name: 'Perú',          color: '#73c0de', values: [79.5, 24.7, 16.4, 38.4, 26.0, 69.9] },
  { name: 'United States', color: '#9a60b4', values: [96.0, 36.0, 36.2, 56.2, 39.7, 73.6] },
];

const INDICATORS = [
  'Core Product', 'UX / UI', 'AI / GenAI', 'Data', 'Technical', 'Business'
];

export function CompetencyCountryRadar() {
  const [mounted, setMounted] = useState(false);
  const [hidden, setHidden] = useState<Record<string, boolean>>({});
  const { resolvedTheme } = useTheme();
  useEffect(() => setMounted(true), []);

  const isDark    = resolvedTheme === 'dark';
  const gridColor = isDark ? '#1e293b' : '#f1f5f9';
  const lineColor = isDark ? '#334155' : '#e2e8f0';
  const labelColor = isDark ? '#f1f5f9' : '#0f172a';
  const textColor  = isDark ? '#94a3b8' : '#475569';

  const toggle = (name: string) => setHidden(p => ({ ...p, [name]: !p[name] }));

  const option = useMemo(() => ({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: isDark ? '#1f2937' : '#ffffff',
      borderColor: isDark ? '#374151' : '#e5e7eb',
      textStyle: { color: isDark ? '#f9fafb' : '#111827', fontSize: 12 },
      formatter: (p: any) => {
        const vals = p.value as number[];
        const color = SERIES_DATA.find(s => s.name === p.seriesName)?.color ?? '#888';
        const rows = INDICATORS.map((ind, i) =>
          `<div style="display:flex;justify-content:space-between;gap:16px;padding:2px 0">
            <span style="color:${textColor}">${ind}</span><strong>${vals[i]}%</strong>
          </div>`).join('');
        return `<div style="min-width:190px">
          <div style="font-weight:700;margin-bottom:5px;color:${color}">${p.seriesName}</div>${rows}</div>`;
      }
    },
    radar: {
      indicator: INDICATORS.map(name => ({ name, max: 100 })),
      shape: 'polygon',
      splitNumber: 4,
      center: ['50%', '46%'],
      radius: '68%',
      startAngle: 90,
      axisName: { color: labelColor, fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-sans), sans-serif' },
      splitLine:  { lineStyle: { color: lineColor, width: 1 } },
      splitArea:  { areaStyle: { color: [gridColor, 'transparent', gridColor, 'transparent'] } },
      axisLine:   { lineStyle: { color: lineColor } },
    },
    series: [{
      type: 'radar',
      data: SERIES_DATA.map(s => ({
        name: s.name,
        value: hidden[s.name] ? [0,0,0,0,0,0] : s.values,
        symbol: 'circle', symbolSize: hidden[s.name] ? 0 : 4,
        lineStyle: { color: hidden[s.name] ? 'transparent' : s.color, width: 2 },
        areaStyle: { color: hidden[s.name] ? 'transparent' : s.color, opacity: 0.06 },
        itemStyle: { color: s.color },
      }))
    }],
  }), [isDark, hidden, gridColor, lineColor, labelColor, textColor]);

  if (!mounted) return <div className="h-[420px] w-full -mt-12 -mb-8" />;

  return (
    <div className="flex flex-col h-[420px] w-full -mt-12 -mb-8">
      <div className="flex-1">
        <ReactECharts option={option} notMerge={true} style={{ height: '100%', width: '100%' }} opts={{ renderer: 'svg' }} />
      </div>
      {/* Custom interactive legend */}
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 pb-2">
        {SERIES_DATA.map(s => (
          <button
            key={s.name}
            onClick={() => toggle(s.name)}
            className="flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-70"
            style={{ opacity: hidden[s.name] ? 0.35 : 1 }}
          >
            <span className="w-4 h-1.5 rounded-full inline-block" style={{ backgroundColor: hidden[s.name] ? '#cbd5e1' : s.color }} />
            <span className="text-sm font-semibold" style={{ color: hidden[s.name] ? '#94a3b8' : (isDark ? '#f1f5f9' : '#1e293b') }}>{s.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
