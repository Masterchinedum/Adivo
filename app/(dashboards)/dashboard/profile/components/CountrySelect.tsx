"use client"

import * as React from "react"
import countries from "world-countries"
import ReactCountryFlag from "react-country-flag"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { UseFormReturn } from "react-hook-form"
import { UserProfileFormValues } from "@/lib/validations/user-profile"
import { ScrollArea } from "@/components/ui/scroll-area"

interface CountrySelectProps {
  form: UseFormReturn<UserProfileFormValues>
}

// Sort countries by name
const sortedCountries = countries.sort((a, b) => 
  a.name.common.localeCompare(b.name.common)
)

export function CountrySelect({ form }: CountrySelectProps) {
  return (
    <FormField
      control={form.control}
      name="countryOfOrigin"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Country of Origin</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <ScrollArea className="h-80">
                {sortedCountries.map((country) => (
                  <SelectItem 
                    key={country.cca2} 
                    value={country.name.common}
                    className="flex items-center justify-between"
                  >
                    {country.name.common}
                    <span>  </span>
                    <ReactCountryFlag
                      countryCode={country.cca2}
                      svg
                      style={{
                        width: '1.1em',
                        height: '1.1em',
                      }}
                    />
                  </SelectItem>
                ))}
              </ScrollArea>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}