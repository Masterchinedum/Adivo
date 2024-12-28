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
import { UpdateTestInput } from "@/types/tests/test"

interface QuestionListProps {
    form: UseFormReturn<UpdateTestInput>
  }

export function QuestionList({ form }: QuestionListProps) {
  const { fields: questions, append, remove } = useFieldArray({
    control: form.control,
    name: "questions"
  });

  const handleAddQuestion = () => {
    append({
      title: "",
      options: []
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Questions</h3>
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

      {questions.map((field, index) => (
        <div key={field.id} className="border p-4 rounded-lg space-y-4">
          <div className="flex justify-between items-start">
            <FormField
              control={form.control}
              name={`questions.${index}.title`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Question {index + 1}</FormLabel>
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
              onClick={() => remove(index)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
          <OptionList form={form} questionIndex={index} />
        </div>
      ))}
    </div>
  );
}

function OptionList({ form, questionIndex }: { form: UseFormReturn<UpdateTestInput>; questionIndex: number }) {
  const { fields: options, append, remove } = useFieldArray({
    control: form.control,
    name: `questions.${questionIndex}.options`
  });

  const handleAddOption = () => {
    append({ text: "" });
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

      {options.map((field, optionIndex) => (
        <div key={field.id} className="flex items-center gap-2">
          <FormField
            control={form.control}
            name={`questions.${questionIndex}.options.${optionIndex}.text`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input {...field} placeholder={`Option ${optionIndex + 1}`} />
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