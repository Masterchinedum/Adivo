// components/features-grid.tsx
"use client"

import { motion } from "framer-motion"
import { 
  Brain, 
  Heart, 
  Target, 
  Shield, 
  LineChart, 
  Users 
} from "lucide-react"
import { cn } from "@/lib/utils"

const features = [
  {
    title: "AI-Powered Analysis",
    description: "Advanced algorithms analyze your responses to provide personalized insights",
    icon: Brain,
    color: "text-blue-500",
    delay: 0.2
  },
  {
    title: "Relationship Dynamics",
    description: "Understand the patterns and behaviors in your relationships",
    icon: Heart,
    color: "text-rose-500",
    delay: 0.3
  },
  {
    title: "Personal Growth",
    description: "Set goals and track your progress over time with detailed metrics",
    icon: Target,
    color: "text-emerald-500",
    delay: 0.4
  },
  {
    title: "Privacy First",
    description: "Your data is encrypted and protected with enterprise-grade security",
    icon: Shield,
    color: "text-purple-500",
    delay: 0.5
  },
  {
    title: "Progress Tracking",
    description: "Monitor your improvement with detailed charts and analytics",
    icon: LineChart,
    color: "text-amber-500",
    delay: 0.6
  },
  {
    title: "Community Support",
    description: "Connect with others and share experiences in a safe environment",
    icon: Users,
    color: "text-teal-500",
    delay: 0.7
  }
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export function FeaturesGrid() {
  return (
    <section className="container py-20 px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4 mb-16"
      >
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Features that set us apart
        </h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground text-lg">
          Discover how our platform helps you understand and improve your relationships
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={item}
            className={cn(
              "group relative overflow-hidden rounded-lg border bg-background p-6",
              "hover:shadow-lg transition-all duration-300",
              "flex flex-col items-start space-y-2"
            )}
          >
            <div className="bg-primary/10 p-3 rounded-lg">
              <feature.icon className={cn("h-6 w-6", feature.color)} />
            </div>
            <h3 className="font-semibold text-xl">{feature.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {feature.description}
            </p>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}