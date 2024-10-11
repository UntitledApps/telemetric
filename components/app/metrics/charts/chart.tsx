import React from "react";

import { axisClasses, chartsGridClasses } from "@mui/x-charts";
import { LineChart } from "@mui/x-charts/LineChart";

interface Activity {
  timestamp: string; // Assuming the timestamp is in timestampz format
}

interface AggregatedData {
  name: string; // Date label (e.g., "2023-10-01")
  users: number; // Count of users for that day
}

interface ChartProps {
  activities: Activity[];
}

const Chart: React.FC<ChartProps> = ({ activities }) => {
  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);

  // Filter activities to include only those from the last 30 days
  const filteredActivities = activities.filter((activity) => {
    const activityDate = new Date(activity.timestamp);
    return activityDate >= thirtyDaysAgo && activityDate <= today;
  });

  // Transform activities into the format required by the chart
  const data = filteredActivities.map((activity) => ({
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

  // Create a complete date range for the last 30 days
  const completeData: AggregatedData[] = [];
  for (let i = 0; i < 30; i++) {
    const date = new Date(thirtyDaysAgo);
    date.setDate(thirtyDaysAgo.getDate() + i);
    const dateString = date.toISOString().split("T")[0];
    const usersCount =
      aggregatedData.find((item) => item.name === dateString)?.users || 0;
    completeData.push({ name: dateString, users: usersCount });
  }

  // Sort the complete data by date
  completeData.sort(
    (a, b) => new Date(a.name).getTime() - new Date(b.name).getTime()
  );

  return (
    <LineChart
      skipAnimation={false}
      xAxis={[
        {
          data: completeData.map((item) => {
            const date = new Date(item.name);
            const dayOfWeek = date.toLocaleString("default", {
              weekday: "short",
            });
            const month = date.toLocaleString("default", { month: "short" });
            const day = date.getDate();

            const getOrdinalSuffix = (day: number): string => {
              if (day > 3 && day < 21) return "th";
              switch (day % 10) {
                case 1:
                  return "st";
                case 2:
                  return "nd";
                case 3:
                  return "rd";
                default:
                  return "th";
              }
            };

            return `${dayOfWeek}, ${day}${getOrdinalSuffix(day)} ${month}`;
          }),
          scaleType: "point",
          fill: "var(--subtitle)",
        },
      ]}
      yAxis={[{ data: completeData.map((item) => item.users) }]}
      margin={{ top: 20, right: 20, bottom: 30, left: 20 }}
      sx={{
        [`& .${axisClasses.left} .${axisClasses.label}`]: {
          transform: "translateX(-10px)",
          fontSize: "12px",
          fill: "var(--subtitle)",
        },
        [`& .${chartsGridClasses.line}`]: {
          strokeDasharray: "0",
          strokeWidth: 0.2,
          stroke: "var(--subtitle)",
        },
        [`& .${axisClasses.tick} .${axisClasses.label}`]: {
          fontSize: "12px",
          fill: "var(--subtitle)",
        },
        [`& .${axisClasses.line}`]: {
          stroke: "var(--subtitle)",
        },
      }}
      grid={{ horizontal: false, vertical: true }}
      series={[
        {
          data: completeData.map((item) => item.users),
          area: true,
          color: "#0057FF",
          curve: "linear",
        },
      ]}
    />
  );
};

export default Chart; // Updated export statement
