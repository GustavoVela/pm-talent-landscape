"use client"

import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const macroData = [
  { subject: "Core Product", "Global": 94.3, "Latinoamérica": 92.8, "United States": 96.0 },
  { subject: "UX / UI", "Global": 35.2, "Latinoamérica": 34.4, "United States": 36.0 },
  { subject: "AI / GenAI", "Global": 29.6, "Latinoamérica": 23.7, "United States": 36.2 },
  { subject: "Data", "Global": 51.6, "Latinoamérica": 47.6, "United States": 56.2 },
  { subject: "Technical", "Global": 38.4, "Latinoamérica": 37.1, "United States": 39.7 },
  { subject: "Business", "Global": 69.6, "Latinoamérica": 66.1, "United States": 73.6 },
];

const COLORS: Record<string, string> = {
  "Global": '#3c82f6',
  "Latinoamérica": '#91cc75',
  "United States": '#9a60b4',
};

const SERIES = ["Global", "Latinoamérica", "United States"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm p-3 border border-slate-200 shadow-lg rounded-lg text-sm font-sans" style={{ minWidth: '150px' }}>
        <p className="font-semibold mb-2 text-slate-800">{label}</p>
        <div className="flex flex-col gap-1.5">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-1 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-slate-600 font-medium">{entry.name}</span>
              </div>
              <span className="font-bold text-slate-800">{entry.value}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export function CompetencyMacroRadar() {
  const [hiddenSeries, setHiddenSeries] = useState<Record<string, boolean>>({});

  const toggleSeries = (dataKey: string) => {
    setHiddenSeries(prev => ({
      ...prev,
      [dataKey]: !prev[dataKey]
    }));
  };

  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4">
        {payload.map((entry: any, index: number) => {
          const isHidden = hiddenSeries[entry.value];
          return (
            <div 
              key={`item-${index}`} 
              className="flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-80"
              onClick={() => toggleSeries(entry.value)}
              style={{ opacity: isHidden ? 0.4 : 1 }}
            >
              <div className="w-4 h-1.5 rounded-full" style={{ backgroundColor: isHidden ? '#cbd5e1' : entry.color }} />
              <span className="text-sm font-semibold" style={{ color: isHidden ? '#94a3b8' : '#1e293b' }}>
                {entry.value}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="h-[420px] w-full -mt-12 -mb-8">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="85%" data={macroData} startAngle={90} endAngle={-270} margin={{ top: 10, right: 35, bottom: 5, left: 35 }}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#0f172a', fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-sans), sans-serif' }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="bottom" content={<CustomLegend />} />
          {SERIES.map(s => (
            <Radar 
              key={s}
              name={s} 
              dataKey={s} 
              stroke={hiddenSeries[s] ? 'transparent' : COLORS[s]} 
              fill={hiddenSeries[s] ? 'transparent' : COLORS[s]} 
              fillOpacity={0.05} 
              strokeWidth={hiddenSeries[s] ? 0 : 2} 
              dot={hiddenSeries[s] ? false : { r: 3, fill: '#fff', strokeWidth: 2 }} 
              activeDot={hiddenSeries[s] ? false : undefined}
            />
          ))}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
