"use client"

import { ArrowRight } from "lucide-react"

export function Slide0_Title() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-20 bg-white">
      <div className="w-full max-w-4xl text-center">
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">
          Myths vs. Facts
        </h1>
        <p className="mb-4 text-2xl font-semibold text-gray-800 md:text-3xl">
          What You THINK You Know vs. What Science Says
        </p>
        <p className="mb-8 text-lg text-gray-600 md:text-xl max-w-2xl mx-auto">
          Test your alcohol knowledge - earn points for getting it right
        </p>
        
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-12 max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-blue-900 mb-4">How it works:</h2>
          <ul className="text-left space-y-3 text-gray-800">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold text-xl mt-0.5">1.</span>
              <span>Read each statement carefully</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold text-xl mt-0.5">2.</span>
              <span>Click MYTH or FACT based on what you believe</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold text-xl mt-0.5">3.</span>
              <span>See if you're correct and learn the science behind it</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold text-xl mt-0.5">4.</span>
              <span>Earn badges based on your score: Myth Buster, Science Master, or Perfect Score!</span>
            </li>
          </ul>
        </div>

        <div className="flex items-center justify-center gap-2 text-gray-600">
          <span className="text-lg">Click Next or press → to begin</span>
          <ArrowRight className="h-5 w-5" />
        </div>
      </div>
    </div>
  )
}

