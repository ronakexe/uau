"use client"

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"
import { useImpairmentEffects } from "../hooks/useImpairmentEffects"
import { LEGAL_LIMITS } from "../utils/constants"

interface ComparisonChartProps {
  currentBAC: number
}

export function ComparisonChart({ currentBAC }: ComparisonChartProps) {
  const { effects } = useImpairmentEffects(currentBAC)

  // Generate BAC over time data
  const generateBACOverTime = () => {
    const data = []
    const peakBAC = currentBAC
    const eliminationRate = 0.015 // per hour

    // Show 12 hours forward
    for (let hour = 0; hour <= 12; hour++) {
      const bacAtHour = Math.max(0, peakBAC - eliminationRate * hour)
      data.push({
        hour,
        bac: parseFloat(bacAtHour.toFixed(3)),
      })
    }
    return data
  }

  const bacOverTimeData = generateBACOverTime()

  // Impairment metrics data
  const impairmentData = [
    {
      metric: "Reaction Time",
      value: Math.round((effects.reactionTimeMultiplier - 1) * 100),
      baseline: 0,
    },
    {
      metric: "Vision Clarity",
      value: Math.round((1 - effects.visionImpairment) * 100),
      baseline: 100,
    },
    {
      metric: "Decision Quality",
      value: Math.round(effects.decisionQuality * 100),
      baseline: 100,
    },
    {
      metric: "Motor Control",
      value: Math.round(effects.motorControl * 100),
      baseline: 100,
    },
  ]

  return (
    <div className="space-y-8">
      {/* BAC Over Time Chart */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">BAC Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={bacOverTimeData}>
            <defs>
              <linearGradient id="colorBAC" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="hour"
              label={{ value: "Hours", position: "insideBottom", offset: -5 }}
            />
            <YAxis
              label={{ value: "BAC %", angle: -90, position: "insideLeft" }}
              domain={[0, "dataMax + 0.02"]}
            />
            <Tooltip
              formatter={(value: number | undefined) => {
                if (value === undefined) return ["N/A", "BAC"]
                return [`${value.toFixed(3)}%`, "BAC"]
              }}
              labelFormatter={(label) => `Hour ${label}`}
            />
            <Area
              type="monotone"
              dataKey="bac"
              stroke="#ef4444"
              fillOpacity={1}
              fill="url(#colorBAC)"
            />
            {/* Legal limit line */}
            <Line
              type="monotone"
              dataKey={() => LEGAL_LIMITS.driving}
              stroke="#f59e0b"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              name="Legal Limit (0.08%)"
            />
            <Legend />
          </AreaChart>
        </ResponsiveContainer>
        <p className="text-sm text-muted-foreground">
          This chart shows how your BAC declines over time at a rate of approximately 0.015% per
          hour. The yellow dashed line indicates the legal driving limit.
        </p>
      </div>

      {/* Impairment Metrics Comparison */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Impairment Metrics</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={impairmentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="metric" />
            <YAxis label={{ value: "Percentage", angle: -90, position: "insideLeft" }} />
            <Tooltip
              formatter={(value: number | undefined, name: string | undefined) => {
                if (value === undefined) {
                  const label = name === "value" ? "Current" : name === "baseline" ? "Baseline" : "Value"
                  return ["N/A", label]
                }
                if (name === "value") return [`${value}%`, "Current"]
                return [`${value}%`, "Baseline"]
              }}
            />
            <Legend />
            <Bar dataKey="baseline" fill="#94a3b8" name="Baseline (100%)" />
            <Bar dataKey="value" fill="#ef4444" name="Current Level" />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-sm text-muted-foreground">
          Comparison of your current impairment levels against baseline (sober) performance. Lower
          values indicate greater impairment.
        </p>
      </div>

      {/* Accessibility: Data Table */}
      <div className="rounded-lg border bg-card p-4" role="region" aria-label="Chart data table">
        <h4 className="mb-3 font-semibold">Data Table</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2 text-left">Metric</th>
                <th className="px-4 py-2 text-right">Baseline</th>
                <th className="px-4 py-2 text-right">Current</th>
                <th className="px-4 py-2 text-right">Difference</th>
              </tr>
            </thead>
            <tbody>
              {impairmentData.map((item) => {
                const difference = item.value - item.baseline
                return (
                  <tr key={item.metric} className="border-b">
                    <td className="px-4 py-2">{item.metric}</td>
                    <td className="px-4 py-2 text-right">{item.baseline}%</td>
                    <td className="px-4 py-2 text-right">{item.value}%</td>
                    <td className={`px-4 py-2 text-right ${difference < 0 ? "text-red-600" : ""}`}>
                      {difference > 0 ? "+" : ""}
                      {difference}%
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

