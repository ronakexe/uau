"use client"

import { motion } from "framer-motion"

export default function Contact() {
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
            Contact Us
          </motion.h1>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="container py-20 px-4">
        <div className="mx-auto max-w-2xl text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <p className="text-lg text-muted-foreground">
              If you have any questions or would like to learn more, feel free to contact us at:
            </p>
            <a
              href="mailto:contact.sobersense@gmail.com"
              className="text-2xl md:text-3xl font-medium text-primary hover:underline transition-colors inline-block"
            >
              contact.sobersense@gmail.com
            </a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="pt-8 border-t"
          >
            <p className="text-lg text-muted-foreground mb-2">
              
              <a
                href="https://www.sober-sense.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                SoberSense
              </a>
              {" "}is another project dedicated to preventing teenagers from driving while intoxicated.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

