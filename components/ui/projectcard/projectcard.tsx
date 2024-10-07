import { Project } from "@/types";
import React from "react";
import "./projectcard.css";
interface ProjectCardProps {
  project: Project;
  onClick: (projectId: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <div onClick={() => onClick(project.id)} className="project-card">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "10px",
          justifyContent: "start",
          padding: "16px",
        }}
      >
        <div
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            background: `linear-gradient(${Math.random() * 360}deg,
              hsl(${Math.random() * 360}, 70%, 50%),
              hsl(${Math.random() * 360}, 70%, 50%))`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p style={{ color: "white", fontSize: "16px", fontWeight: "400" }}>
            {project.name.charAt(0).toUpperCase()}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            gap: "4px",
            justifyContent: "start",
          }}
        >
          <p style={{ fontSize: "14px", fontWeight: "700" }}>{project.name}</p>
          <p
            style={{
              fontSize: "14px",
              fontWeight: "400",
              color: "var(--subtitle)",
            }}
          >
            {project.type}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
