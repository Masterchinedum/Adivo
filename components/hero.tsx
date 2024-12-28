"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"

export default function Hero() {
  return (
    <div className="relative min-h-[85vh] flex items-center">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-950 dark:to-gray-900" />
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-2 w-2 rounded-full bg-blue-500/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Understand Your Relationship Through Data-Driven Insights
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Take our scientifically designed assessments to gain clarity about your relationship's strengths and areas for growth.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button size="lg" asChild>
              <Link href="/tests">Take Assessment</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}