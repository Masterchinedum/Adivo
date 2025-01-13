// components/ui/command.tsx
"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface CommandProps {
  children: React.ReactNode
  className?: string
}

export function Command({ children, className }: CommandProps) {
  return (
    <div className={cn("flex flex-col overflow-hidden rounded-md", className)}>
      {children}
    </div>
  )
}

interface CommandInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export function CommandInput({ className, ...props }: CommandInputProps) {
  return (
    <div className="flex items-center border-b px-3">
      <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
      <input
        className={cn(
          "flex h-10 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground",
          className
        )}
        {...props}
      />
    </div>
  )
}

export function CommandEmpty({ children }: { children: React.ReactNode }) {
  return <div className="py-6 text-center text-sm">{children}</div>
}

export function CommandGroup({ children, className }: CommandProps) {
  return (
    <div
      className={cn(
        "overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
        className
      )}
    >
      {children}
    </div>
  )
}

interface CommandItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean
  children: React.ReactNode
}

export function CommandItem({ children, selected, className, ...props }: CommandItemProps) {
  return (
    <button
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      role="option"
      aria-selected={selected}
      {...props}
    >
      {children}
    </button>
  )
}