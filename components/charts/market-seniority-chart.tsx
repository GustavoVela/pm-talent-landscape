"use client"

import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';

// Source: BigQuery — v3l4-493018.jobs.product_management_consolidated
// WHERE is_pm_role = true, GROUP BY country, seniority
const rawData = [
  // BR
  { country: "BR", seniority: "Mid-Level", count: 274 },
  { country: "BR", seniority: "Senior", count: 248 },
  { country: "BR", seniority: "Junior", count: 38 },
  { country: "BR", seniority: "Lead", count: 39 },
  { country: "BR", seniority: "Director", count: 24 },
  { country: "BR", seniority: "Executive", count: 3 },
  // CL
  { country: "CL", seniority: "Mid-Level", count: 111 },
  { country: "CL", seniority: "Senior", count: 34 },
  { country: "CL", seniority: "Junior", count: 27 },
  { country: "CL", seniority: "Lead", count: 6 },
  { country: "CL", seniority: "Director", count: 4 },
  // CO
  { country: "CO", seniority: "Senior", count: 88 },
  { country: "CO", seniority: "Mid-Level", count: 86 },
  { country: "CO", seniority: "Lead", count: 9 },
  { country: "CO", seniority: "Junior", count: 8 },
  { country: "CO", seniority: "Director", count: 10 },
  // MX
  { country: "MX", seniority: "Mid-Level", count: 150 },
  { country: "MX", seniority: "Senior", count: 195 },
  { country: "MX", seniority: "Director", count: 19 },
  { country: "MX", seniority: "Lead", count: 19 },
  { country: "MX", seniority: "Junior", count: 28 },
  { country: "MX", seniority: "Executive", count: 4 },
  // PE
  { country: "PE", seniority: "Mid-Level", count: 29 },
  { country: "PE", seniority: "Senior", count: 16 },
  { country: "PE", seniority: "Lead", count: 9 },
  { country: "PE", seniority: "Junior", count: 15 },
  { country: "PE", seniority: "Director", count: 4 },
  // US
  { country: "US", seniority: "Executive", count: 219 },
  { country: "US", seniority: "Junior", count: 240 },
  { country: "US", seniority: "Director", count: 257 },
  { country: "US", seniority: "Lead", count: 53 },
  { country: "US", seniority: "Senior", count: 297 },
  { country: "US", seniority: "Mid-Level", count: 273 }
];

export function MarketSeniorityChart({
  viewMode = 'absolute',
  selectedCountry = 'all'
}: {
  viewMode?: 'absolute' | 'percentage',
  selectedCountry?: string
}) {
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

    // Aggregate by seniority
    const agg: Record<string, number> = {
      "Executive": 0,
      "Director": 0,
      "Lead": 0,
      "Senior": 0,
      "Mid-Level": 0,
      "Junior": 0
    };

    data.forEach(d => {
      if (agg[d.seniority] !== undefined) {
        agg[d.seniority] += d.count;
      }
    });

    return {
      "Ejecutivo (VP, C-Level)": agg["Executive"],
      "Director": agg["Director"],
      "Lead / Principal": agg["Lead"],
      "Senior": agg["Senior"],
      "Mid-Level": agg["Mid-Level"],
      "Junior / Entry": agg["Junior"]
    };
  }, [selectedCountry]);

  const totalFiltered = useMemo(() => {
    return Object.values(filteredData).reduce((a, b) => a + b, 0);
  }, [filteredData]);

  // Order from bottom to top for ECharts
  const chartData = [
    { label: "Ejecutivo (VP, C-Level)", raw: filteredData["Ejecutivo (VP, C-Level)"] },
    { label: "Director", raw: filteredData["Director"] },
    { label: "Lead / Principal", raw: filteredData["Lead / Principal"] },
    { label: "Senior", raw: filteredData["Senior"] },
    { label: "Mid-Level", raw: filteredData["Mid-Level"] },
    { label: "Junior / Entry", raw: filteredData["Junior / Entry"] },
  ].map(d => ({
    ...d,
    value: isPercentage && totalFiltered > 0 ? parseFloat(((d.raw / totalFiltered) * 100).toFixed(1)) : d.raw
  }));

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params: any) => {
        const p = params[0];
        const pct = totalFiltered > 0 ? ((p.data.raw / totalFiltered) * 100).toFixed(1) : 0;
        return `<strong>${p.axisValue}</strong><br/>
          ${p.data.raw.toLocaleString('en-US')} vacantes de PM<br/>
          <span style="color:#94a3b8">${pct}% del total seleccionado</span>`;
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
      data: chartData.map(d => d.label),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { fontSize: 12, color: '#374151' }
    },
    series: [
      {
        name: 'Vacantes de PM',
        type: 'bar',
        barMaxWidth: 36,
        data: chartData.map((d, i) => ({
          value: d.value,
          raw: d.raw,
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
          formatter: (p: any) => isPercentage ? `${p.value}%` : p.data.raw.toLocaleString('en-US'),
          color: '#374151',
          fontSize: 11,
          fontWeight: 600,
        }
      }
    ]
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="h-[280px] w-full -mt-4">
        <ReactECharts
          option={option}
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'svg' }}
        />
      </div>
    </div>
  );
}
