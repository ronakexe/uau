"use client"

import { useEffect, useState } from "react"
import { AlertTriangle, TrendingUp, TrendingDown } from "lucide-react"
import { LEGAL_LIMITS } from "../utils/constants"
import { getImpairmentEffects } from "../utils/impairmentLevels"

interface BACDisplayProps {
  currentBAC: number
  peakBAC: number
  hoursToSober: number
  isAboveLegal: boolean
}

export function BACDisplay({
  currentBAC,
  peakBAC,
  hoursToSober,
  isAboveLegal,
}: BACDisplayProps) {
  const effects = getImpairmentEffects(currentBAC)
  const isRising = currentBAC < peakBAC && peakBAC > 0
  const [animatedBAC, setAnimatedBAC] = useState(currentBAC)
  const [gaugeOffset, setGaugeOffset] = useState(2 * Math.PI * 45)

  // Calculate gauge percentage (0-100%)
  const gaugePercentage = Math.min(100, (currentBAC / 0.30) * 100) // Max display at 0.30%

  // Get color based on BAC zone
  const getGaugeColor = () => {
    if (currentBAC < 0.05) return "rgb(34, 197, 94)" // green
    if (currentBAC < 0.08) return "rgb(234, 179, 8)" // yellow
    if (currentBAC < 0.15) return "rgb(249, 115, 22)" // orange
    return "rgb(239, 68, 68)" // red
  }

  // Animate BAC value changes
  useEffect(() => {
    setAnimatedBAC(currentBAC)
  }, [currentBAC])

  // Animate gauge circle
  useEffect(() => {
    const targetOffset = 2 * Math.PI * 45 * (1 - gaugePercentage / 100)
    setGaugeOffset(targetOffset)
  }, [gaugePercentage])

  return (
    <div className="space-y-6 rounded-lg border bg-card p-6">
      <h3 className="text-xl font-semibold">Your BAC</h3>

      {/* Large BAC Readout */}
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="relative">
          <div
            key={currentBAC}
            className="text-6xl font-mono font-bold md:text-7xl animate-scale-in"
            style={{ color: getGaugeColor() }}
          >
            {animatedBAC.toFixed(3)}%
          </div>
        </div>

        {/* Trend Indicator */}
        {peakBAC > 0 && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {isRising ? (
              <>
                <TrendingUp className="h-4 w-4 text-orange-500" />
                <span>BAC rising (peak: {peakBAC.toFixed(3)}%)</span>
              </>
            ) : (
              <>
                <TrendingDown className="h-4 w-4 text-green-500" />
                <span>BAC declining</span>
              </>
            )}
          </div>
        )}

        {/* Legal Limit Warning */}
        {isAboveLegal && (
          <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-destructive animate-scale-in">
            <AlertTriangle className="h-5 w-5" />
            <span className="font-semibold">ABOVE LEGAL DRIVING LIMIT (0.08%)</span>
          </div>
        )}

        {/* Impairment Level */}
        <div className="text-center">
          <p className="text-sm font-medium text-muted-foreground">Impairment Level</p>
          <p className="text-lg font-semibold capitalize" style={{ color: getGaugeColor() }}>
            {effects.level}
          </p>
          <p className="text-xs text-muted-foreground">{effects.description}</p>
        </div>
      </div>

      {/* Circular Gauge */}
      <div className="flex justify-center">
        <div className="relative h-48 w-48">
          <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-muted"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={getGaugeColor()}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 45}`}
              style={{
                strokeDashoffset: gaugeOffset,
                transition: "stroke-dashoffset 0.5s ease-out",
              }}
            />
            {/* Color zones */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgb(34, 197, 94)"
              strokeWidth="2"
              strokeDasharray={`${2 * Math.PI * 45 * (16.67 / 100)}`}
              strokeDashoffset={2 * Math.PI * 45 * 0.8333}
              opacity="0.3"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgb(234, 179, 8)"
              strokeWidth="2"
              strokeDasharray={`${2 * Math.PI * 45 * (10 / 100)}`}
              strokeDashoffset={2 * Math.PI * 45 * 0.7333}
              opacity="0.3"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgb(249, 115, 22)"
              strokeWidth="2"
              strokeDasharray={`${2 * Math.PI * 45 * (23.33 / 100)}`}
              strokeDashoffset={2 * Math.PI * 45 * 0.5}
              opacity="0.3"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgb(239, 68, 68)"
              strokeWidth="2"
              strokeDasharray={`${2 * Math.PI * 45 * (50 / 100)}`}
              strokeDashoffset={2 * Math.PI * 45 * 0}
              opacity="0.3"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: getGaugeColor() }}>
                {currentBAC.toFixed(2)}%
              </div>
              <div className="text-xs text-muted-foreground">BAC</div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg bg-muted/50 p-3">
          <p className="text-xs text-muted-foreground">Peak BAC</p>
          <p className="text-lg font-semibold">{peakBAC.toFixed(3)}%</p>
        </div>
        <div className="rounded-lg bg-muted/50 p-3">
          <p className="text-xs text-muted-foreground">Time to Sober</p>
          <p className="text-lg font-semibold">
            {hoursToSober > 0 ? `${hoursToSober.toFixed(1)} hours` : "Already sober"}
          </p>
        </div>
      </div>
    </div>
  )
}
