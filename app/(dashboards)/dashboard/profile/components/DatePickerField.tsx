// //app/(dashboards)/dashboard/profile/components/DatePickerField.tsx

// "use client"

// import * as React from "react"
// import { format } from "date-fns"
// import { Calendar as CalendarIcon } from "lucide-react"
// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { Calendar } from "@/components/ui/calendar"
// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"
// import { UseFormReturn } from "react-hook-form"
// import { UserProfileFormValues } from "@/lib/validations/user-profile"

// interface DatePickerFieldProps {
//   form: UseFormReturn<UserProfileFormValues>
// }

// export function DatePickerField({ form }: DatePickerFieldProps) {
//   const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined)

//   React.useEffect(() => {
//     const dateOfBirth = form.getValues("dateOfBirth")
//     if (dateOfBirth) {
//       setSelectedDate(dateOfBirth)
//     }
//   }, [form])

//   return (
//     <FormField
//       control={form.control}
//       name="dateOfBirth"
//       render={({ field }) => (
//         <FormItem className="flex flex-col">
//           <FormLabel>Date of Birth</FormLabel>
//           <Popover>
//             <PopoverTrigger asChild>
//               <FormControl>
//                 <Button
//                   variant="outline"
//                   className={cn(
//                     "w-full pl-3 text-left font-normal",
//                     !selectedDate && "text-muted-foreground"
//                   )}
//                 >
//                   {selectedDate ? (
//                     format(selectedDate, "PPP")
//                   ) : (
//                     <span>Pick a date</span>
//                   )}
//                   <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                 </Button>
//               </FormControl>
//             </PopoverTrigger>
//             <PopoverContent className="w-auto p-0" align="start">
//               <Calendar
//                 mode="single"
//                 selected={selectedDate}
//                 onSelect={(date) => {
//                   setSelectedDate(date ?? undefined)
//                   field.onChange(date ?? undefined)
//                 }}
//                 disabled={(date) =>
//                   date > new Date() || date < new Date("1900-01-01")
//                 }
//                 initialFocus
//                 showOutsideDays
//                 fromYear={1900}
//                 toYear={new Date().getFullYear()}
//                 captionLayout="dropdown"
//               />
//             </PopoverContent>
//           </Popover>
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   )
// }