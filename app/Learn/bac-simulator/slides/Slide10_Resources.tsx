"use client"

import { ExternalLink, Phone } from "lucide-react"

export function Slide10_Resources() {
  const resources = [
    {
      title: "National Institute on Alcohol Abuse and Alcoholism (NIAAA)",
      description: "Evidence-based information about alcohol and its effects",
      url: "https://www.niaaa.nih.gov",
    },
    {
      title: "SAMHSA National Helpline",
      description: "Free, confidential, 24/7 treatment referral and information service",
      phone: "1-800-662-4357",
      url: "https://www.samhsa.gov/find-help/national-helpline",
    },
    {
      title: "Texas DUI/DWI Information",
      description: "State-specific information about legal limits and consequences",
      url: "https://www.txdps.state.tx.us/driverlicense/dwi.htm",
    },
    {
      title: "Campus Counseling Services",
      description: "Contact your school's counseling center for support with substance use",
      note: "Check your school's website for contact information",
    },
  ]

  return (
    <div className="container mx-auto min-h-screen px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-4xl font-bold md:text-5xl animate-fade-in-up">
          Resources & Support
        </h1>
        <p className="mb-12 text-center text-lg text-muted-foreground md:text-xl animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          Help is available if you need it
        </p>

        {/* Resources List */}
        <div className="mb-12 space-y-6">
          {resources.map((resource, index) => (
            <div
              key={index}
              className="rounded-lg border bg-card p-6 animate-fade-in-up"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <h3 className="mb-2 text-xl font-semibold">{resource.title}</h3>
              <p className="mb-4 text-muted-foreground">{resource.description}</p>
              <div className="flex flex-wrap gap-4">
                {resource.phone && (
                  <a
                    href={`tel:${resource.phone}`}
                    className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                  >
                    <Phone className="h-4 w-4" />
                    {resource.phone}
                  </a>
                )}
                {resource.url && (
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted"
                  >
                    Visit Website
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
                {resource.note && (
                  <p className="text-sm text-muted-foreground">{resource.note}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Information */}
        <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-6 dark:bg-red-950/20 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          <h3 className="mb-2 text-xl font-semibold text-red-700 dark:text-red-400">
            Emergency: Alcohol Poisoning
          </h3>
          <p className="mb-4 text-sm text-red-600 dark:text-red-300">
            If someone is unresponsive, has seizures, slow or irregular breathing, or cannot be
            awakened, call <strong>911 immediately</strong>. These are signs of alcohol poisoning,
            which can be life-threatening.
          </p>
          <a
            href="tel:911"
            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            <Phone className="h-4 w-4" />
            Call 911
          </a>
        </div>

        {/* Final Message */}
        <div className="mt-12 rounded-lg border bg-primary/5 p-6 text-center animate-fade-in-up" style={{ animationDelay: "0.7s" }}>
          <p className="text-lg font-semibold">Thank you for learning with us!</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Visit{" "}
            <a
              href="https://united-against-use.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              united-against-use.vercel.app
            </a>{" "}
            for more resources
          </p>
        </div>
      </div>
    </div>
  )
}
