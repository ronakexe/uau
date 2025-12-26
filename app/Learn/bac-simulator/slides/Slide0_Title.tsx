"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { fadeVariants, fadeTransition } from "../utils/animations"

export function Slide0_Title() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-20">
      <motion.div
        variants={fadeVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={fadeTransition}
        className="w-full max-w-4xl text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6 text-4xl font-bold tracking-tight md:text-6xl"
        >
          BAC Impact Simulator
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-8 text-xl text-muted-foreground md:text-2xl"
        >
          Understanding Alcohol & Impairment
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-12 text-lg text-muted-foreground"
        >
          An interactive workshop on how alcohol affects your body and decision-making
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex items-center justify-center gap-2 text-muted-foreground"
        >
          <span>Click Next or press → to begin</span>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowRight className="h-5 w-5" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Animated gradient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>
    </div>
  )
}

