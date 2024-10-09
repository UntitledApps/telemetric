import { Activity, User } from "@/types";
import { useEffect, useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CircleHelp } from "lucide-react";

interface OSUsage {
  os: string;
  percentage: number;
  count: number; // Add count to the OSUsage interface
}

const OperatingSystemCard = ({ activities }: { activities: User[] }) => {
  const [osUsage, setOsUsage] = useState<OSUsage[]>([]);

  useEffect(() => {
    const osCounts: { [key: string]: number } = {};

    activities.forEach((activity) => {
      const os = activity.os; // Access the OS from activities
      if (os) {
        osCounts[os] = (osCounts[os] || 0) + 1;
      }
    });

    const totalActivities = activities.length; // Use activities.length directly
    const calculatedOsUsage = Object.entries(osCounts).map(([os, count]) => ({
      os,
      percentage: Number(((count / totalActivities) * 100).toFixed(1)),
      count, // Include the count
    }));

    // Sort by percentage in descending order
    const sortedOsUsage = calculatedOsUsage.sort(
      (a, b) => b.percentage - a.percentage
    );

    setOsUsage(sortedOsUsage);
  }, [activities]);

  return (
    <div
      style={{
        border: "1px solid var(--outline)",
        borderRadius: "10px",
        overflow: "hidden",

        display: "flex",
        alignItems: "start",

        minWidth: "500px",
        justifyContent: "start",
        backgroundColor: "var(--on-dominant)",
        flexDirection: "column",
        gap: "0px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "space-between",
          justifyContent: "space-between",
        }}
      >
        <h4
          style={{
            color: "var(--secondary)",
            padding: "10px",
          }}
        >
          Operating Systems
        </h4>
        <HoverCard>
          <HoverCardTrigger>
            <CircleHelp
              color="var(--subtitle)"
              style={{
                width: "15px",
                height: "15px",
              }}
            />
          </HoverCardTrigger>
          <HoverCardContent>
            <p>The operating system your users are using.</p>
          </HoverCardContent>
        </HoverCard>

        <p
          style={{
            color: "var(--subtitle)",
            padding: "10px",
          }}
        >
          Users & Percentage
        </p>
      </div>
      <div
        style={{
          height: "1px",
          width: "100%",
          borderBottom: "1px solid var(--outline)",
        }}
      ></div>
      {osUsage.map((os) => (
        <div
          key={os.os}
          style={{
            display: "flex",
            alignItems: "center",
            maxWidth: "100%",
            minWidth: "100%",
            background: `linear-gradient(to right, var(--dominant) ${os.percentage}%, transparent ${os.percentage}%)`,
            gap: "10px",
            marginBottom: "4px",
            padding: "10px",
            borderRadius: "0px",
          }}
        >
          <img
            src={`/images/os/${os.os.toLowerCase().replace(/\s+/g, "")}.png`}
            alt={`${os.os} logo`}
            style={{ width: "20px", height: "20px" }}
          />

          <p
            style={{
              color: "var(--secondary)",
            }}
          >
            {os.os}
          </p>
          <p
            style={{
              color: "var(--secondary)",

              marginLeft: "auto",
            }}
          >
            {os.count} ({os.percentage}%) {/* Display count and percentage */}
          </p>
        </div>
      ))}
    </div>
  );
};

export default OperatingSystemCard;
