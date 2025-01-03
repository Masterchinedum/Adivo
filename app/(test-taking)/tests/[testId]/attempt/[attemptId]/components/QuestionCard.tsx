// components/QuestionCard.tsx
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface QuestionCardProps {
  question: any // We'll type this properly once we have the API types
  isLoading: boolean
}

export function QuestionCard({ question, isLoading }: QuestionCardProps) {
  if (isLoading) {
    return (
      <Card className="animate-pulse">
        <CardHeader className="h-8 bg-muted rounded" />
        <CardContent className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-12 bg-muted rounded" />
          ))}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">{question?.title}</h3>
      </CardHeader>
      <CardContent>
        <RadioGroup className="space-y-4">
          {question?.options?.map((option: any) => (
            <div key={option.id} className="flex items-center space-x-2">
              <RadioGroupItem value={option.id} id={option.id} />
              <Label htmlFor={option.id}>{option.text}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  )
}