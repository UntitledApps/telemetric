// components/DashboardLayout.tsx
"use client";
import { motion } from "framer-motion";
import {
  FolderInput,
  Home,
  LineChart,
  Menu,
  Milestone,
  Package,
  Package2,
  Settings,
  ShoppingCart,
  Telescope,
  Users,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Project } from "@/types/";
import { createClient } from "@/utils/supabase/client";
import { AccountWidget } from "../components/account/accountwidget";
import DataExplorer from "./maincontent/data_explorer";
import DataImportExport from "./maincontent/import_export_data";
import Metrics from "./maincontent/metrics/metrics";
import Projects from "./maincontent/projects";
import Setup from "./maincontent/setup";
import ProjectSelect from "./navigation/projectselect";
import { TimeRangePicker } from "./utils/timerangepicker";

enum SelectedNavItem {
  PROJECTS,
  METRICS,
  REVENUE,
  LIVEVIEW,
  DATA_EXPLORER,
  SETUP,
  SETTINGS,
  IMPORT_EXPORT_DATA,
}

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

  useEffect(() => {
    const fetchProjects = async (dateRange: {
      startDate: string;
      endDate: string;
    }) => {
      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();


      
        if (authError) {
          throw authError;
        }

        if (!user) {
          throw new Error("Unauthorized access");
        }

        const { data: customerData, error: customerError } = await supabase
          .from("customers")
          .select("projects")
          .eq("id", user?.id)
          .single();

        if (customerError) {
          throw customerError;
        }

        const { data: projectsData, error: projectsError } = await supabase
          .from("projects")
          .select("*")
          .in("id", customerData.projects);

        if (projectsError) {
          throw projectsError;
        }

        // Convert dateRange to Date objects
        const startDate = new Date(dateRange.startDate);
        const endDate = new Date(dateRange.endDate);

        setProjects(
          projectsData.map((project: Project) => {
            return {
              ...project,
            };
          })
        );
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchProjects({
      startDate: dateRange?.from?.toISOString() || "",
      endDate: dateRange?.to?.toISOString() || "",
    });
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
    if (project) {
      setSelectedNavItem(SelectedNavItem.METRICS);
    }
  };
  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const fadeInTransition = { duration: 0.5 };

  function renderContent() {
    return (
      <div>
        {(() => {
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
        })()}
      </div>
    );
  }

  useEffect(() => {
    const mainElement = document.querySelector("main");
    if (mainElement) {
      mainElement.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedNavItem]);
  const handleEnvironmentChange = (value: string) => {
    setEnvironment(value);
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="sticky top-0  grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="sticky top-0  hidden border-r  bg-white md:block">
        <div className="sticky top-0  flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <ProjectSelect
              projects={projects}
              selectedProject={selectedProject?.id || ""}
              onProjectChange={handleProjectChange}
            />
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="#"
                onClick={() => handleNavItemClick(SelectedNavItem.PROJECTS)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  selectedNavItem === SelectedNavItem.PROJECTS
                    ? "bg-muted text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Package2 className="h-4 w-4" />
                Projects
              </Link>
              <div className="h-3"></div>
              <p className="text-muted-foreground text-xs font-medium px-3 py-2">
                Data
              </p>
              <Link
                href="#"
                onClick={() => handleNavItemClick(SelectedNavItem.METRICS)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  selectedNavItem === SelectedNavItem.METRICS
                    ? "bg-muted text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                <LineChart className="h-4 w-4" />
                Metrics
              </Link>

              <Link
                href="#"
                onClick={() =>
                  handleNavItemClick(SelectedNavItem.DATA_EXPLORER)
                }
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  selectedNavItem === SelectedNavItem.DATA_EXPLORER
                    ? "bg-muted text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Telescope className="h-4 w-4" />
                Data Explorer
              </Link>
              <Link
                href="#"
                onClick={() => handleNavItemClick(SelectedNavItem.SETUP)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  selectedNavItem === SelectedNavItem.SETUP
                    ? "bg-muted text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Milestone className="h-4 w-4" />
                Setup
              </Link>
              <Link
                href="#"
                onClick={() => handleNavItemClick(SelectedNavItem.SETTINGS)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  selectedNavItem === SelectedNavItem.SETTINGS
                    ? "bg-muted text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
              <Link
                href="#"
                onClick={() =>
                  handleNavItemClick(SelectedNavItem.IMPORT_EXPORT_DATA)
                }
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  selectedNavItem === SelectedNavItem.IMPORT_EXPORT_DATA
                    ? "bg-muted text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                <FolderInput className="h-4 w-4" />
                Import/Export Data
              </Link>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="sticky top-0  z-30 flex h-14 items-center gap-4 border-b bg-white px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                  </Badge>
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Products
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Users className="h-5 w-5" />
                  Customers
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Analytics
                </Link>
              </nav>
              <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our
                      support team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      Upgrade
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
          <div style={{ marginLeft: "auto" }}></div>
          {selectedProject && (
            <>
              <Select onValueChange={handleEnvironmentChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Show App Data" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Debug/Development">
                    Debug/Development
                  </SelectItem>
                  <SelectItem value="Production">Production</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={handleEnvironmentChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select environment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Debug/Development">
                    Debug/Development
                  </SelectItem>
                  <SelectItem value="Production">Production</SelectItem>
                </SelectContent>
              </Select>

              <TimeRangePicker onDateRangeChange={handleDateRangeChange} />
            </>
          )}
          <AccountWidget />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 ">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
