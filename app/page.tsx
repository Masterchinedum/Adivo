import Hero from "@/components/hero"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sociolytics | Relationship Psychology Tests & Analysis",
  description: "Discover insights about your relationships through scientifically-designed psychological tests. Get personalized analysis and improve your connections with others.",
}

export default function HomePage() {
  return (
    <main>
      <Hero />
      {/* Other sections will be added here */}
    </main>
  )
}