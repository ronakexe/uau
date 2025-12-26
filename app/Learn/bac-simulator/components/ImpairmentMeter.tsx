"use client"

import { motion } from "framer-motion"
import { getImpairmentEffects } from "../utils/impairmentLevels"

interface ImpairmentMeterProps {
  bac: number
}

export function ImpairmentMeter({ bac }: ImpairmentMeterProps) {
  const effects = getImpairmentEffects(bac)

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

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h4 className="text-lg font-semibold">Impairment Level</h4>
        <motion.p
          key={effects.level}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-2xl font-bold capitalize"
          style={{ color: getColor() }}
        >
          {effects.level}
        </motion.p>
        <p className="text-sm text-muted-foreground">{effects.description}</p>
      </div>

      {/* Visual Meter */}
      <div className="relative h-8 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full"
          style={{ backgroundColor: getColor() }}
          initial={{ width: 0 }}
          animate={{
            width: `${Math.min(100, (bac / 0.30) * 100)}%`,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
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

