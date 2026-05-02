"use client"

import React, { useMemo } from 'react';
import { useTheme } from 'next-themes';
import ReactECharts from 'echarts-for-react';

// Source: BigQuery — v3l4-493018.jobs.product_management_consolidated
// WHERE is_pm_role = true, top cities consolidated (variants merged)
// Consolidation: grouped by metropolitan area / country name
const rawCityData = [
  // United States
  { country: "US", label: "🇺🇸 New York (US)",         pm_count: 240 }, // NY + NY Metro + New York US
  { country: "US", label: "🇺🇸 San Francisco (US)",     pm_count: 173 }, // SF + San Jose + SF Bay Area
  { country: "US", label: "🇺🇸 Otros (US)",             pm_count: 926 }, // United States + others
  // Brazil
  { country: "BR", label: "🇧🇷 São Paulo (BR)",         pm_count: 290 }, // SP + Greater SP + SP Brazil
  { country: "BR", label: "🇧🇷 Belo Horizonte (BR)",    pm_count: 17  },
  { country: "BR", label: "🇧🇷 Campinas (BR)",          pm_count: 16  },
  { country: "BR", label: "🇧🇷 Otros (BR)",             pm_count: 303 }, // Brazil + others
  // Mexico
  { country: "MX", label: "🇲🇽 Ciudad de México (MX)", pm_count: 273 }, // Mexico City + CDMX Metro + Mexico
  { country: "MX", label: "🇲🇽 Monterrey (MX)",        pm_count: 17  },
  { country: "MX", label: "🇲🇽 Guadalajara (MX)",       pm_count: 17  },
  { country: "MX", label: "🇲🇽 Otros (MX)",             pm_count: 108 },
  // Colombia
  { country: "CO", label: "🇨🇴 Bogotá (CO)",            pm_count: 99  },
  { country: "CO", label: "🇨🇴 Otros (CO)",             pm_count: 102 }, // Colombia + others
  // Chile
  { country: "CL", label: "🇨🇱 Santiago (CL)",          pm_count: 142 }, // Santiago + Las Condes + Santiago Metro
  { country: "CL", label: "🇨🇱 Otros (CL)",             pm_count: 40  },
  // Peru
  { country: "PE", label: "🇵🇪 Lima (PE)",              pm_count: 46  },
  { country: "PE", label: "🇵🇪 Otros (PE)",             pm_count: 27  },
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
      .slice(0, 10)
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
      bottom: '15%',
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
      axisLabel: { fontSize: 11, color: '#374151' }
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
      <div className="h-[240px] w-full -mt-4">
        <ReactECharts
          option={option}
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'svg' }}
        />
      </div>
    </div>
  );
}
