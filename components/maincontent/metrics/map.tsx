// components/UserWorldMap.tsx
import { Maximize, Minimize } from "lucide-react";
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
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

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
        <div className="flex items-center justify-between mb-2">
          <div className="text-lg font-bold">Users Map</div>
          <button
            onClick={() => setIsOverlayVisible(true)}
            className="text-blue-600 hover:text-blue-800"
            aria-label="Fullscreen"
          >
            <Maximize size={24} />
          </button>
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
        {/* Overlay */}
        {isOverlayVisible && (
          <div
            className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center"
            style={{ cursor: "pointer" }}
            onClick={() => setIsOverlayVisible(false)}
          >
            <div
              className="relative w-full h-full max-w-4xl max-h-4xl overflow-auto"
              onClick={(e) => e.stopPropagation()} // Prevent clicks inside dialog from closing it
            >
              <button
                onClick={() => setIsOverlayVisible(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                aria-label="Close"
              >
                <Minimize size={24} />
              </button>
              <div style={{ width: "100%", height: "100%" }}>
                <WorldMap
                  color="#0057FF"
                  valueSuffix=" users"
                  backgroundColor="#fff"
                  size="xl"
                  strokeOpacity={1}
                  borderColor="lightgray"
                  data={mapData}
                  richInteraction={false}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserWorldMap;
