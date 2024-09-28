import { Project } from "@/types";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";

interface ProjectsProps {
  onProjectSelect: (projectId: string) => void;
  projects: Project[];
  dateRange?: DateRange; // Added dateRange prop for filtering
}

const Projects: React.FC<ProjectsProps> = ({
  onProjectSelect,
  projects,
  dateRange,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  // Function to get total users from activities data

  // Function to get the latest revenue (for consistency with previous code)

  if (projects.length === 0)
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        No projects found
      </div>
    );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 200px))",
        gap: "16px",
        padding: "16px",
      }}
    >
      {projects.map((project) => (
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
            ></div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Projects;
