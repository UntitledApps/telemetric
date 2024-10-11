import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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

  if (filteredActivities.length === 0) {
    return (
      <div
        style={{
          color: "var(--subtitle)",
          padding: "10px",
          fontSize: "12px",
          textAlign: "center",
          width: "100%",
        }}
      >
        No data. Yet.
      </div>
    );
  }

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
    // Function to format date

    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={completeData}
        margin={{ top: 20, right: 20, bottom: 0, left: -30 }}
      >
        <CartesianGrid
          strokeDasharray="0"
          stroke="var(--subtitle)"
          strokeOpacity={0.1}
          vertical={false}
          horizontal={true}
        />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "var(--unselected)", fontSize: 12 }}
          tickCount={Math.min(
            2,
            Math.max(...completeData.map((d) => d.users * 2))
          )}
          tickFormatter={(value) => {
            const date = new Date(value);
            return date.toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
            });
          }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{
            fill: "var(--unselected)",
            fontSize: 12,
            strokeWidth: 0,
            strokeOpacity: 0,
          }}
          tickCount={Math.min(5, Math.max(...completeData.map((d) => d.users)))}
        />
        <Tooltip
          labelFormatter={(value) => {
            const date = new Date(value);
            const today = new Date();
            const diffTime = Math.abs(today.getTime() - date.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return `${date.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            })} (${diffDays} ${diffDays === 1 ? "day" : "days"} ago)`;
          }}
          formatter={(value, name) => [`${value} users`]}
          contentStyle={{
            backgroundColor: "var(--on-dominant)",
            border: "0.01px solid var(--secondary)",
            borderRadius: "8px",
            color: "var(--secondary)",
          }}
          itemStyle={{ color: "var(--secondary)" }}
        />
        <Line
          type="monotone"
          dataKey="users"
          stroke="#0057FF"
          strokeWidth={2}
          dot={false} // Hide dots
          isAnimationActive={false} // Disable animation if needed
        />
        <defs>
          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0057FF" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#0057FF" stopOpacity={0.5} />
          </linearGradient>
        </defs>
        <Area
          animationDuration={300}
          type="linear"
          dataKey="users"
          strokeWidth={2}
          stroke="#0057FF"
          fill="url(#colorGradient)"
          isAnimationActive={true}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Chart;
