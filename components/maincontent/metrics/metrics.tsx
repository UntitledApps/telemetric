import { MainChart } from "@/components/charts/userschart";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import Browsers from "./browsers";
import LocationCard from "./locations";
import UserWorldMap from "./map";
import OperatingSystemCard from "./operatingsystems";
import { User } from "@/types";

interface Project {
  id: string;
  users: {
    [key: string]: {
      user_activity: {
        [timestamp: string]: string;
      };
    };
  };
  metadata: {
    name: string;
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
  dateRange?: DateRange;
}

const Metrics: React.FC<MetricsProps> = ({
  selectedProject,
  environment,
  dateRange,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [projectData, setProjectData] = useState<Project | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      if (selectedProject) {
        // Fetch project data based on environment
        const { data, error } = await supabase
          .from("projects")
          .select("id, users, metadata")
          .eq("id", selectedProject.id)
          .single();

        if (error) {
          console.error("Error fetching project data:", error);
          return;
        }

        // Ensure data conforms to Project type
        if (data) {
          setProjectData(data as Project);
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
              metadata: user.metadata, // Adjust this if needed
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

  // Filter user activity data based on selected date range
  const userActivityData = projectData?.users || {};
  const filteredData = Object.keys(userActivityData).flatMap((date) => {
    const activities = userActivityData[date]?.user_activity || {};
    const userCounts = Object.values(activities).reduce((countMap, userId) => {
      countMap[userId] = (countMap[userId] || 0) + 1;
      return countMap;
    }, {} as { [userId: string]: number });

    // Check if date is within the selected date range
    const isDateInRange = dateRange
      ? new Date(date) >= dateRange.from! &&
        (!dateRange.to || new Date(date) <= dateRange.to)
      : true;

    return isDateInRange
      ? {
          date,
          users: Object.keys(userCounts).length, // Number of unique users
        }
      : [];
  });

  // Extract location data from users
  const locations: Location[] = users
    .map((user) => {
      const location = user.metadata.location;
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
        city: location.city || "",
      };
    })
    .filter((loc): loc is Location => loc !== null);

  return (
    <div>
      <MainChart data={filteredData} />
      <UserWorldMap userData={users} />
      <LocationCard userData={users} />
      <OperatingSystemCard userData={users} />
      <Browsers userData={users} />
    </div>
  );
};

export default Metrics;
