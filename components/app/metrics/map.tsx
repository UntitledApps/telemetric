// components/UserWorldMap.tsx
import { useEffect, useState } from "react";
import WorldMap from "react-svg-worldmap";

interface Activity {
  os: string;
  browser: string;
  location?: {
    city?: string;
    region?: string;
    country?: string;
  };
}

interface UserWorldMapProps {
  activities: Record<string, Activity>;
}

const UserWorldMap: React.FC<UserWorldMapProps> = ({ activities }) => {
  const [mapData, setMapData] = useState<{ country: string; value: number }[]>(
    []
  );
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  useEffect(() => {
    const countryCounts: { [key: string]: number } = {};

    Object.values(activities).forEach((activity) => {
      const { location } = activity;
      if (location?.country) {
        const country = location.country;
        countryCounts[country] = (countryCounts[country] || 0) + 1;
      }
    });

    const calculatedMapData = Object.entries(countryCounts).map(
      ([country, count]) => ({
        country: country.toLowerCase(), // Ensure country codes are lowercase
        value: count,
      })
    );

    setMapData(calculatedMapData);
  }, [activities]);

  return (
    <div className="border-t border-gray-200 overflow-hidden">
      <div className="p-2">
        <div className="flex items-center justify-between mb-2">
          <div className="text-lg font-bold">Users Map</div>
          <button
            onClick={() => setIsOverlayVisible(true)}
            className="text-blue-600 hover:text-blue-800"
            aria-label="Fullscreen"
          ></button>
        </div>
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
