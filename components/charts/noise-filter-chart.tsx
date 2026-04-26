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
      bottom: '5%',
      left: 'center',
      icon: 'circle'
    },
    color: ['#0ea5e9', '#f43f5e'],
    series: [
      {
        name: 'Filtro de Ruido',
        type: 'pie',
        radius: ['50%', '80%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
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
    <div className="h-[400px] w-full">
      <ReactECharts 
        option={option} 
        style={{ height: '100%', width: '100%' }} 
        opts={{ renderer: 'svg' }}
      />
    </div>
  );
}
