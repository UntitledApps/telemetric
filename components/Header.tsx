"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Project } from "@/types";
import { DateRange } from "react-day-picker";
import { AccountWidget } from "../components/account/accountwidget";
import { DatePickerWithRange } from "./custometimerange";
import { TimeRangePicker } from "./utils/timerangepicker";

interface HeaderProps {
  handleEnvironmentChange: (value: string) => void;
  handleDateRangeChange: (range: DateRange | undefined) => void;
  dateRange: DateRange | undefined;
  selectedProject: Project | null;
}

export function Header({
  handleEnvironmentChange,
  handleDateRangeChange,
  selectedProject,
  dateRange,
}: HeaderProps) {
  // Check if the selected project has a metadata type of 'app'
  const showEnvironmentSelect = selectedProject?.metadata?.type === "app";

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-white px-4 lg:h-[60px] lg:px-6">
      {selectedProject && (
        <>
          {/* Conditionally render the Select component */}
          <div
            style={{
             marginLeft: "auto",
            }
            }
          >

          </div>
          {showEnvironmentSelect && (
            <Select onValueChange={handleEnvironmentChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select environment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Debug/Development">
                  Debug/Development
                </SelectItem>
                <SelectItem value="Production">Production</SelectItem>
              </SelectContent>
            </Select>
          )}
          <TimeRangePicker
            onDateRangeChange={handleDateRangeChange}
            dateRange={dateRange}
          />
          <DatePickerWithRange
            onDateRangeChange={handleDateRangeChange}
            dateRange={dateRange}
          />
        </>
      )}
      <AccountWidget />
    </header>
  );
}
