import Hero from "@/components/hero"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Relationship Matrix - Data-Driven Relationship Assessment",
  description: "Gain insights into your relationship through our scientifically designed assessment tools. Understand your relationship's strengths and areas for growth.",
}

export default function HomePage() {
  return (
    <main>
      <Hero />
      {/* Other sections will be added here */}
    </main>
  )
}