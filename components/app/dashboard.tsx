"use client";
import { useEffect, useState } from "react";

import { Project, Revenue, SelectedNavItem } from "@/types/index";

import Metrics from "./metrics/metrics/metrics";

import { createClient } from "@/utils/supabase/client";
import { Navbar } from "./navigation/navbar/navbar";

import Projects from "./navigation/navitems/projectslist/projectslist";

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
  const handleTimeRangeSelect = async (
    range: string,
    startDate?: Date,
    endDate?: Date
  ) => {
    setTimeRange(range);
    // Set loading state
    setLoading(true);
    // Reset error state
    setError(null);
    if (selectedProject) {
      const { data: activitiesData, error: activitiesError } = await supabase
        .from("activities")
        .select("*")
        .eq("project_id", selectedProject.id)
        .gte(
          "timestamp",
          startDate?.toISOString() ||
            new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
        )
        .lte("timestamp", endDate?.toISOString() || new Date().toISOString());

      const { data: revenueData, error: revenueError } = await supabase
        .from("revenue")
        .select("*")
        .eq("project_id", selectedProject.id)
        .gte(
          "timestamp",
          startDate?.toISOString() ||
            new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
        )
        .lte("timestamp", endDate?.toISOString() || new Date().toISOString());

      const { data: eventsData, error: eventsError } = await supabase
        .from("events")
        .select("*")
        .eq("project_id", selectedProject.id)
        .gte(
          "timestamp",
          startDate?.toISOString() ||
            new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
        )
        .lte("timestamp", endDate?.toISOString() || new Date().toISOString());

      if (activitiesError) setError(activitiesError.message);
      if (revenueError) setError(revenueError.message);
      if (eventsError) setError(eventsError.message);

      const updatedProject = {
        ...selectedProject,
        activities: activitiesData || [],
        revenue: revenueData || [],
        events: eventsData || [],
      };

      setSelectedProject(updatedProject);

      // Update the project in the projects array
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === updatedProject.id ? updatedProject : project
        )
      );
      setLoading(false);

      // Update local storage
      const storedProjects = JSON.parse(
        localStorage.getItem("projects") || "[]"
      );
      const updatedStoredProjects = storedProjects.map((project: Project) =>
        project.id === updatedProject.id ? updatedProject : project
      );
      localStorage.setItem("projects", JSON.stringify(updatedStoredProjects));
    }
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

        // Check if projects are already in local storage
        const storedProjects = localStorage.getItem("projects");
        const projectsFromStorage = storedProjects
          ? JSON.parse(storedProjects)
          : [];

        // Set to track unique project IDs
        for (const projectID of data.projects) {
          // Check if the project ID already exists in the storage or state
          if (
            projectsFromStorage.find(
              (project: Project) => project.id === projectID
            ) ||
            projects.find((project) => project.id === projectID)
          ) {
            continue; // Skip to the next iteration if the ID already exists
          }

          // Fetch project data
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

        // Store fetched projects in local storage
        localStorage.setItem(
          "projects",
          JSON.stringify([...projectsFromStorage, ...fetchedProjects])
        );

        setProjects((prevProjects) => [...prevProjects, ...fetchedProjects]);
        setHasLoaded(true);
      }
    };

    // Load projects from local storage if they exist
    const storedProjects = localStorage.getItem("projects");
    if (storedProjects) {
      const projectsFromStorage = JSON.parse(storedProjects);
      setProjects(projectsFromStorage);
      setHasLoaded(true);
    } else if (!hasLoadedProjects) {
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
          <div className="flex justify-center items-center">
            <Projects
              onProjectSelect={handleProjectChange}
              projects={projects}
            />
          </div>
        );
      case SelectedNavItem.METRICS:
        return (
          <Metrics
            selectedProject={selectedProject!}
            projects={projects}
            selectedTimeRange={timeRange}
            loading={loading}
          />
        );
      case SelectedNavItem.ACCOUNT:
        return <div>Account</div>;

      default:
        return null;
    }
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw", 
        overflowX:  "hidden",
      
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
