import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="h-full flex items-center justify-center p-6">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <p className="text-muted-foreground">Loading test...</p>
      </div>
    </div>
  )
}