"use client"

import React, { useMemo } from 'react';
import { useTheme } from 'next-themes';
import ReactECharts from 'echarts-for-react';

const rawData = [
  {
    "country": "BR",
    "employment": "Full-time",
    "count": 586
  },
  {
    "country": "BR",
    "employment": "Contract / Externo",
    "count": 35
  },
  {
    "country": "BR",
    "employment": "Internship",
    "count": 4
  },
  {
    "country": "BR",
    "employment": "Part-time / Otros",
    "count": 1
  },
  {
    "country": "CL",
    "employment": "Full-time",
    "count": 177
  },
  {
    "country": "CL",
    "employment": "Contract / Externo",
    "count": 5
  },
  {
    "country": "CO",
    "employment": "Full-time",
    "count": 190
  },
  {
    "country": "CO",
    "employment": "Contract / Externo",
    "count": 7
  },
  {
    "country": "CO",
    "employment": "Part-time / Otros",
    "count": 2
  },
  {
    "country": "CO",
    "employment": "Part-time / Otros",
    "count": 2
  },
  {
    "country": "MX",
    "employment": "Full-time",
    "count": 389
  },
  {
    "country": "MX",
    "employment": "Part-time / Otros",
    "count": 6
  },
  {
    "country": "MX",
    "employment": "Contract / Externo",
    "count": 15
  },
  {
    "country": "MX",
    "employment": "Part-time / Otros",
    "count": 1
  },
  {
    "country": "MX",
    "employment": "Part-time / Otros",
    "count": 1
  },
  {
    "country": "MX",
    "employment": "Internship",
    "count": 3
  },
  {
    "country": "PE",
    "employment": "Full-time",
    "count": 70
  },
  {
    "country": "PE",
    "employment": "Contract / Externo",
    "count": 3
  },
  {
    "country": "US",
    "employment": "Full-time",
    "count": 1127
  },
  {
    "country": "US",
    "employment": "Contract / Externo",
    "count": 81
  },
  {
    "country": "US",
    "employment": "Part-time / Otros",
    "count": 5
  },
  {
    "country": "US",
    "employment": "Internship",
    "count": 94
  },
  {
    "country": "US",
    "employment": "Part-time / Otros",
    "count": 22
  },
  {
    "country": "US",
    "employment": "Part-time / Otros",
    "count": 6
  },
  {
    "country": "US",
    "employment": "Part-time / Otros",
    "count": 4
  }
];

export function MarketEmploymentChart({
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
    let data = rawData;
    const code = countryCodeMap[selectedCountry] || selectedCountry;
    
    if (selectedCountry !== 'all') {
      data = rawData.filter(d => d.country === code);
    }

    const agg: Record<string, number> = {};
    data.forEach(d => {
      agg[d.employment] = (agg[d.employment] || 0) + d.count;
    });

    return Object.keys(agg).map(k => ({ name: k, value: agg[k] })).sort((a, b) => b.value - a.value);
  }, [selectedCountry]);

  const option = {
    tooltip: {
      backgroundColor: isDark ? '#1f2937' : '#ffffff',
      borderColor: isDark ? '#374151' : '#e5e7eb',
      textStyle: { color: isDark ? '#f9fafb' : '#111827', fontSize: 12 },
      trigger: 'item',
      formatter: (p: any) => `${p.name}: <strong>${p.value.toLocaleString('en-US')}</strong> vacantes (${p.percent}%)`
    },
    legend: {
      bottom: '0%',
      left: 'center',
      icon: 'circle',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: { fontSize: 11, color: '#64748b' }
    },
    series: [
      {
        name: 'Tipo de Contrato',
        type: 'pie',
        radius: ['45%', '75%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 4,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: { 
          show: true,
          position: 'outside',
          formatter: (p: any) => `${p.name}\n${p.value.toLocaleString('en-US')} (${p.percent}%)`,
          color: '#374151',
          fontSize: 12,
          fontWeight: 600
        },
        labelLine: {
          show: true,
          length: 15,
          length2: 10,
          lineStyle: {
            color: '#cbd5e1'
          }
        },
        color: [
          "#0ea5e9", 
          "#91cc75", 
          "#fac858", 
          "#ee6666", 
          "#73c0de", 
          "#3ba272", 
          "#fc8452", 
          "#5470c6", 
          "#9a60b4", 
          "#ea7ccc"
        ],
        data: filteredData
      }
    ]
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="h-[240px] w-full">
        <ReactECharts
          option={option}
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'svg' }}
        />
      </div>
    </div>
  );
}
