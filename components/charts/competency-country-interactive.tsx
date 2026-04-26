"use client"

import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const competencyCountryData = [
  { subject: "Core Product", "Brasil": 96.3, "Chile": 86.8, "Colombia": 94.0, "México": 91.8, "Perú": 79.5, "United States": 96.0 },
  { subject: "UX / UI", "Brasil": 37.4, "Chile": 32.4, "Colombia": 38.8, "México": 30.4, "Perú": 24.7, "United States": 36.0 },
  { subject: "AI / GenAI", "Brasil": 24.6, "Chile": 20.3, "Colombia": 27.9, "México": 23.1, "Perú": 16.4, "United States": 36.2 },
  { subject: "Data", "Brasil": 53.2, "Chile": 48.9, "Colombia": 41.3, "México": 43.1, "Perú": 38.4, "United States": 56.2 },
  { subject: "Technical", "Brasil": 39.1, "Chile": 31.9, "Colombia": 36.3, "México": 38.8, "Perú": 26.0, "United States": 39.7 },
  { subject: "Business", "Brasil": 64.9, "Chile": 70.9, "Colombia": 64.2, "México": 66.3, "Perú": 69.9, "United States": 73.6 },
];

const COLORS: Record<string, string> = {
  "Brasil": '#fac858',
  "Chile": '#fc8452',
  "Colombia": '#3c82f6',
  "México": '#91cc75',
  "Perú": '#73c0de',
  "United States": '#9a60b4'
};

const SERIES = ["Brasil", "Chile", "Colombia", "México", "Perú", "United States"];

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

export function CompetencyCountryInteractive() {
  const [hiddenSeries, setHiddenSeries] = useState<Record<string, boolean>>({});

  const toggleSeries = (dataKey: string) => {
    setHiddenSeries(prev => ({
      ...prev,
      [dataKey]: !prev[dataKey]
    }));
  };

  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-0">
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
    <div className="h-[420px] w-full -mt-16 -mb-8">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="95%" data={competencyCountryData} startAngle={90} endAngle={-270} margin={{ top: 0, right: 10, bottom: -10, left: 10 }}>
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
