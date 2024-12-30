// components/test/OptionsList.tsx
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import type { Option } from "@/types/tests/test"

interface OptionsListProps {
  options: Option[]
  selectedOptionId?: string
  onSelect: (optionId: string) => void
  disabled?: boolean
}

export function OptionsList({
  options,
  selectedOptionId,
  onSelect,
  disabled
}: OptionsListProps) {
  return (
    <RadioGroup
      value={selectedOptionId}
      onValueChange={onSelect}
      disabled={disabled}
      className="space-y-3"
    >
      {options.map((option) => (
        <div key={option.id} className="flex items-center space-x-3">
          <RadioGroupItem value={option.id} id={option.id} />
          <Label htmlFor={option.id} className="text-base">
            {option.text}
          </Label>
        </div>
      ))}
    </RadioGroup>
  )
}