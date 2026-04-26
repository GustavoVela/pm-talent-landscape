export const demographicsCityData = [
  { country: "United States", city: "Otra ciudad", pm_count: 536, no_pm_count: 73, total: 609 },
  { country: "Brasil", city: "São Paulo", pm_count: 341, no_pm_count: 27, total: 368 },
  { country: "United States", city: "New York", pm_count: 246, no_pm_count: 37, total: 283 },
  { country: "México", city: "Mexico City", pm_count: 242, no_pm_count: 90, total: 332 },
  { country: "United States", city: "San Francisco Bay Area", pm_count: 225, no_pm_count: 4, total: 229 },
  { country: "Brasil", city: "Otra ciudad", pm_count: 174, no_pm_count: 12, total: 186 },
  { country: "Chile", city: "Santiago", pm_count: 165, no_pm_count: 35, total: 200 },
  { country: "Colombia", city: "Bogotá", pm_count: 105, no_pm_count: 44, total: 149 },
  { country: "México", city: "Otra ciudad", pm_count: 99, no_pm_count: 85, total: 184 },
  { country: "Colombia", city: "Otra ciudad", pm_count: 58, no_pm_count: 18, total: 76 },
  { country: "Perú", city: "Lima", pm_count: 57, no_pm_count: 19, total: 76 },
  { country: "United States", city: "Boston", pm_count: 49, no_pm_count: 3, total: 52 },
  { country: "United States", city: "Seattle", pm_count: 47, no_pm_count: 2, total: 49 },
  { country: "United States", city: "Los Angeles", pm_count: 42, no_pm_count: 10, total: 52 },
  { country: "United States", city: "Dallas", pm_count: 32, no_pm_count: 1, total: 33 },
  { country: "United States", city: "Chicago", pm_count: 29, no_pm_count: 3, total: 32 },
  { country: "México", city: "Guadalajara", pm_count: 29, no_pm_count: 23, total: 52 },
  { country: "Brasil", city: "Rio de Janeiro", pm_count: 28, no_pm_count: 2, total: 30 },
  { country: "Brasil", city: "Belo Horizonte", pm_count: 26, no_pm_count: 2, total: 28 },
  { country: "México", city: "Monterrey", pm_count: 25, no_pm_count: 36, total: 61 },
  { country: "United States", city: "Austin", pm_count: 24, no_pm_count: 1, total: 25 },
  { country: "United States", city: "Atlanta", pm_count: 23, no_pm_count: 3, total: 26 },
  { country: "Chile", city: "Otra ciudad", pm_count: 17, no_pm_count: 17, total: 34 },
  { country: "United States", city: "Denver", pm_count: 16, no_pm_count: 0, total: 16 },
  { country: "United States", city: "Philadelphia", pm_count: 16, no_pm_count: 0, total: 16 },
  { country: "United States", city: "Washington, D.C.", pm_count: 15, no_pm_count: 2, total: 17 },
  { country: "Perú", city: "Otra ciudad", pm_count: 15, no_pm_count: 7, total: 22 },
  { country: "Colombia", city: "Medellín", pm_count: 15, no_pm_count: 8, total: 23 },
  { country: "Brasil", city: "Porto Alegre", pm_count: 12, no_pm_count: 1, total: 13 },
  { country: "Brasil", city: "Fortaleza", pm_count: 11, no_pm_count: 1, total: 12 },
  { country: "United States", city: "Charlotte", pm_count: 11, no_pm_count: 1, total: 12 },
  { country: "Brasil", city: "Florianópolis", pm_count: 10, no_pm_count: 0, total: 10 },
  { country: "United States", city: "San Diego", pm_count: 9, no_pm_count: 4, total: 13 },
  { country: "Brasil", city: "Brasília", pm_count: 9, no_pm_count: 0, total: 9 },
  { country: "México", city: "Querétaro", pm_count: 8, no_pm_count: 15, total: 23 },
  { country: "United States", city: "Houston", pm_count: 8, no_pm_count: 5, total: 13 },
  { country: "Brasil", city: "Curitiba", pm_count: 8, no_pm_count: 3, total: 11 },
  { country: "Brasil", city: "Blumenau", pm_count: 7, no_pm_count: 0, total: 7 },
  { country: "Colombia", city: "Bucaramanga", pm_count: 6, no_pm_count: 0, total: 6 },
  { country: "United States", city: "Cali", pm_count: 6, no_pm_count: 0, total: 6 },
  { country: "México", city: "Cali", pm_count: 5, no_pm_count: 12, total: 17 },
  { country: "Colombia", city: "Pereira", pm_count: 5, no_pm_count: 5, total: 10 },
  { country: "Colombia", city: "Cali", pm_count: 5, no_pm_count: 10, total: 15 },
  { country: "United States", city: "Miami", pm_count: 5, no_pm_count: 3, total: 8 },
  { country: "México", city: "León", pm_count: 4, no_pm_count: 3, total: 7 },
  { country: "Colombia", city: "Barranquilla", pm_count: 4, no_pm_count: 5, total: 9 },
  { country: "Colombia", city: "Cartagena", pm_count: 3, no_pm_count: 3, total: 6 },
  { country: "México", city: "San Luis Potosí", pm_count: 2, no_pm_count: 8, total: 10 },
  { country: "Perú", city: "Arequipa", pm_count: 1, no_pm_count: 4, total: 5 },
  { country: "México", city: "Reynosa", pm_count: 1, no_pm_count: 9, total: 10 },
  { country: "México", city: "Saltillo", pm_count: 0, no_pm_count: 5, total: 5 }
];

export const demographicsCountryData = Object.values(demographicsCityData.reduce((acc, curr) => {
  if (!acc[curr.country]) {
    acc[curr.country] = { country: curr.country, pm_count: 0, no_pm_count: 0, total: 0 };
  }
  acc[curr.country].pm_count += curr.pm_count;
  acc[curr.country].no_pm_count += curr.no_pm_count;
  acc[curr.country].total += curr.total;
  return acc;
}, {} as Record<string, { country: string, pm_count: number, no_pm_count: number, total: number }>)).sort((a, b) => a.total - b.total);

export const FLAGS: Record<string, string> = {
  'Brasil': '🇧🇷', 'México': '🇲🇽', 'Colombia': '🇨🇴',
  'Argentina': '🇦🇷', 'Chile': '🇨🇱', 'Perú': '🇵🇪',
  'United States': '🇺🇸'
};
