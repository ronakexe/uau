"use client"

export function Slide1_Education() {
  const facts = [
    {
      title: "What is BAC?",
      content:
        "Blood Alcohol Concentration (BAC) measures how much alcohol is in your bloodstream, expressed as a percentage. For example, 0.08% means 8 drops of alcohol per 10,000 drops of blood.",
    },
    {
      title: "Standard Drink",
      content:
        "One standard drink equals 14 grams of pure ethanol: 12 oz beer (5% ABV), 5 oz wine (12% ABV), or 1.5 oz liquor (40% ABV).",
    },
    {
      title: "Metabolism Rate",
      content:
        "Your body processes alcohol at a rate of approximately 0.015% BAC per hour. This rate is constant and cannot be sped up by coffee, food, cold showers, or exercise.",
    },
    {
      title: "No Shortcuts",
      content:
        "Time is the only solution. Sleep, food, coffee, and cold showers do not eliminate alcohol faster. Only your liver can metabolize alcohol, and it works at a fixed rate.",
    },
  ]

  return (
    <div className="container mx-auto min-h-screen px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-4xl font-bold md:text-5xl animate-fade-in-up">
          What is BAC?
        </h1>

        <p className="mb-12 text-center text-lg text-muted-foreground md:text-xl animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          Blood Alcohol Concentration measures how much alcohol is in your bloodstream
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {facts.map((fact, index) => (
            <div
              key={index}
              className="rounded-lg border bg-card p-6 animate-fade-in-up"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <h3 className="mb-3 text-xl font-semibold">{fact.title}</h3>
              <p className="text-muted-foreground">{fact.content}</p>
            </div>
          ))}
        </div>

        {/* Visual explanation */}
        <div
          className="mt-12 rounded-lg border bg-muted/20 p-6 animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          <h3 className="mb-4 text-xl font-semibold">Visual Example</h3>
          <p className="mb-4 text-muted-foreground">
            At 0.08% BAC (legal driving limit in most states):
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="flex flex-col items-center">
              <div className="mb-2 h-20 w-20 rounded-full bg-red-500/20" />
              <span className="text-xs">8 drops</span>
              <span className="text-xs text-muted-foreground">alcohol</span>
            </div>
            <span className="text-2xl">in</span>
            <div className="flex flex-col items-center">
              <div className="mb-2 h-20 w-20 rounded-full bg-blue-500/20" />
              <span className="text-xs">10,000 drops</span>
              <span className="text-xs text-muted-foreground">blood</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
