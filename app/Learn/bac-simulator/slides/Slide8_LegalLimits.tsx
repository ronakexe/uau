"use client"

import { LEGAL_LIMITS } from "../utils/constants"

export function Slide8_LegalLimits() {
  const thresholds = [
    {
      bac: 0.08,
      label: "DUI/DWI Threshold",
      description:
        "In most US states, driving with a BAC of 0.08% or higher is illegal. Penalties include fines, license suspension, and possible jail time.",
      color: "text-orange-600",
    },
    {
      bac: 0.15,
      label: "Aggravated DUI",
      description:
        "Many states have enhanced penalties for BAC of 0.15% or higher, including longer license suspensions, mandatory alcohol treatment, and ignition interlock devices.",
      color: "text-red-600",
    },
    {
      bac: 0.20,
      label: "Felony Charges",
      description:
        "At very high BAC levels (0.20%+), some states may charge DUI as a felony, especially if there are other aggravating factors.",
      color: "text-red-700",
    },
  ]

  const myths = [
    {
      myth: "Coffee sobers you up",
      truth: "Coffee does not reduce BAC. It may make you feel more alert, but you're still impaired.",
    },
    {
      myth: "Cold showers help",
      truth: "Cold showers don't affect BAC. They may wake you up, but alcohol is still in your system.",
    },
    {
      myth: "Eating food reduces BAC",
      truth: "Food can slow alcohol absorption, but it doesn't eliminate alcohol already in your system.",
    },
    {
      myth: "Sleeping it off works quickly",
      truth: "Sleep doesn't speed up metabolism. Your body still processes alcohol at ~0.015% per hour.",
    },
  ]

  return (
    <div className="container mx-auto min-h-screen px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-4xl font-bold md:text-5xl animate-fade-in-up">
          Legal Limits & Consequences
        </h1>

        {/* Legal Thresholds */}
        <div className="mb-12 space-y-6">
          {thresholds.map((threshold, index) => (
            <div
              key={index}
              className="rounded-lg border bg-card p-6 animate-fade-in-up"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <div className="mb-2 flex items-center gap-4">
                <div className={`text-3xl font-bold ${threshold.color}`}>
                  {threshold.bac.toFixed(2)}%
                </div>
                <h3 className="text-xl font-semibold">{threshold.label}</h3>
              </div>
              <p className="text-muted-foreground">{threshold.description}</p>
            </div>
          ))}
        </div>

        {/* Non-Legal Consequences */}
        <div className="mb-12 rounded-lg border bg-card p-6 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <h2 className="mb-4 text-2xl font-semibold">Beyond Legal Consequences</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="mb-2 font-semibold">Financial Impact</h3>
              <ul className="list-disc space-y-1 pl-6 text-sm text-muted-foreground">
                <li>Increased insurance premiums</li>
                <li>Legal fees and court costs</li>
                <li>License reinstatement fees</li>
                <li>Potential job loss</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Long-Term Impact</h3>
              <ul className="list-disc space-y-1 pl-6 text-sm text-muted-foreground">
                <li>Criminal record</li>
                <li>Scholarship eligibility</li>
                <li>Professional licensing issues</li>
                <li>Background check problems</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Myth Busting */}
        <div className="rounded-lg border bg-card p-6 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          <h2 className="mb-4 text-2xl font-semibold">Myth Busting</h2>
          <div className="space-y-4">
            {myths.map((item, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <p className="mb-1 font-semibold text-destructive">{item.myth}</p>
                <p className="text-sm text-muted-foreground">{item.truth}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded bg-primary/10 p-4">
            <p className="text-sm font-semibold">The Only Solution:</p>
            <p className="text-sm text-muted-foreground">
              Only <strong>TIME</strong> reduces BAC. Your body processes approximately 1 standard
              drink per hour (0.015% BAC per hour). Plan accordingly.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
