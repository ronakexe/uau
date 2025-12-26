"use client"

import { VisionSimulator } from "../components/VisionSimulator"
import { useBACContext } from "../context/BACContext"

export function Slide6_Vision() {
  const { result } = useBACContext()

  return (
    <div className="container mx-auto min-h-screen px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-4 text-center text-4xl font-bold md:text-5xl">
          Vision Impairment Simulator
        </h1>
        <p className="mb-8 text-center text-lg text-muted-foreground md:text-xl">
          See how alcohol affects your vision at different BAC levels
        </p>

        <VisionSimulator bac={result.currentBAC} />

        {/* Educational Content */}
        <div className="mt-12 space-y-6">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="mb-3 text-xl font-semibold">Tunnel Vision</h3>
            <p className="mb-4 text-muted-foreground">
              As BAC increases, peripheral vision decreases. This "tunnel vision" effect makes it
              harder to see:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
              <li>Pedestrians crossing from the sides</li>
              <li>Vehicles in adjacent lanes</li>
              <li>Traffic signs and signals</li>
              <li>Hazards in your peripheral field</li>
            </ul>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h3 className="mb-3 text-xl font-semibold">Blur and Distortion</h3>
            <p className="text-muted-foreground">
              Higher BAC levels also cause visual blur, reduced contrast sensitivity, and difficulty
              focusing. These effects compound with tunnel vision to create a dangerous combination
              that significantly impairs your ability to drive safely.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

