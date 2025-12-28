export type BadgeType = 'myth-buster' | 'science-master' | 'perfect-score' | null

export interface ScoreResult {
  score: number
  total: number
  badge: BadgeType
  badgeName: string
  badgeDescription: string
}

/**
 * Calculate score and determine badge based on number of correct answers
 */
export function calculateScore(correctAnswers: number, totalQuestions: number): ScoreResult {
  const score = Math.min(correctAnswers, totalQuestions)
  const percentage = (score / totalQuestions) * 100

  let badge: BadgeType = null
  let badgeName = ''
  let badgeDescription = ''

  if (score === totalQuestions) {
    badge = 'perfect-score'
    badgeName = 'Perfect Score'
    badgeDescription = 'You got every single question right! You truly understand the science behind alcohol.'
  } else if (score >= 7) {
    badge = 'science-master'
    badgeName = 'Science Master'
    badgeDescription = 'Excellent! You demonstrated deep understanding of alcohol science.'
  } else if (score >= 4) {
    badge = 'myth-buster'
    badgeName = 'Myth Buster'
    badgeDescription = 'Great job! You successfully debunked many common myths about alcohol.'
  }

  return {
    score,
    total: totalQuestions,
    badge,
    badgeName,
    badgeDescription,
  }
}

/**
 * Get badge icon/emoji based on badge type
 */
export function getBadgeIcon(badge: BadgeType): string {
  switch (badge) {
    case 'perfect-score':
      return '🏆'
    case 'science-master':
      return '🔬'
    case 'myth-buster':
      return '✅'
    default:
      return '📚'
  }
}

