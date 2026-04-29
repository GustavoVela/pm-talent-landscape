"use client"

import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { Button } from "@/components/ui/button";

import { demographicsCountryData, FLAGS } from "@/lib/data";

export function DemographyCountryChart({ 
  viewMode = 'absolute'
}: { 
  viewMode?: 'absolute' | 'percentage'
}) {
  const isPercentage = viewMode === 'percentage';

  const grandTotal = demographicsCountryData.reduce((acc, curr) => acc + curr.total, 0);

  let chartData = demographicsCountryData.map(d => {
    const label = `${FLAGS[d.country] || ''} ${d.country}`;
    if (isPercentage) {
      return {
        country: label,
        pm: parseFloat(((d.pm_count / grandTotal) * 100).toFixed(1)),
        no_pm: parseFloat(((d.no_pm_count / grandTotal) * 100).toFixed(1))
      };
    }
    return {
      country: label,
      pm: d.pm_count,
      no_pm: d.no_pm_count
    };
  });

  if (isPercentage) {
    let sum = chartData.reduce((acc, curr) => acc + curr.pm + curr.no_pm, 0);
    const diff = parseFloat((100 - sum).toFixed(1));
    if (diff !== 0) {
      let maxVal = -1;
      let maxIdx = -1;
      let isPm = true;
      chartData.forEach((d, i) => {
        if (d.pm > maxVal) { maxVal = d.pm; maxIdx = i; isPm = true; }
        if (d.no_pm > maxVal) { maxVal = d.no_pm; maxIdx = i; isPm = false; }
      });
      if (isPm) {
        chartData[maxIdx].pm = parseFloat((chartData[maxIdx].pm + diff).toFixed(1));
      } else {
        chartData[maxIdx].no_pm = parseFloat((chartData[maxIdx].no_pm + diff).toFixed(1));
      }
    }
  }

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: function (params: any) {
        let res = `${params[0].axisValue}<br/>`;
        params.forEach((p: any) => {
          const val = isPercentage ? `${p.value}%` : p.value.toLocaleString();
          res += `${p.marker} ${p.seriesName}: ${val}<br/>`;
        });
        return res;
      }
    },
    legend: {
      bottom: 0,
      icon: 'circle',
      selected: {
        'Cargos en otra área': false
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      name: isPercentage ? 'Porcentaje (%)' : 'Cantidad de Vacantes',
      nameLocation: 'middle',
      nameGap: 30,
      nameTextStyle: { fontSize: 12, color: '#64748b' },
      max: isPercentage ? 100 : undefined,
      axisLabel: {
        formatter: isPercentage ? '{value}%' : '{value}'
      },
      splitLine: {
        lineStyle: { type: 'dashed', color: 'rgba(0,0,0,0.1)' }
      }
    },
    yAxis: {
      type: 'category',
      data: chartData.map(item => item.country),
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: [
      {
        name: 'Cargo de Producto',
        type: 'bar',
        stack: 'total',
        data: chartData.map(item => ({
          value: item.pm,
          // If no_pm is 0, this bar is the outermost — round its tip
          itemStyle: { color: '#0ea5e9', borderRadius: item.no_pm === 0 ? [0, 4, 4, 0] : [0, 0, 0, 0] }
        })),
        label: {
          show: true,
          position: 'inside',
          formatter: (p: any) => isPercentage ? `${p.value}%` : (p.value >= 1000 ? p.value.toLocaleString('es-MX') : String(p.value)),
          color: '#fff',
          fontSize: 11
        }
      },
      {
        name: 'Cargos en otra área',
        type: 'bar',
        stack: 'total',
        data: chartData.map(item => ({
          value: item.no_pm,
          // This is always the outermost visible segment when > 0
          itemStyle: { color: '#f43f5e', borderRadius: item.no_pm > 0 ? [0, 4, 4, 0] : [0, 0, 0, 0] }
        })),
        label: {
          show: true,
          position: 'inside',
          formatter: (p: any) => isPercentage ? `${p.value}%` : (p.value >= 1000 ? p.value.toLocaleString('es-MX') : String(p.value)),
          color: '#fff',
          fontSize: 11
        }
      }
    ]
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="h-[350px] w-full -mt-4">
        <ReactECharts 
          option={option} 
          style={{ height: '100%', width: '100%' }} 
          opts={{ renderer: 'svg' }}
        />
      </div>
    </div>
  );
}
