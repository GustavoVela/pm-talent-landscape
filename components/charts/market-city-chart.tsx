"use client"

import React, { useMemo } from 'react';
import { useTheme } from 'next-themes';
import ReactECharts from 'echarts-for-react';

// Source: BigQuery — v3l4-493018.jobs.product_management_consolidated
// WHERE is_pm_role = true, top cities consolidated (variants merged)
// Consolidation: grouped by metropolitan area / country name
const rawCityData = [
  // United States
  { country: "US", label: "🇺🇸 Otra (Nivel País)", pm_count: 542 },
  { country: "US", label: "🇺🇸 New York", pm_count: 246 },
  { country: "US", label: "🇺🇸 San Francisco Bay Area", pm_count: 225 },
  { country: "US", label: "🇺🇸 Boston", pm_count: 49 },
  { country: "US", label: "🇺🇸 Seattle", pm_count: 47 },
  { country: "US", label: "🇺🇸 Los Angeles", pm_count: 42 },
  { country: "US", label: "🇺🇸 Dallas", pm_count: 32 },
  { country: "US", label: "🇺🇸 Chicago", pm_count: 29 },
  { country: "US", label: "🇺🇸 Austin", pm_count: 24 },
  { country: "US", label: "🇺🇸 Atlanta", pm_count: 23 },
  { country: "US", label: "🇺🇸 Philadelphia", pm_count: 16 },
  { country: "US", label: "🇺🇸 Denver", pm_count: 16 },
  { country: "US", label: "🇺🇸 Washington, D.C.", pm_count: 15 },
  { country: "US", label: "🇺🇸 Charlotte", pm_count: 11 },
  { country: "US", label: "🇺🇸 San Diego", pm_count: 9 },
  { country: "US", label: "🇺🇸 Houston", pm_count: 8 },
  { country: "US", label: "🇺🇸 Miami", pm_count: 5 },
  
  // Brazil
  { country: "BR", label: "🇧🇷 São Paulo", pm_count: 341 },
  { country: "BR", label: "🇧🇷 Otra (Nivel País)", pm_count: 151 },
  { country: "BR", label: "🇧🇷 Rio de Janeiro", pm_count: 28 },
  { country: "BR", label: "🇧🇷 Belo Horizonte", pm_count: 26 },
  { country: "BR", label: "🇧🇷 Porto Alegre", pm_count: 21 },
  { country: "BR", label: "🇧🇷 Fortaleza", pm_count: 11 },
  { country: "BR", label: "🇧🇷 Florianópolis", pm_count: 10 },
  { country: "BR", label: "🇧🇷 Brasília", pm_count: 9 },
  { country: "BR", label: "🇧🇷 Curitiba", pm_count: 8 },
  { country: "BR", label: "🇧🇷 Blumenau", pm_count: 7 },

  // Mexico
  { country: "MX", label: "🇲🇽 Ciudad de México", pm_count: 242 },
  { country: "MX", label: "🇲🇽 Otra (Nivel País)", pm_count: 95 },
  { country: "MX", label: "🇲🇽 Guadalajara", pm_count: 29 },
  { country: "MX", label: "🇲🇽 Monterrey", pm_count: 25 },
  { country: "MX", label: "🇲🇽 Querétaro", pm_count: 8 },

  // Colombia
  { country: "CO", label: "🇨🇴 Bogotá", pm_count: 105 },
  { country: "CO", label: "🇨🇴 Otra (Nivel País)", pm_count: 58 },
  { country: "CO", label: "🇨🇴 Medellín", pm_count: 15 },
  { country: "CO", label: "🇨🇴 Bucaramanga", pm_count: 6 },
  { country: "CO", label: "🇨🇴 Pereira", pm_count: 5 },
  { country: "CO", label: "🇨🇴 Cali", pm_count: 5 },
  { country: "CO", label: "🇨🇴 Barranquilla", pm_count: 4 },

  // Chile
  { country: "CL", label: "🇨🇱 Santiago", pm_count: 165 },
  { country: "CL", label: "🇨🇱 Otra (Nivel País)", pm_count: 17 },

  // Peru
  { country: "PE", label: "🇵🇪 Lima", pm_count: 57 },
  { country: "PE", label: "🇵🇪 Otra (Nivel País)", pm_count: 15 },
];

const TOTAL = 2836;

export function MarketCityChart({
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
    let data = rawCityData;

    if (selectedCountry !== 'all') {
      const code = countryCodeMap[selectedCountry] || selectedCountry;
      data = rawCityData.filter(d => d.country === code);
    }

    // Sort desc, take top 15, reverse for ECharts (so largest is at top)
    return [...data]
      .sort((a, b) => b.pm_count - a.pm_count)
      .slice(0, 15)
      .reverse();
  }, [selectedCountry, viewMode]);

  const option = {
    tooltip: {
      backgroundColor: isDark ? '#1f2937' : '#ffffff',
      borderColor: isDark ? '#374151' : '#e5e7eb',
      textStyle: { color: isDark ? '#f9fafb' : '#111827', fontSize: 12 },
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params: any) => {
        const p = params[0];
        const pct = ((p.data.rawCount / TOTAL) * 100).toFixed(1);
        return `<strong>${p.axisValue}</strong><br/>
          ${p.data.rawCount.toLocaleString('en-US')} roles de PM<br/>
          <span style="color:#94a3b8">${pct}% del total</span>`;
      }
    },
    grid: {
      left: '3%',
      right: '10%',
      bottom: '5%',
      top: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      name: isPercentage ? 'Porcentaje del total (%)' : 'Cantidad de vacantes',
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
      axisLabel: { fontSize: 10, color: '#374151', interval: 0 }
    },
    series: [
      {
        name: 'Vacantes de PM',
        type: 'bar',
        barMaxWidth: 36,
        data: filteredData.map(d => ({
          value: isPercentage
            ? parseFloat(((d.pm_count / TOTAL) * 100).toFixed(1))
            : d.pm_count,
          rawCount: d.pm_count,
          itemStyle: {
            color: {
              type: 'linear', x: 0, y: 0, x2: 1, y2: 0,
              colorStops: [{ offset: 0, color: '#38bdf8' }, { offset: 1, color: '#0ea5e9' }]
            },
            borderRadius: [0, 4, 4, 0],
          }
        })),
        label: {
          show: true,
          position: 'right',
          formatter: (p: any) => isPercentage ? `${p.value}%` : p.data.rawCount.toLocaleString('en-US'),
          color: '#374151',
          fontSize: 10,
          fontWeight: 600,
        }
      }
    ]
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 w-full min-h-[250px]">
        <ReactECharts
          option={option}
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'svg' }}
        />
      </div>
    </div>
  );
}
