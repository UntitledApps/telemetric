import { Activity, User } from "@/types";
import React from "react";
import Alttabs from "@/components/ui/alttabs/alttabs";
import LocationsList from "./locationslist";

interface LocationUsage {
  location: string;
  count: number; // Add count to the LocationUsage interface
}

const LocationsCard = ({ activities }: { activities: User[] }) => {
  const [locationUsage, setLocationUsage] = React.useState<LocationUsage[]>([]);
  const [selectedTab, setSelectedTab] = React.useState<string>("countries");

  React.useEffect(() => {
    const locationCounts: { [key: string]: number } = {};

    activities.forEach((activity) => {
      const location = activity.location.country; // Access the location based on the selected tab
      if (location) {
        locationCounts[location] = (locationCounts[location] || 0) + 1;
      }
    });

    const calculatedLocationUsage = Object.entries(locationCounts).map(
      ([location, count]) => ({
        location,
        count, // Include the count
      })
    );

    // Sort by count in descending order
    const sortedLocationUsage = calculatedLocationUsage.sort(
      (a, b) => b.count - a.count
    );

    setLocationUsage(sortedLocationUsage);
  }, [activities, selectedTab]);

  const tabs = [
    {
      label: "Countries",
      content: <LocationsList locationUsage={location} />,
    },
    {
      label: "Cities",
      content: <LocationsList locationUsage={locationUsage} />,
    },
    {
      label: "Regions",
      content: <LocationsList locationUsage={locationUsage} />,
    },
  ];

  const onSelectedTabChanged = (index: number) => {
    if (index === 0) {
      setSelectedTab("countries");
      const locationCounts: { [key: string]: number } = {};

      activities.forEach((activity) => {
        const location = activity.location.country; // Access the location based on the selected tab
        if (location) {
          locationCounts[location] = (locationCounts[location] || 0) + 1;
        }
      });

      const calculatedLocationUsage = Object.entries(locationCounts).map(
        ([location, count]) => ({
          location,
          count, // Include the count
        })
      );

      const sortedLocationUsage = calculatedLocationUsage.sort(
        (a, b) => b.count - a.count
      );

      setLocationUsage(sortedLocationUsage);
    } else if (index === 1) {
      const locationCounts: { [key: string]: number } = {};

      activities.forEach((activity) => {
        const location = activity.location.city; // Access the location based on the selected tab
        if (location) {
          locationCounts[location] = (locationCounts[location] || 0) + 1;
        }
      });

      const calculatedLocationUsage = Object.entries(locationCounts).map(
        ([location, count]) => ({
          location,
          count, // Include the count
        })
      );

      const sortedLocationUsage = calculatedLocationUsage.sort(
        (a, b) => b.count - a.count
      );

      setLocationUsage(sortedLocationUsage);
      setSelectedTab("cities");
    } else if (index === 2) {
      const locationCounts: { [key: string]: number } = {};

      activities.forEach((activity) => {
        const location = activity.location.region; // Access the location based on the selected tab
        if (location) {
          locationCounts[location] = (locationCounts[location] || 0) + 1;
        }
      });

      const calculatedLocationUsage = Object.entries(locationCounts).map(
        ([location, count]) => ({
          location,
          count, // Include the count
        })
      );

      const sortedLocationUsage = calculatedLocationUsage.sort(
        (a, b) => b.count - a.count
      );

      setLocationUsage(sortedLocationUsage);

      setSelectedTab("regions");
    }
  };

  return (
    <div
      style={{
        border: "1px solid var(--outline)",
        borderRadius: "10px",
        overflow: "hidden",
        display: "flex",
        alignItems: "start",
        maxHeight: "500px",
        minWidth: "500px",
        justifyContent: "start",
        backgroundColor: "var(--on-dominant)",
        flexDirection: "column",
        gap: "0px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <Alttabs tabs={tabs} onSelectedTabChanged={onSelectedTabChanged} />
      </div>
    </div>
  );
};

export default LocationsCard;
