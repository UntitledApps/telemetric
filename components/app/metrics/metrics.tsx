import { Activity, Project, Revenue, Event, User } from "@/types";
import { motion } from "framer-motion";
import React, { useState } from "react";

import BrowsersCard from "./browsers";
import UserChart from "./charts/userschart";
import OperatingSystemCard from "./operatingsystems";
import Tabs from "./tabs";
import LocationsCard from "./location/locationscard";

interface MetricsProps {
  selectedProjectIndex: number;
  projects: Project[];
}

const Metrics: React.FC<MetricsProps> = ({
  selectedProjectIndex,
  projects,
}) => {
  const [uniqueActivitiesArray, setUniqueActivitiesArray] = useState<
    Activity[]
  >([]);
  const [currentUserData, setCurrentUserData] = useState<User[]>([]); // Change to User[]
  const [revenueData, setRevenueData] = useState<Revenue[]>([]);
  const [revenueTotal, setRevenueTotal] = useState<number>(0);
  const [eventsData, setEventsData] = useState<Event[]>([]);

  React.useEffect(() => {
    if (projects[selectedProjectIndex]) {
      const uniqueUserSet = new Set();
      projects[selectedProjectIndex].activities.forEach((activity) => {
        if (activity.initial) {
          uniqueUserSet.add(activity);
        }
      });
      setUniqueActivitiesArray(Array.from(uniqueUserSet) as Activity[]);
      setRevenueData(projects[selectedProjectIndex].revenue);
      setEventsData(projects[selectedProjectIndex].events);
      setRevenueTotal(
        projects[selectedProjectIndex].revenue.reduce(
          (total, revenue) => total + parseFloat(revenue.total),
          0
        )
      );
      setCurrentUserData(
        uniqueActivitiesArray.map((activity) => {
          return {
            browser: activity.browser,
            os: activity.os,
            location: activity.location,
            version: activity.version,
          };
        })
      );
    }
  }, [projects, selectedProjectIndex]);
  const tabs = [
    {
      label: "Unique Visitors",
      content: (
        <UserChart activities={projects[selectedProjectIndex].activities} />
      ),
      count: uniqueActivitiesArray.length.toString(),
    },
    {
      label: "Revenue",
      content: <div>Revenue data goes here.</div>,
      count: revenueTotal + "€",
    },
    {
      label: "Events",
      content: <div>Referrer data goes here.</div>,
      count: eventsData.length.toString(),
    },
  ];

  const onSelectedTabChanged = (index: number) => {
    if (index === 0) {
      setCurrentUserData(
        uniqueActivitiesArray.map((activity) => {
          return {
            browser: activity.browser,
            os: activity.os,
            location: activity.location,
            version: activity.version,
          };
        })
      );
    }
    if (index === 1) {
      setCurrentUserData(
        projects[selectedProjectIndex].revenue.map((revenue) => {
          return {
            browser: revenue.browser,
            os: revenue.os,
            location: revenue.location,
            version: revenue.version,
          };
        })
      );
    }
    if (index === 2) {
      setCurrentUserData(
        projects[selectedProjectIndex].events.map((event) => {
          return {
            browser: event.browser,
            os: event.os,
            location: event.location,
            version: event.version,
          };
        })
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }} // Adjust the duration as needed
    >
      <div
        style={{
          padding: "10px",

          display: "flex",
          gap: "10px",
          flexDirection: "row",
        }} // Add margin or adjust styles as needed
      >
        <Tabs tabs={tabs} onSelectedTabChanged={onSelectedTabChanged} />

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexDirection: "column",
          }}
        >
          <OperatingSystemCard activities={currentUserData} />
          {projects[selectedProjectIndex].type === "website" && (
            <BrowsersCard activities={currentUserData} />
          )}
        </div>
      </div>
      <LocationsCard activities={currentUserData} />
    </motion.div>
  );
};

export default Metrics;
