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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",   
      }}
    >
      <select
        id="project-select"
        value={selectedProject || ""}
        onChange={(e) => onProjectChange(e.target.value)}
        style={{
          border: "1px solid #e0e0e0",
          borderRadius: "4px",
          width: "100%",
          margin: "8px",
          fontSize: "16px",
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
