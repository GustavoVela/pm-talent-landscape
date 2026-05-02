"use client"

import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { useTheme } from "next-themes";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { ChevronDownIcon, CheckIcon } from "lucide-react"

const rawData = [
  { country: "Estados Unidos", flag: "🇺🇸", seniority: "Junior / Mid-Level", withAi: 124, total: 513 },
  { country: "Estados Unidos", flag: "🇺🇸", seniority: "Senior", withAi: 134, total: 297 },
  { country: "Estados Unidos", flag: "🇺🇸", seniority: "Leadership", withAi: 227, total: 529 },
  { country: "Brasil", flag: "🇧🇷", seniority: "Junior / Mid-Level", withAi: 60, total: 312 },
  { country: "Brasil", flag: "🇧🇷", seniority: "Senior", withAi: 74, total: 248 },
  { country: "Brasil", flag: "🇧🇷", seniority: "Leadership", withAi: 20, total: 66 },
  { country: "Colombia", flag: "🇨🇴", seniority: "Junior / Mid-Level", withAi: 22, total: 94 },
  { country: "Colombia", flag: "🇨🇴", seniority: "Senior", withAi: 28, total: 88 },
  { country: "Colombia", flag: "🇨🇴", seniority: "Leadership", withAi: 6, total: 19 },
  { country: "México", flag: "🇲🇽", seniority: "Junior / Mid-Level", withAi: 26, total: 178 },
  { country: "México", flag: "🇲🇽", seniority: "Senior", withAi: 59, total: 195 },
  { country: "México", flag: "🇲🇽", seniority: "Leadership", withAi: 11, total: 42 },
  { country: "Chile", flag: "🇨🇱", seniority: "Junior / Mid-Level", withAi: 25, total: 138 },
  { country: "Chile", flag: "🇨🇱", seniority: "Senior", withAi: 8, total: 34 },
  { country: "Chile", flag: "🇨🇱", seniority: "Leadership", withAi: 4, total: 10 },
  { country: "Perú", flag: "🇵🇪", seniority: "Junior / Mid-Level", withAi: 5, total: 44 },
  { country: "Perú", flag: "🇵🇪", seniority: "Senior", withAi: 3, total: 16 },
  { country: "Perú", flag: "🇵🇪", seniority: "Leadership", withAi: 4, total: 13 },
];

