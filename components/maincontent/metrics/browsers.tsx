"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import React from "react";

interface BrowserUsage {
  browser: string;
  percentage: number;
}

// This should match how you fetch and structure user data in your app
interface UserData {
  id: string;
  metadata: {
    metadata: {
      browser?: string;
    };
  };
}

const Browsers = ({ userData }: { userData: UserData[] }) => {
  const [browserUsage, setBrowserUsage] = React.useState<BrowserUsage[]>([]);

  React.useEffect(() => {
    const browserCounts: { [key: string]: number } = {};

    userData.forEach((user) => {
      const { browser } = user.metadata.metadata; // Accessing nested metadata for browser
      if (browser) {
        browserCounts[browser] = (browserCounts[browser] || 0) + 1;
      }
    });

    const totalUsers = userData.length;
    const calculatedBrowserUsage = Object.entries(browserCounts).map(
      ([browser, count]) => ({
        browser,
        percentage: Number(((count / totalUsers) * 100).toFixed(1)),
      })
    );

    setBrowserUsage(calculatedBrowserUsage);
  }, [userData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Browsers</CardTitle>
      </CardHeader>
      {browserUsage.map((browser) => (
        <CardContent
          key={browser.browser}
          className="flex justify-between items-center"
        >
          <div className="flex items-center gap-2">
            <img
              src={`/images/browsers/${browser.browser.toLowerCase()}.png`} // Ensure correct image paths
              alt={`${browser.browser} logo`}
              className="w-6 h-6"
            />
            <CardDescription
              className="text-sm  "
              style={{ textTransform: "capitalize", color: "black" }}
            >
              {browser.browser}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
        
            <CardDescription
              className="text-sm 0 "
              style={{ textTransform: "capitalize", color: "black" }}
            >
              {browser.percentage}%
            </CardDescription>
          </div>
        </CardContent>
      ))}
    </Card>
  );
};

export default Browsers;
