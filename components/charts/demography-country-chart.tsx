"use client"

import React from 'react';
import ReactECharts from 'echarts-for-react';

// Source: BigQuery — v3l4-493018.jobs.product_management_consolidated
// WHERE is_pm_role = true, GROUP BY country ORDER BY pm_count DESC
// Total PM roles: 2,836
const data = [
  { country: "🇵🇪 Perú",            pm_count: 73   },
  { country: "🇨🇱 Chile",           pm_count: 182  },
  { country: "🇨🇴 Colombia",        pm_count: 201  },
  { country: "🇲🇽 México",          pm_count: 415  },
  { country: "🇧🇷 Brasil",         pm_count: 626  },
  { country: "🇺🇸 Estados Unidos", pm_count: 1339 },
];

const TOTAL = 2836;

export function DemographyCountryChart({
  viewMode = 'absolute'
}: {
  viewMode?: 'absolute' | 'percentage'
}) {
  const isPercentage = viewMode === 'percentage';

  const chartData = data.map(d => ({
    country: d.country,
    value: isPercentage
      ? parseFloat(((d.pm_count / TOTAL) * 100).toFixed(1))
      : d.pm_count,
    rawCount: d.pm_count,
  }));

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params: any) => {
        const p = params[0];
        const pct = ((p.data.rawCount / TOTAL) * 100).toFixed(1);
        return `<strong>${p.axisValue}</strong><br/>
          ${p.data.rawCount.toLocaleString('en-US')} vacantes de PM<br/>
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
      max: isPercentage ? 50 : undefined,
      axisLabel: {
        formatter: isPercentage ? '{value}%' : '{value}',
        fontSize: 11,
        color: '#64748b',
      },
      splitLine: { lineStyle: { type: 'dashed', color: 'rgba(0,0,0,0.08)' } }
    },
    yAxis: {
      type: 'category',
      data: chartData.map(d => d.country),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { fontSize: 12, color: '#374151' }
    },
    series: [
      {
        name: 'Vacantes de PM',
        type: 'bar',
        barMaxWidth: 40,
        data: chartData.map(d => ({
          value: d.value,
          rawCount: d.rawCount,
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
          formatter: (p: any) => isPercentage
            ? `${p.value}%`
            : p.data.rawCount.toLocaleString('en-US'),
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
