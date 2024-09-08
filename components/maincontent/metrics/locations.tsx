// components/LocationCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface LocationUsage {
  city: string;
  count: number;
}

interface User {
  id: string;
  metadata: {
    metadata: {
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
      // other properties
    };
  };
}

const LocationCard = ({ userData }: { userData: User[] }) => {
  const [locationUsage, setLocationUsage] = useState<LocationUsage[]>([]);

  useEffect(() => {
    const cityCounts: { [key: string]: number } = {};

    userData.forEach((user) => {
      const city = user.metadata.metadata.location?.city; // Access the nested metadata for city
      if (city) {
        cityCounts[city] = (cityCounts[city] || 0) + 1;
      }
    });

    const calculatedLocationUsage = Object.entries(cityCounts).map(
      ([city, count]) => ({
        city,
        count,
      })
    );

    setLocationUsage(calculatedLocationUsage);
  }, [userData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Locations Overview</CardTitle>
      </CardHeader>
      {locationUsage.map((location) => (
        <CardContent
          key={location.city}
          className="relative flex items-center gap-4"
        >
          <div className="flex items-center gap-4 w-full">
            <span className="flex-1">{location.city}</span>
            <span className="font-medium">{location.count} users</span>
          </div>
        </CardContent>
      ))}
    </Card>
  );
};

export default LocationCard;
