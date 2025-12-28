"use client"

import { motion } from "framer-motion"
import { useQuizContext } from "../context/QuizContext"
import { BadgeDisplay } from "../components/BadgeDisplay"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"
import { useRouter } from "next/navigation"

export function Slide9_Results() {
  const { sessionScore, scoreResult, resetQuiz } = useQuizContext()
  const router = useRouter()

  const handleRestart = () => {
    resetQuiz()
    router.push("/Learn/myths-vs-facts")
  }

  if (!scoreResult) {
    return (
      <div className="container mx-auto min-h-screen px-4 py-20 bg-white">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xl text-gray-600">Loading results...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto min-h-screen px-4 py-20 bg-white">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Quiz Complete!
          </h1>
          <p className="mb-12 text-xl text-gray-600">
            You scored {sessionScore} out of 8
          </p>

          {/* Score Circle */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            className="mb-12 flex justify-center"
          >
            <div className="relative w-48 h-48 md:w-64 md:h-64">
              <svg className="transform -rotate-90 w-full h-full">
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  stroke="#10b981"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(sessionScore / 8) * 283} 283`}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-gray-900">
                    {sessionScore}/8
                  </div>
                  <div className="text-lg text-gray-600 mt-2">
                    {Math.round((sessionScore / 8) * 100)}%
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Badge */}
          {scoreResult.badge && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-12"
            >
              <BadgeDisplay
                badge={scoreResult.badge}
                badgeName={scoreResult.badgeName}
                badgeDescription={scoreResult.badgeDescription}
              />
            </motion.div>
          )}

          {/* Key Learnings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-12 text-left"
          >
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Key Takeaways</h2>
            <ul className="space-y-3 text-gray-800">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold mt-1">•</span>
                <span>Total alcohol consumed and speed of consumption are the only factors that affect intoxication</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold mt-1">•</span>
                <span>Carbonated drinks accelerate alcohol absorption, reaching peak BAC faster</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold mt-1">•</span>
                <span>Alcohol actually lowers core body temperature, despite feeling warmer</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold mt-1">•</span>
                <span>Women and teens reach higher BAC levels faster due to biological differences</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold mt-1">•</span>
                <span>Alcohol is a depressant - any "energy" feeling is from dopamine, not actual stimulation</span>
              </li>
            </ul>
          </motion.div>

          {/* Restart Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Button
              onClick={handleRestart}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
            >
              <RotateCcw className="mr-2 h-5 w-5" />
              Take Quiz Again
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

