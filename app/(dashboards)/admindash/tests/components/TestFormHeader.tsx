// app/(dashboards)/admindash/tests/components/TestFormHeader.tsx
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface TestFormHeaderProps {
  title: string
  description: string
}

export function TestFormHeader({ title, description }: TestFormHeaderProps) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
        <h1 className="font-heading text-3xl md:text-4xl">{title}</h1>
        <p className="text-lg text-muted-foreground">{description}</p>
      </div>
      <Button
        variant="ghost"
        asChild
        className="gap-2"
      >
        <Link href="/admindash/tests">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
      </Button>
    </div>
  )
}