export function AiSeniorityChart() {
  const [viewMode, setViewMode] = React.useState<'bySeniority' | 'byCountry'>('bySeniority');
  const allCountries = ["Estados Unidos", "Colombia", "Brasil", "México", "Chile", "Perú"];
  const [selectedCountries, setSelectedCountries] = React.useState<string[]>(allCountries);
  const [open, setOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = React.useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  React.useEffect(() => {
    setMounted(true);
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleCountry = (c: string) => {
    setSelectedCountries(prev => {
      if (prev.includes(c)) {
        return prev.length > 1 ? prev.filter(p => p !== c) : prev;
      }
      return [...prev, c];
    });
  };

  const countries = selectedCountries;
  const seniorities = ["Junior / Mid-Level", "Senior", "Leadership"];
  
  const flagMap: Record<string, string> = {
    "Estados Unidos": "🇺🇸", "Brasil": "🇧🇷", "Colombia": "🇨🇴", "México": "🇲🇽", "Chile": "🇨🇱", "Perú": "🇵🇪"
  };

  // Theme colors based on styles/echarts-theme.json
  const colors = [
    { start: "#38bdf8", end: "#0ea5e9" }, // Sky Blue
    { start: "#b3e099", end: "#91cc75" }, // Green
    { start: "#fce096", end: "#fac858" }, // Yellow
    { start: "#f49999", end: "#ee6666" }, // Red
    { start: "#9bd5ea", end: "#73c0de" }, // Light Blue
    { start: "#5ccf9b", end: "#3ba272" }, // Dark Green
  ];

  let xAxisData: string[] = [];
  let seriesData: any[] = [];

  const getLabel = (item: any) => {
    const countryTotal = rawData.filter(d => d.country === item.country).reduce((sum, d) => sum + d.total, 0);
    const share = ((item.total / countryTotal) * 100).toFixed(1) + "%";
    return {
      show: true,
      position: "top",
      distance: 5,
      formatter: function() {
        if (viewMode === 'bySeniority') {
            return `{flag|${item.flag}}\n{jobs|${item.total} vac.}\n{share|${share}}`;
        } else {
            const shortSen = item.seniority === "Junior / Mid-Level" ? "Jr/Mid" : 
                             item.seniority === "Senior" ? "Senior" : "Head/Lead/Dir/VP/CPO";
            return `{sen|${shortSen}}\n{jobs|${item.total} vac.}\n{share|${share}}`;
        }
      },
      rich: {
        flag: { fontSize: 12, align: "center", lineHeight: 16 },
        sen: { fontSize: 10, fontWeight: 600, color: isDark ? "#e5e7eb" : "#374151", align: "center", lineHeight: 14 },
        jobs: { fontSize: 9, color: isDark ? "#9ca3af" : "#6b7280", align: "center", lineHeight: 14 },
        share: { fontSize: 9, color: isDark ? "#6b7280" : "#9ca3af", align: "center", lineHeight: 12 }
      }
    };
  };

  const getCountryItemStyle = (countryName: string) => {
    const idx = allCountries.indexOf(countryName);
    return {
      color: {
        type: "linear",
        x: 0, y: 1, x2: 0, y2: 0,
        colorStops: [
          { offset: 0, color: colors[idx % colors.length].start },
          { offset: 1, color: colors[idx % colors.length].end }
        ]
      },
      borderRadius: [4, 4, 0, 0]
    };
  };

  const getSeniorityItemStyle = (idx: number) => ({
    color: {
      type: "linear",
      x: 0, y: 1, x2: 0, y2: 0,
      colorStops: [
        { offset: 0, color: colors[idx % colors.length].start },
        { offset: 1, color: colors[idx % colors.length].end }
      ]
    },
    borderRadius: [4, 4, 0, 0]
  });

  if (viewMode === 'bySeniority') {
    xAxisData = seniorities;
    seriesData = countries.map((country) => ({
      name: country,
      type: 'bar',
      barGap: '10%',
      itemStyle: getCountryItemStyle(country),
      data: seniorities.map(sen => {
        const item = rawData.find(d => d.country === country && d.seniority === sen);
        if (!item) return { value: 0 };
        return {
          value: parseFloat(((item.withAi / item.total) * 100).toFixed(1)),
          itemData: item,
          label: getLabel(item)
        };
      })
    }));
  } else {
    xAxisData = countries;
    seriesData = seniorities.map((sen, idx) => ({
      name: sen,
      type: 'bar',
      barGap: '10%',
      itemStyle: getSeniorityItemStyle(idx),
      data: countries.map(country => {
        const item = rawData.find(d => d.country === country && d.seniority === sen);
        if (!item) return { value: 0 };
        return {
          value: parseFloat(((item.withAi / item.total) * 100).toFixed(1)),
          itemData: item,
          label: getLabel(item)
        };
      })
    }));
  }

  const option = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "item",
      backgroundColor: isDark ? "#1f2937" : "#ffffff",
      borderColor: isDark ? "#374151" : "#e5e7eb",
      textStyle: { color: isDark ? "#f9fafb" : "#111827" },
      formatter: function (params: any) {
        const { itemData, value } = params.data;
        if (!itemData) return '';
        const countryTotal = rawData.filter(d => d.country === itemData.country).reduce((sum, d) => sum + d.total, 0);
        const share = ((itemData.total / countryTotal) * 100).toFixed(1) + "%";
        
        return `
          <div style="font-family: inherit; padding: 4px;">
            <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">
              ${itemData.flag} ${itemData.country} - ${itemData.seniority}
            </div>
            <div style="font-size: 13px;">
              Penetración IA: <strong style="color: ${params.color.colorStops ? params.color.colorStops[1].color : params.color};">${value}%</strong>
            </div>
            <div style="font-size: 12px; color: ${isDark ? '#9ca3af' : '#6b7280'}; margin-top: 4px;">
              (${itemData.withAi} de ${itemData.total} vacantes)
            </div>
            <div style="font-size: 11px; color: ${isDark ? '#6b7280' : '#9ca3af'}; margin-top: 4px;">
              Participación: ${share} del total nacional
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
      type: 'category',
      name: viewMode === 'bySeniority' ? "Nivel de Seniority" : "País",
      nameLocation: "middle",
      nameGap: 35,
      nameTextStyle: {
        color: isDark ? "#9ca3af" : "#6b7280",
        fontSize: 12,
        fontWeight: 600
      },
      data: xAxisData,
      axisLabel: {
        fontWeight: 600,
        color: isDark ? "#9ca3af" : "#4b5563",
        fontSize: 12,
        margin: 12,
        formatter: (value: string) => value === "Leadership" ? "Leadership\n(Head, Lead, Director, VP, CPO)" : value
      },
      axisLine: { lineStyle: { color: isDark ? "#374151" : "#e5e7eb" } },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      max: 50,
      name: "Penetración IA (%)",
      nameLocation: "middle",
      nameGap: 40,
      nameTextStyle: {
        color: isDark ? "#9ca3af" : "#6b7280",
        fontSize: 12
      },
      axisLabel: { formatter: '{value}%', color: isDark ? "#9ca3af" : "#6b7280", fontSize: 11 },
      splitLine: { lineStyle: { color: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)", type: "dashed" } }
    },
    series: seriesData
  };

  return (
    <div className="flex flex-col w-full mt-8 pt-6 border-t border-border/50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <div>
          <h3 className="text-xl font-semibold text-foreground">
            Penetración de IA por País y Seniority
          </h3>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-start sm:justify-end">
          <div className="relative w-full sm:w-auto" ref={dropdownRef}>
            {mounted ? (
              <>
                <button 
                  onClick={() => setOpen(!open)}
                  className="flex h-9 items-center justify-between gap-2 rounded-md border border-input bg-background px-3 py-2 text-xs shadow-sm hover:bg-accent hover:text-accent-foreground w-full sm:min-w-[140px]"
                >
                  <span className="truncate">
                    {selectedCountries.length === allCountries.length 
                      ? "Todos (6)" 
                      : `${selectedCountries.length} países`}
                  </span>
                  <ChevronDownIcon className="h-3 w-3 opacity-50" />
                </button>
                
                {open && (
                  <div className="absolute right-0 sm:right-auto sm:left-0 top-full mt-1 z-50 w-48 rounded-md border bg-popover text-popover-foreground shadow-md outline-none p-1">
                    {allCountries.map(c => (
                      <div 
                        key={c}
                        onClick={() => toggleCountry(c)}
                        className="relative flex w-full cursor-pointer items-center rounded-sm py-1.5 pl-8 pr-2 text-xs outline-none hover:bg-accent hover:text-accent-foreground"
                      >
                        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                          {selectedCountries.includes(c) && <CheckIcon className="h-3 w-3" />}
                        </span>
                        {flagMap[c]} <span className="ml-2">{c}</span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="h-9 w-[130px] border rounded-md" />
            )}
          </div>
          
          <ToggleGroup 
            type="single" 
            variant="outline" 
            value={viewMode} 
            onValueChange={(v) => v && setViewMode(v as 'bySeniority' | 'byCountry')} 
            className="w-full sm:w-auto justify-start sm:justify-end bg-background"
          >
            <ToggleGroupItem value="bySeniority" className="text-xs h-9 px-3">Por Seniority</ToggleGroupItem>
            <ToggleGroupItem value="byCountry" className="text-xs h-9 px-3">Por País</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      {/* 💡 Antes de explorar */}
      <div className="mb-4 w-full">
        <div className="text-xs text-muted-foreground leading-relaxed mb-3">
          <span className="font-bold text-foreground">💡 Antes de explorar: </span>
          <ul className="list-disc list-inside space-y-1 mt-2 ml-1">
            <li><strong>Por Seniority:</strong> compara cómo varía la demanda de IA entre Junior/Mid, Senior y Leadership en cada país. Ideal para saber si el mercado ya lo exige en tu nivel.</li>
            <li><strong>Por País:</strong> invierte el eje para ver cómo se comporta cada nivel de seniority dentro de un mismo país. Útil para comparar mercados.</li>
            <li><strong>Filtro de países:</strong> desactiva mercados para aislar la comparación que te interesa — por ejemplo, solo LATAM o solo EE. UU.</li>
          </ul>
        </div>
        <div className="w-full h-px bg-border/60" />
      </div>
      <div className="w-full h-[304px] -mt-2 -mb-4">
        <ReactECharts option={option} notMerge={true} style={{ height: "100%", width: "100%" }} opts={{ renderer: "svg" }} />
      </div>
    </div>
  );
}
