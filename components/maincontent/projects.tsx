import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import React from "react";
import { Badge } from "../ui/badge";

import { Project } from "@/types";
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
          <Card
            onClick={() => onProjectSelect(project.id)}
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "0px",
              cursor: "pointer",
            }}
          >
            <CardHeader
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
              <Avatar className="w-16 h-16">
                <AvatarImage
                  src={
                    project.metadata.favIconURL ||
                    "http://www.google.com/s2/favicons?domain=askrudi.com&sz=256"
                  }
                  alt={project.metadata.name}
                />
                <AvatarFallback>{project.metadata.name[0]}</AvatarFallback>
              </Avatar>
              <CardTitle>{project.metadata.name}</CardTitle>
              <Badge>Type: {project.metadata.type.toUpperCase()}</Badge>
            </CardHeader>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default Projects;
