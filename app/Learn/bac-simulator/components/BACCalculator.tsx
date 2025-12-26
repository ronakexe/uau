"use client"

import { useCallback, useRef } from "react"
import { useBACContext } from "../context/BACContext"
import { InputPanel } from "./InputPanel"
import { BACDisplay } from "./BACDisplay"

export function BACCalculator() {
  const {
    inputs,
    result,
    updateWeight,
    updateGender,
    updateStandardDrinks,
    updateHoursElapsed,
    incrementDrinks,
    decrementDrinks,
    clearDrinks,
  } = useBACContext()

  const weightTimeoutRef = useRef<NodeJS.Timeout>()
  const drinksTimeoutRef = useRef<NodeJS.Timeout>()
  const hoursTimeoutRef = useRef<NodeJS.Timeout>()

  // Debounced update functions
  const debouncedUpdateWeight = useCallback(
    (weight: number) => {
      if (weightTimeoutRef.current) clearTimeout(weightTimeoutRef.current)
      weightTimeoutRef.current = setTimeout(() => updateWeight(weight), 100)
    },
    [updateWeight]
  )

  const debouncedUpdateDrinks = useCallback(
    (drinks: number) => {
      if (drinksTimeoutRef.current) clearTimeout(drinksTimeoutRef.current)
      drinksTimeoutRef.current = setTimeout(() => updateStandardDrinks(drinks), 100)
    },
    [updateStandardDrinks]
  )

  const debouncedUpdateHours = useCallback(
    (hours: number) => {
      if (hoursTimeoutRef.current) clearTimeout(hoursTimeoutRef.current)
      hoursTimeoutRef.current = setTimeout(() => updateHoursElapsed(hours), 100)
    },
    [updateHoursElapsed]
  )

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <InputPanel
        weight={inputs.weight}
        gender={inputs.gender}
        standardDrinks={inputs.standardDrinks}
        hoursElapsed={inputs.hoursElapsed}
        onWeightChange={debouncedUpdateWeight}
        onGenderChange={updateGender}
        onDrinksChange={debouncedUpdateDrinks}
        onHoursChange={debouncedUpdateHours}
        onIncrementDrinks={incrementDrinks}
        onDecrementDrinks={decrementDrinks}
        onClearDrinks={clearDrinks}
      />
      <BACDisplay
        currentBAC={result.currentBAC}
        peakBAC={result.peakBAC}
        hoursToSober={result.hoursToSober}
        isAboveLegal={result.isAboveLegal}
      />
    </div>
  )
}

