import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countryNameMap } from "@/utils/countryDefs";
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
    { location: { city?: string; region?: string; country?: string } }
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
    <div className="border-gray-200 border-r">
      <div className="p-2">
        <div className="flex items-center justify-between mb-2">
          <div className="text-lg font-bold">Locations Overview</div>
          <Select
            onValueChange={setSelectedLocationType}
            defaultValue="country"
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Location Type</SelectLabel>
                <SelectItem value="country">Country</SelectItem>
                <SelectItem value="region">Region</SelectItem>
                <SelectItem value="city">City</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {selectedLocationType === "city" && (
          <>
            {locationUsage.map((location) => (
              <div
                key={location.city}
                className="relative flex items-center py-1 border-gray-200"
              >
                <div
                  className="absolute bg-blue-200 opacity-50"
                  style={{
                    width: `${location.percentage}%`,
                    zIndex: -1,
                    insetBlockEnd: 4,
                    insetBlockStart: 4,
                    borderRadius: "8px",
                  }}
                />
                <div className="flex items-center gap-2 w-full p-2">
                  <span className="flex-1 text-sm">{location.city}</span>
                  <span className="text-sm">{location.count} users</span>
                </div>
              </div>
            ))}
          </>
        )}
        {selectedLocationType === "region" && (
          <>
            {locationUsage.map((location) => (
              <div
                key={location.region}
                className="relative flex items-center py-1 border-gray-200"
              >
                <div
                  className="absolute bg-blue-200 opacity-50"
                  style={{
                    width: `${location.percentage}%`,
                    zIndex: -1,
                    insetBlockEnd: 4,
                    insetBlockStart: 4,
                    borderRadius: "8px",
                  }}
                />
                <div className="flex items-center gap-2 w-full p-2">
                  <span className="flex-1 text-sm">{location.region}</span>
                  <span className="text-sm">{location.count} users</span>
                </div>
              </div>
            ))}
          </>
        )}
        {selectedLocationType === "country" && (
          <>
            {locationUsage.map((location) => (
              <div
                key={location.country}
                className="relative flex items-center py-1 border-gray-200"
              >
                <div
                  className="absolute bg-blue-200 opacity-50"
                  style={{
                    width: `${location.percentage}%`,
                    zIndex: -1,
                    insetBlockEnd: 4,
                    insetBlockStart: 4,
                    borderRadius: "8px",
                  }}
                />
                <div className="flex items-center gap-2 w-full p-2">
                  <img
                    src={`/images/countries/${location.country}.svg`}
                    alt={location.country}
                    style={{ borderRadius: "6px" }}
                    className="w-5 h-5" // Adjust the width and height as needed
                  />
                  <span className="text-sm flex-1">
                    {countryNameMap[location.country!] || location.country}
                  </span>
                  <span className="text-sm">{location.count} users</span>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default LocationCard;
