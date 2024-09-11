import { MainChart } from "@/components/charts/userschart";
import { motion } from "framer-motion";
import React from "react";
import { DateRange } from "react-day-picker";

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
  activities: Record<string, { os: string; browser: string }>; // Adjust type as needed
}

const Metrics: React.FC<MetricsProps> = ({
  selectedProject,
  environment,
  dateRange,
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
      <MainChart data={activities} dateRange={dateRange} />
    </motion.div>
  );
};

export default Metrics;
