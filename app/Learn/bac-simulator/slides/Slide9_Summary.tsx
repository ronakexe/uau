"use client"

import { CheckCircle2 } from "lucide-react"

export function Slide9_Summary() {
  const takeaways = [
    "BAC is measurable; you can estimate yours using the Widmark formula",
    "Even moderate BAC significantly impairs critical functions (reaction time, vision, judgment)",
    "Multiple impairment pathways work simultaneously, creating exponentially higher risk",
    "Legal consequences are severe and can have long-term impacts on your future",
    "Time is the only solution - only your liver can metabolize alcohol (~0.015% per hour)",
  ]

  const prevention = [
    "Set limits before drinking - decide how many drinks you'll have",
    "Use plan B transportation - always have a backup ride arranged",
    "Stick with friends - look out for each other",
    "Know your BAC - use the calculator to estimate your level",
    "When in doubt, don't drive - if you're unsure, choose the safer option",
  ]

  return (
    <div className="container mx-auto min-h-screen px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-4xl font-bold md:text-5xl">
          Key Takeaways
        </h1>

        {/* Main Takeaways */}
        <div className="mb-12 rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-2xl font-semibold">What You've Learned</h2>
          <ul className="space-y-3">
            {takeaways.map((takeaway, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-green-600" />
                <span className="text-muted-foreground">{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Prevention Strategies */}
        <div className="mb-12 rounded-lg border bg-primary/5 p-6">
          <h2 className="mb-4 text-2xl font-semibold">Prevention Strategies</h2>
          <ul className="space-y-3">
            {prevention.map((strategy, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <span className="text-muted-foreground">{strategy}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Call to Action */}
        <div className="rounded-lg border-l-4 border-primary bg-primary/10 p-6">
          <p className="text-center text-lg font-semibold">
            Think before you drink. Plan for safe transportation.
          </p>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Knowledge is power. Understanding how alcohol affects your body helps you make safer
            choices.
          </p>
        </div>
      </div>
    </div>
  )
}
