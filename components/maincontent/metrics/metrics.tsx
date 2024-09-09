import { MainChart } from "@/components/charts/userschart";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";
import Browsers from "./browsers";
import LocationCard from "./locations";
import UserWorldMap from "./map";
import OperatingSystemCard from "./operatingsystems";

interface Project {
  id: string;
  data: {
    [key: string]: {
      users: string[];
    };
  };
  metadata: {
    name: string;
  };
}

interface User {
  id: string;
  metadata: {
    metadata: {
      os?: string;
      visits?: number;
      browser?: string;
      lastSeen?: string;
      location?: {
        ip: string;
        loc: string; // "lat,lng"
        org: string;
        city: string;
        postal: string;
        region: string;
        country: string;
        hostname: string;
        timezone: string;
      };
      firstSeen?: string;
    };
  };
}

interface Location {
  lat: number;
  lng: number;
  city: string;
}

interface MetricsProps {
  selectedProject: Project | null;
  environment: string;
}

type ProjectData = {
  data: Record<string, { users: string[] }>;
};

type DebugProjectData = {
  debugData: Record<string, { users: string[] }>;
};

// Type guard function to check if projectData is of type DebugProjectData
const isDebugProjectData = (data: any): data is DebugProjectData => {
  return "debugData" in data;
};

const Metrics: React.FC<MetricsProps> = ({ selectedProject, environment }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [projectData, setProjectData] = useState<
    ProjectData | DebugProjectData | null
  >(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      if (selectedProject) {
        // Fetch project data based on environment
        const { data, error } = await supabase
          .from("projects")
          .select(environment === "Debug/Development" ? "debugData" : "data")
          .eq("id", selectedProject.id)
          .single();

        if (error) {
          console.error("Error fetching project data:", error);
          return;
        }

        if (data) {
          setProjectData(data);
        }

        // Fetch user data
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("*");

        if (userError) {
          console.error("Error fetching user data:", userError);
          return;
        }

        if (userData) {
          setUsers(
            userData.map((user) => ({
              id: user.id,
              metadata: user,
            }))
          );
        }
      }
    };

    fetchData();
  }, [selectedProject, environment, supabase]);

  if (!selectedProject) {
    return <div>Select a project to view metrics</div>;
  }

  // Safeguard for projectData type
  const selectedProjectData =
    projectData && isDebugProjectData(projectData)
      ? projectData.debugData
      : projectData?.data || {};

  // Transform the data to match MainChart's expected format
  const formattedData = Object.keys(selectedProjectData).map((date) => ({
    date,
    users: selectedProjectData[date]?.users.length || 0,
  }));

  // Extract location data from users
  const locations: Location[] = users
    .map((user) => {
      const location = user.metadata.metadata.location;
      if (!location || typeof location.loc !== "string") {
        return null;
      }

      const [lat, lng] = location.loc.split(",");
      if (isNaN(Number(lat)) || isNaN(Number(lng))) {
        return null;
      }

      return {
        lat: Number(lat),
        lng: Number(lng),
        city: location.city || "Unknown",
      };
    })
    .filter((loc): loc is Location => loc !== null); // Ensure null values are filtered out

  return (
    <div>
      <MainChart data={formattedData} />

      <div
        style={{
          height: "16px",
        }}
      ></div>
      <div className="grid grid-cols-1  sm:grid-cols-2">
        <OperatingSystemCard userData={users} />
        <Browsers userData={users} />
        <LocationCard userData={users} />
        <UserWorldMap userData={users} />
      </div>
    </div>
  );
};

export default Metrics;
