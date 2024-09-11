import { User } from "@/types";
import { useEffect, useState } from "react";

interface OSUsage {
  os: string;
  percentage: number;
}



const OperatingSystemCard = ({ userData }: { userData: User[] }) => {
  const [osUsage, setOsUsage] = useState<OSUsage[]>([]);

  useEffect(() => {
    const osCounts: { [key: string]: number } = {};

    userData.forEach((user) => {
      const os = user.metadata.os; // Access the nested metadata for OS
      if (os) {
        osCounts[os] = (osCounts[os] || 0) + 1;
      }
    });

    const totalUsers = userData.length;
    const calculatedOsUsage = Object.entries(osCounts).map(([os, count]) => ({
      os,
      percentage: Number(((count / totalUsers) * 100).toFixed(1)),
    }));

    // Sort by percentage in descending order
    const sortedOsUsage = calculatedOsUsage.sort(
      (a, b) => b.percentage - a.percentage
    );

    setOsUsage(sortedOsUsage);
  }, [userData]);

  return (
    <div className="border-t border-b border-gray-200 border-r">
      <div className="p-2">
        <div className="text-lg font-bold mb-1">Operating Systems</div>
        {osUsage.map((os) => (
          <div
            key={os.os}
            style={{ marginBottom: "-5px" }}
            className="relative flex items-center py-1 border-gray-200"
          >
            <div
              className="absolute bg-blue-200 opacity-50"
              style={{
                width: `${os.percentage}%`,
                zIndex: -1,
                insetBlockEnd: 6,
                insetBlockStart: 6,
                borderRadius: "8px",
              }}
            />
            <div className="flex items-center gap-2 w-full p-2">
              <img
                src={`/images/os/${os.os.toLowerCase()}.png`}
                alt={`${os.os} logo`}
                className="w-5 h-5"
              />
              <div
                className="text-sm"
                style={{ textTransform: "capitalize", color: "black" }}
              >
                {os.os}
              </div>
            </div>
            <div
              className="text-sm"
              style={{ textTransform: "capitalize", color: "black" }}
            >
              {os.percentage}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OperatingSystemCard;
