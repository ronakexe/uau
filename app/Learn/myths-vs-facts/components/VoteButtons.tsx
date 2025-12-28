"use client"

import { motion } from "framer-motion"
import { AnswerType } from "../utils/quizData"
import { cn } from "@/lib/utils"

interface VoteButtonsProps {
  onVote: (answer: AnswerType) => void
  disabled?: boolean
  selectedAnswer?: AnswerType
}

export function VoteButtons({ onVote, disabled = false, selectedAnswer }: VoteButtonsProps) {
  const buttons: { label: string; value: AnswerType; color: string }[] = [
    { label: "MYTH", value: "myth", color: "bg-red-500 hover:bg-red-600 text-white border-red-600" },
    { label: "FACT", value: "fact", color: "bg-green-500 hover:bg-green-600 text-white border-green-600" },
    { label: "BOTH", value: "both", color: "bg-orange-500 hover:bg-orange-600 text-white border-orange-600" },
    { label: "NONE", value: "none", color: "bg-gray-500 hover:bg-gray-600 text-white border-gray-600" },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
      {buttons.map((button, index) => {
        const isSelected = selectedAnswer === button.value
        return (
          <motion.button
            key={button.value}
            onClick={() => !disabled && onVote(button.value)}
            disabled={disabled}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={!disabled ? { scale: 1.05 } : {}}
            whileTap={!disabled ? { scale: 0.95 } : {}}
            className={cn(
              "px-6 py-4 md:py-6 rounded-lg font-bold text-lg md:text-xl transition-all duration-200",
              "border-2 shadow-md touch-manipulation min-h-[64px] md:min-h-[80px]",
              button.color,
              disabled && "opacity-50 cursor-not-allowed",
              isSelected && "ring-4 ring-yellow-400 ring-offset-2"
            )}
            aria-label={`Vote ${button.label}`}
          >
            {button.label}
          </motion.button>
        )
      })}
    </div>
  )
}

