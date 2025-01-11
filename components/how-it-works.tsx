// components/how-it-works.tsx
"use client"

import { motion } from "framer-motion"
import { Brain, ClipboardCheck, LineChart } from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  {
    icon: Brain,
    title: "Take the Test",
    description: "Complete our scientifically designed relationship assessment questionnaire at your own pace",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: ClipboardCheck,
    title: "Get Your Results",
    description: "Receive instant, detailed insights about your relationship patterns and tendencies",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: LineChart,
    title: "Track Progress",
    description: "Follow your development over time and see how your relationships improve",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
}

export function HowItWorks() {
  return (
    <section className="relative py-20 bg-muted/50">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            How It Works
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-lg">
            Get started on your journey to better relationships in three simple steps
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={cn(
                "relative group",
                "rounded-lg border bg-background p-8",
                "hover:shadow-lg transition-all duration-300",
                "flex flex-col items-center text-center space-y-4"
              )}
            >
              <div className={cn(
                "p-3 rounded-full",
                step.bgColor
              )}>
                <step.icon className={cn("w-6 h-6", step.color)} />
              </div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
              
              {/* Connecting Line (only for larger screens) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute -right-4 top-1/2 w-8 h-[2px] bg-border transform -translate-y-1/2 z-10" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}