"use client"

import React, { useState, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { demographicsCityData, FLAGS } from "@/lib/data";

export function DemographyCityChart({ 
  viewMode = 'absolute', 
  selectedCountry = 'all' 
}: { 
  viewMode?: 'absolute' | 'percentage', 
  selectedCountry?: string 
}) {

  const countries = useMemo(() => {
    return [...new Set(demographicsCityData.map(d => d.country))].sort();
  }, []);

  const isPercentage = viewMode === 'percentage';

  const filteredData = useMemo(() => {
    let data = selectedCountry === 'all'
      ? demographicsCityData
      : demographicsCityData.filter(d => d.country === selectedCountry);

    const grandTotal = data.reduce((acc, curr) => acc + curr.total, 0);

    // Sort by pm_count descending, take top 15, then reverse for ECharts so largest is at top
    data = [...data].sort((a, b) => b.pm_count - a.pm_count).slice(0, 15).reverse();

    let resultData = data.map(d => {
      const label = `${FLAGS[d.country] || ''} ${d.city}`;
      if (isPercentage) {
        return {
          city: label,
          pm: parseFloat(((d.pm_count / grandTotal) * 100).toFixed(1)),
          no_pm: parseFloat(((d.no_pm_count / grandTotal) * 100).toFixed(1))
        };
      }
      return {
        city: label,
        pm: d.pm_count,
        no_pm: d.no_pm_count
      };
    });

    if (isPercentage) {
      let sum = resultData.reduce((acc, curr) => acc + curr.pm + curr.no_pm, 0);
      const diff = parseFloat((100 - sum).toFixed(1));
      if (diff !== 0) {
        let maxVal = -1;
        let maxIdx = -1;
        let isPm = true;
        resultData.forEach((d, i) => {
          if (d.pm > maxVal) { maxVal = d.pm; maxIdx = i; isPm = true; }
          if (d.no_pm > maxVal) { maxVal = d.no_pm; maxIdx = i; isPm = false; }
        });
        if (isPm) {
          resultData[maxIdx].pm = parseFloat((resultData[maxIdx].pm + diff).toFixed(1));
        } else {
          resultData[maxIdx].no_pm = parseFloat((resultData[maxIdx].no_pm + diff).toFixed(1));
        }
      }
    }

    return resultData;
  }, [selectedCountry, viewMode, isPercentage]);

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
      data: filteredData.map(item => item.city),
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: [
      {
        name: 'Cargo de Producto',
        type: 'bar',
        stack: 'total',
        data: filteredData.map(item => item.pm),
        itemStyle: { color: '#0ea5e9' },
        label: {
          show: true,
          position: 'inside',
          formatter: isPercentage ? '{c}%' : '{c}',
          color: '#fff',
          fontSize: 10
        }
      },
      {
        name: 'Cargos en otra área',
        type: 'bar',
        stack: 'total',
        data: filteredData.map(item => item.no_pm),
        itemStyle: { color: '#f43f5e', borderRadius: [0, 4, 4, 0] },
        label: {
          show: true,
          position: 'inside',
          formatter: isPercentage ? '{c}%' : '{c}',
          color: '#fff',
          fontSize: 10
        }
      }
    ]
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="h-[400px] w-full -mt-4">
        <ReactECharts 
          option={option} 
          style={{ height: '100%', width: '100%' }} 
          opts={{ renderer: 'svg' }}
        />
      </div>
    </div>
  );
}
