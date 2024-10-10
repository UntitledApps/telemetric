import { Activity, Location, User } from "@/types";
import React from "react";
import Alttabs from "@/components/ui/alttabs/alttabs";
import LocationsList from "./locationslist";

const LocationsCard = ({ activities }: { activities: User[] }) => {
  const [selectedTab, setSelectedTab] = React.useState<string>("countries");
  const [locations, setLocations] = React.useState<Location[]>([]);

  React.useEffect(() => {
    const locationCounts: { [key: string]: number } = {};

    activities.forEach((activity) => {
      const location = activity.location;
    });
  }, [activities, selectedTab]);

  const tabs = [
    {
      label: "Countries",
      content: <LocationsList locations={locations} type="country" />,
    },
    {
      label: "Cities",
      content: <LocationsList locations={locations} type="city" />,
    },
    {
      label: "Regions",
      content: <LocationsList locations={locations} type="region" />,
    },
  ];

  const onSelectedTabChanged = (index: number) => {
    setSelectedTab(tabs[index].label.toLowerCase());
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
        flexDirection: "row",
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
