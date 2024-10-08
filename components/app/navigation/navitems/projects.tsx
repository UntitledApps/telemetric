import ProjectCard from "@/components/ui/projectcard/projectcard";
import { Project } from "@/types";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

// Import the useProjects hook

interface ProjectsProps {
  onProjectSelect: (projectId: string) => void;

  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ onProjectSelect, projects }) => {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  useEffect(() => {
    setFilteredProjects(projects);
  }, [projects]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 200px))",
        gap: "16px",
        overflow: "auto",
        padding: "16px",
      }}
    >
      {filteredProjects.map((project) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          exit={{ opacity: 0 }}
        >
          <ProjectCard project={project} onClick={onProjectSelect} />
        </motion.div>
      ))}
    </div>
  );
};

export default Projects;
