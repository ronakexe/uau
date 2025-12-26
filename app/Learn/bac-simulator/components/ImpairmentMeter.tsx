"use client"

import { useEffect, useState } from "react"
import { getImpairmentEffects } from "../utils/impairmentLevels"

interface ImpairmentMeterProps {
  bac: number
}

export function ImpairmentMeter({ bac }: ImpairmentMeterProps) {
  const effects = getImpairmentEffects(bac)
  const [meterWidth, setMeterWidth] = useState(0)

  const getColor = () => {
    switch (effects.colorZone) {
      case "green":
        return "rgb(34, 197, 94)"
      case "yellow":
        return "rgb(234, 179, 8)"
      case "orange":
        return "rgb(249, 115, 22)"
      case "red":
        return "rgb(239, 68, 68)"
    }
  }

  useEffect(() => {
    setMeterWidth(Math.min(100, (bac / 0.30) * 100))
  }, [bac])

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h4 className="text-lg font-semibold">Impairment Level</h4>
        <p
          key={effects.level}
          className="text-2xl font-bold capitalize animate-scale-in"
          style={{ color: getColor() }}
        >
          {effects.level}
        </p>
        <p className="text-sm text-muted-foreground">{effects.description}</p>
      </div>

      {/* Visual Meter */}
      <div className="relative h-8 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full transition-all duration-500 ease-out"
          style={{ backgroundColor: getColor(), width: `${meterWidth}%` }}
        />
        {/* Markers */}
        <div className="absolute inset-0 flex">
          <div className="flex-1 border-r border-background/50" />
          <div className="flex-1 border-r border-background/50" />
          <div className="flex-1 border-r border-background/50" />
        </div>
      </div>

      {/* Labels */}
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>0.00%</span>
        <span>0.05%</span>
        <span>0.08%</span>
        <span>0.15%</span>
        <span>0.30%</span>
      </div>
    </div>
  )
}
