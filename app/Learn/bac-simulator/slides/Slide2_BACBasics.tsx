"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ComparisonChart } from "../components/ComparisonChart"

export function Slide2_BACBasics() {
  const [demoWeight, setDemoWeight] = useState(150)
  const [demoGender, setDemoGender] = useState<"male" | "female">("male")
  const [demoDrinks, setDemoDrinks] = useState(3)

  // Simplified BAC calculation for demo
  const calculateDemoBAC = () => {
    const weightGrams = demoWeight * 453.592
    const rValue = demoGender === "male" ? 0.68 : 0.55
    const ethanolGrams = demoDrinks * 14
    return ((ethanolGrams / (weightGrams * rValue)) * 100).toFixed(3)
  }

  const demoBAC = parseFloat(calculateDemoBAC())

  return (
    <div className="container mx-auto min-h-screen px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-4xl font-bold md:text-5xl">
          The Widmark Formula
        </h1>
        <p className="mb-12 text-center text-lg text-muted-foreground md:text-xl">
          The science behind BAC calculation
        </p>

        {/* Formula Display */}
        <div className="mb-8 rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-2xl font-semibold">The Formula</h2>
          <div className="space-y-2 font-mono text-lg">
            <p>BAC = (Alcohol in grams / [Weight in grams × r]) × 100</p>
            <p className="text-sm text-muted-foreground">
              Where r = 0.68 (male) or 0.55 (female) - water distribution coefficient
            </p>
          </div>
        </div>

        {/* Interactive Demo */}
        <div className="mb-8 rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-2xl font-semibold">Try It Yourself</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium">Weight (lbs)</label>
              <input
                type="number"
                value={demoWeight}
                onChange={(e) => setDemoWeight(parseFloat(e.target.value) || 150)}
                className="w-full rounded border px-3 py-2"
                min="80"
                max="500"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Gender</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setDemoGender("male")}
                  className={`flex-1 rounded px-3 py-2 ${
                    demoGender === "male" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  Male
                </button>
                <button
                  onClick={() => setDemoGender("female")}
                  className={`flex-1 rounded px-3 py-2 ${
                    demoGender === "female" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  Female
                </button>
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Drinks</label>
              <input
                type="number"
                value={demoDrinks}
                onChange={(e) => setDemoDrinks(parseInt(e.target.value) || 0)}
                className="w-full rounded border px-3 py-2"
                min="0"
                max="30"
              />
            </div>
          </div>
          <div className="mt-4 rounded bg-muted/50 p-4 text-center">
            <p className="text-sm text-muted-foreground">Estimated Peak BAC</p>
            <p className="text-3xl font-bold">{demoBAC}%</p>
          </div>
        </div>

        {/* Key Factors */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="mb-3 text-xl font-semibold">Weight Impact</h3>
            <p className="mb-4 text-muted-foreground">
              Heavier individuals have more body water, which dilutes alcohol. This means higher
              body weight results in lower BAC for the same amount of alcohol consumed.
            </p>
            <div className="space-y-2 text-sm">
              <p>
                <strong>150 lbs:</strong> 3 drinks ≈ 0.11% BAC
              </p>
              <p>
                <strong>200 lbs:</strong> 3 drinks ≈ 0.08% BAC
              </p>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h3 className="mb-3 text-xl font-semibold">Gender Impact</h3>
            <p className="mb-4 text-muted-foreground">
              Biological differences in body composition mean that females typically have a lower
              water distribution coefficient (0.55 vs 0.68), leading to higher BAC for the same
              alcohol consumption.
            </p>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Male (150 lbs):</strong> 3 drinks ≈ 0.11% BAC
              </p>
              <p>
                <strong>Female (150 lbs):</strong> 3 drinks ≈ 0.13% BAC
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

