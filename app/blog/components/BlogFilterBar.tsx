// app/blog/components/BlogFilterBar.tsx
'use client';

import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { BlogFilterBarProps } from '@/types/blog';

export function BlogFilterBar({
  categories,
  selectedCategories,
  selectedTags,
  onCategoryChange,
  onTagChange,
  availableTags,
}: BlogFilterBarProps) {
  const [openCategories, setOpenCategories] = useState(false);
  const [openTags, setOpenTags] = useState(false);

  return (
    <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Categories */}
          <div className="space-y-4 w-full sm:w-auto">
            <Popover open={openCategories} onOpenChange={setOpenCategories}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openCategories}
                  className="justify-between w-full sm:w-[200px]"
                >
                  Categories
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                 >
                  <CommandEmpty>No category found.</CommandEmpty>
                  <CommandGroup>
                    {categories.map((category) => (
                      <CommandItem
                        key={category._id}
                        onSelect={() => {
                          onCategoryChange(category._id);
                          setOpenCategories(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedCategories.includes(category._id)
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {category.title}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>

            <ScrollArea className="whitespace-nowrap pb-4">
              <div className="flex gap-2">
                {selectedCategories.map((catId) => {
                  const category = categories.find((c) => c._id === catId);
                  return (
                    <Badge
                      key={catId}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => onCategoryChange(catId)}
                    >
                      {category?.title}
                      <span className="ml-1">×</span>
                    </Badge>
                  );
                })}
              </div>
            </ScrollArea>
          </div>

          {/* Tags */}
          <div className="space-y-4 w-full sm:w-auto">
            <Popover open={openTags} onOpenChange={setOpenTags}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openTags}
                  className="justify-between w-full sm:w-[200px]"
                >
                  Tags
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search tags..." />
                  <CommandEmpty>No tag found.</CommandEmpty>
                  <CommandGroup>
                    {availableTags.map((tag) => (
                      <CommandItem
                        key={tag}
                        onSelect={() => {
                          onTagChange(tag);
                          setOpenTags(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedTags.includes(tag) ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {tag}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>

            <ScrollArea className="whitespace-nowrap pb-4">
              <div className="flex gap-2">
                {selectedTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => onTagChange(tag)}
                  >
                    {tag}
                    <span className="ml-1">×</span>
                  </Badge>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}