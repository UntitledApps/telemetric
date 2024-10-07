import { Project } from "@/types";
import { motion } from "framer-motion";
import React from "react";

import OperatingSystemCard from "./operatingsystems";

interface MetricsProps {
  selectedProjectIndex: number;
  projects: Project[];
}

const Metrics: React.FC<MetricsProps> = ({
  selectedProjectIndex,
  projects,
}) => {
  console.log(projects[selectedProjectIndex]);
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
        <OperatingSystemCard
          activities={projects[selectedProjectIndex].activities}
        />
      </div>
    </motion.div>
  );
};

export default Metrics;
