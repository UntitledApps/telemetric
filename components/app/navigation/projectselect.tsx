import * as React from "react";
import { Project } from "@/types";
import Select from "@/components/ui/select/select";

interface ProjectSelectProps {
  projects: Project[];
  hasLoaded: boolean;
  selectedProject: Project;
  onProjectChange: (value: string) => void;
}

const ProjectSelect: React.FC<ProjectSelectProps> = ({
  projects,
  hasLoaded,
  selectedProject,
  onProjectChange,
}) => {
  if (!hasLoaded) {
    return (
      <p
        style={{
          color: "var(--subtitle)",
        }}
      >
        Loading...
      </p>
    );
  }

  // get the selected project index

  return (
    <Select
      options={projects.map((project) => project.id)}
      itemNames={projects.map((project) => project.name)}
      selectedOption={"selectedProject.id"}
      onOptionChange={(value) => onProjectChange(value)}
    />
  );
};

export default ProjectSelect;
