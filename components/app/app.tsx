"use client";
import { useEffect, useState } from "react";

import { Project, Revenue, SelectedNavItem } from "@/types";
import { Alert, Button } from "@lemonsqueezy/wedges";

import { createClient } from "@/utils/supabase/client";
import Metrics from "./metrics/metrics";

import { Navbar } from "./navigation/navbar";
import DataExplorer from "./navigation/navitems/data_explorer";
import Projects from "./navigation/navitems/projects";

export function DashboardLayout() {
  const supabase = createClient();
  const [selectedNavItem, setSelectedNavItem] = useState<SelectedNavItem>(
    SelectedNavItem.PROJECTS
  );

  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loadingProjects, setLoadingProjects] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [environment, setEnvironment] = useState<string>("Production");
  const [loading, setLoading] = useState<boolean>(false);
  const [activitiesIds, setActivitiesIds] = useState<string[]>([]);
  const [initialActivitiesMap, setInitialActivitiesMap] = useState<{
    [timestamp: string]: { os: string; browser: string };
  }>({});
  const [currentActivitiesMap, setCurrentActivitiesMap] = useState<{
    [timestamp: string]: { os: string; browser: string };
  }>({});
  const [revenueData, setRevenueData] = useState<Revenue[]>([]);

  useEffect(() => {
    const fetchProjectsAndActivities = async () => {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("customers")
        .select("projects")
        .eq("id", userData?.user?.id)
        .single();

      console.log(data);

      if (error) {
        setError(error.message);
      } else {
        for (const projectID of data.projects) {
          console.log(projectID);
          const { data: projectData, error: projectError } = await supabase
            .from("projects")
            .select("*")
            .eq("id", projectID)
            .single();
          console.log(projectData);
          if (projectError) {
            setError(projectError.message);
          } else if (projectData) {
            setProjects((prevProjects) => [...prevProjects, projectData]);
          }
        }
        console.log(projects);
      }
    };

    fetchProjectsAndActivities();
  }, [supabase]);

  const handleNavItemClick = (navItem: SelectedNavItem) => {
    setSelectedNavItem(navItem);
  };

  const handleProjectChange = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId) || null;
    setSelectedProject(project);
    setSelectedNavItem(SelectedNavItem.METRICS);
  };

  function renderContent() {
    switch (selectedNavItem) {
      case SelectedNavItem.PROJECTS:
        return (
          <Projects onProjectSelect={handleProjectChange} projects={projects} />
        );
      case SelectedNavItem.METRICS:
        return (
          <Metrics
            selectedProject={selectedProject}
            environment={environment}
            activities={currentActivitiesMap}
          />
        );
      case SelectedNavItem.ACCOUNT:
        return <DataExplorer />;

      default:
        return null;
    }
  }

  useEffect(() => {
    const mainElement = document.querySelector("main");
    if (mainElement) {
      mainElement.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedNavItem]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "0px",

        alignItems: "start",
        justifyContent: "start",
      }}
    >
      <Navbar
        selectedProject={selectedProject}
        onDestinationSelected={handleNavItemClick}
        selectedIndex={selectedNavItem}
      />
      <Alert>Hello</Alert>
      <main
        style={{
          backgroundColor: "var(--dominant)",
          width: "100%",
          height: "100%",
          minHeight: "100vh",
          overflowY: "auto",
        }}
      >
        {renderContent()}
      </main>
    </div>
  );
}
