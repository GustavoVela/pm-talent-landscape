import * as echarts from 'echarts'
import themeConfig from '@/styles/echarts-theme.json'

// Registrar el tema personalizado
export const THEME_NAME = 'pm-talent-landscape'

// Registrar el tema una sola vez
let themeRegistered = false

export function registerTheme() {
  if (!themeRegistered && typeof window !== 'undefined') {
    echarts.registerTheme(THEME_NAME, themeConfig)
    themeRegistered = true
  }
}

// Exportar la configuración del tema para uso directo
export const echartsTheme = themeConfig

// Colores del tema para uso en componentes
export const chartColors = themeConfig.color
