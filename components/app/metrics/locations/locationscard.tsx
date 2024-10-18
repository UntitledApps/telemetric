import React from "react";

import { Location } from "@/types/index";
import "./locationscard.css";
import LocationsList from "./locationslist";
import LocationsTab from "./locationstabs";

const LocationsCard = ({
  locationsPassed: locations,
}: {
  locationsPassed: Location[];
}) => {
  const [selectedTab, setSelectedTab] = React.useState<string>("countries");

  const [countries, setCountries] = React.useState<string[]>([]);
  const [cities, setCities] = React.useState<string[]>([]);
  const [regions, setRegions] = React.useState<string[]>([]);
  const [countryCodes, setCountryCodes] = React.useState<{
    [key: string]: string;
  }>({});

  React.useEffect(() => {
    const locationCounts: { [key: string]: number } = {};

    locations.forEach((location) => {
      setCountries(
        locations
          .filter((location) => location.country)
          .map((location) => location.country)
      );
      setCities(
        locations
          .filter((location) => location.city)
          .map((location) => location.city)
      );
      setRegions(
        locations
          .filter((location) => location.region)
          .map((location) => location.region)
      );
      setCountryCodes(
        locations
          .filter((location) => location.country_code)
          .reduce((acc, location) => {
            acc[location.country] = location.country_code;
            return acc;
          }, {} as { [key: string]: string }) // Initialize as an empty object
      );
    });
  }, [locations, selectedTab]);

  const tabs = [
    {
      label: "Countries",

      content: (
        <LocationsList locations={countries} countryCodes={countryCodes} />
      ),
    },
    {
      label: "Regions",
      content: <LocationsList locations={regions} />,
    },
    {
      label: "Cities",
      content: <LocationsList locations={cities} />,
    },
  ];

  const onSelectedTabChanged = (index: number) => {
    setSelectedTab(tabs[index].label.toLowerCase());
  };

  return (
    <div className="locations-card">
      <LocationsTab tabs={tabs} onSelectedTabChanged={onSelectedTabChanged} />
    </div>
  );
};

export default LocationsCard;
