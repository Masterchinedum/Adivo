"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Brain, Heart, Sparkles } from "lucide-react"

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="container px-4 md:px-6 py-12 md:py-24 lg:py-32">
        <div className="flex flex-col items-center space-y-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl space-y-4"
          >
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-foreground">
              Discover Your Relationship{" "}
              <span className="text-primary">Dynamics</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Take our scientifically designed tests to gain insights into your relationships 
              and understand yourself better.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 w-full max-w-sm sm:max-w-none justify-center"
          >
            <Button size="lg" asChild>
              <Link href="/tests">
                Take a Test
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/about">
                Learn More
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8"
          >
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex flex-col items-center space-y-2 p-4 rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md"
              >
                {feature.icon}
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const features = [
  {
    title: "Scientific Approach",
    description: "Based on established psychological research and relationship studies",
    icon: <Brain className="h-6 w-6 text-primary" />,
  },
  {
    title: "Deep Insights",
    description: "Get detailed analysis of your relationship patterns and behaviors",
    icon: <Sparkles className="h-6 w-6 text-primary" />,
  },
  {
    title: "Improve Connections",
    description: "Learn how to build stronger and healthier relationships",
    icon: <Heart className="h-6 w-6 text-primary" />,
  }
]

export default Hero
