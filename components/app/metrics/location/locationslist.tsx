import React from "react";

interface Location {
  location: string;
  count: number;

}

interface LocationsListProps {
  locationUsage?: Location[]; // Make locationUsage optional
}

// Mapping of country names to country codes
const countryCodeMap: { [key: string]: string } = {
  Austria: "AT",
  Germany: "DE",
  France: "FR",
  // Add more countries as needed
};

const LocationsList: React.FC<LocationsListProps> = ({
  locationUsage = [],
}) => {
  return (
    <>
      {locationUsage.length > 0 ? ( // Check if locationUsage has items
        locationUsage.map((location) => {
          const countryCode = countryCodeMap[location.location] || "default"; // Use a default if not found
          return (
            <div
              key={location.location}
              style={{
                display: "flex",
                alignItems: "center",
                maxWidth: "100%",
                minWidth: "100%",
                background: `linear-gradient(to right, var(--dominant) ${location.count}%, transparent ${location.count}%)`, // Adjust gradient based on count
                gap: "10px",
                marginBottom: "4px",
                padding: "10px",
                borderRadius: "0px",
              }}
            >
              <img
                src={`/images/countries/${countryCode}.svg`} // Use country code for the flag
                alt={`${location.location} flag`}
                style={{ width: "20px", height: "20px" }}
              />

              <p style={{ color: "var(--secondary)" }}>{location.location}</p>
              <p
                style={{
                  color: "var(--secondary)",
                  marginLeft: "auto",
                }}
              >
                {location.count} {/* Display count */}
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
