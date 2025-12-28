"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface ConfettiAnimationProps {
  onComplete?: () => void
}

export function ConfettiAnimation({ onComplete }: ConfettiAnimationProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onComplete?.()
    }, 2000)

    return () => clearTimeout(timer)
  }, [onComplete])

  if (!isVisible) return null

  const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6']

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 left-1/2 w-2 h-2 rounded-full"
          style={{
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
          }}
          initial={{
            x: Math.random() * 400 - 200,
            y: -10,
            rotate: 0,
            opacity: 1,
          }}
          animate={{
            x: Math.random() * 400 - 200,
            y: window.innerHeight + 100,
            rotate: Math.random() * 360,
            opacity: 0,
          }}
          transition={{
            duration: 2,
            delay: Math.random() * 0.5,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  )
}

