"use client";

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
  return (
    <div className="w-full">
      <select
        id="project-select"
        value={selectedProject || ""}
        onChange={(e) => onProjectChange(e.target.value)}
        style={{
          width: "100px",
          height: "60px",
        }}
      >
        <option value="" disabled>
          Select a project
        </option>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.metadata.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProjectSelect;
