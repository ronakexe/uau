"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const partnerships = [
  {
    name: "West Keller Dental",
    description:
      "A trusted dental practice committed to supporting community health and substance use prevention among teenagers. Together, we're working to create a safer future for our youth.",
    image: "/images/west-keller-dental-partner-image.png",
  },
]

export default function Partnerships() {
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
            Partnerships
          </motion.h1>
        </motion.div>
      </section>

      {/* Partnerships Grid */}
      <section className="container py-20 px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {partnerships.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group h-full transition-all duration-300 hover:shadow-lg hover:scale-105">
                <CardHeader>
                  <div className="mb-4 h-32 w-full overflow-hidden rounded-lg">
                    <Image
                      src={partner.image || `https://placehold.co/400x300/800000/ffffff?text=Logo`}
                      alt={`${partner.name} logo`}
                      width={400}
                      height={300}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <CardTitle className="text-xl mb-0">{partner.name}</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground">
                    {partner.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-muted/30 py-20">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="mb-4 text-4xl font-bold">Become a Partner</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <div className="relative h-64 w-full overflow-hidden rounded-lg">
              <Image
                src="https://placehold.co/1200x600/800000/ffffff?text=Partnership+Opportunity"
                alt="Partnership opportunity placeholder"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

