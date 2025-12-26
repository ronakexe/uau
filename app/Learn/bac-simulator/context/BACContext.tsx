"use client"

import { createContext, useContext, ReactNode } from "react"
import { useBACCalculation, type BACInputState } from "../hooks/useBACCalculation"

interface BACContextType {
  inputs: BACInputState
  result: ReturnType<typeof useBACCalculation>["result"]
  updateWeight: (weight: number) => void
  updateGender: (gender: "male" | "female") => void
  updateStandardDrinks: (drinks: number) => void
  updateHoursElapsed: (hours: number) => void
  incrementDrinks: () => void
  decrementDrinks: () => void
  clearDrinks: () => void
  resetInputs: () => void
}

const BACContext = createContext<BACContextType | undefined>(undefined)

export function BACProvider({ children }: { children: ReactNode }) {
  const calculator = useBACCalculation()

  return <BACContext.Provider value={calculator}>{children}</BACContext.Provider>
}

export function useBACContext() {
  const context = useContext(BACContext)
  if (context === undefined) {
    throw new Error("useBACContext must be used within a BACProvider")
  }
  return context
}

