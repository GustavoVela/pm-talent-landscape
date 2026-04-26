"use client"

import React from 'react';
import ReactECharts from 'echarts-for-react';

const data = [
  { name: 'EE.UU.', value: 1339 },
  { name: 'Brasil', value: 626 },
  { name: 'México', value: 415 },
  { name: 'Colombia', value: 201 },
  { name: 'Chile', value: 182 },
  { name: 'Perú', value: 73 }
].sort((a, b) => a.value - b.value); // Sort ascending for ECharts horizontal bar

export function JobsByCountryChart() {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: function (params: any) {
        const val = params[0].value;
        const total = 2836;
        const percent = ((val / total) * 100).toFixed(1);
        return `${params[0].name}: ${val} vacantes (${percent}%)`;
      }
    },
    grid: {
      left: '3%',
      right: '8%',
      bottom: '3%',
      top: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      splitLine: {
        lineStyle: { type: 'dashed', color: 'rgba(0,0,0,0.1)' }
      }
    },
    yAxis: {
      type: 'category',
      data: data.map(item => item.name),
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: [
      {
        name: 'Vacantes',
        type: 'bar',
        data: data.map(item => item.value),
        itemStyle: {
          color: '#0ea5e9',
          borderRadius: [0, 4, 4, 0]
        },
        label: {
          show: true,
          position: 'right',
          formatter: '{c}'
        }
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
