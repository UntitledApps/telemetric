// components/DashboardLayout.tsx
"use client";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

import { Activity, Project, SelectedNavItem, User } from "@/types";
import { createClient } from "@/utils/supabase/client";
import { Header } from "./Header";
import DataExplorer from "./maincontent/data_explorer";
import DataImportExport from "./maincontent/import_export_data";
import Metrics from "./maincontent/metrics/metrics";
import Projects from "./maincontent/projects";
import Settings from "./maincontent/settings";
import Setup from "./maincontent/setup";
import { Navigation } from "./Navigation";

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
  const [loading, setLoading] = useState<boolean>(false); // Add loading statet
  const [activitiesIds, setActivitiesIds] = useState<string[]>([]);
  const [activitiesMap, setActivitiesMap] = useState<{
    [timestamp: string]: { os: string; browser: string };
  }>({});
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
                .select("id, user_id, timestamp, project_id") // Ensure project_id is selected
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
                .select("id, os, browser")
                .in("id", userIds);

              if (usersError) throw usersError;

              const usersMap =
                usersData?.reduce((acc: { [id: string]: User }, user: User) => {
                  acc[user.id] = user;
                  return acc;
                }, {}) || {};

              console.log(usersMap);
              const activitiesMap =
                activitiesData?.reduce(
                  (
                    acc: {
                      [timestamp: string]: { os: string; browser: string };
                    },
                    activity: Activity
                  ) => {
                    console.log(activity);
                    const user = usersMap[activity.user_id];
                    console.log(user);

                    if (user) {
                      acc[activity.timestamp] = {
                        os: user.os!,
                        browser: user.browser!,
                      };
                    }
                    console.log(acc);
                    return acc;
                  },
                  {}
                ) || {};

              setActivitiesMap(activitiesMap);
            }
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

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
  };

  const handleNavItemClick = (navItem: SelectedNavItem) => {
    setSelectedNavItem(navItem);
  };

  const handleProjectChange = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId) || null;
    setSelectedProject(project);
    // if (project) setSelectedNavItem(SelectedNavItem.METRICS);
  };

  function renderContent() {
    switch (selectedNavItem) {
      case SelectedNavItem.PROJECTS:
        return (
          <Projects
            onProjectSelect={handleProjectChange}
            projects={projects} // Pass projects data as a prop
          />
        );
      case SelectedNavItem.METRICS:
        return (
          <Metrics
            selectedProject={selectedProject}
            environment={environment}
            dateRange={dateRange}
            activities={activitiesMap}
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
    ); // Loading screen
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
          handleEnvironmentChange={setEnvironment}
          handleDateRangeChange={handleDateRangeChange}
          selectedProject={selectedProject}
        />
        <main className="flex-1 overflow-auto">{renderContent()}</main>
      </div>
    </div>
  );
}
