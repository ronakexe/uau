import { useMemo, useCallback } from "react"
import {
  getImpairmentEffects,
  calculateImpairedReactionTime,
  getVisionFilterValues,
  getDecisionMakingStats,
  type ImpairmentEffects,
} from "../utils/impairmentLevels"

/**
 * Hook for getting impairment effects based on BAC
 */
export function useImpairmentEffects(bac: number) {
  const effects: ImpairmentEffects = useMemo(() => {
    return getImpairmentEffects(bac)
  }, [bac])

  const visionFilters = useMemo(() => {
    return getVisionFilterValues(bac)
  }, [bac])

  const decisionStats = useMemo(() => {
    return getDecisionMakingStats(bac)
  }, [bac])

  const getImpairedReactionTimeMs = useCallback(
    (baselineMs: number) => {
      return calculateImpairedReactionTime(baselineMs, bac)
    },
    [bac]
  )

  return {
    effects,
    visionFilters,
    decisionStats,
    getImpairedReactionTimeMs,
  }
}

