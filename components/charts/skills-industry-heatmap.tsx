"use client";

import React, { useState, useEffect, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { useTheme } from 'next-themes';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import rawData from '@/lib/data/industry_skills.json';

// Theme palette from echarts-theme.json — one color per skill pillar (Core PM excluded in by_skill)
const SKILL_COLORS: Record<string, string> = {
  business:  '#91cc75', // green
  data:      '#fac858', // amber
  technical: '#ee6666', // red
  ux_ui:     '#fc8452', // orange
  ai:        '#9a60b4', // purple
};

// Absolute mode includes all 6 pillars; by_skill mode excludes core_pm
const ALL_SKILLS = [
  { key: 'core_pm',   label: 'Core PM' },
  { key: 'business',  label: 'Business' },
  { key: 'data',      label: 'Data' },
  { key: 'technical', label: 'Technical' },
  { key: 'ux_ui',     label: 'UX/UI' },
  { key: 'ai',        label: 'AI' },
];

const BY_SKILL_SKILLS = ALL_SKILLS.filter(s => s.key !== 'core_pm');

type ColorMode = 'absolute' | 'by_skill';

function formatThousands(n: number): string {
  return n.toLocaleString('es-MX');
}

export function SkillsIndustryHeatmap() {
  const [mounted, setMounted] = useState(false);
  const [minJobs, setMinJobs] = useState<string>('20');
  const [colorMode, setColorMode] = useState<ColorMode>('absolute');
  const { resolvedTheme } = useTheme();

  useEffect(() => { setMounted(true); }, []);

  const isDark = resolvedTheme === 'dark';
  const textColor = isDark ? '#94a3b8' : '#64748b';
  const axisLineColor = isDark ? '#334155' : '#e2e8f0';

  const SKILL_GROUPS = colorMode === 'absolute' ? ALL_SKILLS : BY_SKILL_SKILLS;

  // ─── Data processing ───────────────────────────────────────────────────────
  const { industries, seriesData, perSkillRanges } = useMemo(() => {
    const filtered = (rawData as any[]).filter(d => d.total >= parseInt(minJobs));
    filtered.sort((a: any, b: any) => a.industry.localeCompare(b.industry));
    const sortedData = [...filtered].reverse();

    const skillGroups = colorMode === 'absolute' ? ALL_SKILLS : BY_SKILL_SKILLS;

    const yLabels = sortedData.map(d => `${d.industry} (${formatThousands(d.total)} vacantes)`);

    const matrix: number[][] = skillGroups.map(() => []);
    sortedData.forEach((row: any, yIdx: number) => {
      skillGroups.forEach((skill, xIdx) => {
        const pct = row.total > 0
          ? parseFloat(((row[skill.key] / row.total) * 100).toFixed(1))
          : 0;
        matrix[xIdx][yIdx] = pct;
      });
    });

    const perSkillRanges = skillGroups.map((_, xIdx) => ({
      min: Math.min(...matrix[xIdx]),
      max: Math.max(...matrix[xIdx]),
    }));

    const dataPoints: any[] = [];
    sortedData.forEach((_, yIdx: number) => {
      skillGroups.forEach((_, xIdx) => {
        dataPoints.push([xIdx, yIdx, matrix[xIdx][yIdx]]);
      });
    });

    return { industries: yLabels, seriesData: dataPoints, perSkillRanges };
  }, [minJobs, colorMode]);

  // ─── Shared axis config ────────────────────────────────────────────────────
  const baseXAxis = {
    type: 'category' as const,
    data: SKILL_GROUPS.map(s => s.label),
    splitArea: { show: true },
    axisLabel: { color: textColor, fontWeight: 600, fontSize: 12 },
    axisLine: { lineStyle: { color: axisLineColor } },
    axisTick: { show: false },
  };

  // ─── ECharts option ────────────────────────────────────────────────────────
  const option = useMemo(() => {
    const sharedTooltip = {
      position: 'top' as const,
      backgroundColor: isDark ? '#1f2937' : '#ffffff',
      borderColor: isDark ? '#374151' : '#e5e7eb',
      textStyle: { color: isDark ? '#f9fafb' : '#111827' },
    };

    const sharedYAxis = {
      type: 'category' as const,
      data: industries,
      splitArea: { show: true },
      axisLabel: { color: textColor, fontSize: 11, width: 360, overflow: 'break' as const },
      axisLine: { lineStyle: { color: axisLineColor } },
      axisTick: { show: false },
    };

    const sharedGrid = { top: '8%', bottom: colorMode === 'absolute' ? '14%' : '5%', left: '0%', right: '2%', containLabel: true };

    const cellLabel = {
      show: true,
      formatter: (p: any) => parseFloat(p.data[2]).toFixed(1) + '%',
      color: isDark ? '#ffffff' : '#1e293b',
      fontSize: 10,
    };

    const cellItemStyle = { borderColor: isDark ? '#1e293b' : '#ffffff', borderWidth: 1 };

    if (colorMode === 'absolute') {
      return {
        tooltip: {
          ...sharedTooltip,
          formatter: (params: any) => {
            const skill = ALL_SKILLS[params.data[0]].label;
            const industry = industries[params.data[1]];
            return `<div style="font-weight:600;margin-bottom:4px">${industry}</div>
                    <div>Demanda de <b>${skill}</b>: <strong style="color:#0ea5e9">${parseFloat(params.data[2]).toFixed(1)}%</strong></div>`;
          }
        },
        grid: sharedGrid,
        xAxis: [
          { ...baseXAxis, position: 'bottom' as const },
          { ...baseXAxis, position: 'top' as const, splitArea: { show: false }, axisLine: { show: false } },
        ],
        yAxis: sharedYAxis,
        visualMap: {
          min: 0, max: 100,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '1%',
          itemWidth: 12, itemHeight: 160,
          textStyle: { color: textColor, fontSize: 10 },
          inRange: {
            color: isDark
              ? ['#0f172a', '#0369a1', '#0ea5e9']
              : ['#f8fafc', '#7dd3fc', '#0ea5e9'],
          },
        },
        series: [{
          type: 'heatmap',
          data: seriesData,
          label: cellLabel,
          itemStyle: cellItemStyle,
          emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.5)' } },
        }],
      };
    }

    // ── by_skill: one series per skill column ──────────────────────────────
    const series = BY_SKILL_SKILLS.map((skill, xIdx) => ({
      name: skill.label,
      type: 'heatmap',
      data: seriesData.filter((d: any) => d[0] === xIdx),
      label: cellLabel,
      itemStyle: cellItemStyle,
      emphasis: { itemStyle: { shadowBlur: 8, shadowColor: 'rgba(0,0,0,0.4)' } },
      tooltip: {
        formatter: (params: any) => {
          const { min, max } = perSkillRanges[xIdx];
          const color = SKILL_COLORS[skill.key];
          const industry = industries[params.data[1]];
          return `<div style="font-weight:600;margin-bottom:4px">${industry}</div>
                  <div>Demanda de <b>${skill.label}</b>: <strong style="color:${color}">${parseFloat(params.data[2]).toFixed(1)}%</strong></div>
                  <div style="font-size:11px;color:#94a3b8;margin-top:2px">Rango del pilar: ${min.toFixed(1)}% – ${max.toFixed(1)}%</div>`;
        }
      },
      visualMapIndex: xIdx,
    }));

    const visualMaps = BY_SKILL_SKILLS.map((skill, xIdx) => ({
      seriesIndex: xIdx,
      min: perSkillRanges[xIdx].min,
      max: perSkillRanges[xIdx].max,
      show: false,
      inRange: {
        color: isDark ? ['#0f172a', SKILL_COLORS[skill.key]] : ['#f8fafc', SKILL_COLORS[skill.key]],
      },
    }));

    return {
      tooltip: { ...sharedTooltip },
      grid: sharedGrid,
      xAxis: [
        { ...baseXAxis, data: BY_SKILL_SKILLS.map(s => s.label), position: 'bottom' as const },
        { ...baseXAxis, data: BY_SKILL_SKILLS.map(s => s.label), position: 'top' as const, splitArea: { show: false }, axisLine: { show: false } },
      ],
      yAxis: sharedYAxis,
      visualMap: visualMaps,
      series,
    };
  }, [seriesData, colorMode, industries, isDark, textColor, axisLineColor, perSkillRanges]);

  const chartHeight = Math.max(400, industries.length * 44 + (colorMode === 'absolute' ? 160 : 80));

  return (
    <div className="flex flex-col w-full mt-8">
      <Card className="w-full bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden">

        {/* ── Header ── */}
        <CardHeader className="pb-0">
          <div className="flex flex-col gap-3">
            {/* Title row */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3">
              <div>
                <CardTitle className="text-xl font-bold text-foreground">
                  Mapa de Calor: Competencias por Sector
                </CardTitle>
                <CardDescription className="mt-1">
                  Porcentaje de vacantes PM en cada macro-sector que demandan cada grupo de habilidades.
                </CardDescription>
              </div>

              {/* Controls — same height, outline style as ToggleGroup */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* Volume filter — same h-8 height */}
                {mounted ? (
                  <Select value={minJobs} onValueChange={setMinJobs}>
                    <SelectTrigger className="h-9 text-xs bg-background border-border min-w-[150px]">
                      <SelectValue placeholder="Volumen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Todos los sectores</SelectItem>
                      <SelectItem value="20">{">"} 20 vacantes</SelectItem>
                      <SelectItem value="50">{">"} 50 vacantes</SelectItem>
                      <SelectItem value="100">{">"} 100 vacantes</SelectItem>
                      <SelectItem value="200">{">"} 200 vacantes</SelectItem>
                      <SelectItem value="500">{">"} 500 vacantes</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="h-8 w-[150px] border rounded-md bg-background" />
                )}

                {/* Color mode toggle — matches ToggleGroup outline style */}
                {mounted && (
                  <ToggleGroup
                    type="single"
                    variant="outline"
                    value={colorMode}
                    onValueChange={(v) => v && setColorMode(v as ColorMode)}
                  >
                    <ToggleGroupItem value="absolute" className="text-xs h-9 px-3">
                      Absoluto
                    </ToggleGroupItem>
                    <ToggleGroupItem value="by_skill" className="text-xs h-9 px-3">
                      Por Pilar
                    </ToggleGroupItem>
                  </ToggleGroup>
                )}
              </div>
            </div>

            {/* 💡 Tip — full width */}
            <div className="mb-4 w-full">
              <div className="text-xs text-muted-foreground leading-relaxed mb-3">
                <span className="font-bold text-foreground">💡 Antes de explorar: </span>
                <ul className="list-disc list-inside space-y-1 mt-2 ml-1">
                  <li><strong>Absoluto:</strong> escala 0–100 % compartida. Responde: <em>¿Qué % de vacantes de este sector piden este skill?</em></li>
                  <li><strong>Por Pilar:</strong> cada columna tiene su propio rango de color. Core PM se omite (es &gt;90 % en todos los sectores). Responde: <em>¿En qué sectores destaca relativamente este pilar?</em></li>
                  <li><strong>Filtro:</strong> ajusta el mínimo de vacantes por sector. Usa <em>&gt; 20</em> para señal estadística sólida; sube a <em>&gt; 200</em> para ver solo los sectores dominantes.</li>
                </ul>
              </div>
              <div className="w-full h-px bg-border/60" />
            </div>


          </div>
        </CardHeader>

        <CardContent className="pt-0 pb-6">
          {industries.length > 0 ? (
            <div className="w-full overflow-x-auto -mt-6" style={{ height: `${chartHeight}px` }}>
              {mounted && (
                <ReactECharts
                  option={option}
                  notMerge={true}
                  style={{ height: '100%', width: '100%', minWidth: '520px' }}
                  opts={{ renderer: 'svg' }}
                />
              )}
            </div>
          ) : (
            <div className="w-full h-[300px] flex items-center justify-center border border-dashed border-border/50 bg-muted/20 rounded-lg">
              <p className="text-muted-foreground text-sm font-medium">
                No hay sectores que cumplan con el filtro de volumen seleccionado.
              </p>
            </div>
          )}

          {/* Color legend for by_skill mode — centered below chart */}
          {colorMode === 'by_skill' && mounted && industries.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4 pt-3">
              {BY_SKILL_SKILLS.map(skill => (
                <div key={skill.key} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span
                    className="inline-block w-3 h-3 rounded-sm flex-shrink-0"
                    style={{ backgroundColor: SKILL_COLORS[skill.key] }}
                  />
                  {skill.label}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
