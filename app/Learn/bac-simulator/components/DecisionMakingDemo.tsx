"use client"

import { motion } from "framer-motion"
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react"
import { getDecisionMakingStats } from "../utils/impairmentLevels"

interface DecisionMakingDemoProps {
  bac: number
}

export function DecisionMakingDemo({ bac }: DecisionMakingDemoProps) {
  const stats = getDecisionMakingStats(bac)

  const scenarios = [
    {
      id: "rideshare",
      title: "Call a Rideshare",
      description: "Use Uber, Lyft, or a taxi to get home safely",
      icon: CheckCircle2,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950/20",
      borderColor: "border-green-500",
      isCorrect: true,
      likelihood: stats.chooseRideshare,
    },
    {
      id: "drive",
      title: "Drive Yourself",
      description: "Drive home despite having been drinking",
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-950/20",
      borderColor: "border-red-500",
      isCorrect: false,
      likelihood: stats.chooseToDrive,
    },
    {
      id: "wait",
      title: "Wait It Out",
      description: "Stay at the party or find a safe place to sleep it off",
      icon: AlertCircle,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
      borderColor: "border-yellow-500",
      isCorrect: true,
      likelihood: stats.chooseWait,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Decision-Making Under Impairment</h3>
        <p className="text-muted-foreground">
          You're at a party. Your planned ride doesn't show up. What do you do?
        </p>
      </div>

      {/* Scenario Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {scenarios.map((scenario, index) => {
          const Icon = scenario.icon
          const isRisky = scenario.id === "drive" && stats.chooseToDrive > 30

          return (
            <motion.div
              key={scenario.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-lg border-2 p-4 ${scenario.bgColor} ${
                isRisky ? `${scenario.borderColor} border-2` : ""
              }`}
            >
              <div className="mb-3 flex items-start justify-between">
                <Icon className={`h-6 w-6 ${scenario.color}`} />
                {scenario.isCorrect && (
                  <span className="text-xs font-semibold text-green-600">Best Choice</span>
                )}
              </div>
              <h4 className="mb-2 font-semibold">{scenario.title}</h4>
              <p className="mb-4 text-sm text-muted-foreground">{scenario.description}</p>

              {/* Likelihood Bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Likelihood at this BAC:</span>
                  <span className={`font-semibold ${scenario.color}`}>{scenario.likelihood}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className={`h-full ${scenario.color.replace("text-", "bg-")}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${scenario.likelihood}%` }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  />
                </div>
              </div>

              {/* Warning for risky choice */}
              {isRisky && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-3 rounded bg-red-100 p-2 text-xs text-red-700 dark:bg-red-950/40 dark:text-red-400"
                >
                  ⚠️ At {bac.toFixed(3)}% BAC, {scenario.likelihood}% of people make this risky
                  choice
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Statistics Comparison */}
      <div className="rounded-lg border bg-card p-4">
        <h4 className="mb-3 font-semibold">Statistics at {bac.toFixed(3)}% BAC</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Choose to drive:</span>
            <span className="font-semibold text-red-600">{stats.chooseToDrive}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Choose rideshare:</span>
            <span className="font-semibold text-green-600">{stats.chooseRideshare}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Choose to wait:</span>
            <span className="font-semibold text-yellow-600">{stats.chooseWait}%</span>
          </div>
          <div className="mt-3 border-t pt-3">
            <p className="text-xs text-muted-foreground">
              For comparison, when sober, only ~5% of people would choose to drive in this
              situation. Impairment significantly increases risky decision-making.
            </p>
          </div>
        </div>
      </div>

      {/* Key Message */}
      <div className="rounded-lg border-l-4 border-primary bg-primary/5 p-4">
        <p className="text-sm">
          <strong>Key Takeaway:</strong> Alcohol impairs judgment and decision-making. Even if you
          think you can make good choices while impaired, statistics show that people at higher BAC
          levels are much more likely to make dangerous decisions. Plan your transportation{" "}
          <strong>before</strong> drinking.
        </p>
      </div>
    </div>
  )
}

