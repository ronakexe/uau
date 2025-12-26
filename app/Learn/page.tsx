"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock } from "lucide-react"

const learnCards = [
  {
    id: 1,
    title: "BAC Impact Simulator Slides",
    description: "Interactive slides with real-time BAC calculator (weight, gender, drinks, time). Visual animations show how BAC levels affect reaction time, vision, and decision-making across impairment stages.",
    locked: false,
  },
  {
    id: 2,
    title: "Coming Soon",
    description: "This learning module will be available soon.",
    locked: true,
  },
  {
    id: 3,
    title: "Coming Soon",
    description: "This learning module will be available soon.",
    locked: true,
  },
]

export default function Learn() {
  const router = useRouter()

  const handleCardClick = (card: typeof learnCards[0]) => {
    if (card.locked) return
    if (card.id === 1) {
      router.push("/Learn/bac-simulator")
    }
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative flex min-h-[30vh] items-center justify-center overflow-hidden bg-gradient-to-b from-background to-muted/20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container relative z-10 px-4 py-12 text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6 text-5xl font-bold tracking-tight md:text-6xl"
          >
            Learn
          </motion.h1>
        </motion.div>
      </section>

      {/* Learning Cards */}
      <section className="container py-20 px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {learnCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card
                className={`group h-full transition-all duration-300 ${
                  card.locked
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:shadow-lg hover:scale-105 cursor-pointer"
                }`}
                onClick={() => handleCardClick(card)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{card.title}</CardTitle>
                    {card.locked && (
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-muted-foreground">
                    {card.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  )
}

