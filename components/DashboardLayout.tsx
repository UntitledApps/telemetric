"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

import { Project, SelectedNavItem } from "@/types";
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
  const [loading, setLoading] = useState<boolean>(false); // Add loading state

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true); // Set loading to true when starting to fetch data
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

        const { data: projectsData, error: projectsError } = await supabase
          .from("projects")
          .select("*")
          .in("id", customerData.projects);
        if (projectsError) throw projectsError;

        setProjects(projectsData);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
        setLoadingProjects(false);
      }
    };

    fetchProjects();
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
    if (project) setSelectedNavItem(SelectedNavItem.METRICS);
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const fadeInTransition = { duration: 0.5 };

  function renderContent() {
    switch (selectedNavItem) {
      case SelectedNavItem.PROJECTS:
        return (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={fadeInTransition}
          >
            <Projects onProjectSelect={handleProjectChange} />
          </motion.div>
        );
      case SelectedNavItem.METRICS:
        return (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={fadeInTransition}
          >
            <Metrics
              selectedProject={selectedProject}
              environment={environment}
              dateRange={dateRange} // Pass dateRange if needed
            />
          </motion.div>
        );
      case SelectedNavItem.DATA_EXPLORER:
        return (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={fadeInTransition}
          >
            <DataExplorer />
          </motion.div>
        );
      case SelectedNavItem.SETUP:
        return (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={fadeInTransition}
          >
            <Setup />
          </motion.div>
        );
      case SelectedNavItem.SETTINGS:
        return (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={fadeInTransition}
          >
            <Settings />
          </motion.div>
        );
      case SelectedNavItem.IMPORT_EXPORT_DATA:
        return (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={fadeInTransition}
          >
            <DataImportExport />
          </motion.div>
        );
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
