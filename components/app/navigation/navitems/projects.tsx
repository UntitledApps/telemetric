import { Project } from "@/types";
import { motion } from "framer-motion";
import React, { useState } from "react";

// Import the useProjects hook

interface ProjectsProps {
  onProjectSelect: (projectId: string) => void;

  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ onProjectSelect }) => {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 200px))",
        gap: "16px",
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
          <div
            onClick={() => onProjectSelect(project.id)}
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "0px",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "5px",
                justifyContent: "center",
                padding: "16px",
                flexShrink: 0,
              }}
            >
              <h3>{project.name}</h3> {/* Display project name */}
              {/* Add more project details as needed */}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Projects;
