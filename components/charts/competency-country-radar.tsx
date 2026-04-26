"use client"

import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const competencyCountryData = [
  { subject: "Core Product", "Brasil": 96.3, "Chile": 86.8, "Colombia": 94.0, "México": 91.8, "Perú": 79.5, "United States": 96.0 },
  { subject: "Business", "Brasil": 64.9, "Chile": 70.9, "Colombia": 64.2, "México": 66.3, "Perú": 69.9, "United States": 73.6 },
  { subject: "Technical", "Brasil": 39.1, "Chile": 31.9, "Colombia": 36.3, "México": 38.8, "Perú": 26.0, "United States": 39.7 },
  { subject: "Data", "Brasil": 53.2, "Chile": 48.9, "Colombia": 41.3, "México": 43.1, "Perú": 38.4, "United States": 56.2 },
  { subject: "AI / GenAI", "Brasil": 24.6, "Chile": 20.3, "Colombia": 27.9, "México": 23.1, "Perú": 16.4, "United States": 36.2 },
  { subject: "UX / UI", "Brasil": 37.4, "Chile": 32.4, "Colombia": 38.8, "México": 30.4, "Perú": 24.7, "United States": 36.0 }
];

const COLORS = {
  blue: '#3c82f6',
  green: '#91cc75',
  yellow: '#fac858',
  red: '#ee6666',
  cyan: '#73c0de',
  darkGreen: '#3ba272',
  orange: '#fc8452',
  indigo: '#5470c6',
  purple: '#9a60b4',
  pink: '#ea7ccc'
};

export function CompetencyCountryRadar() {
  return (
    <div className="h-[400px] w-full p-4">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={competencyCountryData}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 13, fontWeight: 600 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8' }} />
          <Tooltip
            formatter={(value: number) => [`${value}%`, '']}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend wrapperStyle={{ paddingTop: '10px' }} iconType="circle" />
          <Radar name="Brasil" dataKey="Brasil" stroke={COLORS.yellow} fill={COLORS.yellow} fillOpacity={0.1} strokeWidth={2} dot={{ r: 3, fill: '#fff', strokeWidth: 2 }} />
          <Radar name="Chile" dataKey="Chile" stroke={COLORS.orange} fill={COLORS.orange} fillOpacity={0.1} strokeWidth={2} dot={{ r: 3, fill: '#fff', strokeWidth: 2 }} />
          <Radar name="Colombia" dataKey="Colombia" stroke={COLORS.blue} fill={COLORS.blue} fillOpacity={0.1} strokeWidth={2} dot={{ r: 3, fill: '#fff', strokeWidth: 2 }} />
          <Radar name="México" dataKey="México" stroke={COLORS.green} fill={COLORS.green} fillOpacity={0.1} strokeWidth={2} dot={{ r: 3, fill: '#fff', strokeWidth: 2 }} />
          <Radar name="Perú" dataKey="Perú" stroke={COLORS.cyan} fill={COLORS.cyan} fillOpacity={0.1} strokeWidth={2} dot={{ r: 3, fill: '#fff', strokeWidth: 2 }} />
          <Radar name="United States" dataKey="United States" stroke={COLORS.purple} fill={COLORS.purple} fillOpacity={0.1} strokeWidth={2} dot={{ r: 3, fill: '#fff', strokeWidth: 2 }} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
