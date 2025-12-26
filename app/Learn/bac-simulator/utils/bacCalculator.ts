import {
  GENDER_COEFFICIENTS,
  ELIMINATION_RATE_PER_HOUR,
  STANDARD_DRINK_GRAMS,
  LBS_TO_GRAMS,
} from "./constants"

export interface BACInputs {
  weight: number // lbs
  gender: "male" | "female"
  standardDrinks: number
  hoursElapsed: number
}

export interface BACResult {
  currentBAC: number
  peakBAC: number
  hoursToSober: number
  impairmentLevel: "none" | "mild" | "moderate" | "significant" | "severe"
  isAboveLegal: boolean
}

/**
 * Calculate BAC using the Widmark formula
 * 
 * Formula: BAC = (Alcohol Consumed in grams / [Body Weight in grams × r]) × 100 - (elimination rate × hours)
 * 
 * Where:
 * - r (gender coefficient): 0.68 for males, 0.55 for females
 * - Alcohol elimination rate: ~0.015% per hour
 */
export function calculateBAC(inputs: BACInputs): BACResult {
  // Validate inputs
  if (inputs.weight <= 0 || inputs.standardDrinks < 0 || inputs.hoursElapsed < 0) {
    return {
      currentBAC: 0,
      peakBAC: 0,
      hoursToSober: 0,
      impairmentLevel: "none",
      isAboveLegal: false,
    }
  }

  // Convert weight to grams
  const weightGrams = inputs.weight * LBS_TO_GRAMS

  // Gender coefficient (Widmark formula)
  const rValue = GENDER_COEFFICIENTS[inputs.gender]

  // Ethanol consumed (grams) - 1 std drink = 14g
  const ethanolGrams = inputs.standardDrinks * STANDARD_DRINK_GRAMS

  // Absorption: assume all drinks consumed in first hour, then elimination begins
  const absorptionTime = Math.min(1, inputs.hoursElapsed)
  const eliminationTime = Math.max(0, inputs.hoursElapsed - absorptionTime)

  // Peak BAC (immediately after absorption, before elimination)
  // Formula: (ethanol in grams / (weight in grams × r)) × 100
  const peakBAC = (ethanolGrams / (weightGrams * rValue)) * 100

  // Current BAC = peak - (elimination rate × hours elapsed since absorption)
  const currentBAC = Math.max(0, peakBAC - ELIMINATION_RATE_PER_HOUR * eliminationTime)

  // Hours until completely sober (BAC = 0)
  const hoursToSober = currentBAC > 0 ? currentBAC / ELIMINATION_RATE_PER_HOUR : 0

  // Determine impairment level
  const impairmentLevel = getImpairmentLevel(currentBAC)

  return {
    currentBAC: parseFloat(currentBAC.toFixed(3)),
    peakBAC: parseFloat(peakBAC.toFixed(3)),
    hoursToSober: Math.max(0, parseFloat(hoursToSober.toFixed(2))),
    impairmentLevel,
    isAboveLegal: currentBAC >= 0.08,
  }
}

/**
 * Determine impairment level based on BAC
 */
function getImpairmentLevel(bac: number): BACResult["impairmentLevel"] {
  if (bac < 0.02) return "none"
  if (bac < 0.05) return "mild"
  if (bac < 0.08) return "moderate"
  if (bac < 0.15) return "significant"
  return "severe"
}

