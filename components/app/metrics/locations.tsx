import { useEffect, useState } from "react";

interface LocationUsage {
  city?: string;
  region?: string;
  country?: string;
  count: number;
  percentage?: number; // Added percentage field
}

interface LocationCardProps {
  activities: Record<
    string,
    { location?: { city?: string; region?: string; country?: string } }
  >;
}

const LocationCard = ({ activities }: LocationCardProps) => {
  const [locationUsage, setLocationUsage] = useState<LocationUsage[]>([]);
  const [selectedLocationType, setSelectedLocationType] =
    useState<string>("country");

  useEffect(() => {
    const cityCounts: { [key: string]: number } = {};
    const regionCounts: { [key: string]: number } = {};
    const countryCounts: { [key: string]: number } = {};

    Object.values(activities).forEach((activity) => {
      const location = activity.location;
      if (location) {
        const { city, region, country } = location;
        if (city) {
          cityCounts[city] = (cityCounts[city] || 0) + 1;
        }
        if (region) {
          regionCounts[region] = (regionCounts[region] || 0) + 1;
        }
        if (country) {
          countryCounts[country] = (countryCounts[country] || 0) + 1;
        }
      }
    });

    const totalActivities = Object.keys(activities).length;
    const calculatedLocationUsage = Object.entries(
      selectedLocationType === "city"
        ? cityCounts
        : selectedLocationType === "region"
        ? regionCounts
        : countryCounts
    ).map(([key, count]) => ({
      [selectedLocationType]: key,
      count,
      percentage: Number(((count / totalActivities) * 100).toFixed(1)), // Calculate percentage
    }));

    setLocationUsage(calculatedLocationUsage as LocationUsage[]);
  }, [activities, selectedLocationType]);

  return (
    <div className="border-gray-200 border-t">
      <div className="p-2">
        <div className="flex items-center justify-between mb-2">
          <div className="text-lg font-bold">Locations Overview</div>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
