"use client"

import React from 'react';
import ReactECharts from 'echarts-for-react';

// Source: BigQuery — v3l4-493018.jobs.product_management_consolidated
// WHERE is_pm_role = true, GROUP BY seniority
// Total PM roles: 2,836
const data = [
  { seniority: "Junior", value: 356 },
  { seniority: "Mid-Level", value: 923 },
  { seniority: "Senior", value: 878 },
  { seniority: "Lead", value: 135 },
  { seniority: "Director", value: 318 },
  { seniority: "Executive", value: 226 },
];

const TOTAL = 2836;

export function DemographySeniorityChart({
  viewMode = 'absolute'
}: {
  viewMode?: 'absolute' | 'percentage'
}) {
  const isPercentage = viewMode === 'percentage';

  // Sort descending by typical hierarchy or by volume? 
  // Let's sort by hierarchy logic, but Echarts draws from bottom to top in horizontal bars
  // The array from bottom (first) to top (last)
  const chartData = [
    { label: "Ejecutivo (VP, C-Level)", value: 226, raw: 226 },
    { label: "Director", value: 318, raw: 318 },
    { label: "Lead / Principal", value: 135, raw: 135 },
    { label: "Senior", value: 878, raw: 878 },
    { label: "Mid-Level", value: 923, raw: 923 },
    { label: "Junior / Entry", value: 356, raw: 356 },
  ].map(d => ({
    ...d,
    value: isPercentage ? parseFloat(((d.raw / TOTAL) * 100).toFixed(1)) : d.raw
  }));

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params: any) => {
        const p = params[0];
        const pct = ((p.data.raw / TOTAL) * 100).toFixed(1);
        return `<strong>${p.axisValue}</strong><br/>
          ${p.data.raw.toLocaleString('es-MX')} roles de PM<br/>
          <span style="color:#94a3b8">${pct}% del total</span>`;
      }
    },
    grid: {
      left: '3%',
      right: '10%',
      bottom: '3%',
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
        name: 'Roles de PM',
        type: 'bar',
        barMaxWidth: 36,
        data: chartData.map((d, i) => ({
          value: d.value,
          raw: d.raw,
          itemStyle: {
            color: '#0ea5e9', // Base color
            borderRadius: [0, 4, 4, 0],
          }
        })),
        label: {
          show: true,
          position: 'right',
          formatter: (p: any) => isPercentage
            ? `${p.value}%`
            : p.data.raw >= 1000
              ? p.data.raw.toLocaleString('es-MX')
              : String(p.data.raw),
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
