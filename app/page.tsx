"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-gradient-to-b from-background to-muted/20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="container relative z-10 px-4 py-20 text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl"
          >
            United Against Use
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-8 text-xl text-muted-foreground md:text-2xl"
          >
            UAU
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-muted-foreground"
          >
            United Against Use is dedicated to preventing the leading cause of death in teenagers, substance use.
            We believe every life is precious and no one should lose it to alcohol.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex justify-center gap-4"
          >
            <Button size="lg" className="hover:scale-105 transition-transform">
              Learn More
            </Button>
            <Button size="lg" variant="outline" className="hover:scale-105 transition-transform">
              Contact Us
            </Button>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute inset-0 -z-0"
        >
          <div className="relative h-full w-full">
            <Image
              src="https://placehold.co/1920x1080/800000/ffffff?text=Hero+Image"
              alt="Hero placeholder"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold">Our Mission</h2>
          <p className="text-xl text-muted-foreground">
            Building a Better Future Together
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Prevention Education",
              description: "We beilive most teenagers already know the risks of substance abuse, but don't always know how to avoid it. We want to fix this by helping them navigate peer pressure or other coping mechanisms rather than turning to substance use.",
              image: "Prevention+Education"
            },
            {
              title: "Parent & Community Engagement",
              description: "We want to work with parents and educators to help them recognize warning signs of substance use in teenagers and how to communicate with them about it. ",
              image: "Parent+Community"
            },
            {
              title: "Policy Advocacy",
              description: "We want to push for stricter enforcement of underage drinking laws. This looks like increasing penalties for selling alcohol to minors/knowingly allow teenagers to drink it and stricter advertisment laws.",
              image: "Policy+Advocacy"
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative mb-4 h-64 w-full overflow-hidden rounded-lg">
                <Image
                  src={`https://placehold.co/600x400/800000/ffffff?text=${feature.image}`}
                  alt={`${feature.title} placeholder`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <h3 className="mb-2 text-2xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  )
}

