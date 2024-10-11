// components/UserWorldMap.tsx
import { Location } from "@/types"; // Ensure this type includes the country field
import { useEffect, useState } from "react";
import WorldMap from "react-svg-worldmap";

const UserWorldMap: React.FC<{ locationsPassed: Location[] }> = ({
  locationsPassed,
}) => {
  const [mapData, setMapData] = useState<{ country: string; value: number }[]>(
    []
  );
  useEffect(() => {
    const countryCounts: { [key: string]: number } = {};

    // Count occurrences of each country
    locationsPassed.forEach((location) => {
      if (location.country) {
        countryCounts[location.country] =
          (countryCounts[location.country] || 0) + 1;
      }
    });

    // Convert countryCounts to the format required by WorldMap
    const formattedData = Object.entries(countryCounts).map(
      ([country, count]) => ({
        country: country.toLowerCase(), // Ensure country codes are lowercase
        value: count,
      })
    );

    setMapData(formattedData); // Update mapData state
  }, [locationsPassed]);

  return (
    <div
      style={{
        border: "1px solid var(--outline)",
        borderRadius: "10px",
        overflow: "hidden",
        display: "flex",
        alignItems: "start",
        width: "100%",
        justifyContent: "start",
        backgroundColor: "var(--on-dominant)",
        flexDirection: "column",
        gap: "0px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "space-between",
          width: "100%",
          maxHeight: "40px",
          justifyContent: "space-between",
        }}
      >
        <h4
          style={{
            color: "var(--secondary)",
            padding: "10px",
          }}
        >
          Users by Country
        </h4>
        <p
          style={{
            color: "var(--subtitle)",
            padding: "10px",
          }}
        >
          Colors based on country
        </p>
      </div>
      <div
        style={{
          height: "1px",
          width: "100%",
          borderBottom: "1px solid var(--outline)",
        }}
      ></div>
      <div style={{ width: "100%", height: "100%" }}>
        <WorldMap
          color="red"
          valueSuffix=" users"
          size="responsive"
          tooltipTextFunction={(d) =>
            `${d.countryName}: ${d.countryName} users`
          }
          tooltipBgColor="var(--on-dominant)"
          tooltipTextColor="var(--secondary)"
          frame={false}
          strokeOpacity={0.9}
          backgroundColor="transparent"
          borderColor="var(--outline)"
          data={mapData} // Use the formatted mapData
          richInteraction={true}
        />
      </div>
    </div>
  );
};

export default UserWorldMap;
