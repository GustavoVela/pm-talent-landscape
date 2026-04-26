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

  const chartData = demographicsCountryData.map(d => {
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
        data: chartData.map(item => item.pm),
        itemStyle: { color: '#0ea5e9' },
        label: {
          show: true,
          position: 'inside',
          formatter: isPercentage ? '{c}%' : '{c}',
          color: '#fff',
          fontSize: 11
        }
      },
      {
        name: 'Cargos en otra área',
        type: 'bar',
        stack: 'total',
        data: chartData.map(item => item.no_pm),
        itemStyle: { color: '#f43f5e', borderRadius: [0, 4, 4, 0] },
        label: {
          show: true,
          position: 'inside',
          formatter: isPercentage ? '{c}%' : '{c}',
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
