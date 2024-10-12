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
  selectedTimeRange: string;
}

const Chart: React.FC<ChartProps> = ({ activities, selectedTimeRange }) => {
  // Get start and end dates from the selected time range

  const [startDate, endDate] = React.useMemo(() => {
    const end = new Date();
    let start = new Date();
    const now = new Date();
    switch (selectedTimeRange) {
      case "today":
        start = new Date(now.setHours(0, 0, 0, 0));
        break;
      case "yesterday":
        start = new Date(now.setDate(now.getDate() - 1));
        start.setHours(0, 0, 0, 0);
        break;
      case "last72hours":
        start = new Date(now.setHours(now.getHours() - 72));
        break;
      case "last7days":
        start = new Date(now.setDate(now.getDate() - 7));
        break;
      case "last30days":
        start = new Date(now.setDate(now.getDate() - 30));
        break;
      case "last90days":
        start = new Date(now.setDate(now.getDate() - 90));
        break;
      case "lastYear":
        start = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      case "allTime":
        start = new Date(0); // Start from epoch
        break;
    }

    return [start, end];
  }, [selectedTimeRange]);
  const filteredActivities = activities.filter((activity) => {
    const activityDate = new Date(activity.timestamp);
    return activityDate >= startDate && activityDate <= endDate;
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

  // Create a complete date range for the selected time range
  const completeData: AggregatedData[] = [];
  for (
    let i = 0;
    i < (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
    i++
  ) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
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
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fill: "var(--unselected)", fontSize: 12 }}
        />
        <Tooltip
          content={({ payload, label }) => {
            if (payload && payload.length > 0) {
              const date = new Date(label);
              const formattedDate = date.toLocaleDateString("en-US", {
                weekday: "short",
                day: "numeric",
                month: "short",
              });
              const daysAgo = Math.floor(
                (new Date().getTime() - date.getTime()) / (1000 * 3600 * 24)
              );
              const daysAgoText =
                daysAgo === 0
                  ? "Today"
                  : daysAgo === 1
                  ? "Yesterday"
                  : `${daysAgo} days ago`;
              return (
                <div
                  style={{
                    backgroundColor: "var(--dominant)",
                    padding: "10px",
                    border: "1px solid var(--subtitle)",
                  }}
                >
                  <p style={{ color: "var(--subtitle)" }}>
                    {formattedDate} ({daysAgoText})
                  </p>
                  <p style={{ color: "var(--secondary)" }}>
                    Users: {payload[0].value}
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
        <Line
          type="monotone"
          dataKey="users"
          stroke="#0057FF"
          strokeWidth={2}
          dot={false}
        />
        <Area
          type="linear"
          dataKey="users"
          strokeWidth={2}
          stroke="#0057FF"
          fill="url(#colorGradient)"
        />
        <defs>
          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0057FF" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#0057FF" stopOpacity={0.5} />
          </linearGradient>
        </defs>
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Chart;
