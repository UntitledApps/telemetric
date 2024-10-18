import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";
import { Project } from "@/types";
import * as React from "react";

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

  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a project" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Projects</SelectLabel>
          {projects.map((project) => (
            <SelectItem key={project.id} value={project.id}>
              {project.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ProjectSelect;
