"use client"

import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { useTheme } from "next-themes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const rawData = [
  { country: "Estados Unidos", city: "Otra ciudad", withAi: 176, total: 542 },
  { country: "Brasil", city: "São Paulo", withAi: 68, total: 341 },
  { country: "Estados Unidos", city: "New York", withAi: 76, total: 246 },
  { country: "México", city: "Ciudad de México", withAi: 42, total: 242 },
  { country: "Estados Unidos", city: "San Francisco Bay Area", withAi: 118, total: 225 },
  { country: "Chile", city: "Santiago", withAi: 28, total: 165 },
  { country: "Brasil", city: "Otra ciudad", withAi: 55, total: 151 },
  { country: "Colombia", city: "Bogotá", withAi: 21, total: 105 },
  { country: "México", city: "Otra ciudad", withAi: 30, total: 95 },
  { country: "Colombia", city: "Otra ciudad", withAi: 24, total: 58 },
  { country: "Perú", city: "Lima", withAi: 7, total: 57 },
  { country: "Estados Unidos", city: "Boston", withAi: 30, total: 49 },
  { country: "Estados Unidos", city: "Seattle", withAi: 26, total: 47 },
  { country: "Estados Unidos", city: "Los Angeles", withAi: 9, total: 42 },
  { country: "Estados Unidos", city: "Dallas", withAi: 9, total: 32 },
  { country: "Estados Unidos", city: "Chicago", withAi: 11, total: 29 },
  { country: "México", city: "Guadalajara", withAi: 9, total: 29 },
  { country: "Brasil", city: "Rio de Janeiro", withAi: 7, total: 28 },
  { country: "Brasil", city: "Belo Horizonte", withAi: 7, total: 26 },
  { country: "México", city: "Monterrey", withAi: 9, total: 25 },
  { country: "Estados Unidos", city: "Austin", withAi: 11, total: 24 },
  { country: "Estados Unidos", city: "Atlanta", withAi: 2, total: 23 },
  { country: "Brasil", city: "Porto Alegre", withAi: 5, total: 21 },
  { country: "Chile", city: "Otra ciudad", withAi: 9, total: 17 },
  { country: "Estados Unidos", city: "Philadelphia", withAi: 2, total: 16 },
  { country: "Estados Unidos", city: "Denver", withAi: 7, total: 16 },
  { country: "Perú", city: "Otra ciudad", withAi: 5, total: 15 },
  { country: "Colombia", city: "Medellín", withAi: 4, total: 15 },
  { country: "Estados Unidos", city: "Washington, D.C.", withAi: 5, total: 15 },
  { country: "Estados Unidos", city: "Charlotte", withAi: 0, total: 11 },
  { country: "Brasil", city: "Fortaleza", withAi: 0, total: 11 },
  { country: "Brasil", city: "Florianópolis", withAi: 2, total: 10 },
  { country: "Estados Unidos", city: "San Diego", withAi: 3, total: 9 },
  { country: "Brasil", city: "Brasília", withAi: 3, total: 9 },
  { country: "Estados Unidos", city: "Houston", withAi: 0, total: 8 },
  { country: "Brasil", city: "Curitiba", withAi: 2, total: 8 },
  { country: "México", city: "Querétaro", withAi: 2, total: 8 },
  { country: "Brasil", city: "Blumenau", withAi: 1, total: 7 },
  { country: "Colombia", city: "Bucaramanga", withAi: 1, total: 6 },
  { country: "Estados Unidos", city: "Miami", withAi: 0, total: 5 },
  { country: "Colombia", city: "Pereira", withAi: 1, total: 5 },
  { country: "Colombia", city: "Cali", withAi: 3, total: 5 },
  { country: "Colombia", city: "Barranquilla", withAi: 1, total: 4 }
];

