import { Project } from "@/types";
import { motion } from "framer-motion";
import React from "react";

import OperatingSystemCard from "./operatingsystems";
import Tabs from "./tabs";
import UserChart from "./charts/userschart";

interface MetricsProps {
  selectedProjectIndex: number;
  projects: Project[];
}

const Metrics: React.FC<MetricsProps> = ({
  selectedProjectIndex,
  projects,
}) => {
  const tabs = [
    {
      label: "Unique Visitors",
      content: (
        <UserChart activities={projects[selectedProjectIndex].activities} />
      ),
    },
    {
      label: "Revenue",
      content: <div>Revenue data goes here.</div>,
    },
    {
      label: "Events",
      content: <div>Referrer data goes here.</div>,
    },
  ];
  console.log(projects[selectedProjectIndex]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }} // Adjust the duration as needed
    >
      <div
        style={{
          padding: "8px",
          width: "60%",
          display: "flex",
          flexDirection: "column",
        }} // Add margin or adjust styles as needed
      >
        <div className="flex flex-col gap-4">
          <Tabs tabs={tabs} />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1rem",
          }}
        >
          <OperatingSystemCard
            activities={projects[selectedProjectIndex].activities}
          />
          <OperatingSystemCard
            activities={projects[selectedProjectIndex].activities}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Metrics;
