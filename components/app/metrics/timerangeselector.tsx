import Select from "@/components/ui/select/select";
import React, { useState } from "react";

interface TimeRangeSelectorProps {
  onSelect: (range: string, startDate?: Date, endDate?: Date) => void;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({ onSelect }) => {
  const [customStartDate, setCustomStartDate] = useState<string>("");
  const [customEndDate, setCustomEndDate] = useState<string>("");

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
      default:
        return;
    }

    onSelect(range, startDate, new Date());
  };

  const handleCustomRange = () => {
    if (customStartDate && customEndDate) {
      onSelect("custom", new Date(customStartDate), new Date(customEndDate));
    }
  };

  return (
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
      ]}
      onOptionChange={handlePredefinedRange}
      selectedOption={""}
      itemNames={[
        "Today",
        "Yesterday",
        "Last 72 Hours",
        "Last 7 Days",
        "Last 30 Days",
        "Last 90 Days",
        "Last Year",
        "All Time",
      ]}
    />
  );
};

export default TimeRangeSelector;
