import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

interface OSUsage {
  os: string;
  percentage: number;
}

interface User {
  id: string;
  metadata: {
    metadata: {
      os?: string;
      visits?: number;
      browser?: string;
      lastSeen?: string;
      location?: {
        ip: string;
        loc: string; // "lat,lng"
        org: string;
        city: string;
        postal: string;
        region: string;
        country: string;
        hostname: string;
        timezone: string;
      };
      firstSeen?: string;
    };
  };
}
const OperatingSystemCard = ({ userData }: { userData: User[] }) => {
  const [osUsage, setOsUsage] = useState<OSUsage[]>([]);

  useEffect(() => {
    const osCounts: { [key: string]: number } = {};

    userData.forEach((user) => {
      const os = user.metadata.metadata.os; // Access the nested metadata for OS
      if (os) {
        osCounts[os] = (osCounts[os] || 0) + 1;
      }
    });

    const totalUsers = userData.length;
    const calculatedOsUsage = Object.entries(osCounts).map(([os, count]) => ({
      os,
      percentage: Number(((count / totalUsers) * 100).toFixed(1)),
    }));

    setOsUsage(calculatedOsUsage);
  }, [userData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Operating Systems</CardTitle>
      </CardHeader>
      {osUsage.map((os) => (
        <CardContent
          key={os.os}
          className="relative flex items-center gap-4           justify-between"
        >
          <div className="flex items-center gap-4 w-full">
            <img
              src={`/images/os/${os.os.toLowerCase()}.png`}
              alt={`${os.os} logo`}
              className="w-6 h-6"
            />
            <CardDescription
              className="text-sm  "
              style={{ textTransform: "capitalize", color: "black" }}
            >
              {os.os}
            </CardDescription>
          </div>
          <CardDescription
            className="text-sm  "
            style={{ textTransform: "capitalize", color: "black" }}
          >
            {os.percentage}%
          </CardDescription>
        </CardContent>
      ))}
    </Card>
  );
};

export default OperatingSystemCard;
