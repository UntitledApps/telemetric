// components/DashboardLayout.tsx
"use client";

import {
  FolderInput,
  Home,
  LineChart,
  Menu,
  Milestone,
  Package,
  Package2,
  Radio,
  Settings,
  ShoppingCart,
  Telescope,
  Users,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import DataExplorer from "../maincontent/data_explorer";
import DataImportExport from "../maincontent/import_export_data";
import LiveView from "../maincontent/liveview";
import Metrics from "../maincontent/metrics/metrics";
import Setup from "../maincontent/setup";
import { AccountWidget } from "./account/accountwidget";
import { Tabs, TabsList, TabsTrigger } from "./tabs";
import { TimeRangePicker } from "./utils/timerangepicker";

enum SelectedNavItem {
  METRICS,
  LIVEVIEW,
  DATA_EXPLORER,
  SETUP,
  SETTINGS,
  IMPORT_EXPORT_DATA,
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  //state to keep track of the selected nav item
  const [selectedNavItem, setSelectedNavItem] = useState<SelectedNavItem>(
    SelectedNavItem.METRICS
  );

  //function to handle the click event on the nav items
  function handleNavItemClick(selectedNavItem: SelectedNavItem) {
    setSelectedNavItem(selectedNavItem);
  }
  //Render content based on the selected nav item
  function renderContent() {
    switch (selectedNavItem) {
      case SelectedNavItem.METRICS:
        return <Metrics />;
      case SelectedNavItem.LIVEVIEW:
        return <LiveView />;
      case SelectedNavItem.DATA_EXPLORER:
        return <DataExplorer />;
      case SelectedNavItem.SETUP:
        return <Setup />;
      case SelectedNavItem.SETTINGS:
        return <Settings />;
      case SelectedNavItem.IMPORT_EXPORT_DATA:
        return <DataImportExport />;
    }
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Your Projects</SelectLabel>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
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
                onClick={() => handleNavItemClick(SelectedNavItem.LIVEVIEW)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  selectedNavItem === SelectedNavItem.LIVEVIEW
                    ? "bg-muted text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Radio className="h-4 w-4" />
                Liveview
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  6
                </Badge>
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
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
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
          <p
            className="text-sm font-medium text-muted-foreground"
            style={{ marginLeft: "auto" }}
          >
            Timerange:
          </p>
          <TimeRangePicker />
          <p
            className="text-sm font-medium text-muted-foreground"
            style={{ marginLeft: "auto" }}
          >
            Show Data from
          </p>
          <Tabs defaultValue="account" className="w-[200px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">Debug</TabsTrigger>
              <TabsTrigger value="password">Production</TabsTrigger>
            </TabsList>
          </Tabs>
          <AccountWidget />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
