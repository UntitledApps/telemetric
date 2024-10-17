import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

interface OSUsage {
  os: string;
  percentage: number;
  count: number; // Add count to the OSUsage interface
}

const OperatingSystemCard = ({ activities }: { activities: string[] }) => {
  const [osUsage, setOsUsage] = useState<OSUsage[]>([]);

  useEffect(() => {
    const osCounts: { [key: string]: number } = {};

    activities.forEach((activity) => {
      const os = activity; // Access the OS from activities
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
        width: "100%",
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
          width: "100%",
          maxHeight: "40px",
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
      <div style={{ width: "100%" }}>
        {osUsage.length === 0 ? (
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
        ) : (
          osUsage.map((os) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: osUsage.indexOf(os) * 0.1 }}
              key={os.os}
              style={{
                display: "flex",
                alignItems: "center",
                maxWidth: "100%",
                minWidth: "100%",
                background: `linear-gradient(to right, var(--dominant) ${os.percentage}%, transparent ${os.percentage}%)`,
                gap: "10px",
                marginBottom:
                  osUsage.indexOf(os) === osUsage.length - 1 ? "0" : "4px",
                padding: "10px",
                borderRadius: "0px",
              }}
            >
              <Image
                src={`/images/os/${os.os
                  .toLowerCase()
                  .replace(/\s+/g, "")}.png`}
                alt={`${os.os} logo`}
                width={20}
                height={20}
                style={{
                  filter:
                    os.os.toLowerCase() === "ios" &&
                    typeof window !== "undefined" &&
                    window.matchMedia &&
                    window.matchMedia("(prefers-color-scheme: dark)").matches
                      ? "invert(1)"
                      : "none",
                }}
              />

              <p
                style={{
                  color: "var(--secondary)",
                }}
              >
                {os.os === "ios"
                  ? "iOS"
                  : os.os.toLowerCase() === "mac os"
                  ? "macOS"
                  : os.os.charAt(0).toUpperCase() +
                    os.os.slice(1).toLowerCase()}
              </p>
              <p
                style={{
                  color: "var(--secondary)",

                  marginLeft: "auto",
                }}
              >
                {os.count} ({os.percentage}%){" "}
                {/* Display count and percentage */}
              </p>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default OperatingSystemCard;
