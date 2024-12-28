// app/(dashboards)/admindash/tests/[id]/components/QuestionList.tsx
"use client"

import * as React from "react"
import { Plus, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useFieldArray, UseFormReturn } from "react-hook-form"
import type { UpdateTestInput } from "@/types/tests/test"

interface QuestionListProps {
  form: UseFormReturn<UpdateTestInput>
  categoryIndex: number
}

export function QuestionList({ form, categoryIndex }: QuestionListProps) {
  const { fields: questions, append, remove } = useFieldArray({
    control: form.control,
    name: `categories.${categoryIndex}.questions`
  });

  const handleAddQuestion = () => {
    append({
      title: "",
      options: []
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium">Questions</h4>
        <Button
          type="button"
          onClick={handleAddQuestion}
          variant="outline"
          size="sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Question
        </Button>
      </div>

      {questions.map((question, questionIndex) => (
        <div key={question.id} className="border p-4 rounded-lg space-y-4">
          <div className="flex justify-between items-start">
            <FormField
              control={form.control}
              name={`categories.${categoryIndex}.questions.${questionIndex}.title`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Question {questionIndex + 1}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter question" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => remove(questionIndex)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
          <OptionList 
            form={form} 
            categoryIndex={categoryIndex}
            questionIndex={questionIndex} 
          />
        </div>
      ))}
    </div>
  );
}

function OptionList({ 
  form, 
  categoryIndex,
  questionIndex 
}: { 
  form: UseFormReturn<UpdateTestInput>
  categoryIndex: number
  questionIndex: number 
}) {
  const { fields: options, append, remove } = useFieldArray({
    control: form.control,
    name: `categories.${categoryIndex}.questions.${questionIndex}.options`
  });

  const handleAddOption = () => {
    append({ 
      text: "",
      point: 0 
    });
  };

  return (
    <div className="ml-6 space-y-3">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium">Options</h4>
        <Button
          type="button"
          onClick={handleAddOption}
          variant="ghost"
          size="sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Option
        </Button>
      </div>

      {options.map((option, optionIndex) => (
        <div key={option.id} className="flex items-center gap-2">
          <FormField
            control={form.control}
            name={`categories.${categoryIndex}.questions.${questionIndex}.options.${optionIndex}.text`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input {...field} placeholder={`Option ${optionIndex + 1}`} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`categories.${categoryIndex}.questions.${questionIndex}.options.${optionIndex}.point`}
            render={({ field }) => (
              <FormItem className="w-24">
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                    value={field.value || ''}
                    placeholder="Points"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => remove(optionIndex)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}