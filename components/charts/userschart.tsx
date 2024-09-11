import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import {
  endOfDay,
  format,
  isToday,
  isWithinInterval,
  startOfDay,
} from "date-fns";
import { DateRange } from "react-day-picker"; // Import DateRange
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

interface MainChartProps {
  data: Record<string, { os: string; browser: string }>;
  dateRange?: DateRange;
}

const chartConfig = {
  users: {
    label: "Users",
    color: "#0057FF",
  },
} satisfies ChartConfig;

const formatNumber = (num: number) => {
  return num.toLocaleString();
};

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

// Function to format hours in "HH:00" style
const formatHour = (dateString: any) => {
  const date = new Date(dateString);
  return `${date.getHours()}:00`;
};

// Function to transform activities map into chart data format
const transformActivitiesMap = (
  activitiesMap: Record<string, { os: string; browser: string }>,
  dateRange?: DateRange
) => {
  const { from, to } = dateRange || {};
  const today = new Date();
  const isTodayRange =
    from && to && isToday(new Date(from)) && isToday(new Date(to));

  const data = Object.entries(activitiesMap).reduce(
    (acc, [timestamp, value]) => {
      const activityDate = new Date(timestamp);
      const dateKey = isTodayRange
        ? formatHour(timestamp)
        : format(activityDate, "yyyy-MM-dd");

      if (
        dateRange &&
        (from || to) &&
        !isWithinInterval(activityDate, {
          start: from ? startOfDay(new Date(from)) : new Date(0),
          end: to ? endOfDay(new Date(to)) : new Date(),
        })
      ) {
        return acc;
      }

      const existing = acc.find((item) => item.date === dateKey);
      if (existing) {
        existing.users += 1;
      } else {
        acc.push({ date: dateKey, users: 1 });
      }

      return acc;
    },
    [] as { date: string; users: number }[]
  );

  return data;
};

export function MainChart({ data, dateRange }: MainChartProps) {
  const transformedData = transformActivitiesMap(data, dateRange);
  const totalUsers = transformedData.reduce(
    (total, entry) => total + entry.users,
    0
  );

  const isTodayRange =
    dateRange &&
    dateRange.from &&
    dateRange.to &&
    isToday(new Date(dateRange.from)) &&
    isToday(new Date(dateRange.to));

  return (
    <div
      className="border-r border-gray-200 overflow-hidden"
      style={{ height: "80vh" }}
    >
      <div className="p-2">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "start",
            justifyItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyItems: "center",
              padding: "16px",
            }}
          >
            <div className="text-lg font-bold">{formatNumber(totalUsers)}</div>
            <div className="text-sm text-gray-600">Unique Users</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyItems: "center",
              padding: "16px",
            }}
          >
            <div className="text-lg font-bold">{formatNumber(totalUsers)}</div>
            <div className="text-sm text-gray-600">Revenue</div>
          </div>
        </div>
        <div
          style={{
            height: "16px",
          }}
        ></div>

        <ChartContainer
          config={chartConfig}
          style={{
            maxHeight: "65vh",
          }}
        >
          <AreaChart
            data={transformedData}
            margin={{
              top: 0,
              left: -30,
              right: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(tick) => {
                if (isTodayRange) {
                  return formatHour(tick);
                }
                return formatDate(tick);
              }}
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
              strokeWidth={1.5}
              animationDuration={0}
            />
            <ChartTooltip
              cursor={false}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const date = new Date(label);
                  const formattedDate = isTodayRange
                    ? formatHour(date)
                    : formatDate(date);
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
      </div>
    </div>
  );
}
