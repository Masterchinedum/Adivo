"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-white/[0.02] dark:bg-grid-white/[0.05]" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-foreground/20 dark:from-primary/10 dark:to-primary-foreground/10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="min-h-[90vh] flex items-center justify-between gap-8 py-20">
          {/* Content Column */}
          <motion.div 
            className="w-full lg:w-1/2 space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-block"
              >
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  Relationship Assessment Platform
                </span>
              </motion.div>

              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Discover Your 
                <span className="text-primary"> Relationship</span>
                <br />
                Potential
              </motion.h1>

              <motion.p 
                className="text-lg sm:text-xl text-muted-foreground max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Use our data-driven assessment tools to gain deep insights into your relationship dynamics. Understanding leads to growth.
              </motion.p>
            </div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Button size="lg" className="text-base">
                <Link href="/tests">Take Assessment</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base">
                <Link href="/about">Learn More</Link>
              </Button>
            </motion.div>

            <motion.div
              className="pt-8 flex items-center gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="flex flex-col">
                <span className="text-3xl font-bold">7+</span>
                <span className="text-muted-foreground">Assessment Types</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold">5min</span>
                <span className="text-muted-foreground">Average Time</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold">98%</span>
                <span className="text-muted-foreground">Accuracy Rate</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual Column */}
          <motion.div 
            className="hidden lg:block w-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative h-[600px] w-full">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary-foreground/30 rounded-lg backdrop-blur-sm" />
              <div className="absolute inset-4 bg-white/5 rounded-lg border border-white/10 backdrop-blur-md" />
              <div className="absolute inset-8 bg-white/5 rounded-lg border border-white/10 backdrop-blur-md" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}