"use client"

import React from 'react';
import ReactECharts from 'echarts-for-react';

const data = [
  { value: 2836, name: "Cargo Core de Producto" },
  { value: 635, name: "Cargos en otra área" }
];

export function NoiseFilterChart() {
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} vacantes ({d}%)'
    },
    legend: {
      bottom: '0%',
      left: 'center',
      icon: 'circle'
    },
    color: ['#0ea5e9', '#f43f5e'],
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
          formatter: '{d}%',
          color: '#fff',
          fontSize: 14,
          fontWeight: 'bold'
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
    <div className="h-[350px] w-full">
      <ReactECharts 
        option={option} 
        style={{ height: '100%', width: '100%' }} 
        opts={{ renderer: 'svg' }}
      />
    </div>
  );
}
