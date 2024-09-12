"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerWithRangeProps {
  dateRange?: DateRange;
  onDateRangeChange: (range: DateRange | undefined) => void;
  className?: string;
}

export function DatePickerWithRange({
  dateRange,
  onDateRangeChange,
  className,
}: DatePickerWithRangeProps) {
  const [localDateRange, setLocalDateRange] = React.useState<
    DateRange | undefined
  >(dateRange);

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setLocalDateRange(range);
    onDateRangeChange(range);
  };
    // get the projects type
   
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !localDateRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {localDateRange?.from ? (
              localDateRange.to ? (
                <>
                  {format(localDateRange.from, "LLL dd, y")} -{" "}
                  {format(localDateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(localDateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={localDateRange?.from || new Date()}
            selected={localDateRange}
            onSelect={handleDateRangeChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
