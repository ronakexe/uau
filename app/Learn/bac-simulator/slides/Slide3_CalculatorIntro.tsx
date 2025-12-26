"use client"

export function Slide3_CalculatorIntro() {
  const steps = [
    {
      number: 1,
      title: "Enter Your Weight",
      description: "Input your body weight in pounds or kilograms. The calculator uses this to determine how alcohol is distributed in your body.",
    },
    {
      number: 2,
      title: "Select Your Gender",
      description:
        "Choose your biological sex (male or female). This affects the water distribution coefficient used in the Widmark formula.",
    },
    {
      number: 3,
      title: "Add Drinks",
      description:
        "Enter the number of standard drinks you've consumed. Remember: 1 drink = 12 oz beer, 5 oz wine, or 1.5 oz liquor.",
    },
    {
      number: 4,
      title: "Set Time Elapsed",
      description:
        "Enter how many hours have passed since your first drink. The calculator accounts for alcohol elimination over time.",
    },
  ]

  const example = {
    weight: 170,
    gender: "male" as const,
    drinks: 3,
    hours: 2,
    bac: 0.11,
  }

  return (
    <div className="container mx-auto min-h-screen px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-4xl font-bold md:text-5xl">
          Interactive Calculator Setup
        </h1>
        <p className="mb-12 text-center text-lg text-muted-foreground md:text-xl">
          Learn how to use the BAC calculator step by step
        </p>

        {/* Steps */}
        <div className="mb-12 space-y-6">
          {steps.map((step) => (
            <div key={step.number} className="flex gap-4 rounded-lg border bg-card p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                {step.number}
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Example Calculation */}
        <div className="rounded-lg border bg-muted/20 p-6">
          <h2 className="mb-4 text-2xl font-semibold">Example Calculation</h2>
          <div className="space-y-2 font-mono">
            <p>
              <strong>Weight:</strong> {example.weight} lbs ({example.gender})
            </p>
            <p>
              <strong>Drinks:</strong> {example.drinks} standard drinks
            </p>
            <p>
              <strong>Time:</strong> {example.hours} hours elapsed
            </p>
            <div className="mt-4 rounded bg-primary/10 p-4">
              <p className="text-sm text-muted-foreground">Estimated BAC</p>
              <p className="text-3xl font-bold">{example.bac.toFixed(3)}%</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            <strong>Note:</strong> This is an estimate. Actual BAC varies based on metabolism, food
            intake, medications, and other factors. Use your actual measurements for best accuracy.
          </p>
        </div>
      </div>
    </div>
  )
}
