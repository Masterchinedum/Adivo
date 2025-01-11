// components/call-to-action.tsx
"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, Heart } from "lucide-react"
import Link from "next/link"

export function CallToAction() {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-white to-slate-50/50">
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
              className="p-3 rounded-2xl bg-blue-500/10"
            >
              <Brain className="w-6 h-6 text-blue-500" />
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-3 rounded-2xl bg-red-500/10"
            >
              <Heart className="w-6 h-6 text-red-500" />
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="space-y-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
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
            <span className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z"/>
              </svg>
              Research-based methodology
            </span>
            <span className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm4.5-14.5L10 14l-2.5-2.5L6 13l4 4 8-8-1.5-1.5z"/>
              </svg>
              Instant results
            </span>
            <span className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-7.208a2.5 2.5 0 1 1 2 0V16h-2v-3.208z"/>
              </svg>
              Free assessment
            </span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}