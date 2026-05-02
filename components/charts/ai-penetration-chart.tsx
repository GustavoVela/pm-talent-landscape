"use client"

import ReactECharts from "echarts-for-react"
import { useTheme } from "next-themes"

export function AiPenetrationChart() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const data = [
    { country: "Estados Unidos", flag: "🇺🇸", percentage: 36.2, withAi: 485, total: 1339 },
    { country: "Colombia", flag: "🇨🇴", percentage: 27.9, withAi: 56, total: 201 },
    { country: "Brasil", flag: "🇧🇷", percentage: 24.6, withAi: 154, total: 626 },
    { country: "México", flag: "🇲🇽", percentage: 23.1, withAi: 96, total: 415 },
    { country: "Chile", flag: "🇨🇱", percentage: 20.3, withAi: 37, total: 182 },
    { country: "Perú", flag: "🇵🇪", percentage: 16.4, withAi: 12, total: 73 },
  ]

  const option = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "item",
      backgroundColor: isDark ? "#1f2937" : "#ffffff",
      borderColor: isDark ? "#374151" : "#e5e7eb",
      textStyle: { color: isDark ? "#f9fafb" : "#111827" },
      formatter: function (params: any) {
        const item = data[params.dataIndex];
        return `
          <div style="font-family: inherit; padding: 4px;">
            <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">
              ${item.flag} ${item.country}
            </div>
            <div style="font-size: 13px;">
              Penetración IA: <strong style="color: #3b82f6;">${item.percentage}%</strong>
            </div>
            <div style="font-size: 12px; color: ${isDark ? '#9ca3af' : '#6b7280'}; margin-top: 4px;">
              (${item.withAi} de ${item.total} vacantes)
            </div>
          </div>
        `
      }
    },
    grid: {
      top: "15%",
      left: "0%",
      right: "0%",
      bottom: "0%",
      containLabel: true
    },
    xAxis: {
      type: "category",
      name: "País",
      nameLocation: "middle",
      nameGap: 35,
      nameTextStyle: {
        color: isDark ? "#9ca3af" : "#6b7280",
        fontSize: 12,
        fontWeight: 600
      },
      data: data.map(d => d.country),
      axisLabel: {
        interval: 0,
        fontWeight: 600,
        color: isDark ? "#9ca3af" : "#4b5563",
        fontSize: 12,
        margin: 12
      },
      axisLine: {
        lineStyle: {
          color: isDark ? "#374151" : "#e5e7eb"
        }
      },
      axisTick: { show: false }
    },
    yAxis: {
      type: "value",
      max: 50,
      name: "Vacantes que piden IA (%)",
      nameLocation: "middle",
      nameGap: 40,
      nameTextStyle: {
        color: isDark ? "#9ca3af" : "#6b7280",
      },
      axisLabel: {
        formatter: "{value}%",
        color: isDark ? "#9ca3af" : "#6b7280"
      },
      splitLine: {
        lineStyle: {
          color: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
          type: "dashed"
        }
      }
    },
    series: [
      {
        data: data.map(d => d.percentage),
        type: "bar",
        barWidth: "60%",
        itemStyle: {
          color: {
            type: "linear",
            x: 0, y: 1, x2: 0, y2: 0,
            colorStops: [
              { offset: 0, color: "#38bdf8" },
              { offset: 1, color: "#0ea5e9" }
            ]
          },
          borderRadius: [4, 4, 0, 0]
        },
        label: {
          show: true,
          position: "top",
          distance: 10,
          formatter: function (params: any) {
            const item = data[params.dataIndex]
            return `{flag|${item.flag}}\n{fraction|${item.withAi} / ${item.total} vacantes}\n{percentage|${item.percentage}%}`
          },
          rich: {
            flag: {
              fontSize: 18,
              align: "center",
              lineHeight: 24
            },
            fraction: {
              fontSize: 10,
              color: isDark ? "#9ca3af" : "#6b7280",
              align: "center",
              lineHeight: 16
            },
            percentage: {
              fontSize: 16,
              fontWeight: "bold",
              color: "#3b82f6",
              align: "center",
              lineHeight: 22
            }
          }
        },
        markLine: {
          symbol: ['none', 'none'],
          silent: true,
          z: 0,
          label: {
            show: true,
            position: 'insideEndTop',
            formatter: '{b}',
            color: isDark ? "#9ca3af" : "#6b7280",
            fontSize: 11,
            fontWeight: 600,
            padding: [0, 0, 4, 0]
          },
          data: [
            {
              name: '🇺🇸 Benchmark EE.UU. (36.2%)',
              yAxis: 36.2,
              lineStyle: { color: '#0ea5e9', type: 'dashed', width: 1.5, opacity: 0.7 }
            },
            {
              name: '🌎 Promedio LatAm (23.7%)',
              yAxis: 23.7,
              lineStyle: { color: '#10b981', type: 'dashed', width: 1.5, opacity: 0.7 }
            }
          ]
        }
      }
    ]
  }

  return (
    <div className="w-full h-[304px] -mt-2 -mb-4">
      <ReactECharts
        option={option}
        style={{ height: "100%", width: "100%" }}
        opts={{ renderer: "svg" }}
      />
    </div>
  )
}
