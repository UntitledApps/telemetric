import { motion } from "framer-motion";
import React from "react";

interface VersionUsage {
  version: string;
  percentage: number;
  count: number; // Add count to the VersionUsage interface
}

const VersionsCard = ({ versions }: { versions: string[] }) => {
  const [versionUsage, setVersionUsage] = React.useState<VersionUsage[]>([]);

  React.useEffect(() => {
    const versionCounts: { [key: string]: number } = {};

    // Count occurrences of each version
    versions.forEach((version) => {
      versionCounts[version] = (versionCounts[version] || 0) + 1;
    });

    const totalVersions = versions.length; // Total number of versions

    // Prepare the version usage data
    const calculatedVersionUsage = Object.entries(versionCounts).map(
      ([version, count]) => ({
        version: version === "null" ? "Not Specified" : version,
        percentage: Number(((count / totalVersions) * 100).toFixed(1)),
        count, // Include the count
      })
    );

    // Sort by percentage in descending order
    const sortedVersionUsage = calculatedVersionUsage.sort(
      (a, b) => b.percentage - a.percentage
    );

    setVersionUsage(sortedVersionUsage);
  }, [versions]);

  return (
    <div
      style={{
        border: "1px solid var(--outline)",
        borderRadius: "10px",
        overflow: "hidden",
        display: "flex",
        alignItems: "start",
        flex: 1,
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
          Versions
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
      {versionUsage.length === 0 ? (
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
        versionUsage.map((version) => (
          <motion.div
            key={version.version} // Add the key prop here
            style={{
              display: "flex",
              alignItems: "center",
              maxWidth: "100%",
              minWidth: "100%",
              background: `linear-gradient(to right, var(--dominant) ${version.percentage}%, transparent ${version.percentage}%)`,
              gap: "10px",
              marginBottom:
                versionUsage.indexOf(version) === versionUsage.length - 1
                  ? "0"
                  : "4px",
              padding: "10px",
              borderRadius: "0px",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: versionUsage.indexOf(version) * 0.01 }}
          >
            <p
              style={{
                color: "var(--secondary)",
              }}
            >
              {version.version === "" ? "Unknown" : version.version}
            </p>
            <p
              style={{
                color: "var(--secondary)",
                marginLeft: "auto",
              }}
            >
              {version.count} ({version.percentage}%){" "}
              {/* Display count and percentage */}
            </p>
          </motion.div>
        ))
      )}
    </div>
  );
};

export default VersionsCard;
