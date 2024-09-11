import { MainChart } from "@/components/charts/userschart";
import { User } from "@/types";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import Browsers from "./browsers";
import LocationCard from "./locations";
import UserWorldMap from "./map";
import OperatingSystemCard from "./operatingsystems";

interface Project {
  id: string;
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
  const [activities, setActivities] = useState<any[]>([]); // Adjust type as needed
  const [projectData, setProjectData] = useState<Project | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      if (selectedProject) {
        // Fetch project data based on environment
        const { data, error } = await supabase
          .from("projects")
          .select("id, metadata")
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

        // Fetch activity data for the selected project
        const { data: activityData, error: activityError } = await supabase
          .from("activities")
          .select("*")
          .eq("project_id", selectedProject.id);

        if (activityError) {
          console.error("Error fetching activities data:", activityError);
          return;
        }

        if (activityData) {
          setActivities(activityData);
        }
      }
    };

    fetchData();
  }, [selectedProject, environment, supabase]);

  if (!selectedProject) {
    return <div>Select a project to view metrics</div>;
  }

  // Process user activity data based on fetched activities
  const filteredData = activities
    .filter((activity) => {
      const activityDate = new Date(activity.date);
      return dateRange
        ? activityDate >= dateRange.from! &&
            (!dateRange.to || activityDate <= dateRange.to)
        : true;
    })
    .reduce((acc: { [date: string]: { users: string[] } }, activity) => {
      const date = activity.date.split("T")[0]; // Extract date from datetime string
      if (!acc[date]) {
        acc[date] = { users: [] };
      }
      acc[date].users.push(activity.user_id);
      return acc;
    }, {});

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

      <UserWorldMap userData={users} />
      <LocationCard userData={users} />
      <OperatingSystemCard userData={users} />
      <Browsers userData={users} />
    </div>
  );
};

export default Metrics;
