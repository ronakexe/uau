"use client"

import { BACCalculator } from "../components/BACCalculator"
import { ComparisonChart } from "../components/ComparisonChart"
import { useBACContext } from "../context/BACContext"

export function Slide4_InteractiveCalc() {
  // Use shared calculator state from context
  const { result } = useBACContext()

  return (
    <div className="container mx-auto min-h-screen px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-4 text-center text-4xl font-bold md:text-5xl">
          Your Personal Calculation
        </h1>
        <p className="mb-8 text-center text-lg text-muted-foreground md:text-xl">
          Enter your information to calculate your estimated BAC
        </p>

        {/* Calculator */}
        <div className="mb-12">
          <BACCalculator />
        </div>

        {/* Chart */}
        {result.currentBAC > 0 && (
          <div className="rounded-lg border bg-card p-6">
            <ComparisonChart currentBAC={result.currentBAC} />
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-8 rounded-lg border-l-4 border-yellow-500 bg-yellow-50 p-4 dark:bg-yellow-950/20">
          <p className="text-sm">
            <strong>Important:</strong> This calculator provides estimates. Actual BAC varies based
            on metabolism, food intake, medications, hydration, and other factors. If you choose to
            drink, always have a sober plan for transportation. Do not drive if BAC ≥ 0.08% (or
            any impairment in your state).
          </p>
        </div>
      </div>
    </div>
  )
}

