import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { addDays } from "date-fns";
import * as React from "react";
import { DateRange } from "react-day-picker";

type Status = {
  value: string;
  label: string;
};

const statuses: Status[] = [
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "last-7-days", label: "Last 7 days" },
  { value: "last-30-days", label: "Last 30 days" },
  { value: "this-month", label: "This month" },
  { value: "last-month", label: "Last month" },
  { value: "custom", label: "Custom" },
];

interface TimeRangePickerProps {
  onDateRangeChange: (range?: DateRange) => void;
}

export function TimeRangePicker({ onDateRangeChange }: TimeRangePickerProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
    null
  );

  const showDatePicker = selectedStatus?.value === "custom";
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>();

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    onDateRangeChange(range); // Notify parent component of date range change
  };

  const pickerContent = (
    <>
      <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} />
      {showDatePicker && (
        <div className="mt-4">
          <DatePickerWithRange
            dateRange={dateRange}
            onDateRangeChange={handleDateRangeChange}
          />
        </div>
      )}
    </>
  );

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {selectedStatus ? <>{selectedStatus.label}</> : <>Today</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          {pickerContent}
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start">
          {selectedStatus ? <>{selectedStatus.label}</> : <>+ Set status</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">{pickerContent}</div>
      </DrawerContent>
    </Drawer>
  );
}

function StatusList({
  setOpen,
  setSelectedStatus,
}: {
  setOpen: (open: boolean) => void;
  setSelectedStatus: (status: Status | null) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter timeranges..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {statuses.map((status) => (
            <CommandItem
              key={status.value}
              value={status.value}
              onSelect={(value) => {
                setSelectedStatus(
                  statuses.find((s) => s.value === value) || null
                );
                setOpen(false);
              }}
            >
              {status.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

interface DatePickerWithRangeProps {
  dateRange?: DateRange;
  onDateRangeChange: (range: DateRange | undefined) => void;
}

export function DatePickerWithRange({
  dateRange,
  onDateRangeChange,
}: DatePickerWithRangeProps) {
  const handleDateRangeChange = (range: DateRange | undefined) => {
    onDateRangeChange(range);
  };

  return (
    <div className="grid gap-2">
      <Calendar
        mode="range"
        selected={dateRange}
        onSelect={handleDateRangeChange}
      />
    </div>
  );
}
