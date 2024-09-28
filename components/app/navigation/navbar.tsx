// components/Navigation.tsx
"use client";
import { LineChart, MessageCircle } from "lucide-react";

import Button from "@/components/ui/button";
import { Navbar } from "@/components/ui/navbar";
import { Project, SelectedNavItem } from "@/types/";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import ProjectSelect from "./projectselect";

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
  const supabase = createClient();
  const [userEmail, setUserEmails] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const sections = [
    {
      header: "Metrics",
      items: [
        {
          icon: <LineChart size={16} />,
          text: "Metrics",
        },
        {
          icon: <LineChart size={16} />,
          text: "Events",
        },
      ],
    },
    {
      header: "Settings",
      items: [
        {
          icon: <LineChart size={16} />,
          text: "User Settings",
        },
        {
          icon: <LineChart size={16} />,
          text: "App Settings",
        },
      ],
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserEmails(user?.email ? user.email : "");
    };
    fetchData();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        maxHeight: "100vh",
        padding: "0px",
        flexDirection: "column",
        alignItems: "center",

        justifyContent: "start",
        borderRight: "1px solid #e0e0e0",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "54px",
          minHeight: "54px",
          borderBottom: "1px solid #e5e5e5",
        }}
      >

        <ProjectSelect
          projects={projects}
          selectedProject={selectedProject?.id || ""}
          onProjectChange={handleProjectChange}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "8px",
          width: "100%",

          height: "100%",
          maxHeight: "90%",
          gap: "8px",
        }}
      >
        <Navbar
          sections={sections}
          onDestinationSelected={(index) => {
            setSelectedIndex(index);
          }}
          selectedIndex={selectedIndex}
        />

        <div>
          <Button
            variant="outline"
            style={{
              justifyContent: "center",
              display: "flex",
              width: "100%",

              gap: "4px",
              alignItems: "center",
            }}
          >
            <MessageCircle className="mr-2 h-4 w-4" size={16} />
            Feedback
          </Button>
          <Button
            variant="ghost"
            style={{
              justifyContent: "center",
              display: "flex",
              width: "100%",

              gap: "4px",
              alignItems: "center",
            }}
          >
            Docs
          </Button>
          <Button
            variant="ghost"
            style={{
              justifyContent: "center",
              display: "flex",
              width: "100%",

              gap: "4px",
              alignItems: "center",
            }}
          >
            Help
          </Button>
        </div>
      </div>
    </div>
  );
}

