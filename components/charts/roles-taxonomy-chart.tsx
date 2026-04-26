"use client";

import React, { useState, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Datos crudos extraídos de BigQuery / Python Script
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

const FLAGS: Record<string, string> = {
  'Brasil': '🇧🇷', 'México': '🇲🇽', 'Colombia': '🇨🇴',
  'Chile': '🇨🇱', 'Perú': '🇵🇪', 'United States': '🇺🇸'
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm p-3 border border-slate-200 shadow-lg rounded-lg text-sm font-sans">
        <p className="font-semibold text-slate-800 mb-1">{payload[0].payload.rol}</p>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-blue-500" />
            <span className="text-slate-600 font-medium">Empleos</span>
          </div>
          <span className="font-bold text-slate-800">{payload[0].value}</span>
        </div>
      </div>
    );
  }
  return null;
};

export function RolesTaxonomyChart() {
  const [selectedCountry, setSelectedCountry] = useState<string>('all');

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

    // 3. Convertir a array, ordenar y tomar el Top 15
    const result = Object.entries(aggregated)
      .map(([rol, cantidad]) => ({ rol, cantidad }))
      .sort((a, b) => b.cantidad - a.cantidad)
      .slice(0, 15);

    // Recharts dibuja de abajo hacia arriba en barras horizontales, así que invertimos el arreglo
    return result.reverse();
  }, [selectedCountry]);

  // Extraer lista única de países para el select
  const countries = useMemo(() => {
    const list = Array.from(new Set(rawRolesData.map(d => d.country))).sort();
    return list;
  }, []);

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Control Superior */}
      <div className="flex flex-col sm:flex-row justify-end items-center">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-600">Filtrar por País:</span>
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="w-[180px] bg-white border-slate-200 shadow-sm focus:ring-0">
              <SelectValue placeholder="Todos los Países" />
            </SelectTrigger>
            <SelectContent className="bg-white/95 backdrop-blur-sm border-slate-200">
              <SelectItem value="all" className="cursor-pointer font-medium hover:bg-slate-50">
                🌎 Todos los Países
              </SelectItem>
              {countries.map(c => (
                <SelectItem key={c} value={c} className="cursor-pointer hover:bg-slate-50">
                  {FLAGS[c] || '🏳️'} {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Gráfica */}
      <div className="h-[450px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 10, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" opacity={0.5} />
            
            <XAxis 
              type="number" 
              hide={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
              axisLine={{ stroke: '#e2e8f0' }}
              tickLine={false}
              label={{ 
                value: 'Número de Empleos', 
                position: 'insideBottom', 
                offset: -15,
                fill: '#475569',
                fontSize: 13,
                fontWeight: 600,
                fontFamily: 'var(--font-sans), sans-serif'
              }}
            />
            
            <YAxis 
              dataKey="rol" 
              type="category" 
              axisLine={false} 
              tickLine={false} 
              width={180}
              tick={{ fill: '#1e293b', fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-sans), sans-serif' }}
            />
            
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f1f5f9', opacity: 0.6 }} />
            
            <Bar dataKey="cantidad" radius={[0, 4, 4, 0]} maxBarSize={40}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#3b82f6" className="transition-all duration-300 hover:opacity-80 hover:fill-blue-600" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
