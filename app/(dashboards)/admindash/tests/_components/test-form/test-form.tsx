// app/(dashboards)/admindash/tests/_components/test-form.tsx
"use client"

import React from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Trash2, GripVertical, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface TestFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
}

export const TestForm = ({ onSubmit, initialData }: TestFormProps) => {
  const [categories, setCategories] = React.useState([]);
  const [expandedCategory, setExpandedCategory] = React.useState<string | null>(null);

  return (
    <div className="space-y-6 p-6">
      {/* Test Basic Information */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Create New Test</h2>
        <div className="grid gap-4">
          <div>
            <label className="text-sm font-medium">Test Title</label>
            <Input placeholder="Enter test title..." />
          </div>
          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea placeholder="Enter test description..." />
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Categories</h3>
          <Button variant="outline" size="sm" onClick={() => {}}>
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </div>

        <Accordion type="single" collapsible>
          {categories.map((category, index) => (
            <AccordionItem key={index} value={`category-${index}`}>
              <AccordionTrigger className="hover:bg-slate-100 rounded-lg px-4">
                <div className="flex items-center space-x-4 w-full">
                  <GripVertical className="h-5 w-5 text-slate-400" />
                  <span>Category Name</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Card>
                  <CardContent className="p-4 space-y-4">
                    <div className="space-y-4">
                      <Input placeholder="Category Title" />
                      <Textarea placeholder="Category Description" />
                    </div>
                    
                    {/* Questions Section */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Questions</h4>
                        <Button variant="outline" size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Question
                        </Button>
                      </div>
                      
                      {/* Question Items */}
                      <div className="space-y-4">
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-4">
                              <GripVertical className="h-5 w-5 text-slate-400" />
                              <div className="flex-1 space-y-4">
                                <Input placeholder="Question text" />
                                <select className="w-full p-2 border rounded-md">
                                  <option>Multiple Choice</option>
                                  <option>Checkbox</option>
                                  <option>Scale</option>
                                  <option>Text</option>
                                </select>
                              </div>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button type="submit">
          Create Test
        </Button>
      </div>
    </div>
  );
};