/**
 * Constants for BAC calculation and standard drink definitions
 */

// Standard drink definitions (all contain 14g of pure ethanol)
export const STANDARD_DRINK_GRAMS = 14 // grams of ethanol per standard drink

// Standard drink sizes by type
export const DRINK_TYPES = {
  beer: {
    name: "Beer",
    abv: 0.05, // 5% ABV
    volumeOz: 12, // 12 oz
  },
  wine: {
    name: "Wine",
    abv: 0.12, // 12% ABV
    volumeOz: 5, // 5 oz
  },
  liquor: {
    name: "Liquor",
    abv: 0.40, // 40% ABV (80 proof)
    volumeOz: 1.5, // 1.5 oz
  },
} as const

// Gender coefficients for Widmark formula
export const GENDER_COEFFICIENTS = {
  male: 0.68,
  female: 0.55,
} as const

// Alcohol elimination rate (standard metabolic rate)
export const ELIMINATION_RATE_PER_HOUR = 0.015 // 0.015% BAC per hour

// Legal limits
export const LEGAL_LIMITS = {
  driving: 0.08, // Most US states
  aggravated: 0.15, // Aggravated DUI threshold
  felony: 0.20, // Felony charges possible
} as const

// Weight validation limits
export const WEIGHT_LIMITS = {
  min: 80, // lbs
  max: 500, // lbs
} as const

// Time limits
export const TIME_LIMITS = {
  min: 0, // hours
  max: 24, // hours
} as const

// Drink limits
export const DRINK_LIMITS = {
  min: 0,
  max: 30, // Reasonable upper limit for calculator
} as const

// Conversion factors
export const LBS_TO_GRAMS = 453.592

