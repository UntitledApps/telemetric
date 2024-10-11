"use client";
import { useEffect, useState } from "react";

import { Project, Revenue, SelectedNavItem } from "@/types";

import { createClient } from "@/utils/supabase/client";
import Metrics from "./metrics/metrics";

import { Navbar } from "./navigation/navbar";
import DataExplorer from "./navigation/navitems/data_explorer";
import Projects from "./navigation/navitems/projects";

export function Dashboard() {
  // Change this to a regular function
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
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const [revenueData, setRevenueData] = useState<Revenue[]>([]);
  const [timeRange, setTimeRange] = useState<string>("");

  var hasLoadedProjects = false;
  const handleTimeRangeSelect = (
    range: string,
    startDate?: Date,
    endDate?: Date
  ) => {
    setTimeRange(range);
    // You can also handle the startDate and endDate here for further processing
    console.log("Selected Time Range:", range, startDate, endDate);
  };
  useEffect(() => {
    const fetchProjectsAndActivities = async () => {
      hasLoadedProjects = true;
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("customers")
        .select("projects")
        .eq("id", userData?.user?.id)
        .single();

      if (error) {
        setError(error.message);
      } else {
        const fetchedProjects: Project[] = []; // Temporary array to hold fetched projects

        // Set to track unique project IDs

        for (const projectID of data.projects) {
          // Check if the project ID already exists in the set

          if (projects.find((project) => project.id === projectID)) {
            continue; // Skip to the next iteration if the ID already exists
          }

          // Add the project ID to the set

          const { data: projectData, error: projectError } = await supabase
            .from("projects")
            .select("*")
            .eq("id", projectID)
            .single();

          if (projectError) {
            setError(projectError.message);
          }

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

        setProjects((prevProjects) => [...prevProjects, ...fetchedProjects]);
        setHasLoaded(true);
      }
    };
    if (!hasLoadedProjects) {
      fetchProjectsAndActivities();
    }
  }, []);

  const handleNavItemClick = (navItem: SelectedNavItem) => {
    setSelectedNavItem(navItem);
  };

  const handleProjectChange = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId) || null;
    const index = projects.findIndex((p) => p.id === projectId);
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
          <Metrics selectedProject={selectedProject!} projects={projects} />
        );
      case SelectedNavItem.ACCOUNT:
        return <DataExplorer />;

      default:
        return null;
    }
  }

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
        selectedProject={selectedProject!}
        projects={projects}
        onProjectChange={handleProjectChange}
        onDestinationSelected={handleNavItemClick}
        selectedIndex={selectedNavItem}
        hasLoaded={hasLoaded}
        handleTimeRangeSelect={handleTimeRangeSelect}
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
