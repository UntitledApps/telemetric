import React from "react";

interface Activity {
  timestamp: string; // Assuming the timestamp is in string format
}

interface AggregatedData {
  name: string; // Date label (e.g., "2023-10-01")
  users: number; // Count of users for that day
}

interface UserChartProps {
  activities: Activity[];
}

const ProjectChart: React.FC<UserChartProps> = ({ activities }) => {
  // Transform activities into the format required by the chart
  const data = activities.map((activity) => ({
    name: new Date(activity.timestamp).toISOString().split("T")[0], // Get the date in YYYY-MM-DD format
    users: 1, // Each activity represents a unique user
  }));

  // Aggregate users by date
  const aggregatedData: AggregatedData[] = data.reduce(
    (acc: AggregatedData[], curr) => {
      const existingEntry = acc.find((item) => item.name === curr.name);
      if (existingEntry) {
        existingEntry.users += curr.users; // Increment user count
      } else {
        acc.push({ name: curr.name, users: curr.users }); // Push new entry
      }
      return acc;
    },
    []
  );

  // Sort the aggregated data by date
  aggregatedData.sort(
    (a, b) => new Date(a.name).getTime() - new Date(b.name).getTime()
  );

  return <div></div>;
};

export default ProjectChart;
