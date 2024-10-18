import { Project } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import "./projectcard.css";
import ProjectChart from "./projectchart";

interface ProjectCardProps {
  project: Project;
  onClick: (projectId: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const isValidUrl = (url: string) => {
    return url.startsWith("https://");
  };

  const [appIcon, setAppIcon] = useState<string>("/images/logo.png");

  const fetchAppIcon = async (bundleId: string) => {
    if (bundleId.startsWith("https://")) {
      return (
        "https://www.google.com/s2/favicons?domain=" + bundleId + "&sz=256"
      );
    }

    const response = await fetch(
      `https://itunes.apple.com/lookup?bundleId=${bundleId}`
    );
    const data = await response.json();
    if (data.resultCount > 0) {
      const appData = data.results[0];
      return appData.artworkUrl100; // Use the 100x100 icon URL
    }
    return null; // Return null if no icon is found
  };

  useEffect(() => {
    fetchAppIcon(project.url).then((icon) => {
      setAppIcon(icon);
    });
  }, [project.url]);

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

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src={appIcon}
            width={30}
            height={30}
            style={{
              borderRadius: "50%",
            }}
            alt={project.name} // Added alt attribute for accessibility
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            gap: "0px",
            justifyContent: "start",
          }}
        >
          <p style={{ fontSize: "14px", fontWeight: "700" }}>{project.name}</p>
          <p
            style={{
              fontSize: "14px",
              lineHeight: "14px",
              fontWeight: "400",
              color: "var(--subtitle)",
            }}
          >
            {project.type}
          </p>
          <p
            style={{
              fontSize: "12px",
              fontWeight: "400",
              color: "var(--subtitle)",
            }}
          ></p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "10px",
          justifyContent: "start",
        }}
      >
        <ProjectChart activities={project.activities} />
      </div>
    </div>
  );
};

export default ProjectCard;
