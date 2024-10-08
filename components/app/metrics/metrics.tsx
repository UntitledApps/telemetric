import { Activity, Project } from "@/types";
import { motion } from "framer-motion";
import React, { useState } from "react";

import BrowsersCard from "./browsers";
import UserChart from "./charts/userschart";
import OperatingSystemCard from "./operatingsystems";
import Tabs from "./tabs";

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

  React.useEffect(() => {
    if (projects[selectedProjectIndex]) {
      const uniqueUserSet = new Set();
      projects[selectedProjectIndex].activities.forEach((activity) => {
        if (activity.initial) {
          uniqueUserSet.add(activity);
        }
      });
      setUniqueActivitiesArray(Array.from(uniqueUserSet) as Activity[]);
    }
  }, [projects, selectedProjectIndex]);
  const tabs = [
    {
      label: "Unique Visitors",
      content: (
        <UserChart activities={projects[selectedProjectIndex].activities} />
      ),
      count: uniqueActivitiesArray.length,
    },
    {
      label: "Revenue",
      content: <div>Revenue data goes here.</div>,
      count: 100,
    },
    {
      label: "Events",
      content: <div>Referrer data goes here.</div>,
      count: 100,
    },
  ];

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
        <Tabs tabs={tabs} />

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexDirection: "column",
          }}
        >
          <OperatingSystemCard activities={uniqueActivitiesArray} />
          <BrowsersCard activities={uniqueActivitiesArray} />
        </div>
      </div>
    </motion.div>
  );
};

export default Metrics;
