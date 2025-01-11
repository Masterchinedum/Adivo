import Hero from "@/components/hero"
import { Metadata } from "next"
import { FeaturesGrid } from "@/components/features-grid"
import { HowItWorks } from "@/components/how-it-works"

export const metadata: Metadata = {
  title: "Sociolytics | Relationship Psychology Tests & Analysis",
  description: "Discovering insights about your relationships through scientifically-designed psychological tests. Get personalized analysis and improve your connections with others.",
}

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturesGrid />
      <HowItWorks />
      {/* Other sections will be added here */}
    </main>
  )
}