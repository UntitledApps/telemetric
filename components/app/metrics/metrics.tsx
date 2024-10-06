import { Project } from "@/types";
import { motion } from "framer-motion";
import React from "react";

import Browsers from "./browsers";
import LocationCard from "./locations";
import UserWorldMap from "./map";
import OperatingSystemCard from "./operatingsystems";

interface MetricsProps {
  selectedProject: Project | null;
  environment: string;

  activities: Record<
    string,
    {
      os: string;
      browser: string;
      location?: { city?: string; region?: string; country?: string }; // Marked as optional
    }
  >;
  /*
  revenue: Record<
    string,
    {
      total: number;
      os: string;
      browser: string;
      location?: { city?: string; region?: string; country?: string }; // Marked as optional
    }
  >;
  */
}

const Metrics: React.FC<MetricsProps> = ({
  selectedProject,
  environment,

  activities,
}) => {
  if (!selectedProject) {
    return <div>Select a project to view metrics</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }} // Adjust the duration as needed
    >
      <div
        className="grid grid-cols-1 md:grid-cols-2 p-4"
        style={{ marginTop: "16px" }} // Add margin or adjust styles as needed
      >
        <OperatingSystemCard activities={activities} />

        {selectedProject.type === "web" && <Browsers activities={activities} />}
        <LocationCard activities={activities} />
        <UserWorldMap activities={activities} />
      </div>
    </motion.div>
  );
};

export default Metrics;
