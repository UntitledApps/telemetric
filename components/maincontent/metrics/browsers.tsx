"use client";

import React from "react";

interface BrowserUsage {
  browser: string;
  percentage: number;
}

interface BrowsersProps {
  activities: Record<string, { os: string; browser: string }>;
}

const Browsers = ({ activities }: BrowsersProps) => {
  const [browserUsage, setBrowserUsage] = React.useState<BrowserUsage[]>([]);

  React.useEffect(() => {
    const browserCounts: { [key: string]: number } = {};

    Object.values(activities).forEach((activity) => {
      const { browser } = activity; // Accessing browser from activities
      if (browser) {
        browserCounts[browser] = (browserCounts[browser] || 0) + 1;
      }
    });

    const totalActivities = Object.keys(activities).length;
    const calculatedBrowserUsage = Object.entries(browserCounts).map(
      ([browser, count]) => ({
        browser,
        percentage: Number(((count / totalActivities) * 100).toFixed(1)),
      })
    );

    // Sort by percentage in descending order
    const sortedBrowserUsage = calculatedBrowserUsage.sort(
      (a, b) => b.percentage - a.percentage
    );

    setBrowserUsage(sortedBrowserUsage);
  }, [activities]);

  return (
    <div className="border-t border-b border-gray-200 p-2">
      <div className="text-lg font-bold mb-1">Browsers</div>
      {browserUsage.map((browser) => (
        <div
          key={browser.browser}
          style={{ marginBottom: "-5px" }}
          className="relative flex items-center py-1 border-gray-200"
        >
          <div
            className="absolute bg-blue-200 opacity-50"
            style={{
              width: `${browser.percentage}%`,
              zIndex: -1,
              insetBlockEnd: 6,
              insetBlockStart: 6,
              borderRadius: "8px",
            }}
          />
          <div className="flex items-center gap-2 w-full p-2">
            <img
              src={`/images/browsers/${browser.browser.toLowerCase()}.png`} // Ensure correct image paths
              alt={`${browser.browser} logo`}
              className="w-5 h-5"
            />
            <div
              className="text-sm"
              style={{ textTransform: "capitalize", color: "black" }}
            >
              {browser.browser}
            </div>
          </div>
          <div
            className="text-sm"
            style={{
              textTransform: "capitalize",
              color: "black",
              paddingRight: "10px",
            }}
          >
            {browser.percentage}%
          </div>
        </div>
      ))}
    </div>
  );
};

export default Browsers;
