"use client"

import { ReactionTimeVisual } from "../components/ReactionTimeVisual"
import { useBACContext } from "../context/BACContext"

export function Slide5_ReactionTime() {
  const { result } = useBACContext()

  return (
    <div className="container mx-auto min-h-screen px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-center text-4xl font-bold md:text-5xl">
          Reaction Time Impact
        </h1>
        <p className="mb-8 text-center text-lg text-muted-foreground md:text-xl">
          Test your baseline reaction time, then see how it changes with simulated impairment
        </p>

        <ReactionTimeVisual bac={result.currentBAC} />

        {/* Educational Content */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="mb-3 text-xl font-semibold">Why Reaction Time Matters</h3>
            <p className="text-muted-foreground">
              Slower reaction times mean you take longer to respond to hazards on the road. At 60
              mph, every millisecond counts. Even a small delay can mean the difference between
              avoiding an accident and a collision.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h3 className="mb-3 text-xl font-semibold">The Science</h3>
            <p className="text-muted-foreground">
              Research shows that reaction time increases approximately 50% at 0.08% BAC. This
              means if your baseline reaction time is 250ms, impaired reaction time could be 375ms
              or more. This delay significantly increases stopping distance and accident risk.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

