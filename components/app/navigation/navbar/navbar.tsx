import { Project, SelectedNavItem } from "@/types";
import Image from "next/image";
import TimeRangeSelector from "../timerange/timerangeselector";
import ProjectSelect from "../projectselect";
import "./navbar.css";
import { DatePickerWithPresetsAndRange } from "./test";

interface HeaderProps {
  projects: Project[];
  hasLoaded: boolean;
  onProjectChange: (value: string) => void;
  handleTimeRangeSelect: (
    range: string,
    startDate?: Date,
    endDate?: Date
  ) => void;
  selectedProject: Project;
  onDestinationSelected: (navItem: SelectedNavItem) => void; // Change type to SelectedNavItem
  selectedIndex: SelectedNavItem; // Change type to SelectedNavItem
}

export function Navbar({
  selectedProject,
  onDestinationSelected,
  selectedIndex,
  projects,
  onProjectChange,
  hasLoaded,
  handleTimeRangeSelect,
}: HeaderProps) {
  // Check if the selected project has a metadata type of 'app'
  const showEnvironmentSelect = selectedProject?.type === "app";

  return (
    <header className="navbar">
      <ProjectSelect
        projects={projects}
        selectedProject={selectedProject!}
        onProjectChange={onProjectChange}
        hasLoaded={hasLoaded}
      />  

    
      <TimeRangeSelector onSelect={handleTimeRangeSelect} />
      <DatePickerWithPresetsAndRange onSelect={() => {}} /> 
    </header>
  );
}
