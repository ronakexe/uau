"use client"

import { useState } from "react"
import { Plus, Minus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { WEIGHT_LIMITS, TIME_LIMITS, DRINK_LIMITS } from "../utils/constants"

interface InputPanelProps {
  weight: number
  gender: "male" | "female"
  standardDrinks: number
  hoursElapsed: number
  onWeightChange: (weight: number) => void
  onGenderChange: (gender: "male" | "female") => void
  onDrinksChange: (drinks: number) => void
  onHoursChange: (hours: number) => void
  onIncrementDrinks: () => void
  onDecrementDrinks: () => void
  onClearDrinks: () => void
}

export function InputPanel({
  weight,
  gender,
  standardDrinks,
  hoursElapsed,
  onWeightChange,
  onGenderChange,
  onDrinksChange,
  onHoursChange,
  onIncrementDrinks,
  onDecrementDrinks,
  onClearDrinks,
}: InputPanelProps) {
  const [weightUnit, setWeightUnit] = useState<"lbs" | "kg">("lbs")

  const handleWeightChange = (value: string) => {
    const numValue = parseFloat(value) || 0
    if (weightUnit === "kg") {
      // Convert kg to lbs
      onWeightChange(numValue * 2.20462)
    } else {
      onWeightChange(numValue)
    }
  }

  const displayWeight = weightUnit === "kg" ? (weight / 2.20462).toFixed(1) : weight.toFixed(0)
  const isValidWeight = weight >= WEIGHT_LIMITS.min && weight <= WEIGHT_LIMITS.max

  return (
    <div className="space-y-6 rounded-lg border bg-card p-6">
      <h3 className="text-xl font-semibold">Calculator Inputs</h3>

      {/* Weight Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="weight">Body Weight</Label>
          <div className="flex gap-2">
            <Button
              variant={weightUnit === "lbs" ? "default" : "outline"}
              size="sm"
              onClick={() => setWeightUnit("lbs")}
            >
              lbs
            </Button>
            <Button
              variant={weightUnit === "kg" ? "default" : "outline"}
              size="sm"
              onClick={() => setWeightUnit("kg")}
            >
              kg
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Input
            id="weight"
            type="number"
            min={WEIGHT_LIMITS.min}
            max={WEIGHT_LIMITS.max}
            value={displayWeight}
            onChange={(e) => handleWeightChange(e.target.value)}
            className={`flex-1 ${isValidWeight ? "border-green-500" : ""}`}
            aria-invalid={!isValidWeight}
            aria-describedby="weight-validation"
          />
          <span className="text-sm text-muted-foreground">{weightUnit}</span>
          {isValidWeight && (
            <span className="text-green-500" id="weight-validation" aria-label="Valid weight">
              ✓
            </span>
          )}
        </div>
        {!isValidWeight && (
          <p className="text-sm text-destructive" id="weight-validation">
            Weight must be between {WEIGHT_LIMITS.min} and {WEIGHT_LIMITS.max} lbs
          </p>
        )}
      </div>

      {/* Gender Selector */}
      <div className="space-y-2">
        <Label>Gender</Label>
        <div className="flex gap-2">
          <Button
            variant={gender === "male" ? "default" : "outline"}
            className="flex-1"
            onClick={() => onGenderChange("male")}
            aria-pressed={gender === "male"}
          >
            Male
          </Button>
          <Button
            variant={gender === "female" ? "default" : "outline"}
            className="flex-1"
            onClick={() => onGenderChange("female")}
            aria-pressed={gender === "female"}
          >
            Female
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Note: Calculation uses biological sex (water distribution coefficient), not gender identity
        </p>
      </div>

      {/* Drink Counter */}
      <div className="space-y-2">
        <Label htmlFor="drinks">Standard Drinks Consumed</Label>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={onDecrementDrinks}
            disabled={standardDrinks === 0}
            aria-label="Decrease drinks"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            id="drinks"
            type="number"
            min={DRINK_LIMITS.min}
            max={DRINK_LIMITS.max}
            value={standardDrinks}
            onChange={(e) => onDrinksChange(Math.max(0, parseInt(e.target.value) || 0))}
            className="flex-1 text-center"
            aria-label="Number of standard drinks"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={onIncrementDrinks}
            aria-label="Increase drinks"
          >
            <Plus className="h-4 w-4" />
          </Button>
          {standardDrinks > 0 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClearDrinks}
              aria-label="Clear drinks"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          1 standard drink = 12 oz beer, 5 oz wine, or 1.5 oz liquor
        </p>
      </div>

      {/* Time Elapsed */}
      <div className="space-y-2">
        <Label htmlFor="time">Time Elapsed (hours)</Label>
        <Input
          id="time"
          type="number"
          min={TIME_LIMITS.min}
          max={TIME_LIMITS.max}
          step="0.1"
          value={hoursElapsed}
          onChange={(e) => onHoursChange(Math.max(0, parseFloat(e.target.value) || 0))}
          aria-label="Hours elapsed since first drink"
        />
        <input
          type="range"
          min={TIME_LIMITS.min}
          max={TIME_LIMITS.max}
          step="0.1"
          value={hoursElapsed}
          onChange={(e) => onHoursChange(parseFloat(e.target.value))}
          className="w-full"
          aria-label="Time elapsed slider"
        />
      </div>
    </div>
  )
}

