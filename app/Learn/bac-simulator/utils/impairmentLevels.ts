/**
 * Impairment effects mapping based on BAC levels
 */

export interface ImpairmentEffects {
  level: string
  reactionTimeMultiplier: number // 1.0 = normal
  visionImpairment: number // 0-1, percentage of vision loss
  decisionQuality: number // 0-1, how much impaired (1 = normal, 0 = severely impaired)
  motorControl: number // 0-1, coordination loss (1 = normal, 0 = severely impaired)
  description: string
  colorZone: "green" | "yellow" | "orange" | "red"
}

/**
 * Get impairment effects for a given BAC level
 */
export function getImpairmentEffects(bac: number): ImpairmentEffects {
  if (bac < 0.02) {
    return {
      level: "none",
      reactionTimeMultiplier: 1.0,
      visionImpairment: 0,
      decisionQuality: 1.0,
      motorControl: 1.0,
      description: "No detectable impairment",
      colorZone: "green",
    }
  }

  if (bac < 0.05) {
    return {
      level: "mild",
      reactionTimeMultiplier: 1.1,
      visionImpairment: 0.05, // 5% vision loss
      decisionQuality: 0.95,
      motorControl: 0.95,
      description: "Mild impairment - slight relaxation, minor judgment changes",
      colorZone: "green",
    }
  }

  if (bac < 0.08) {
    return {
      level: "moderate",
      reactionTimeMultiplier: 1.25,
      visionImpairment: 0.2, // 20% vision loss
      decisionQuality: 0.85,
      motorControl: 0.85,
      description: "Moderate impairment - legally unsafe to drive in most states",
      colorZone: "yellow",
    }
  }

  if (bac < 0.15) {
    return {
      level: "significant",
      reactionTimeMultiplier: 1.5,
      visionImpairment: 0.4, // 40% vision loss
      decisionQuality: 0.7,
      motorControl: 0.7,
      description: "Significant impairment - major judgment and coordination problems",
      colorZone: "orange",
    }
  }

  // bac >= 0.15
  return {
    level: "severe",
    reactionTimeMultiplier: 2.0,
    visionImpairment: 0.65, // 65% vision loss
    decisionQuality: 0.5,
    motorControl: 0.5,
    description: "Severe impairment - dangerous levels, risk of alcohol poisoning",
    colorZone: "red",
  }
}

/**
 * Calculate impaired reaction time based on baseline and BAC
 * Formula: reaction_time = baseline × (1 + BAC × 0.5)
 */
export function calculateImpairedReactionTime(baselineMs: number, bac: number): number {
  return baselineMs * (1 + bac * 0.5)
}

/**
 * Get vision filter values for CSS based on BAC
 */
export function getVisionFilterValues(bac: number) {
  const effects = getImpairmentEffects(bac)
  
  // Blur amount (max 15px)
  const blurAmount = Math.min(15, effects.visionImpairment * 20)
  
  // Saturation reduction (0.5 to 1.0)
  const saturation = Math.max(0.5, 1 - effects.visionImpairment * 0.5)
  
  // Brightness adjustment
  const brightness = 0.9 + effects.visionImpairment * 0.1
  
  // Tunnel vision radius (0-50% of viewport)
  const tunnelRadius = 50 - effects.visionImpairment * 25
  
  return {
    blur: blurAmount,
    saturation,
    brightness,
    tunnelRadius,
    peripheralLoss: effects.visionImpairment,
  }
}

/**
 * Get decision-making statistics based on BAC
 * Returns likelihood of making dangerous choices
 */
export function getDecisionMakingStats(bac: number) {
  // Statistics based on research: higher BAC = more likely to make risky decisions
  let chooseToDrive = 0.05 // 5% sober
  
  if (bac >= 0.15) {
    chooseToDrive = 0.65 // 65% at severe impairment
  } else if (bac >= 0.08) {
    chooseToDrive = 0.45 // 45% at significant impairment
  } else if (bac >= 0.05) {
    chooseToDrive = 0.25 // 25% at moderate impairment
  } else if (bac >= 0.02) {
    chooseToDrive = 0.15 // 15% at mild impairment
  }
  
  return {
    chooseToDrive: Math.round(chooseToDrive * 100),
    chooseRideshare: Math.round((1 - chooseToDrive) * 0.7 * 100),
    chooseWait: Math.round((1 - chooseToDrive) * 0.3 * 100),
  }
}

