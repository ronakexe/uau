export function Slide2_BACBasics() {
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

        {/* Formula Components Explanation */}
        <div className="mb-8 rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-2xl font-semibold">Understanding the Components</h2>
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-lg font-semibold">Alcohol in grams</h3>
              <p className="text-muted-foreground">
                The total amount of pure ethanol consumed. One standard drink contains approximately
                14 grams of pure alcohol.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">Weight in grams</h3>
              <p className="text-muted-foreground">
                Your body weight converted to grams. This represents the total volume of body water
                available to distribute alcohol.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">Water distribution coefficient (r)</h3>
              <p className="text-muted-foreground">
                A factor that accounts for the percentage of body weight that is water. This value
                differs between males (0.68) and females (0.55) due to biological differences in
                body composition, including muscle mass and fat distribution.
              </p>
            </div>
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
