// components/Navigation.tsx
"use client";
import {
  FolderInput,
  LineChart,
  Milestone,
  Package2,
  Settings,
  Telescope,
} from "lucide-react";
import Link from "next/link";

import { Project, SelectedNavItem } from "@/types/";
import ProjectSelect from "./navigation/projectselect";

interface NavigationProps {
  selectedNavItem: SelectedNavItem;
  handleNavItemClick: (navItem: SelectedNavItem) => void;
  handleProjectChange: (projectId: string) => void;
  projects: Project[];
  selectedProject: Project | null;
}

export function Navigation({
  selectedNavItem,
  handleNavItemClick,
  handleProjectChange,
  projects,
  selectedProject,
}: NavigationProps) {
  return (
    <div className="sticky top-0 hidden border-r bg-white md:block">
      <div className="sticky top-0 flex h-full max-h-screen flex-col gap-2">
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
              onClick={() => handleNavItemClick(SelectedNavItem.DATA_EXPLORER)}
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
      </div>
    </div>
  );
}
