import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileQuestion } from "lucide-react"

export default function NotFound() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center gap-4">
        <FileQuestion className="h-10 w-10 text-muted-foreground" />
        <h2 className="text-xl font-semibold">Test Not Found</h2>
        <Button asChild>
          <Link href="/admindash/tests">
            Return to Tests
          </Link>
        </Button>
      </div>
    </div>
  )
}