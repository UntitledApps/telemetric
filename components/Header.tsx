// components/Header.tsx
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
import { TimeRangePicker } from "./utils/timerangepicker";
interface HeaderProps {
  handleEnvironmentChange: (value: string) => void;
  handleDateRangeChange: (range: DateRange | undefined) => void;
  selectedProject: Project | null;
}
export function Header({
  handleEnvironmentChange,
  handleDateRangeChange,
  selectedProject,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-white px-4 lg:h-[60px] lg:px-6">
      {selectedProject && (
        <>
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
          <TimeRangePicker onDateRangeChange={handleDateRangeChange} />
        </>
      )}
      <AccountWidget />
    </header>
  );
}
