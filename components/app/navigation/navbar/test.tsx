"use client"

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function DatePickerWithPresetsAndRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  })
  const [singleDate, setSingleDate] = React.useState<Date>()

  const handlePresetChange = (value: string) => {
    const today = new Date();
    switch (value) {
      case "0":
        setSingleDate(today);
        setDateRange(undefined); // Clear range selection
        break;
      case "1":
        setSingleDate(addDays(today, 1));
        setDateRange(undefined);
        break;
      case "3":
        setSingleDate(addDays(today, 3));
        setDateRange(undefined);
        break;
      case "7":
        setSingleDate(addDays(today, 7));
        setDateRange(undefined);
        break;
      default:
        break;
    }
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !singleDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {singleDate ? format(singleDate, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex w-auto flex-col space-y-2 p-2" align="start">
          <Select onValueChange={handlePresetChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a preset" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="0">Today</SelectItem>
              <SelectItem value="1">Tomorrow</SelectItem>
              <SelectItem value="3">In 3 days</SelectItem>
              <SelectItem value="7">In a week</SelectItem>
            </SelectContent>
          </Select>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}