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
  return <div></div>;
};

export default ProjectSelect;
