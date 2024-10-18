import { Activity, Event, Project, Revenue, User } from "@/types/index";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import BrowsersCard from "../browsers/browsers";
import EventsCard from "../events/events";

import LocationsCard from "../locations/locationscard";
import Tabs from "../metricstabs/metricstab";
import OperatingSystemCard from "../os/operatingsystems";
import ReferrersCard from "../referrer/referrers";
import VersionsCard from "../version/versions";
import "./metrics.css";
import { DataType } from "@/types/index";
interface MetricsProps {
  selectedProject: Project;
  projects: Project[];
  selectedTimeRange: string;
  loading: boolean;
}

const Metrics: React.FC<MetricsProps> = ({
  selectedProject,
  projects,
  selectedTimeRange,
  loading,
}) => {
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
  }, [selectedProject, currentSelectTabIndex]);

  const updateCurrentUserData = (tabIndex: number, project: Project) => {
    if (tabIndex === 0) {
      setCurrentUserData(
        uniqueActivitiesArray.map((activity) => ({
          browser: activity.browser,
          os: activity.os,
          location: activity.location,
          version: activity.version,
          referrer: activity.referrer,
        }))
      );
    } else if (tabIndex === 1) {
      console.log("revenueData", project.revenue);
      setCurrentUserData(
        project.revenue.map((revenue) => ({
          browser: revenue.browser,
          os: revenue.os,
          location: revenue.location,
          version: revenue.version,
          referrer: revenue.referrer,
        }))
      );
    } else if (tabIndex === 2) {
      console.log("eventsData", project.events);
      setCurrentUserData(
        project.events.map((event) => ({
          browser: event.browser,
          os: event.os,
          location: event.location,
          version: event.version,
          referrer: event.referrer,
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
      dataType: DataType.USERS,
    },
    {
      label: "Revenue",
      activities: revenueData,
      count: revenueTotal + "€",
      dataType: DataType.REVENUE,
    },
    {
      label: "Events",
      activities: eventsData,
      count: eventsData.length.toString(),
      dataType: DataType.EVENTS,
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
    <div className="flex justify-center items-center">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="metrics-container-wrapper"
      transition={{ duration: 0.5 }}
    >
      <div className="metrics-container">
        <Tabs
          loading={loading}
          tabs={tabs}
          onSelectedTabChanged={handleTabChange}
          selectedTimeRange={selectedTimeRange}
        />

        {currentSelectTabIndex === 2 && (
          <div className="metrics-container-item">
            <EventsCard
              events={eventsData.map((event) => event.name)}
              users={uniqueActivitiesArray.map((activity) => activity.id)}
            />
          </div>
        )}

        <div className="metrics-container-item">
          <OperatingSystemCard activities={osData} />
          {selectedProject.type === "website" && (
            <BrowsersCard activities={browserData} />
          )}
        </div>
        <div style={{ width: "fill", maxWidth: "100%" }}>
          <LocationsCard locationsPassed={locationData} />
        </div>

        <div className="metrics-container-item-2">
          {selectedProject.type === "website" && (
            <>
              <ReferrersCard referrers={referrerData} />
            </>
          )}
          <VersionsCard versions={versionData} />
        </div>
      </div>
    </motion.div>
    </div>
  );
};

export default Metrics;
