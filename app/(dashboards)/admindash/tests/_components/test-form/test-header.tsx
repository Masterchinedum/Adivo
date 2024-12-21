// app/(dashboards)/admindash/tests/_components/test-form/test-header.tsx
"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface TestHeaderProps {
  title: string
  description: string
  onChange: (values: { title?: string; description?: string }) => void
}

export const TestHeader = ({ title, description, onChange }: TestHeaderProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Create New Test</h2>
      <div className="grid gap-4">
        <div>
          <label className="text-sm font-medium">Test Title</label>
          <Input 
            placeholder="Enter test title..." 
            value={title}
            onChange={(e) => onChange({ title: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium">Description</label>
          <Textarea 
            placeholder="Enter test description..." 
            value={description}
            onChange={(e) => onChange({ description: e.target.value })}
          />
        </div>
      </div>
    </div>
  )
}