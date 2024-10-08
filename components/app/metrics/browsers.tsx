"use client";

import { Activity } from "@/types";
import React from "react";

interface BrowserUsage {
  browser: string;
  percentage: number;
  count: number; // Add count to the BrowserUsage interface
}

const BrowsersCard = ({ activities }: { activities: Activity[] }) => {
  const [browserUsage, setBrowserUsage] = React.useState<BrowserUsage[]>([]);

  React.useEffect(() => {
    const browserCounts: { [key: string]: number } = {};

    // Log the activities to check their structure
    console.log("Activities:", activities);

    activities.forEach((activity) => {
      const browser = activity.browser; // Access the browser from activities
      if (browser) {
        browserCounts[browser] = (browserCounts[browser] || 0) + 1;
      }
    });

    const totalActivities = activities.length; // Use activities.length directly
    const calculatedBrowserUsage = Object.entries(browserCounts).map(
      ([browser, count]) => ({
        browser,
        percentage: Number(((count / totalActivities) * 100).toFixed(1)),
        count, // Include the count
      })
    );

    // Sort by percentage in descending order
    const sortedBrowserUsage = calculatedBrowserUsage.sort(
      (a, b) => b.percentage - a.percentage
    );

    setBrowserUsage(sortedBrowserUsage);
  }, [activities]);

  return (
    <div
      style={{
        border: "1px solid var(--outline)",
        borderRadius: "10px",
        padding: "10px",
        display: "flex",
        alignItems: "start",
        minWidth: "300px",
        justifyContent: "start",

        backgroundColor: "var(--on-dominant)",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <p
        style={{
          fontSize: "14px",
          color: "var(--secondary)",
          fontWeight: "600",
        }}
      >
        Browsers
      </p>
      {browserUsage.map((browser) => (
        <div
          key={browser.browser}
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            background: `linear-gradient(to right, var(--dominant) ${browser.percentage}%, transparent ${browser.percentage}%)`,
            gap: "10px",
            padding: "5px",
            borderRadius: "8px",
          }}
        >
          <img
            src={`/images/browsers/${browser.browser.toLowerCase()}.png`}
            alt={`${browser.browser} logo`}
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
            {browser.browser}
          </p>
          <p
            style={{
              color: "var(--secondary)",
              fontWeight: "400",
              fontFamily: "Inter",
              marginLeft: "auto",
            }}
          >
            {browser.count} ({browser.percentage}%){" "}
            {/* Display count and percentage */}
          </p>
        </div>
      ))}
    </div>
  );
};

export default BrowsersCard;
