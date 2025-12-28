"use client"

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react"
import { AnswerType } from "../utils/quizData"
import { calculateScore, ScoreResult, BadgeType } from "../utils/scoring"
import { TOTAL_MYTHS } from "../utils/quizData"

export interface UserAnswer {
  mythId: number
  userAnswer: AnswerType
  correct: boolean
}

interface QuizContextType {
  answers: UserAnswer[]
  sessionScore: number
  bestScore: number
  scoreResult: ScoreResult | null
  submitAnswer: (mythId: number, answer: AnswerType, correctAnswer: AnswerType) => void
  hasAnswered: (mythId: number) => boolean
  getUserAnswer: (mythId: number) => UserAnswer | undefined
  resetQuiz: () => void
  isQuizComplete: boolean
}

const QuizContext = createContext<QuizContextType | undefined>(undefined)

const STORAGE_KEY = 'myths-vs-facts-best-score'

export function QuizProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<UserAnswer[]>([])
  const [bestScore, setBestScore] = useState<number>(0)

  // Load best score from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = parseInt(stored, 10)
        if (!isNaN(parsed) && parsed >= 0 && parsed <= TOTAL_MYTHS) {
          setBestScore(parsed)
        }
      }
    } catch (error) {
      console.error('Failed to load best score from localStorage:', error)
    }
  }, [])

  const submitAnswer = useCallback((mythId: number, answer: AnswerType, correctAnswer: AnswerType) => {
    const correct = answer === correctAnswer
    setAnswers((prev) => {
      // Check if already answered
      const existingIndex = prev.findIndex((a) => a.mythId === mythId)
      if (existingIndex >= 0) {
        // Update existing answer
        const updated = [...prev]
        updated[existingIndex] = { mythId, userAnswer: answer, correct }
        return updated
      } else {
        // Add new answer
        return [...prev, { mythId, userAnswer: answer, correct }]
      }
    })
  }, [])

  const hasAnswered = useCallback((mythId: number) => {
    return answers.some((a) => a.mythId === mythId)
  }, [answers])

  const getUserAnswer = useCallback((mythId: number) => {
    return answers.find((a) => a.mythId === mythId)
  }, [answers])

  const resetQuiz = useCallback(() => {
    setAnswers([])
  }, [])

  // Calculate current session score
  const sessionScore = answers.filter((a) => a.correct).length

  // Calculate score result with badges
  const scoreResult: ScoreResult | null = answers.length === TOTAL_MYTHS
    ? calculateScore(sessionScore, TOTAL_MYTHS)
    : null

  // Update best score when quiz is complete
  useEffect(() => {
    if (scoreResult && sessionScore > bestScore) {
      setBestScore(sessionScore)
      try {
        localStorage.setItem(STORAGE_KEY, sessionScore.toString())
      } catch (error) {
        console.error('Failed to save best score to localStorage:', error)
      }
    }
  }, [scoreResult, sessionScore, bestScore])

  const isQuizComplete = answers.length === TOTAL_MYTHS

  return (
    <QuizContext.Provider
      value={{
        answers,
        sessionScore,
        bestScore,
        scoreResult,
        submitAnswer,
        hasAnswered,
        getUserAnswer,
        resetQuiz,
        isQuizComplete,
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}

export function useQuizContext() {
  const context = useContext(QuizContext)
  if (context === undefined) {
    throw new Error("useQuizContext must be used within a QuizProvider")
  }
  return context
}

