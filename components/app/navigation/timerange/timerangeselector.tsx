import Dialog from "@/components/ui/dialog/dialog"; // Assuming you have a Dialog component
import Select from "@/components/ui/select/select";
import React, { useState } from "react";

interface TimeRangeSelectorProps {
  onSelect: (range: string, startDate?: Date, endDate?: Date) => void;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({ onSelect }) => {
  const [customStartDate, setCustomStartDate] = useState<string>("");
  const [customEndDate, setCustomEndDate] = useState<string>("");
  const [selectedRange, setSelectedRange] = useState<string>("");
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
      <Select
        options={[
          "today",
          "yesterday",
          "last72hours",
          "last7days",
          "last30days",
          "last90days",
          "lastYear",
          "allTime",
          "custom", // Added custom option
        ]}
        onOptionChange={handlePredefinedRange}
        selectedOption={selectedRange}
        itemNames={[
          "Today",
          "Yesterday",
          "Last 72 Hours",
          "Last 7 Days",
          "Last 30 Days",
          "Last 90 Days",
          "Last Year",
          "All Time",
          "Custom",
        ]}
      />
      {isDialogOpen && ( // Render dialog if open
        <Dialog onClose={() => setIsDialogOpen(false)}>
          <h2>Select Custom Date Range</h2>
          <input
            type="date"
            value={customStartDate}
            onChange={(e) => setCustomStartDate(e.target.value)}
          />
          <input
            type="date"
            value={customEndDate}
            onChange={(e) => setCustomEndDate(e.target.value)}
          />
          <button onClick={handleCustomRange}>Submit</button>
        </Dialog>
      )}
    </>
  );
};

export default TimeRangeSelector;
