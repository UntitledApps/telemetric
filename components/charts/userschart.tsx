"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";

interface MainChartProps {
  data: { date: string; users: number }[];
}

const chartConfig = {
  users: {
    label: "Users",
    color: "#0057FF",
  },
} satisfies ChartConfig;

// Function to format dates in "20th Feb" style
const formatDate = (dateString: any) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });

  const ordinal = (n: any) => {
    const s = ["th", "st", "nd", "rd"],
      v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  return `${ordinal(day)} ${month}`;
};

export function MainChart({ data }: MainChartProps) {
  return (
    <Card style={{ height: "80vh" }}>
      <CardHeader>
        <CardTitle>Unique Users</CardTitle>
      </CardHeader>
      <CardContent className="p-0" style={{ height: "85%" }}>
        <ChartContainer config={chartConfig} style={{ height: "100%" }}>
          <AreaChart
            data={data}
            margin={{
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={formatDate}
            />
            <YAxis />
            <defs>
              <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0057FF" stopOpacity={1} />
                <stop offset="95%" stopColor="#0057FF" stopOpacity={0} />
              </linearGradient>
            </defs>
          
            <Area
              dataKey="users"
              type="linear"
              fill="url(#userGradient)"
              fillOpacity={1}
              stroke="#0057FF"
              dot={
                {
                  stroke: "#0057FF",
                 strokeWidth: 1.5,
                }
              }
              strokeWidth={1.5}
              animationDuration={0}
            />
            <ChartTooltip
              cursor={false}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const date = new Date(label);
                  const formattedDate = formatDate(date);
                  return (
                    <div
                      style={{
                        backgroundColor: "#fff",
                        padding: "10px",
                        border: "1px solid #ccc",
                      }}
                    >
                      <h4>{formattedDate}</h4>
                      <p>Users: {payload[0].value}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
