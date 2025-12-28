"use client"

import { motion } from "framer-motion"
import { CheckCircle2, XCircle } from "lucide-react"
import { AnswerType } from "../utils/quizData"
import { cn } from "@/lib/utils"

interface AnswerRevealProps {
  userAnswer: AnswerType
  correctAnswer: AnswerType
  explanation: {
    title: string
    facts: string[]
    whyItMatters?: string
    icon?: string
  }
  className?: string
}

export function AnswerReveal({ userAnswer, correctAnswer, explanation, className = "" }: AnswerRevealProps) {
  const isCorrect = userAnswer === correctAnswer

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={
        isCorrect
          ? { opacity: 1, x: 0 }
          : {
              opacity: 1,
              x: [0, -10, 10, -10, 10, 0],
            }
      }
      transition={
        isCorrect
          ? { duration: 0.5, ease: "easeOut" }
          : {
              x: { duration: 0.5, ease: "easeInOut" },
              opacity: { duration: 0.3 },
            }
      }
      className={cn(
        "mt-8 rounded-lg border-2 p-6 shadow-lg",
        isCorrect
          ? "bg-green-50 border-green-300"
          : "bg-red-50 border-red-300",
        className
      )}
    >
      {/* Result Header */}
      <div className="flex items-center gap-4 mb-6">
        {isCorrect ? (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold text-green-900">Correct!</h3>
              <p className="text-green-700">Great job!</p>
            </div>
          </>
        ) : (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <XCircle className="w-12 h-12 text-red-600" />
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold text-red-900">Not quite</h3>
              <p className="text-red-700">
                The correct answer is: <span className="font-bold">{correctAnswer.toUpperCase()}</span>
              </p>
            </div>
          </>
        )}
        {explanation.icon && (
          <div className="ml-auto text-4xl">{explanation.icon}</div>
        )}
      </div>

      {/* Explanation */}
      <div className="space-y-4">
        <h4 className="text-xl font-semibold text-gray-900">{explanation.title}</h4>
        <ul className="space-y-2">
          {explanation.facts.map((fact, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 text-gray-800"
            >
              <span className="text-blue-600 font-bold mt-1">•</span>
              <span>{fact}</span>
            </motion.li>
          ))}
        </ul>
        {explanation.whyItMatters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: explanation.facts.length * 0.1 }}
            className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg"
          >
            <p className="font-semibold text-blue-900 mb-1">Why this matters:</p>
            <p className="text-blue-800">{explanation.whyItMatters}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

