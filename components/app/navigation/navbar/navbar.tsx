import { Project, SelectedNavItem } from "@/types";
import Image from "next/image";
import TimeRangeSelector from "../timerange/timerangeselector";
import ProjectSelect from "../projectselect";
import "./navbar.css";

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

      <Image
        src="/images/logo.png"
        alt="Logo"
        style={{
          borderRadius: "0px",
          border: "2px solid #DAEBFD",
          cursor: "pointer",
          boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.06)",
        }}
        onClick={() => {
          onDestinationSelected(SelectedNavItem.PROJECTS);
        }}
        width={30}
        height={30}
      />
      <TimeRangeSelector onSelect={handleTimeRangeSelect} />
    </header>
  );
}
