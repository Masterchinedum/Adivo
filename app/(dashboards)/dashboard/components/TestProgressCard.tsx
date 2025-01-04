// app/(dashboards)/dashboard/components/TestProgressCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

interface TestProgress {
  id: string
  name: string
  progress: number
  lastAccessed: string
}

interface TestProgressCardProps {
  inProgressTests: TestProgress[]
}

export function TestProgressCard({ inProgressTests }: TestProgressCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>In Progress Tests</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {inProgressTests.map((test) => (
          <div key={test.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {test.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  Last accessed: {test.lastAccessed}
                </p>
              </div>
              <Button size="sm">Continue</Button>
            </div>
            <Progress value={test.progress} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}