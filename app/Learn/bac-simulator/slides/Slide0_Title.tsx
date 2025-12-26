"use client"

import { ArrowRight } from "lucide-react"

export function Slide0_Title() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-20">
      <div className="w-full max-w-4xl text-center animate-fade-in">
        <h1
          className="mb-6 text-4xl font-bold tracking-tight md:text-6xl animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          BAC Impact Simulator
        </h1>
        <p
          className="mb-8 text-xl text-muted-foreground md:text-2xl animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          Understanding Alcohol & Impairment
        </p>
        <p
          className="mb-12 text-lg text-muted-foreground animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          An interactive workshop on how alcohol affects your body and decision-making
        </p>
        <div
          className="flex items-center justify-center gap-2 text-muted-foreground animate-fade-in"
          style={{ animationDelay: "0.8s" }}
        >
          <span>Click Next or press → to begin</span>
          <div className="animate-pulse-custom">
            <ArrowRight className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Animated gradient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5 animate-pulse-custom" />
      </div>
    </div>
  )
}
