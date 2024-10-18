import ProjectCard from "@/components/ui/projectcard/projectcard";
import { Project } from "@/types";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import "./projectslist.css"; // Import your CSS file

// Import the useProjects hook

interface ProjectsProps {
  onProjectSelect: (projectId: string) => void;

  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ onProjectSelect, projects }) => {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Scroll the page to the top when projects change
    window.scrollTo(0, 0);
    setFilteredProjects(projects);
  }, [projects]);

  return (
    <div className="projects-container">
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
