"use client"

import { DecisionMakingDemo } from "../components/DecisionMakingDemo"
import { useBACContext } from "../context/BACContext"

export function Slide7_Decision() {
  const { result } = useBACContext()

  return (
    <div className="container mx-auto min-h-screen px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-4 text-center text-4xl font-bold md:text-5xl">
          Decision-Making Under Impairment
        </h1>
        <p className="mb-8 text-center text-lg text-muted-foreground md:text-xl">
          See how BAC affects your ability to make safe choices
        </p>

        <DecisionMakingDemo bac={result.currentBAC} />

        {/* Additional Educational Content */}
        <div className="mt-12 rounded-lg border bg-card p-6">
          <h3 className="mb-3 text-xl font-semibold">The Impairment Paradox</h3>
          <p className="mb-4 text-muted-foreground">
            One of the most dangerous aspects of alcohol impairment is that it affects your ability
            to recognize your own impairment. This means:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>
              You may feel confident in your decision-making, but statistics show impaired judgment
            </li>
            <li>
              You're more likely to underestimate risks and overestimate your abilities
            </li>
            <li>
              The higher your BAC, the more likely you are to make dangerous choices
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

