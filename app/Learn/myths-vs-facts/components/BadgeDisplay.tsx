"use client"

import { motion } from "framer-motion"
import { BadgeType } from "../utils/scoring"
import { getBadgeIcon } from "../utils/scoring"

interface BadgeDisplayProps {
  badge: BadgeType
  badgeName: string
  badgeDescription: string
  className?: string
}

export function BadgeDisplay({ badge, badgeName, badgeDescription, className = "" }: BadgeDisplayProps) {
  if (!badge) return null

  const icon = getBadgeIcon(badge)

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className={`rounded-lg bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-300 p-6 shadow-lg ${className}`}
    >
      <div className="flex items-center gap-4">
        <div className="text-6xl">{icon}</div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-yellow-900 mb-2">{badgeName}</h3>
          <p className="text-yellow-800">{badgeDescription}</p>
        </div>
      </div>
    </motion.div>
  )
}

