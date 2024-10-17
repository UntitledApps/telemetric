import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

interface ReferrerUsage {
  referrer: string;
  percentage: number;
  count: number; // Add count to the ReferrerUsage interface
}

const ReferrersCard = ({ referrers }: { referrers: string[] }) => {
  const [referrerUsage, setReferrerUsage] = React.useState<ReferrerUsage[]>([]);

  React.useEffect(() => {
    const referrerCounts: { [key: string]: number } = {};

    // Count occurrences of each referrer
    referrers.forEach((referrer) => {
      referrerCounts[referrer] = (referrerCounts[referrer] || 0) + 1;
    });

    const totalReferrers = referrers.length; // Total number of referrers

    // Prepare the referrer usage data
    const calculatedReferrerUsage = Object.entries(referrerCounts).map(
      ([referrer, count]) => ({
        referrer: referrer === "" ? "Unknown" : referrer,
        percentage: Number(((count / totalReferrers) * 100).toFixed(1)),
        count, // Include the count
      })
    );

    // Sort by percentage in descending order
    const sortedReferrerUsage = calculatedReferrerUsage.sort(
      (a, b) => b.percentage - a.percentage
    );

    setReferrerUsage(sortedReferrerUsage);
  }, [referrers]);

  return (
    <div
      style={{
        border: "1px solid var(--outline)",
        borderRadius: "10px",
        overflow: "hidden",
        flex: 1,
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
          Referrers
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
      <div style={{ overflow: "auto", width: "100%" }}>
        {referrerUsage.length === 0 ? (
          <div
            style={{
              color: "var(--subtitle)",
              padding: "10px",
              fontSize: "12px",
              textAlign: "center",
        
            }}
          >
            No data. Yet.
          </div>
        ) : (
          referrerUsage.map((referrer) => (
            <motion.a
              key={referrer.referrer} // Add the key prop here
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: referrerUsage.indexOf(referrer) * 0.01 }}
              href={
                referrer.referrer !== "Unknown"
                  ? `${referrer.referrer}`
                  : undefined
              }
              target={referrer.referrer !== "Unknown" ? "_blank" : undefined}
              rel={
                referrer.referrer !== "Unknown"
                  ? "noopener noreferrer"
                  : undefined
              }
              style={{
                textDecoration: "none",
                width: "100%",
                cursor:
                  referrer.referrer !== "Unknown" ? "pointer" : "not-allowed",
              }}
            >
              <div
                key={referrer.referrer}
                style={{
                  display: "flex",
                  alignItems: "center",
                  maxWidth: "100%",
                  minWidth: "100%",
                  background: `linear-gradient(to right, var(--dominant) ${referrer.percentage}%, transparent ${referrer.percentage}%)`,
                  gap: "10px",
                  marginBottom:
                    referrerUsage.indexOf(referrer) === referrerUsage.length - 1
                      ? "0"
                      : "4px",
                  padding: "10px",
                  borderRadius: "0px",
                }}
              >
                <Image
                  src={`https://www.google.com/s2/favicons?domain=${referrer.referrer}&sz=256`}
                  alt={`${referrer.referrer} favicon`}
                  width={20}
                  height={20}
                />
                <p
                  style={{
                    color: "var(--secondary)",
                  }}
                >
                  {referrer.referrer}
                </p>

                <p
                  style={{
                    color: "var(--secondary)",
                    marginLeft: "auto",
                  }}
                >
                  {referrer.count} ({referrer.percentage}%){" "}
                  {/* Display count and percentage */}
                </p>
              </div>
            </motion.a>
          ))
        )}
      </div>
    </div>
  );
};

export default ReferrersCard;
