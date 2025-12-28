"use client"

import { useQuizContext } from "../context/QuizContext"
import { useEffect, useState } from "react"

interface ScoreDisplayProps {
  className?: string
}

export function ScoreDisplay({ className = "" }: ScoreDisplayProps) {
  const { sessionScore, bestScore } = useQuizContext()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="rounded-lg bg-white px-4 py-2 shadow-md border border-gray-200">
        <div className="text-sm text-gray-600">Current Score</div>
        <div className="text-2xl font-bold text-gray-900">{sessionScore}/8</div>
      </div>
      {isMounted && bestScore > 0 && (
        <div className="rounded-lg bg-yellow-50 px-4 py-2 shadow-md border border-yellow-200">
          <div className="text-sm text-yellow-700">Best Score</div>
          <div className="text-2xl font-bold text-yellow-900">{bestScore}/8</div>
        </div>
      )}
    </div>
  )
}

