import { Dialog } from "@/components/ui/dialog"; // Assuming you have a Dialog component
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { useState } from "react";

interface TimeRangeSelectorProps {
  onSelect: (range: string, startDate?: Date, endDate?: Date) => void;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({ onSelect }) => {
  const [customStartDate, setCustomStartDate] = useState<string>("");
  const [customEndDate, setCustomEndDate] = useState<string>("");
  const [selectedRange, setSelectedRange] = useState<string>("last7days");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false); // New state for dialog

  const handlePredefinedRange = (range: string) => {
    const now = new Date();
    let startDate: Date;

    switch (range) {
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
      case "custom":
        startDate = new Date(0); // Start from epoch
        setIsDialogOpen(true); // Open dialog for custom range
        break;
      default:
        return;
    }
    setSelectedRange(range);
    //log the range

    onSelect(range, startDate, new Date());
  };

  const handleCustomRange = () => {
    if (customStartDate && customEndDate) {
      onSelect("custom", new Date(customStartDate), new Date(customEndDate));
      setIsDialogOpen(false); // Close dialog after selection
    }
  };

  return (
    <>
      <Select onValueChange={handlePredefinedRange} value={selectedRange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a time range" />
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
          <SelectItem value="custom">Custom</SelectItem> {/* Added custom option */}
        </SelectContent>
      </Select>
      {/* Dialog for custom date range if isDialogOpen is true */}
      {isDialogOpen && (
        <div>
          {/* Your custom date range input logic here */}
        </div>
      )}
    </>
  );
};

export default TimeRangeSelector;
