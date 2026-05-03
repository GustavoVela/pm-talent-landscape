"use client"

/**
 * sample-recency-chart.tsx
 *
 * Barras: distribución temporal de vacantes por fecha de publicación.
 * Verifica la frescura del dataset y ausencia de sesgos por acumulación histórica.
 */

import React from 'react'
import { useTheme } from 'next-themes';
import ReactECharts from 'echarts-for-react'

// Data from BigQuery: weekly PM job postings (is_pm_role = true)
// Query: DATE_TRUNC(DATE(job_posted_date), WEEK(MONDAY)) grouped count
const weeklyData = [
  { week: "Mar 16", jobs: 2 },
  { week: "Mar 23", jobs: 25 },
  { week: "Mar 30", jobs: 184 },
  { week: "Abr 6",  jobs: 540 },
  { week: "Abr 13", jobs: 1818 },
  { week: "Abr 20", jobs: 267 },
]

export function SampleRecencyChart() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const option = {
    tooltip: {
      backgroundColor: isDark ? '#1f2937' : '#ffffff',
      borderColor: isDark ? '#374151' : '#e5e7eb',
      textStyle: { color: isDark ? '#f9fafb' : '#111827', fontSize: 12 },
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params: any) => {
        const d = params[0]
        const pct = ((d.value / 2836) * 100).toFixed(1)
        return `<div style="font-size:13px;padding:2px 0">
          <strong>Semana del ${d.name}</strong><br/>
          ${d.value.toLocaleString()} vacantes validadas<br/>
          <span style="color:#94a3b8">${pct}% del total</span>
        </div>`
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '12%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: weeklyData.map(d => d.week),
      name: 'Semana de publicación',
      nameLocation: 'middle',
      nameGap: 36,
      nameTextStyle: { fontSize: 11, color: '#94a3b8' },
      axisLabel: {
        fontSize: 12,
        color: '#64748b',
      },
      axisTick: { show: false },
      axisLine: { lineStyle: { color: '#e2e8f0' } }
    },
    yAxis: {
      type: 'value',
      name: 'Cantidad de vacantes',
      nameTextStyle: { fontSize: 11, color: '#94a3b8', padding: [0, 0, 0, 20] },
      axisLabel: {
        fontSize: 11,
        color: '#94a3b8',
        formatter: (val: number) => val >= 1000 ? `${val / 1000}k` : String(val)
      },
      splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } }
    },
    series: [
      {
        name: 'Vacantes PM',
        type: 'bar',
        barMaxWidth: 56,
        data: weeklyData.map((d, i) => ({
          value: d.jobs,
          itemStyle: {
            // Highlight the dominant recent week in primary blue
            color: i === 4
              ? { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#0ea5e9' }, { offset: 1, color: '#38bdf8' }] }
              : { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#334155' }, { offset: 1, color: '#475569' }] },
            borderRadius: [4, 4, 0, 0],
          },
          label: {
            show: true,
            position: 'top',
            formatter: (p: any) => p.value >= 100 ? p.value.toLocaleString() : '',
            color: '#64748b',
            fontSize: 11,
            fontWeight: 600,
          }
        })),
        emphasis: {
          itemStyle: { opacity: 0.85 }
        }
      }
    ]
  }

  return (
    <div className="flex-1 w-full min-h-[250px]">
      <ReactECharts
        option={option}
        style={{ height: '100%', width: '100%' }}
        opts={{ renderer: 'svg' }}
      />
    </div>
  )
}
