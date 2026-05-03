"use client"

/**
 * ai-role-chart.tsx
 *
 * Barras: penetración de IA por tipo de rol de producto.
 * Compara Product Manager, Product Owner, Head of Product, etc.
 */;

import React, { useState, useEffect, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { useTheme } from 'next-themes';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import aiData from '@/lib/data/ai_ind_role.json';

export function AiRoleChart() {
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [minJobs, setMinJobs] = useState<string>('20');
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const filteredData = useMemo(() => {
    let map = new Map();

    aiData.role.forEach((d: any) => {
      if (selectedCountry !== 'all' && d.country !== selectedCountry) return;

      const cat = d.category;
      if (!map.has(cat)) {
        map.set(cat, { category: cat, withAi: 0, total: 0 });
      }
      const existing = map.get(cat);
      existing.withAi += d.withAi;
      existing.total += d.total;
    });

    return Array.from(map.values())
      .filter(d => d.total >= parseInt(minJobs))
      .map(d => ({
        ...d,
        percentage: d.total > 0 ? (d.withAi / d.total) * 100 : 0
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 15);
  }, [selectedCountry, minJobs]);

  const textColor = resolvedTheme === 'dark' ? '#94a3b8' : '#64748b';
  const axisLineColor = resolvedTheme === 'dark' ? '#334155' : '#e2e8f0';

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: function (params: any) {
        const dataIndex = params[0].dataIndex;
        const dataPoint = filteredData[dataIndex];
        return `<b>${dataPoint.category}</b><br/>
                Penetración IA: <b>${dataPoint.percentage.toFixed(1)}%</b><br/>
                Con IA: ${dataPoint.withAi} vacantes<br/>
                Total: ${dataPoint.total} vacantes`;
      }
    },
    grid: {
      top: "15%",
      left: "0%",
      right: "15%",
      bottom: "15%",
      containLabel: true
    },
    xAxis: {
      type: 'value',
      name: "Vacantes que piden IA (%)",
      nameLocation: "middle",
      nameGap: 30,
      nameTextStyle: { color: textColor, fontSize: 11 },
      axisLabel: {
        color: textColor,
        fontSize: 11,
        formatter: '{value}%'
      },
      splitLine: {
        lineStyle: { color: axisLineColor, type: 'dashed' }
      }
    },
    yAxis: {
      type: 'category',
      data: filteredData.map(d => d.category),
      axisLabel: {
        color: textColor,
        fontSize: 11,
        interval: 0,
        width: 200,
        overflow: 'truncate'
      },
      axisLine: { lineStyle: { color: axisLineColor } },
      axisTick: { show: false },
      inverse: true
    },
    series: [
      {
        type: 'bar',
        data: filteredData.map(d => d.percentage),
        barWidth: '60%',
        itemStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 1, y2: 0,
            colorStops: [
              { offset: 0, color: '#38bdf8' },
              { offset: 1, color: '#0ea5e9' }
            ]
          },
          borderRadius: [0, 4, 4, 0]
        },
        label: {
          show: true,
          position: 'right',
          formatter: (p: any) => p.value.toFixed(1) + '%',
          fontSize: 10,
          color: textColor
        }
      }
    ]
  };

  return (
    <div className="flex flex-col w-full">
      <div className="mb-6">
        <h3 className="text-lg font-bold">¿En qué roles específicos se solicitan más conocimientos en IA?</h3>
      </div>

      {/* 💡 Antes de explorar */}
      <div className="mb-4 w-full">
        <div className="text-xs text-muted-foreground leading-relaxed mb-3">
          <span className="font-bold text-foreground">💡 Antes de explorar: </span>
          Ajusta el filtro de volumen mínimo para enfocarte en los roles más representativos del mercado. Combinado con el filtro de país, puedes identificar si una especialización (como Data PM o Technical PM) es una tendencia regional o un estándar global.
        </div>
        <div className="w-full h-px bg-border/60" />
      </div>

      <div className="flex flex-wrap items-center gap-3 w-full justify-end mb-0 relative z-10">
        <div className="w-full sm:w-auto sm:min-w-[140px]">
          {mounted ? (
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="h-9 text-xs bg-background">
                <SelectValue placeholder="País" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los países</SelectItem>
                <SelectItem value="US">🇺🇸 Estados Unidos</SelectItem>
                <SelectItem value="CO">🇨🇴 Colombia</SelectItem>
                <SelectItem value="BR">🇧🇷 Brasil</SelectItem>
                <SelectItem value="MX">🇲🇽 México</SelectItem>
                <SelectItem value="CL">🇨🇱 Chile</SelectItem>
                <SelectItem value="PE">🇵🇪 Perú</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <div className="h-9 w-full border rounded-md" />
          )}
        </div>

        <div className="w-full sm:w-auto sm:min-w-[150px]">
          {mounted ? (
            <Select value={minJobs} onValueChange={setMinJobs}>
              <SelectTrigger className="h-9 text-xs bg-background">
                <SelectValue placeholder="Volumen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">{">"} 10 vacantes</SelectItem>
                <SelectItem value="20">{">"} 20 vacantes</SelectItem>
                <SelectItem value="30">{">"} 30 vacantes</SelectItem>
                <SelectItem value="40">{">"} 40 vacantes</SelectItem>
                <SelectItem value="50">{">"} 50 vacantes</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <div className="h-9 w-full border rounded-md" />
          )}
        </div>
      </div>

      {filteredData.length > 0 ? (
        <div className="w-full h-[450px] -mt-6 -mb-4">
          <ReactECharts option={option} notMerge={true} style={{ height: "100%", width: "100%" }} opts={{ renderer: "svg" }} />
        </div>
      ) : (
        <div className="w-full h-[450px] flex items-center justify-center border border-dashed border-border/50 bg-muted/20 rounded-lg mt-4">
          <p className="text-muted-foreground text-sm font-medium">No hay roles que cumplan con este criterio.</p>
        </div>
      )}
    </div>
  );
}