"use client"

import React, { useMemo } from 'react';
import { useTheme } from 'next-themes';
import ReactECharts from 'echarts-for-react';
import rawData from '@/lib/data/market_industry_grouped.json';

export function MarketIndustryChart({
  viewMode = 'absolute',
  selectedCountry = 'all'
}: {
  viewMode?: 'absolute' | 'percentage',
  selectedCountry?: string
}) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const isPercentage = viewMode === 'percentage';

  const countryCodeMap: Record<string, string> = {
    'United States': 'US',
    'Brasil': 'BR',
    'México': 'MX',
    'Colombia': 'CO',
    'Chile': 'CL',
    'Perú': 'PE',
  };

  const filteredData = useMemo(() => {
    let data = rawData as { country: string; industry: string; count: number }[];
    const code = countryCodeMap[selectedCountry] || selectedCountry;

    if (selectedCountry !== 'all') {
      data = data.filter(d => d.country === code);
    }

    const agg: Record<string, number> = {};
    data.forEach(d => {
      agg[d.industry] = (agg[d.industry] || 0) + d.count;
    });

    const top15 = Object.keys(agg)
      .map(k => ({ label: k, count: agg[k] }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 15);

    return top15.reverse(); // ECharts renders bottom-to-top
  }, [selectedCountry]);

  const totalFiltered = useMemo(() => {
    return filteredData.reduce((acc, d) => acc + d.count, 0);
  }, [filteredData]);

  const option = {
    tooltip: {
      backgroundColor: isDark ? '#1f2937' : '#ffffff',
      borderColor: isDark ? '#374151' : '#e5e7eb',
      textStyle: { color: isDark ? '#f9fafb' : '#111827', fontSize: 12 },
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params: any) => {
        const p = params[0];
        const pct = totalFiltered > 0 ? ((p.data.raw / totalFiltered) * 100).toFixed(1) : 0;
        return `<strong>${p.axisValue}</strong><br/>
          ${p.data.raw.toLocaleString('es-MX')} vacantes de PM<br/>
          <span style="color:#94a3b8">${pct}% del Top 15</span>`;
      }
    },
    grid: {
      left: '3%',
      right: '10%',
      bottom: '15%',
      top: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      name: isPercentage ? 'Porcentaje (%)' : 'Cantidad de vacantes',
      nameLocation: 'middle',
      nameGap: 30,
      nameTextStyle: { fontSize: 11, color: '#94a3b8' },
      axisLabel: {
        formatter: isPercentage ? '{value}%' : '{value}',
        fontSize: 11,
        color: '#64748b',
      },
      splitLine: { lineStyle: { type: 'dashed', color: 'rgba(0,0,0,0.08)' } }
    },
    yAxis: {
      type: 'category',
      data: filteredData.map(d => d.label),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { fontSize: 11, color: '#374151', width: 220, overflow: 'break' }
    },
    series: [
      {
        name: 'Vacantes de PM',
        type: 'bar',
        barMaxWidth: 24,
        data: filteredData.map(d => ({
          value: isPercentage && totalFiltered > 0 ? parseFloat(((d.count / totalFiltered) * 100).toFixed(1)) : d.count,
          raw: d.count,
          itemStyle: {
            color: {
              type: 'linear', x: 0, y: 0, x2: 1, y2: 0,
              colorStops: [{ offset: 0, color: '#38bdf8' }, { offset: 1, color: '#0ea5e9' }]
            },
            borderRadius: [0, 4, 4, 0]
          }
        })),
        label: {
          show: true,
          position: 'right',
          formatter: (p: any) => isPercentage ? `${p.value}%` : p.data.raw.toLocaleString('es-MX'),
          color: '#374151',
          fontSize: 11,
          fontWeight: 600,
        }
      }
    ]
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="h-[280px] w-full -mt-2">
        <ReactECharts
          option={option}
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'svg' }}
        />
      </div>
    </div>
  );
}
