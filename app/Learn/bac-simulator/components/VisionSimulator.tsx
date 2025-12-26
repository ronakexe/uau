"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { getVisionFilterValues } from "../utils/impairmentLevels"

interface VisionSimulatorProps {
  bac: number
}

export function VisionSimulator({ bac }: VisionSimulatorProps) {
  const [showSplitScreen, setShowSplitScreen] = useState(false)
  const visionFilters = getVisionFilterValues(bac)

  // Create tunnel vision mask using radial gradient
  const tunnelMaskStyle = {
    maskImage: `radial-gradient(circle at center, transparent 0%, transparent ${visionFilters.tunnelRadius}%, black 100%)`,
    WebkitMaskImage: `radial-gradient(circle at center, transparent 0%, transparent ${visionFilters.tunnelRadius}%, black 100%)`,
  }

  const filterStyle = {
    filter: `blur(${visionFilters.blur}px) saturate(${visionFilters.saturation}) brightness(${visionFilters.brightness})`,
    ...tunnelMaskStyle,
  }

  // Sample driving scene (simplified representation)
  const DrivingScene = ({ impaired = false }: { impaired?: boolean }) => (
    <div
      className="relative h-full w-full overflow-hidden rounded-lg bg-gradient-to-b from-blue-400 to-green-400"
      style={impaired ? filterStyle : {}}
    >
      {/* Road */}
      <div className="absolute bottom-0 h-1/3 w-full bg-gray-700">
        {/* Lane markings */}
        <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 border-l-2 border-dashed border-yellow-300" />
      </div>

      {/* Traffic signs */}
      <div className="absolute left-1/4 top-1/4 h-16 w-16 rounded-full bg-red-500" />
      <div className="absolute right-1/4 top-1/3 h-12 w-20 rounded bg-blue-500" />

      {/* Pedestrian */}
      <div className="absolute bottom-1/3 right-1/3 h-8 w-4 bg-gray-800" />

      {/* Car */}
      <div className="absolute bottom-1/4 left-1/3 h-6 w-12 rounded bg-blue-600" />

      {/* Trees */}
      <div className="absolute left-0 top-0 h-20 w-8 bg-green-600" />
      <div className="absolute right-0 top-0 h-20 w-8 bg-green-600" />
    </div>
  )

  const peripheralVisionLoss = Math.round(visionFilters.peripheralLoss * 100)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Vision Impairment Simulator</h3>
        <p className="text-muted-foreground">
          See how your vision changes at different BAC levels
        </p>
      </div>

      {/* BAC Info */}
      <div className="rounded-lg border bg-card p-4">
        <p className="text-sm">
          At <strong>{bac.toFixed(3)}% BAC</strong>, you're experiencing approximately{" "}
          <strong className="text-destructive">{peripheralVisionLoss}% peripheral vision loss</strong>.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Tunnel vision makes it harder to spot pedestrians, traffic signs, and hazards in your
          peripheral vision.
        </p>
      </div>

      {/* Toggle */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowSplitScreen(!showSplitScreen)}
          className="rounded-lg border bg-background px-4 py-2 text-sm hover:bg-muted"
        >
          {showSplitScreen ? "Show Impaired Only" : "Show Split Screen"}
        </button>
      </div>

      {/* Vision Display */}
      <div className="relative">
        {showSplitScreen ? (
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="mb-2 text-center font-semibold text-green-600">Normal Vision</h4>
              <div className="aspect-video">
                <DrivingScene impaired={false} />
              </div>
            </div>
            <div>
              <h4 className="mb-2 text-center font-semibold text-red-600">Impaired Vision</h4>
              <div className="aspect-video">
                <DrivingScene impaired={true} />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h4 className="mb-2 text-center font-semibold">
              Your Vision at {bac.toFixed(3)}% BAC
            </h4>
            <motion.div
              className="aspect-video"
              animate={{
                filter: `blur(${visionFilters.blur}px) saturate(${visionFilters.saturation}) brightness(${visionFilters.brightness})`,
              }}
              transition={{ duration: 0.5 }}
            >
              <DrivingScene impaired={true} />
            </motion.div>
          </div>
        )}
      </div>

      {/* Vision Stats */}
      <div className="grid gap-4 rounded-lg border bg-card p-4 md:grid-cols-3">
        <div>
          <p className="text-xs text-muted-foreground">Blur Amount</p>
          <p className="text-lg font-semibold">{visionFilters.blur.toFixed(1)}px</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Saturation</p>
          <p className="text-lg font-semibold">{(visionFilters.saturation * 100).toFixed(0)}%</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Peripheral Loss</p>
          <p className="text-lg font-semibold">{peripheralVisionLoss}%</p>
        </div>
      </div>
    </div>
  )
}

