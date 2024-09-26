import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn/avatar";
import { Badge } from "@/components/shadcn/badge";
import { Card, CardHeader, CardTitle } from "@/components/shadcn/card";
import { Dialog, DialogTrigger } from "@/components/shadcn/dialog";
import { Project } from "@/types";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import ProjectCreationDialog from "../../projectcreationdialog";

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

      {/* Create Project Card */}
      <motion.div
        key="create-project"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0 }}
      >
        <Dialog>
          <DialogTrigger asChild>
            <Card
              onClick={handleOpenDialog}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "0px",
                width: "100%",
                height: "100%",
                cursor: "pointer",
                justifyContent: "center",
              }}
            >
              <CardHeader
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "10px",
                  justifyContent: "center",
                  padding: "16px",
                  flexShrink: 0,
                }}
              >
                <div className="text-base font-bold">Create a new Project</div>
              </CardHeader>
            </Card>
          </DialogTrigger>

          <ProjectCreationDialog />
        </Dialog>
      </motion.div>
    </div>
  );
};

export default Projects;
