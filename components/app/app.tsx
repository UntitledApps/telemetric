"use client";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

import { Activity, Project, Revenue, SelectedNavItem, User } from "@/types";

import { Navigation } from "./navigation/navbar";

import { createClient } from "@/utils/supabase/client";
import { Settings } from "lucide-react";
import Metrics from "./metrics/metrics";
import { Header } from "./navigation/header";
import DataExplorer from "./navigation/navitems/data_explorer";
import DataImportExport from "./navigation/navitems/import_export_data";
import Projects from "./navigation/navitems/projects";
import Setup from "./navigation/navitems/setup";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const [selectedNavItem, setSelectedNavItem] = useState<SelectedNavItem>(
    SelectedNavItem.METRICS
  );
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
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
      setLoading(true);
      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();
        if (authError) throw authError;
        if (!user) throw new Error("Unauthorized access");

        const { data: customerData, error: customerError } = await supabase
          .from("customers")
          .select("projects")
          .eq("id", user.id)
          .single();

        if (customerError) throw customerError;
        if (customerData && customerData.projects) {
          const { data: projectsData, error: projectsError } = await supabase
            .from("projects")
            .select("*")
            .in("id", customerData.projects);

          if (projectsError) throw projectsError;
          setProjects(projectsData || []);

          const projectIds = projectsData?.map((project) => project.id) || [];
          if (projectIds.length > 0) {
            const { data: activitiesData, error: activitiesError } =
              await supabase
                .from("activities")
                .select("id, user_id, timestamp, project_id")
                .in("project_id", projectIds);

            if (activitiesError) throw activitiesError;

            const activityIds =
              activitiesData?.map((activity: Activity) => activity.id) || [];
            setActivitiesIds(activityIds);

            const userIds =
              activitiesData?.map((activity: Activity) => activity.user_id) ||
              [];
            if (userIds.length > 0) {
              const { data: usersData, error: usersError } = await supabase
                .from("users")
                .select("id, os, browser, location")
                .in("id", userIds);

              if (usersError) throw usersError;

              const usersMap =
                usersData?.reduce((acc: { [id: string]: User }, user: User) => {
                  acc[user.id] = user;
                  return acc;
                }, {}) || {};

              const activitiesMap =
                activitiesData?.reduce(
                  (
                    acc: {
                      [timestamp: string]: {
                        os: string;
                        browser: string;
                        location: {
                          city?: string;
                          region?: string;
                          country?: string;
                        };
                      };
                    },
                    activity: Activity
                  ) => {
                    const user = usersMap[activity.user_id];
                    if (user) {
                      acc[activity.timestamp] = {
                        os: user.os!,
                        browser: user.browser!,
                        location: user.location!,
                      };
                    }
                    return acc;
                  },
                  {}
                ) || {};

              setInitialActivitiesMap(activitiesMap);
              setCurrentActivitiesMap(
                filterActivitiesByDateRange(activitiesMap, dateRange)
              );
            }

            // Fetch revenue data
            const { data: revenueData, error: revenueError } = await supabase
              .from("revenue")
              .select("id, user_id, timestamp, project_id, total")
              .in("project_id", projectIds);

            if (revenueError) throw revenueError;
            setRevenueData(revenueData || []);
          }
        }
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectsAndActivities();
  }, [supabase]);

  useEffect(() => {
    setCurrentActivitiesMap(
      filterActivitiesByDateRange(initialActivitiesMap, dateRange)
    );
  }, [dateRange, initialActivitiesMap]);

  const filterActivitiesByDateRange = (
    activitiesMap: { [timestamp: string]: { os: string; browser: string } },
    range: DateRange | undefined
  ) => {
    console.log("initialActivitiesMap", activitiesMap);
    if (!range || !range.from || !range.to) return activitiesMap;

    const { from, to } = range;

    // Convert range boundaries to dates with time set to 00:00:00 for start and 23:59:59 for end
    const startDate = new Date(from);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(to);
    endDate.setHours(23, 59, 59, 999);

    return Object.fromEntries(
      Object.entries(activitiesMap).filter(([timestamp]) => {
        const date = new Date(timestamp);
        return date >= startDate && date <= endDate;
      })
    );
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
  };

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
            dateRange={dateRange}
            activities={currentActivitiesMap}
          />
        );
      case SelectedNavItem.DATA_EXPLORER:
        return <DataExplorer />;
      case SelectedNavItem.SETUP:
        return <Setup />;
      case SelectedNavItem.SETTINGS:
        return <Settings />;
      case SelectedNavItem.IMPORT_EXPORT_DATA:
        return <DataImportExport />;
      case SelectedNavItem.PROFILE:
        return <div>Profile</div>;
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
    <div className="sticky top-0 grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Navigation
        selectedNavItem={selectedNavItem}
        handleNavItemClick={handleNavItemClick}
        handleProjectChange={handleProjectChange}
        projects={projects}
        selectedProject={selectedProject}
      />
      <div className="flex flex-col">
        <Header
          dateRange={dateRange}
          handleEnvironmentChange={setEnvironment}
          handleDateRangeChange={handleDateRangeChange}
          selectedProject={selectedProject}
        />
        <main className="flex-1 overflow-auto">{renderContent()}</main>
      </div>
    </div>
  );
}