export function AiCityChart() {
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [minJobs, setMinJobs] = useState<string>('20');
  const [cityType, setCityType] = useState<string>('all');
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  React.useEffect(() => { setMounted(true); }, []);

  const allCountries = ["Estados Unidos", "Brasil", "Colombia", "México", "Chile", "Perú"];
  const flagMap: Record<string, string> = {
    "Estados Unidos": "🇺🇸", "Brasil": "🇧🇷", "Colombia": "🇨🇴", "México": "🇲🇽", "Chile": "🇨🇱", "Perú": "🇵🇪"
  };

  const capitals = ["Washington, D.C.", "Brasília", "Bogotá", "Ciudad de México", "Santiago", "Lima"];

  const filteredData = rawData
    .filter(d => selectedCountry === 'all' || d.country === selectedCountry)
    .filter(d => d.total >= parseInt(minJobs))
    .filter(d => cityType === 'all' || capitals.includes(d.city))
    .map(d => ({
      ...d,
      flag: flagMap[d.country],
      percentage: parseFloat(((d.withAi / d.total) * 100).toFixed(1))
    }))
    .sort((a, b) => b.percentage - a.percentage);

  const option = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      backgroundColor: isDark ? "#1f2937" : "#ffffff",
      borderColor: isDark ? "#374151" : "#e5e7eb",
      textStyle: { color: isDark ? "#f9fafb" : "#111827" },
      formatter: function (params: any) {
        const item = filteredData[params[0].dataIndex];
        if (!item) return '';
        return `
          <div style="font-family: inherit; padding: 4px;">
            <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">
              ${item.flag} ${item.city}
            </div>
            <div style="font-size: 13px;">
              Penetración IA: <strong style="color: ${params[0].color.colorStops ? params[0].color.colorStops[1].color : params[0].color};">${item.percentage}%</strong>
            </div>
            <div style="font-size: 12px; color: ${isDark ? '#9ca3af' : '#6b7280'}; margin-top: 4px;">
              (${item.withAi} de ${item.total} vacantes)
            </div>
          </div>
        `;
      }
    },
    grid: {
      top: "15%",
      left: "0%",
      right: "0%",
      bottom: "12%",
      containLabel: true
    },
    xAxis: {
      type: "category",
      data: filteredData.map(d => d.city),
      axisLabel: {
        interval: 0,
        rotate: 45,
        fontWeight: 600,
        color: isDark ? "#9ca3af" : "#4b5563",
        fontSize: 11,
        margin: 12,
        formatter: (value: string) => {
          return value.length > 20 ? value.substring(0, 18) + "..." : value;
        }
      },
      axisLine: { lineStyle: { color: isDark ? "#374151" : "#e5e7eb" } },
      axisTick: { show: false }
    },
    yAxis: {
      type: "value",
      max: 60,
      name: "Vacantes que piden IA (%)",
      nameLocation: "middle",
      nameGap: 40,
      nameTextStyle: { color: isDark ? "#9ca3af" : "#6b7280", fontSize: 12 },
      axisLabel: { formatter: '{value}%', color: isDark ? "#9ca3af" : "#6b7280", fontSize: 11 },
      splitLine: { lineStyle: { color: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)", type: "dashed" } }
    },
    series: [
      {
        type: "bar",
        barWidth: "50%",
        itemStyle: {
          color: {
            type: "linear",
            x: 0, y: 1, x2: 0, y2: 0,
            colorStops: [
              { offset: 0, color: "#38bdf8" }, // Sky Blue 400
              { offset: 1, color: "#0ea5e9" }  // Sky Blue 500
            ]
          },
          borderRadius: [4, 4, 0, 0]
        },
        label: {
          show: true,
          position: "top",
          distance: 5,
          formatter: function (params: any) {
            const item = filteredData[params.dataIndex];
            return `{flag|${item.flag}}\n{jobs|${item.withAi} / ${item.total} vac.}\n{percentage|${item.percentage}%}`;
          },
          rich: {
            flag: { fontSize: 14, align: "center", lineHeight: 18 },
            jobs: { fontSize: 9, color: isDark ? "#9ca3af" : "#6b7280", align: "center", lineHeight: 14 },
            percentage: { fontSize: 10, fontWeight: 600, color: isDark ? "#d1d5db" : "#374151", align: "center", lineHeight: 14 }
          }
        },
        data: filteredData.map(d => d.percentage)
      }
    ]
  };

  return (
    <div className="flex flex-col w-full mt-8 pt-6 border-t border-border/50">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        <div>
          <h3 className="text-xl font-semibold text-foreground">
            Penetración de IA por Ciudad
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Centros urbanos liderando la adopción de Inteligencia Artificial.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-start lg:justify-end">
          <div className="w-full sm:w-auto sm:min-w-[140px]">
            {mounted ? (
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="h-8 text-xs bg-background">
                  <SelectValue placeholder="País..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los países</SelectItem>
                  {allCountries.map(c => (
                    <SelectItem key={c} value={c}>
                      {flagMap[c]} <span className="ml-1">{c}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="h-8 w-full border rounded-md" />
            )}
          </div>

          <div className="w-full sm:w-auto sm:min-w-[140px]">
            {mounted ? (
              <Select value={cityType} onValueChange={setCityType}>
                <SelectTrigger className="h-8 text-xs bg-background">
                  <SelectValue placeholder="Tipo de ciudad..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las ciudades</SelectItem>
                  <SelectItem value="capital">Solo capitales</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="h-8 w-full border rounded-md" />
            )}
          </div>
          
          <div className="w-full sm:w-auto sm:min-w-[150px]">
            {mounted ? (
              <Select value={minJobs} onValueChange={setMinJobs}>
                <SelectTrigger className="h-8 text-xs bg-background">
                  <SelectValue placeholder="Volumen..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">&gt; 10 vacantes</SelectItem>
                  <SelectItem value="20">&gt; 20 vacantes</SelectItem>
                  <SelectItem value="30">&gt; 30 vacantes</SelectItem>
                  <SelectItem value="40">&gt; 40 vacantes</SelectItem>
                  <SelectItem value="50">&gt; 50 vacantes</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="h-8 w-full border rounded-md" />
            )}
          </div>
        </div>
      </div>
      
      {filteredData.length > 0 ? (
        <div className="w-full h-[380px] -mt-2 -mb-4">
          <ReactECharts option={option} notMerge={true} style={{ height: "100%", width: "100%" }} opts={{ renderer: "svg" }} />
        </div>
      ) : (
        <div className="w-full h-[380px] flex items-center justify-center border border-dashed border-border/50 bg-muted/20 rounded-lg mt-4">
          <p className="text-muted-foreground text-sm font-medium">No hay ciudades que cumplan con este criterio de filtro.</p>
        </div>
      )}
    </div>
  );
}
