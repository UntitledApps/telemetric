import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog"; // Assuming you have a Dialog component
import { CalendarIcon } from "@radix-ui/react-icons";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { format } from "util";

interface TimeRangeSelectorProps {
  onSelect: (range: string, startDate?: Date, endDate?: Date) => void;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({ onSelect }) => {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });
  const [singleDate, setSingleDate] = React.useState<Date>();
  const [selectedRange, setSelectedRange] = React.useState<string>("last7days");

  const handlePresetChange = (value: string) => {
    const now = new Date();
    let startDate: Date;

    switch (value) {
      case "today":
        startDate = new Date(now.setHours(0, 0, 0, 0));
        break;
      case "yesterday":
        startDate = new Date(now.setDate(now.getDate() - 1));
        startDate.setHours(0, 0, 0, 0);
        break;
      case "last72hours":
        startDate = new Date(now.setHours(now.getHours() - 72));
        break;
      case "last7days":
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case "last30days":
        startDate = new Date(now.setDate(now.getDate() - 30));
        break;
      case "last90days":
        startDate = new Date(now.setDate(now.getDate() - 90));
        break;
      case "lastYear":
        startDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      case "allTime":
        startDate = new Date(0); // Start from epoch
        break;
      default:
        return;
    }

    setSelectedRange(value);
    onSelect(value, startDate, new Date()); // Call onSelect with the selected range
  }

  const handleRangeSelect = (range: DateRange | undefined) => {
    setDateRange(range);
    if (range?.from && range?.to) {
      onSelect("custom", range.from, range.to); // Call onSelect with the custom range
    }
  }

  return (
    <div className={cn("grid gap-2")}>
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
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="last72hours">Last 72 Hours</SelectItem>
              <SelectItem value="last7days">Last 7 Days</SelectItem>
              <SelectItem value="last30days">Last 30 Days</SelectItem>
              <SelectItem value="last90days">Last 90 Days</SelectItem>
              <SelectItem value="lastYear">Last Year</SelectItem>
              <SelectItem value="allTime">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={handleRangeSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TimeRangeSelector;
