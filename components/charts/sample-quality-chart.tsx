"use client"

import React from 'react';
import { useTheme } from 'next-themes';
import ReactECharts from 'echarts-for-react';

const data = [
  { value: 2836, name: "Cargo Core de Producto" },
  { value: 635, name: "Cargos en otra área" }
];

export function SampleQualityChart() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
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
      icon: 'circle'
    },
    color: [
      { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#38bdf8' }, { offset: 1, color: '#0ea5e9' }] },
      { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#fb7185' }, { offset: 1, color: '#e11d48' }] }
    ],
    series: [
      {
        name: 'Filtro de Ruido',
        type: 'pie',
        radius: ['45%', '75%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 8,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          position: 'inside',
          formatter: (p: any) => `{percent|${p.percent}%}\n{value|(${p.value.toLocaleString('en-US')} vacantes)}`,
          rich: {
            percent: {
              fontSize: 14,
              fontWeight: 'bold',
              color: '#fff',
              align: 'center'
            },
            value: {
              fontSize: 11,
              color: 'rgba(255, 255, 255, 0.9)',
              align: 'center',
              padding: [2, 0, 0, 0]
            }
          }
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: data
      }
    ]
  };

  return (
    <div className="h-[280px] w-full">
      <ReactECharts 
        option={option} 
        style={{ height: '100%', width: '100%' }} 
        opts={{ renderer: 'svg' }}
      />
    </div>
  );
}
