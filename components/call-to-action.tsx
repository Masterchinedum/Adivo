// components/call-to-action.tsx
"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, Heart } from "lucide-react"
import Link from "next/link"

export function CallToAction() {
  return (
    <section className="relative py-24 overflow-hidden bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="container relative"
      >
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
          {/* Icon Group */}
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-3 rounded-2xl bg-primary/10"
            >
              <Brain className="w-6 h-6 text-primary" />
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-3 rounded-2xl bg-secondary/10"
            >
              <Heart className="w-6 h-6 text-primary" />
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="space-y-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground"
            >
              Ready to Understand Your Relationships Better?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto"
            >
              Take our scientifically designed tests and gain valuable insights into your relationship patterns and behaviors.
            </motion.p>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <Button size="lg" asChild className="group">
              <Link href="/tests" className="text-lg">
                Take a Test
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="pt-8 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground"
          >
            {trustIndicators.map((indicator, index) => (
              <span key={index} className="flex items-center gap-2">
                {indicator.icon}
                {indicator.text}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

const trustIndicators = [
  {
    icon: <Brain className="h-5 w-5 text-primary" />,
    text: "Research-based methodology"
  },
  {
    icon: <ArrowRight className="h-5 w-5 text-primary" />,
    text: "Instant results"
  },
  {
    icon: <Heart className="h-5 w-5 text-primary" />,
    text: "Free assessment"
  }
]