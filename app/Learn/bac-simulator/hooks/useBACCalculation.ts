import { useMemo, useState, useCallback } from "react"
import { calculateBAC, type BACInputs, type BACResult } from "../utils/bacCalculator"

export interface BACInputState {
  weight: number
  gender: "male" | "female"
  standardDrinks: number
  hoursElapsed: number
}

const defaultInputs: BACInputState = {
  weight: 150,
  gender: "male",
  standardDrinks: 0,
  hoursElapsed: 0,
}

/**
 * Hook for BAC calculation with memoization and debouncing
 */
export function useBACCalculation(initialInputs?: Partial<BACInputState>) {
  const [inputs, setInputs] = useState<BACInputState>({
    ...defaultInputs,
    ...initialInputs,
  })

  // Memoize calculation result
  const result: BACResult = useMemo(() => {
    return calculateBAC(inputs)
  }, [inputs.weight, inputs.gender, inputs.standardDrinks, inputs.hoursElapsed])

  // Update functions
  const updateWeight = useCallback((weight: number) => {
    setInputs((prev) => ({ ...prev, weight }))
  }, [])

  const updateGender = useCallback((gender: "male" | "female") => {
    setInputs((prev) => ({ ...prev, gender }))
  }, [])

  const updateStandardDrinks = useCallback((standardDrinks: number) => {
    setInputs((prev) => ({ ...prev, standardDrinks: Math.max(0, standardDrinks) }))
  }, [])

  const updateHoursElapsed = useCallback((hoursElapsed: number) => {
    setInputs((prev) => ({ ...prev, hoursElapsed: Math.max(0, hoursElapsed) }))
  }, [])

  const incrementDrinks = useCallback(() => {
    setInputs((prev) => ({ ...prev, standardDrinks: prev.standardDrinks + 1 }))
  }, [])

  const decrementDrinks = useCallback(() => {
    setInputs((prev) => ({ ...prev, standardDrinks: Math.max(0, prev.standardDrinks - 1) }))
  }, [])

  const clearDrinks = useCallback(() => {
    setInputs((prev) => ({ ...prev, standardDrinks: 0 }))
  }, [])

  const resetInputs = useCallback(() => {
    setInputs(defaultInputs)
  }, [])

  return {
    inputs,
    result,
    updateWeight,
    updateGender,
    updateStandardDrinks,
    updateHoursElapsed,
    incrementDrinks,
    decrementDrinks,
    clearDrinks,
    resetInputs,
  }
}

