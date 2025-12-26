"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { useImpairmentEffects } from "../hooks/useImpairmentEffects"

interface ReactionTimeVisualProps {
  bac: number
}

export function ReactionTimeVisual({ bac }: ReactionTimeVisualProps) {
  const [baselineTimes, setBaselineTimes] = useState<number[]>([])
  const [currentTestStart, setCurrentTestStart] = useState<number | null>(null)
  const [showTarget, setShowTarget] = useState(false)
  const [testPhase, setTestPhase] = useState<"baseline" | "impaired" | "complete">("baseline")
  const { getImpairedReactionTimeMs } = useImpairmentEffects(bac)

  const averageBaseline = baselineTimes.length > 0
    ? baselineTimes.reduce((a, b) => a + b, 0) / baselineTimes.length
    : 0

  const impairedTime = averageBaseline > 0 ? getImpairedReactionTimeMs(averageBaseline) : 0
  const timeDifference = impairedTime - averageBaseline
  const percentIncrease = averageBaseline > 0 ? (timeDifference / averageBaseline) * 100 : 0

  const startTest = useCallback(() => {
    if (testPhase === "baseline" && baselineTimes.length >= 3) {
      setTestPhase("impaired")
      return
    }
    if (testPhase === "impaired") {
      setTestPhase("complete")
      return
    }

    // Random delay before showing target (1-3 seconds)
    const delay = Math.random() * 2000 + 1000
    setCurrentTestStart(null)
    setShowTarget(false)

    setTimeout(() => {
      setCurrentTestStart(Date.now())
      setShowTarget(true)
    }, delay)
  }, [testPhase, baselineTimes.length])

  const handleTargetClick = useCallback(() => {
    if (!currentTestStart || !showTarget) return

    const reactionTime = Date.now() - currentTestStart
    setShowTarget(false)

    if (testPhase === "baseline") {
      setBaselineTimes((prev) => [...prev, reactionTime])
    }
  }, [currentTestStart, showTarget, testPhase])

  const resetTest = useCallback(() => {
    setBaselineTimes([])
    setTestPhase("baseline")
    setShowTarget(false)
    setCurrentTestStart(null)
  }, [])

  // Calculate stopping distance at 60 mph
  const mphToFeetPerMs = 88 / 1000 // 60 mph = 88 ft/s = 0.088 ft/ms
  const baselineStoppingDistance = averageBaseline * mphToFeetPerMs
  const impairedStoppingDistance = impairedTime * mphToFeetPerMs
  const extraDistance = impairedStoppingDistance - baselineStoppingDistance

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Reaction Time Test</h3>
        <p className="text-muted-foreground">
          {testPhase === "baseline"
            ? "Click the button below, then click the red target as fast as possible when it appears (3 trials)"
            : testPhase === "impaired"
            ? "Now test with simulated impairment based on your BAC"
            : "Test complete! Compare your results below."}
        </p>
      </div>

      {/* Test Area */}
      <div className="relative flex min-h-[300px] items-center justify-center rounded-lg border bg-muted/20">
        {showTarget && (
          <button
            onClick={handleTargetClick}
            className="h-24 w-24 rounded-full bg-red-500 shadow-lg transition-all hover:scale-110"
            aria-label="Click target as fast as possible"
          />
        )}

        {!showTarget && testPhase !== "complete" && (
          <Button onClick={startTest} size="lg">
            {testPhase === "baseline"
              ? baselineTimes.length === 0
                ? "Start Baseline Test"
                : `Trial ${baselineTimes.length + 1} of 3`
              : "Start Impaired Test"}
          </Button>
        )}
      </div>

      {/* Results */}
      {testPhase === "baseline" && baselineTimes.length > 0 && (
        <div className="rounded-lg border bg-card p-4">
          <h4 className="font-semibold">Baseline Results</h4>
          <div className="mt-2 space-y-1 text-sm">
            {baselineTimes.map((time, i) => (
              <div key={i}>Trial {i + 1}: {time}ms</div>
            ))}
            {baselineTimes.length >= 3 && (
              <div className="mt-2 font-semibold">
                Average: {Math.round(averageBaseline)}ms
              </div>
            )}
          </div>
        </div>
      )}

      {testPhase === "complete" && averageBaseline > 0 && (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border bg-green-50 p-4 dark:bg-green-950/20">
              <h4 className="font-semibold text-green-700 dark:text-green-400">Baseline</h4>
              <p className="text-3xl font-bold text-green-700 dark:text-green-400">
                {Math.round(averageBaseline)}ms
              </p>
            </div>
            <div className="rounded-lg border bg-red-50 p-4 dark:bg-red-950/20">
              <h4 className="font-semibold text-red-700 dark:text-red-400">Impaired</h4>
              <p className="text-3xl font-bold text-red-700 dark:text-red-400">
                {Math.round(impairedTime)}ms
              </p>
              <p className="text-sm text-red-600 dark:text-red-400">
                +{Math.round(timeDifference)}ms ({Math.round(percentIncrease)}% slower)
              </p>
            </div>
          </div>

          {/* Driving Scenario */}
          <div className="rounded-lg border bg-card p-4">
            <h4 className="font-semibold">Real-World Impact</h4>
            <p className="mt-2 text-sm">
              At 60 mph, your car travels <strong>{baselineStoppingDistance.toFixed(1)} feet</strong>{" "}
              during your baseline reaction time. With impairment, you travel{" "}
              <strong>{impairedStoppingDistance.toFixed(1)} feet</strong> — that's an extra{" "}
              <strong className="text-destructive">{extraDistance.toFixed(1)} feet</strong> before
              you can react. That extra distance could be the difference between avoiding an
              accident and a collision.
            </p>
          </div>

          <Button onClick={resetTest} variant="outline" className="w-full">
            Reset Test
          </Button>
        </div>
      )}
    </div>
  )
}
