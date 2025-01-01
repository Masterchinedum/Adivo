//app/(test-taking)/tests/[testId]/attempt/[attemptId]/_components/TestProgress.tsx:

import { Progress } from "@/components/ui/progress"

interface TestProgressProps {
  total: number
  answered: number
}

export function TestProgress({ total, answered }: TestProgressProps) {
  const percentage = Math.round((answered / total) * 100)

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Progress</span>
        <span>{answered} of {total} questions answered</span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  )
}