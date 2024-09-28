"use client";
import Button from "@/components/ui/button";

import { Project } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { DateRange } from "react-day-picker";

import { TimeRangePicker } from "../utils/timerangepicker";

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
    <header
      style={{
        width: "100%",
        borderBottom: "1px solid #e5e5e5",
        height: "54px",
      }}
    >
      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "end",
          width: "100%",
          minWidth: "100%",
          gap: "8px",
          height: "100%",
        }}
      >
        {selectedProject && (
          <>
            {/* Conditionally render the Select component */}

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
          </>
        )}
        {/* <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">
                <MessageCircle className="mr-2 h-4 w-4" />
                Feedback
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-46">
              <DropdownMenuItem
                onClick={() =>
                  window.open("https://x.com/i/communities/1834566987483082773")
                }
              >
                <Image
                  src="/images/x.svg"
                  alt="X"
                  className="mr-2 h-4 w-4"
                  width={16}
                  height={16}
                />
                In the X Community
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => window.open("mailto:team@untitledapps.net")}
              >
                <Mail className="mr-2 h-4 w-4" />
                Per E-Mail
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        {/* </Dialog>
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">Support/Help</Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-46">
              <DropdownMenuItem
                onClick={() =>
                  window.open(
                    "https://x.com/messages/compose?recipient_id=1680911613988073473"
                  )
                }
              >
                <Image
                  src="/images/x.svg"
                  alt="X"
                  className="mr-2 h-4 w-4"
                  width={16}
                  height={16}
                />
                Send me an DM on X
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => window.open("mailto:team@untitledapps.net")}
              >
                <Mail className="mr-2 h-4 w-4" />
                Per E-Mail
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Dialog> */}
        <Button
          onClick={() =>
            window.open("https://telemetric.untitledapps.net/docs", "_blank")
          }
        >
          Docs{" "}
        </Button>
        +
        <Button
          onClick={() =>
            window.open("https://telemetric.untitledapps.net/docs", "_blank")
          }
        >
          Docs{" "}
        </Button>
      </div>
    </header>
  );
}
