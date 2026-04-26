"use client";

import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';

const rawRolesData = [
  {"country": "Brasil", "rol": "Product Manager", "cantidad": 323}, 
  {"country": "Brasil", "rol": "Product Owner", "cantidad": 199}, 
  {"country": "Brasil", "rol": "Product Operations Manager", "cantidad": 25}, 
  {"country": "Brasil", "rol": "Product Marketing Manager", "cantidad": 29}, 
  {"country": "Brasil", "rol": "Product Lead", "cantidad": 12}, 
  {"country": "Brasil", "rol": "Head of Product", "cantidad": 14}, 
  {"country": "Brasil", "rol": "Product Designer", "cantidad": 16}, 
  {"country": "Brasil", "rol": "Director of Product", "cantidad": 7}, 
  {"country": "Brasil", "rol": "Vice President of Product", "cantidad": 1}, 
  {"country": "Chile", "rol": "Product Manager", "cantidad": 120}, 
  {"country": "Chile", "rol": "Product Designer", "cantidad": 10}, 
  {"country": "Chile", "rol": "Product Marketing Manager", "cantidad": 6}, 
  {"country": "Chile", "rol": "Product Owner", "cantidad": 40}, 
  {"country": "Chile", "rol": "Product Operations Manager", "cantidad": 2}, 
  {"country": "Chile", "rol": "Head of Product", "cantidad": 1}, 
  {"country": "Chile", "rol": "Director of Product", "cantidad": 2}, 
  {"country": "Chile", "rol": "Product Lead", "cantidad": 1}, 
  {"country": "Colombia", "rol": "Product Manager", "cantidad": 109}, 
  {"country": "Colombia", "rol": "Product Owner", "cantidad": 41}, 
  {"country": "Colombia", "rol": "Product Designer", "cantidad": 20}, 
  {"country": "Colombia", "rol": "Product Marketing Manager", "cantidad": 10}, 
  {"country": "Colombia", "rol": "Product Operations Manager", "cantidad": 12}, 
  {"country": "Colombia", "rol": "Head of Product", "cantidad": 2}, 
  {"country": "Colombia", "rol": "Director of Product", "cantidad": 5}, 
  {"country": "Colombia", "rol": "Product Lead", "cantidad": 2}, 
  {"country": "México", "rol": "Product Manager", "cantidad": 217}, 
  {"country": "México", "rol": "Product Owner", "cantidad": 100}, 
  {"country": "México", "rol": "Director of Product", "cantidad": 12}, 
  {"country": "México", "rol": "Product Operations Manager", "cantidad": 12}, 
  {"country": "México", "rol": "Product Designer", "cantidad": 21}, 
  {"country": "México", "rol": "Product Marketing Manager", "cantidad": 41}, 
  {"country": "México", "rol": "Product Lead", "cantidad": 6}, 
  {"country": "México", "rol": "Head of Product", "cantidad": 2}, 
  {"country": "México", "rol": "Vice President of Product", "cantidad": 4}, 
  {"country": "Perú", "rol": "Product Marketing Manager", "cantidad": 3}, 
  {"country": "Perú", "rol": "Product Manager", "cantidad": 37}, 
  {"country": "Perú", "rol": "Product Designer", "cantidad": 12}, 
  {"country": "Perú", "rol": "Product Owner", "cantidad": 18}, 
  {"country": "Perú", "rol": "Product Lead", "cantidad": 1}, 
  {"country": "Perú", "rol": "Head of Product", "cantidad": 1}, 
  {"country": "Perú", "rol": "Product Operations Manager", "cantidad": 1}, 
  {"country": "United States", "rol": "Vice President of Product", "cantidad": 168}, 
  {"country": "United States", "rol": "Product Owner", "cantidad": 187}, 
  {"country": "United States", "rol": "Product Marketing Manager", "cantidad": 82}, 
  {"country": "United States", "rol": "Product Lead", "cantidad": 33}, 
  {"country": "United States", "rol": "Product Manager", "cantidad": 542}, 
  {"country": "United States", "rol": "Director of Product", "cantidad": 183}, 
  {"country": "United States", "rol": "Head of Product", "cantidad": 25}, 
  {"country": "United States", "rol": "Product Operations Manager", "cantidad": 73}, 
  {"country": "United States", "rol": "Product Designer", "cantidad": 22}, 
  {"country": "United States", "rol": "Chief Product Officer", "cantidad": 24}
];

export function RolesTaxonomyChart({ 
  selectedCountry = 'all',
  viewMode = 'absolute'
}: { 
  selectedCountry?: string;
  viewMode?: 'absolute' | 'percentage';
}) {
  const isPercentage = viewMode === 'percentage';

  const chartData = useMemo(() => {
    // 1. Filtrar por país
    const filtered = selectedCountry === 'all' 
      ? rawRolesData 
      : rawRolesData.filter(d => d.country === selectedCountry);

    // 2. Agregar cantidades por rol
    const aggregated: Record<string, number> = {};
    
    filtered.forEach(d => {
      aggregated[d.rol] = (aggregated[d.rol] || 0) + d.cantidad;
    });

    let result = Object.entries(aggregated)
      .map(([rol, cantidad]) => ({ rol, cantidad }))
      .sort((a, b) => b.cantidad - a.cantidad)
      .slice(0, 15);

    let totalVacancies = result.reduce((acc, curr) => acc + curr.cantidad, 0);

    result = result.map(d => ({
        rol: d.rol,
        cantidad: isPercentage ? parseFloat(((d.cantidad / totalVacancies) * 100).toFixed(1)) : d.cantidad
    }));

    if (isPercentage) {
      let sum = result.reduce((acc, curr) => acc + curr.cantidad, 0);
      const diff = parseFloat((100 - sum).toFixed(1));
      if (diff !== 0) {
        let maxVal = -1;
        let maxIdx = -1;
        result.forEach((d, i) => {
          if (d.cantidad > maxVal) { maxVal = d.cantidad; maxIdx = i; }
        });
        result[maxIdx].cantidad = parseFloat((result[maxIdx].cantidad + diff).toFixed(1));
      }
    }

    // Recharts / ECharts dibuja de abajo hacia arriba en barras horizontales, por lo que invertimos el arreglo final
    return result.reverse();
  }, [selectedCountry, isPercentage]);

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
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      name: isPercentage ? 'Porcentaje (%)' : 'Cantidad de vacantes',
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
      data: chartData.map(item => item.rol),
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: [
      {
        name: 'Vacantes',
        type: 'bar',
        data: chartData.map(item => item.cantidad),
        itemStyle: { color: '#0ea5e9', borderRadius: [0, 4, 4, 0] },
        label: {
          show: true,
          position: 'right',
          formatter: isPercentage ? '{c}%' : '{c}',
          color: '#0f172a',
          fontSize: 10,
          fontWeight: 600
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
