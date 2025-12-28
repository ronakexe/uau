"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useQuizContext } from "../context/QuizContext"
import { VoteButtons } from "../components/VoteButtons"
import { AnswerReveal } from "../components/AnswerReveal"
import { ConfettiAnimation } from "../components/ConfettiAnimation"
import { MYTHS, AnswerType } from "../utils/quizData"

const MYTH = MYTHS[6] // Congeners myth

export function Slide7_CongenersMyth() {
  const { submitAnswer, hasAnswered, getUserAnswer } = useQuizContext()
  const [showConfetti, setShowConfetti] = useState(false)
  
  const userAnswer = getUserAnswer(MYTH.id)
  const isAnswered = hasAnswered(MYTH.id)

  const handleVote = (answer: AnswerType) => {
    if (isAnswered) return
    submitAnswer(MYTH.id, answer, MYTH.correctAnswer)
    if (answer === MYTH.correctAnswer) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 2000)
    }
  }

  return (
    <div className="container mx-auto min-h-screen px-4 py-20 bg-white">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mb-8 text-center text-3xl font-bold text-gray-900 md:text-4xl">
            {MYTH.statement}
          </h1>

          {!isAnswered && (
            <div className="mt-12">
              <p className="text-center text-lg text-gray-700 mb-8">
                Is this a MYTH or a FACT?
              </p>
              <div className="flex justify-center">
                <VoteButtons onVote={handleVote} disabled={isAnswered} />
              </div>
            </div>
          )}

          {isAnswered && userAnswer && (
            <>
              {showConfetti && <ConfettiAnimation />}
              <AnswerReveal
                userAnswer={userAnswer.userAnswer}
                correctAnswer={MYTH.correctAnswer}
                explanation={MYTH.explanation}
              />
            </>
          )}
        </motion.div>
      </div>
    </div>
  )
}

