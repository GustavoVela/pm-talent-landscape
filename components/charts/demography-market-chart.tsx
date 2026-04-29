"use client"

import React from 'react';
import ReactECharts from 'echarts-for-react';

// Source: BigQuery
// TOTAL PM ROLES = 2836
const employmentData = [
  { name: 'Full-time', value: 2539 },
  { name: 'Contract / Externo', value: 146 },
  { name: 'Internship', value: 101 },
  { name: 'Part-time / Otros', value: 50 }, // Volunteer(24) + Other(12) + PT(8) + Temp(6)
];

const industryData = [
  { label: "Servicios IT / Consultoría", value: 422 },
  { label: "Software Development", value: 355 },
  { label: "Servicios Financieros (Fintech/Banca)", value: 381 }, // Financial Svcs(307) + Banking(74)
  { label: "Tecnología e Internet", value: 169 },
  { label: "Retail e E-Commerce", value: 95 }, // Retail(63) + Internet Marketplaces(32)
];

export function DemographyMarketChart() {
  
  // Employment Donut Option
  const employmentOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: <strong>{c}</strong> roles ({d}%)'
    },
    legend: {
      bottom: '0%',
      left: 'center',
      icon: 'circle',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: { fontSize: 11, color: '#64748b' }
    },
    series: [
      {
        name: 'Tipo de Contrato',
        type: 'pie',
        radius: ['50%', '75%'],
        center: ['50%', '42%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 4,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: { show: false },
        color: ['#0ea5e9', '#3b82f6', '#8b5cf6', '#cbd5e1'],
        data: employmentData
      }
    ]
  };

  // Industries Bar Option (Horizontal)
  const industryOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    grid: {
      left: '3%',
      right: '8%',
      bottom: '5%',
      top: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      show: false, // hide axis
    },
    yAxis: {
      type: 'category',
      data: industryData.map(d => d.label).reverse(), // Reverse for bottom-up drawing
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { fontSize: 11, color: '#374151', width: 140, overflow: 'break' }
    },
    series: [
      {
        name: 'Roles de PM',
        type: 'bar',
        barWidth: '50%',
        data: industryData.map(d => ({
          value: d.value,
          itemStyle: { color: '#0ea5e9', borderRadius: [0, 4, 4, 0] }
        })).reverse(),
        label: {
          show: true,
          position: 'right',
          formatter: '{c}',
          color: '#374151',
          fontSize: 11,
          fontWeight: 600,
        }
      }
    ]
  };

  return (
    <div className="flex flex-col md:flex-row h-full w-full gap-4 md:gap-8 pt-2">
      {/* Columna Izquierda: Tipo de Empleo */}
      <div className="w-full md:w-2/5 flex flex-col items-center">
        <h4 className="text-sm font-semibold text-slate-700 mb-2">Modalidad de Contratación</h4>
        <div className="h-[220px] w-full">
          <ReactECharts
            option={employmentOption}
            style={{ height: '100%', width: '100%' }}
            opts={{ renderer: 'svg' }}
          />
        </div>
      </div>

      {/* Separator vertical in desktop, horizontal in mobile */}
      <div className="hidden md:block w-px bg-slate-100 my-4"></div>
      <div className="md:hidden h-px w-full bg-slate-100 my-2"></div>

      {/* Columna Derecha: Industrias Top */}
      <div className="w-full md:w-3/5 flex flex-col">
        <h4 className="text-sm font-semibold text-slate-700 mb-2">Top 5 Industrias Contratando</h4>
        <div className="h-[220px] w-full">
          <ReactECharts
            option={industryOption}
            style={{ height: '100%', width: '100%' }}
            opts={{ renderer: 'svg' }}
          />
        </div>
      </div>
    </div>
  );
}
