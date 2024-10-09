import { Activity, User } from "@/types";
import React from "react";

interface BrowserUsage {
  browser: string;
  percentage: number;
  count: number; // Add count to the BrowserUsage interface
}

const BrowsersCard = ({ activities }: { activities: User[] }) => {
  const [browserUsage, setBrowserUsage] = React.useState<BrowserUsage[]>([]);

  React.useEffect(() => {
    const browserCounts: { [key: string]: number } = {};

  
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
          Browsers
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
      {browserUsage.map((browser) => (
        <div
          key={browser.browser}
          style={{
            display: "flex",
            alignItems: "center",
            maxWidth: "100%",
            minWidth: "100%",
            background: `linear-gradient(to right, var(--dominant) ${browser.percentage}%, transparent ${browser.percentage}%)`,
            gap: "10px",
            marginBottom: "4px",
            padding: "10px",
            borderRadius: "0px",
          }}
        >
          <img
            src={`/images/browsers/${browser.browser.toLowerCase()}.png`}
            alt={`${browser.browser} logo`}
            style={{ width: "20px", height: "20px" }}
          />

          <p
            style={{
              color: "var(--secondary)",
            }}
          >
            {browser.browser}
          </p>
          <p
            style={{
              color: "var(--secondary)",
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
