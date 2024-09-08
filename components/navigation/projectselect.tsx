"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FC } from "react";

interface ProjectSelectProps {
  projects: { id: string; metadata: { name: string } }[];
  selectedProject: string | null;
  onProjectChange: (value: string) => void;
}

const ProjectSelect: FC<ProjectSelectProps> = ({
  projects,
  selectedProject,
  onProjectChange,
}) => {
  console.log(projects); // Debugging line to check project structure

  return (
    <Select onValueChange={onProjectChange} value={selectedProject || ""}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a project" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Your Projects</SelectLabel>
          {projects.map((project) => (
            <SelectItem key={project.id} value={project.id}>
              {project.metadata.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ProjectSelect;
