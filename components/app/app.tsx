"use client";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

import { Activity, Project, Revenue, SelectedNavItem, User } from "@/types";

import { createClient } from "@/utils/supabase/client";
import { Settings } from "lucide-react";
import Metrics from "./metrics/metrics";

import DataExplorer from "./navigation/navitems/data_explorer";
import DataImportExport from "./navigation/navitems/import_export_data";
import Projects from "./navigation/navitems/projects";
import Setup from "./navigation/navitems/setup";
import { Navbar } from "../ui/navbar/navbar";

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
    const fetchProjectsAndActivities = async () => {};

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
        flexDirection: "row",
        height: "100%",
        maxHeight: "100vh",
      }}
    >
      <Navbar
        selectedNavItem={selectedNavItem}
        handleNavItemClick={handleNavItemClick}
        handleProjectChange={handleProjectChange}
        projects={projects}
        selectedProject={selectedProject}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          alignItems: "start",
          justifyContent: "start",
        }}
      >
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
