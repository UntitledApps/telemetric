"use client";
import { useEffect, useState } from "react";

import { Project, Revenue, SelectedNavItem } from "@/types";

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
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number>(0);
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
        const fetchedProjects: Project[] = []; // Temporary array to hold fetched projects
        const projectIdsSet = new Set<string>(); // Set to track unique project IDs

        for (const projectID of data.projects) {
          const { data: projectData, error: projectError } = await supabase
            .from("projects")
            .select("*")
            .eq("id", projectID)
            .single();

          const { data: activitiesData, error: activitiesError } =
            await supabase
              .from("activities")
              .select("*")
              .eq("project_id", projectID)
              .gte(
                "timestamp",
                new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
              ); // Filter for last 30 days
          const { data: revenueData, error: revenueError } = await supabase
            .from("revenue")
            .select("*")
            .eq("project_id", projectID)
            .gte(
              "timestamp",
              new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
            ); // Filter for last 30 days
          const { data: eventsData, error: eventsError } = await supabase
            .from("events")
            .select("*")
            .eq("project_id", projectID)
            .gte(
              "timestamp",
              new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
            ); // Filter for last 30 days

          const project = {
            ...projectData,
            activities: activitiesData,
            revenue: revenueData,
            events: eventsData,
          };
          if (projectError) {
            setError(projectError.message);
          } else if (projectData) {
            fetchedProjects.push(project);
          }
        }

        console.log(fetchedProjects);
        setProjects((prevProjects) => [...prevProjects, ...fetchedProjects]);
      }
    };

    fetchProjectsAndActivities();
  }, [supabase]);

  const handleNavItemClick = (navItem: SelectedNavItem) => {
    setSelectedNavItem(navItem);
  };

  const handleProjectChange = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId) || null;
    const index = projects.findIndex((p) => p.id === projectId);
    setSelectedProject(project);
    setSelectedProjectIndex(index);
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
            selectedProjectIndex={selectedProjectIndex}
            projects={projects}
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
