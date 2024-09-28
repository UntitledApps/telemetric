import { useMediaQuery } from "@/hooks/use-media-query";
import * as React from "react";
import { DateRange } from "react-day-picker";
// Assuming you have this component

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
];

interface TimeRangePickerProps {
  onDateRangeChange: (range: DateRange | undefined) => void;
  dateRange: DateRange | undefined;
}

export function TimeRangePicker({
  onDateRangeChange,
  dateRange,
}: TimeRangePickerProps) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [selectedRange, setSelectedRange] = React.useState<string | null>(null);

  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  const handleRangeChange = (range: DateRange) => {
    setSelectedRange(null);
    onDateRangeChange(range);
  };

  const handleRangeSelection = (value: string) => {
    setSelectedRange(value);
    switch (value) {
      case "today":
        onDateRangeChange({
          from: new Date(),
          to: new Date(),
        });
        break;
      case "yesterday":
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        onDateRangeChange({
          from: yesterday,
          to: yesterday,
        });
        break;
      case "last-7-days":
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        onDateRangeChange({
          from: sevenDaysAgo,
          to: new Date(),
        });
        break;
      case "last-30-days":
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        onDateRangeChange({
          from: thirtyDaysAgo,
          to: new Date(),
        });
        break;
      case "this-month":
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Last day of the month

        onDateRangeChange({
          from: startOfMonth,
          to: endOfMonth,
        });
        break;

      case "last-month":
        const startOfLastMonth = new Date();
        startOfLastMonth.setMonth(startOfLastMonth.getMonth() - 1);
        startOfLastMonth.setDate(1);
        const endOfLastMonth = new Date(startOfLastMonth);
        endOfLastMonth.setMonth(endOfLastMonth.getMonth() + 1);
        endOfLastMonth.setDate(0);
        onDateRangeChange({
          from: startOfLastMonth,
          to: endOfLastMonth,
        });
        break;

      default:
        onDateRangeChange(undefined);
        break;
    }
    setOpen(false);
  };

  return <p>sdsds</p>;
}
