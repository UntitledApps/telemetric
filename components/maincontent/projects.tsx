// components/maincontent/projects.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import React from "react";

interface Project {
  id: string;
  data: {
    [key: string]: {
      users: string[];
      events: {
        [key: string]: number;
      };
      revenue: string;
    };
  };
  metadata: {
    name: string;
    type: string;
    favIconURL: string;
    ogImageURL: string;
  };
}

interface ProjectsProps {
  onProjectSelect: (projectId: string) => void;
  projects: Project[]; // Accept projects as a prop
}

const Projects: React.FC<ProjectsProps> = ({ onProjectSelect, projects }) => {
  const getLatestRevenue = (
    data: { [key: string]: { revenue: string } } | undefined
  ) => {
    if (!data) return "N/A";
    const latestDate = Object.keys(data).sort().pop();
    return latestDate ? data[latestDate].revenue : "N/A";
  };

  const getUserCount = (
    data: { [key: string]: { users: string[] } } | undefined
  ) => {
    if (!data) return 0;
    const latestDate = Object.keys(data).sort().pop();
    return latestDate ? data[latestDate].users.length : 0;
  };

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
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "16px",
        padding: "8px",
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
              padding: "8px",
              cursor: "pointer",
            }}
          >
            <CardHeader
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
                justifyContent: "start",
                padding: "8px",
                flexShrink: 0,
              }}
            >
              <Avatar>
                <AvatarImage
                  src={project.metadata.favIconURL}
                  alt={project.metadata.name}
                />
                <AvatarFallback>{project.metadata.name[0]}</AvatarFallback>
              </Avatar>
              <CardTitle>{project.metadata.name}</CardTitle>
            </CardHeader>
            <CardContent
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "16px",
                padding: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div className="text-lg font-bold">
                  {getUserCount(project.data)}
                </div>
                <div className="text-sm text-gray-600">Unique Users</div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div className="text-lg font-bold">
                  {getLatestRevenue(project.data)}$
                </div>
                <div className="text-sm text-gray-600">Revenue</div>
              </div>
            </CardContent>
            <CardFooter
              style={{
                padding: "8px",
              }}
            >
              {/* Add project actions here */}
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default Projects;
