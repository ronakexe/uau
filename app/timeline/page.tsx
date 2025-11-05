"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const timelineEvents = [
  {
    year: "2024",
    title: "Foundation",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    year: "2023",
    title: "Major Milestone",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    year: "2022",
    title: "Expansion",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    year: "2021",
    title: "Initial Launch",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    year: "2020",
    title: "Concept Development",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
]

export default function Timeline() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-gradient-to-b from-background to-muted/20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container relative z-10 px-4 py-20 text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6 text-5xl font-bold tracking-tight md:text-6xl"
          >
            Timeline
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-muted-foreground md:text-2xl"
          >
            Our Journey Through Time
          </motion.p>
        </motion.div>
      </section>

      {/* Timeline Section */}
      <section className="container py-20 px-4">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 h-full w-0.5 bg-primary/20 md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative flex items-center gap-8 md:gap-12"
              >
                {/* Timeline Dot */}
                <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-background bg-primary shadow-lg md:absolute md:left-1/2 md:-translate-x-1/2">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                </div>

                {/* Content */}
                <div
                  className={`flex-1 ${
                    index % 2 === 0
                      ? "md:pr-[calc(50%+4rem)] md:text-right"
                      : "md:pl-[calc(50%+4rem)]"
                  }`}
                >
                  <div className="rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                    <div className="mb-4 h-48 w-full overflow-hidden rounded-lg">
                      <Image
                        src={`https://placehold.co/600x400/800000/ffffff?text=${event.year}`}
                        alt={`${event.year} placeholder`}
                        width={600}
                        height={400}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="mb-2 text-2xl font-bold text-primary">
                      {event.year}
                    </div>
                    <h3 className="mb-3 text-2xl font-semibold">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {event.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

