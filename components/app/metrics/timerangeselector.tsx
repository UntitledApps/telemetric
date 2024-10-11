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
    <div>
      <h3>Select Time Range</h3>
      <div>
        <button onClick={() => handlePredefinedRange("today")}>Today</button>
        <button onClick={() => handlePredefinedRange("yesterday")}>
          Yesterday
        </button>
        <button onClick={() => handlePredefinedRange("last72hours")}>
          Last 72 Hours
        </button>
        <button onClick={() => handlePredefinedRange("last7days")}>
          Last 7 Days
        </button>
        <button onClick={() => handlePredefinedRange("last30days")}>
          Last 30 Days
        </button>
        <button onClick={() => handlePredefinedRange("last90days")}>
          Last 90 Days
        </button>
        <button onClick={() => handlePredefinedRange("lastYear")}>
          Last Year
        </button>
        <button onClick={() => handlePredefinedRange("allTime")}>
          All Time
        </button>
      </div>
      <div>
        <h4>Custom Range</h4>
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
        <button onClick={handleCustomRange}>Apply Custom Range</button>
      </div>
    </div>
  );
};

export default TimeRangeSelector;
