import { Activity } from "@/types";
import { useEffect, useState } from "react";

interface OSUsage {
  os: string;
  percentage: number;
  count: number; // Add count to the OSUsage interface
}

const OperatingSystemCard = ({ activities }: { activities: Activity[] }) => {
  const [osUsage, setOsUsage] = useState<OSUsage[]>([]);

  useEffect(() => {
    const osCounts: { [key: string]: number } = {};

    // Log the activities to check their structure
    console.log("Activities:", activities);

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
        padding: "10px",
        display: "flex",
        alignItems: "start",
        justifyContent: "center",
        width: "100%",
        backgroundColor: "var(--on-dominant)",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      <p
        style={{
          fontSize: "14px",
          color: "var(--secondary)",
          fontWeight: "600",
        }}
      >
        Operating Systems
      </p>
      {osUsage.map((os) => (
        <div
          key={os.os}
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            gap: "10px",
          }}
        >
          <img
            src={`/images/os/${os.os.toLowerCase().replace(/\s+/g, "")}.png`}
            alt={`${os.os} logo`}
            style={{ width: "20px", height: "20px" }}
          />

          <p
            style={{
              textTransform: "capitalize",
              color: "var(--secondary)",
              fontWeight: "400",
              fontFamily: "Inter",
            }}
          >
            {os.os}
          </p>
          <p
            style={{
              color: "var(--secondary)",
              fontWeight: "400",
              fontFamily: "Inter",
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
