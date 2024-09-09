// components/UserWorldMap.tsx
import { useEffect, useState } from "react";
import WorldMap from "react-svg-worldmap";

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

const UserWorldMap = ({ userData }: { userData: User[] }) => {
  const [mapData, setMapData] = useState<{ country: string; value: number }[]>(
    []
  );

  useEffect(() => {
    const countryCounts: { [key: string]: number } = {};

    userData.forEach((user) => {
      const location = user.metadata.metadata.location;
      if (location && location.country) {
        const country = location.country;
        countryCounts[country] = (countryCounts[country] || 0) + 1;
      }
    });

    const calculatedMapData = Object.entries(countryCounts).map(
      ([country, count]) => ({
        country: country.toLowerCase(), // Assuming the country codes are in lowercase as per WorldMap's requirement
        value: count,
      })
    );

    setMapData(calculatedMapData);
  }, [userData]);

  return (
    <div className="border-r border-gray-200 overflow-hidden">
      <div className="p-2">
        <div className="text-lg font-bold mb-2">Users Map</div>
        <div style={{ width: "100%", height: "300px" }}>
          <WorldMap
            color="#0057FF"
            valueSuffix=" users"
            size="responsive"
            frame={false}
            strokeOpacity={1}
            borderColor="lightgray"
            data={mapData}
            richInteraction={false}
          />
        </div>
      </div>
    </div>
  );
};

export default UserWorldMap;
