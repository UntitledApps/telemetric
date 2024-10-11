import { Activity, Event, Project, Revenue, User } from "@/types";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import BrowsersCard from "./browsers";
import LocationsCard from "./location/locationscard";
import "./metrics.css";
import Tabs from "./metricstab";
import OperatingSystemCard from "./operatingsystems";
import ReferrersCard from "./referrer/referrers";
import VersionsCard from "./version/versions";

interface MetricsProps {
  selectedProject: Project;
  projects: Project[];
}

const Metrics: React.FC<MetricsProps> = ({ selectedProject, projects }) => {
  const [uniqueActivitiesArray, setUniqueActivitiesArray] = useState<
    Activity[]
  >([]);
  const [currentUserData, setCurrentUserData] = useState<User[]>([]);
  const [revenueData, setRevenueData] = useState<Revenue[]>([]);
  const [revenueTotal, setRevenueTotal] = useState<number>(0);
  const [eventsData, setEventsData] = useState<Event[]>([]);
  const [currentSelectTabIndex, setCurrentSelectTabIndex] = useState<number>(0);

  useEffect(() => {
    if (selectedProject) {
      const uniqueUserSet = new Set();
      selectedProject.activities.forEach((activity) => {
        if (activity.initial) {
          uniqueUserSet.add(activity);
        }
      });
      setUniqueActivitiesArray(Array.from(uniqueUserSet) as Activity[]);

      setRevenueData(selectedProject.revenue);
      setEventsData(selectedProject.events);
      setRevenueTotal(
        selectedProject.revenue.reduce(
          (total, revenue) => total + parseFloat(revenue.total),
          0
        )
      );
      updateCurrentUserData(currentSelectTabIndex, selectedProject);
    }
  }, [selectedProject]); // Update when selectedProject changes

  useEffect(() => {
    if (selectedProject) {
      updateCurrentUserData(currentSelectTabIndex, selectedProject);
    }
  }, [currentSelectTabIndex, selectedProject]); // Update when tab index or selected project changes

  const updateCurrentUserData = (tabIndex: number, project: Project) => {
    if (tabIndex === 0) {
      setCurrentUserData(
        uniqueActivitiesArray.map((activity) => ({
          browser: activity.browser,
          os: activity.os,
          location: activity.location,
          version: activity.version,
        }))
      );
    } else if (tabIndex === 1) {
      setCurrentUserData(
        project.revenue.map((revenue) => ({
          browser: revenue.browser,
          os: revenue.os,
          location: revenue.location,
          version: revenue.version,
        }))
      );
    } else if (tabIndex === 2) {
      setCurrentUserData(
        project.events.map((event) => ({
          browser: event.browser,
          os: event.os,
          location: event.location,
          version: event.version,
        }))
      );
    }
  };

  const handleTabChange = (index: number) => {
    setCurrentSelectTabIndex(index);
  };
  const tabs = [
    {
      label: "Unique Visitors",
      activities: uniqueActivitiesArray,
      count: uniqueActivitiesArray.length.toString(),
    },
    {
      label: "Revenue",
      activities: uniqueActivitiesArray,
      count: revenueTotal + "€",
    },
    {
      label: "Events",
      activities: uniqueActivitiesArray,
      count: eventsData.length.toString(),
    },
  ];

  const osData = tabs[currentSelectTabIndex].activities.map(
    (activity) => activity.os
  );
  const browserData = tabs[currentSelectTabIndex].activities.map(
    (activity) => activity.browser
  );
  const locationData = tabs[currentSelectTabIndex].activities.map(
    (activity) => activity.location
  );
  const versionData = tabs[currentSelectTabIndex].activities.map(
    (activity) => activity.version
  );
  const referrerData = tabs[currentSelectTabIndex].activities.map(
    (activity) => activity.referrer
  );

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
          flexDirection: "column",
        }}
      >
        <div className="metrics-container">
          <Tabs tabs={tabs} onSelectedTabChanged={handleTabChange} />

          <div className="metrics-container-item">
            <OperatingSystemCard activities={osData} />
            {selectedProject.type === "website" && (
              <BrowsersCard activities={browserData} />
            )}
          </div>
        </div>
        <div className="metrics-container-item-2">
          <LocationsCard locationsPassed={locationData} />
          {selectedProject.type === "website" && (
            <>
              <ReferrersCard referrers={referrerData} />
            </>
          )}
        </div>
        <div className="metrics-container-item-2">
          <VersionsCard versions={versionData} />
        </div>
      </div>
    </motion.div>
  );
};

export default Metrics;
