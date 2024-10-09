
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

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

const UserChart: React.FC<UserChartProps> = ({ activities }) => {
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

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={aggregatedData}>
        <CartesianGrid vertical={false} stroke="#e1e1e1" />{" "}
        {/* Only horizontal grid */}
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0057ff" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="users"
          stroke="#0057ff"
          fill="url(#gradient)"
        />
        <Line type="linear" dataKey="users" stroke="#0057ff" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default UserChart;
