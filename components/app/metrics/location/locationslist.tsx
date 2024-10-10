import { Location } from "@/types";
import React from "react";

interface LocationsListProps {
  locations: Location[]; // Make locationUsage optional
  type: "country" | "region" | "city"; // New prop to specify the type
}

// Mapping of country names to country code
const LocationsList: React.FC<LocationsListProps> = ({
  locations= [],
  type,
}) => {
  // Filter locations based on the selected type
  const filteredLocations = locations.filter((location) => {
    if (type === "country") {
      return location.country;
    } else if (type === "region") {
      return location.region;
    } else if (type === "city") {
      return location.city;
    }
    return false;
  });

  // Calculate counts for filtered locations
  const locationCounts = filteredLocations.reduce((acc, location) => {
    acc[location.country] = (acc[location.country] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <>
      {filteredLocations.length > 0 ? ( // Check if filteredLocations has items
        filteredLocations.map((location) => {
          return (
            <div
              key={location.country}
              style={{
                display: "flex",
                alignItems: "center",
                maxWidth: "100%",
                minWidth: "100%",
                background: `linear-gradient(to right, var(--dominant) ${
                  locationCounts[location.country]
                }%, transparent ${locationCounts[location.country]}%)`, // Adjust gradient based on count
                gap: "10px",
                marginBottom: "4px",
                padding: "10px",
                borderRadius: "0px",
              }}
            >
              {type === "country" && ( // Only display flag if type is country
                <img
                  src={`/images/countries/${location.countryCode}.svg`} // Use country code for the flag
                  alt={`${location.countryCode} flag`}
                  style={{ width: "20px", height: "20px" }}
                />
              )}

              <p style={{ color: "var(--secondary)" }}>
                {location.countryCode}
              </p>
              <p
                style={{
                  color: "var(--secondary)",
                  marginLeft: "auto",
                }}
              >
                {locationCounts[location.countryCode]} {/* Display count */}
              </p>
            </div>
          );
        })
      ) : (
        <p style={{ color: "var(--subtitle)" }}>No locations available.</p> // Fallback message
      )}
    </>
  );
};

export default LocationsList;
