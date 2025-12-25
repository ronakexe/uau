"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export default function About() {
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
            About Us
          </motion.h1>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="container py-20 px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[400px] w-full overflow-hidden rounded-lg"
          >
            <Image
              src="/images/randr.jpg"
              alt="About us"
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <h2 className="mb-6 text-4xl font-bold">Who We Are</h2>
            <p className="mb-4 text-lg leading-relaxed text-muted-foreground">
              Ronak Ramnani and Rahul Singhal are highschool innovators who 
              are dedicated to ending substance use in teenagers. Inspired
               after their late friend, they belive that no one should ever 
               have to lose their life to alcohol. 
            </p>
            <p className="mb-4 text-lg leading-relaxed text-muted-foreground">
            Born in New York City, raised in Oregon, and living in Dallas, 
            Ronak Ramnani is a Sophomore at Greenhill School who is
             passionate about A.I., business, and design. He's a member of 
             the Greenhill Debate Team and has led film productions through 
             his school's video production program.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
            Rahul Singhal is a Junior at Greenhill School who is 
            interested in business and engineering. 
            </p>  
          </motion.div>
        </div>
      </section>
    </main>
  )
}

