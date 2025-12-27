"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { useImpairmentEffects } from "../hooks/useImpairmentEffects"

interface ReactionTimeVisualProps {
  bac: number
}

export function ReactionTimeVisual({ bac }: ReactionTimeVisualProps) {
  const [baselineTimes, setBaselineTimes] = useState<number[]>([])
  const [currentTestStart, setCurrentTestStart] = useState<number | null>(null)
  const [dotColor, setDotColor] = useState<"red" | "blue" | null>(null)
  const [testPhase, setTestPhase] = useState<"idle" | "running" | "complete">("idle")
  const [currentTrial, setCurrentTrial] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const { getImpairedReactionTimeMs } = useImpairmentEffects(bac)

  const averageBaseline = baselineTimes.length > 0
    ? baselineTimes.reduce((a, b) => a + b, 0) / baselineTimes.length
    : 0

  const impairedTime = averageBaseline > 0 ? getImpairedReactionTimeMs(averageBaseline) : 0
  const timeDifference = impairedTime - averageBaseline
  const percentIncrease = averageBaseline > 0 ? (timeDifference / averageBaseline) * 100 : 0

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const startNextTrial = useCallback((trialNumber: number) => {
    if (trialNumber > 3) {
      setTestPhase("complete")
      setDotColor(null)
      return
    }

    // Show red dot immediately
    setDotColor("red")
    setCurrentTestStart(null)

    // Random delay before changing to blue (1-3 seconds)
    const delay = Math.random() * 2000 + 1000
    
    timeoutRef.current = setTimeout(() => {
      setCurrentTestStart(Date.now())
      setDotColor("blue")
    }, delay)
  }, [])

  const startTest = useCallback(() => {
    setTestPhase("running")
    setCurrentTrial(1)
    setBaselineTimes([])
    startNextTrial(1)
  }, [startNextTrial])

  const handleTargetClick = useCallback(() => {
    if (!currentTestStart || dotColor !== "blue" || testPhase !== "running") return

    // Clear any pending timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    const reactionTime = Date.now() - currentTestStart
    setBaselineTimes((prev) => {
      const newTimes = [...prev, reactionTime]
      
      // Start next trial after a brief pause (if not done)
      if (newTimes.length < 3) {
        setTimeout(() => {
          const nextTrial = newTimes.length + 1
          setCurrentTrial(nextTrial)
          startNextTrial(nextTrial)
        }, 500)
      } else {
        // All 3 trials complete
        setTimeout(() => {
          setTestPhase("complete")
          setDotColor(null)
        }, 500)
      }
      
      return newTimes
    })
    setDotColor(null)
    setCurrentTestStart(null)
  }, [currentTestStart, dotColor, testPhase, startNextTrial])

  const resetTest = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setBaselineTimes([])
    setTestPhase("idle")
    setDotColor(null)
    setCurrentTestStart(null)
    setCurrentTrial(0)
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
          {testPhase === "idle"
            ? "Click 'Start Test' to begin. A red dot will appear, then change to blue. Click the blue dot as fast as possible. You'll complete 3 trials automatically."
            : testPhase === "running"
            ? "Click the blue dot as fast as possible when it appears!"
            : "Test complete! Compare your results below."}
        </p>
      </div>

      {/* Test Area */}
      <div className="flex gap-6">
        {/* Trial Counter */}
        {testPhase === "running" && (
          <div className="flex shrink-0 flex-col items-center justify-center rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">Trial</p>
            <p className="text-3xl font-bold">
              {currentTrial}/3
            </p>
          </div>
        )}

        {/* Test Area */}
        <div className="relative flex flex-1 min-h-[300px] items-center justify-center rounded-lg border bg-muted/20">
          {dotColor && (
            <button
              onClick={handleTargetClick}
              className={`h-24 w-24 rounded-full shadow-lg transition-all hover:scale-110 ${
                dotColor === "red" ? "bg-red-500" : "bg-blue-500"
              }`}
              aria-label={dotColor === "blue" ? "Click target as fast as possible" : "Wait for blue dot"}
              disabled={dotColor === "red"}
            />
          )}

          {testPhase === "idle" && (
            <Button onClick={startTest} size="lg">
              Start Test
            </Button>
          )}
        </div>
      </div>

      {/* Results */}
      {testPhase === "running" && baselineTimes.length > 0 && (
        <div className="rounded-lg border bg-card p-4">
          <h4 className="font-semibold">Current Results</h4>
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
