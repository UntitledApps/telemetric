import Alttabs from "@/components/app/metrics/location/locationstabs";
import React from "react";


import "./locationscard.css";
import LocationsList from "./locationslist";
import { Location } from "@/types/index";

const LocationsCard = ({
  locationsPassed,
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

    locationsPassed.forEach((location) => {
      setCountries(
        locationsPassed
          .filter((location) => location.country)
          .map((location) => location.country)
      );
      setCities(
        locationsPassed
          .filter((location) => location.city)
          .map((location) => location.city)
      );
      setRegions(
        locationsPassed
          .filter((location) => location.region)
          .map((location) => location.region)
      );
      setCountryCodes(
        locationsPassed
          .filter((location) => location.country_code)
          .reduce((acc, location) => {
            acc[location.country] = location.country_code;
            return acc;
          }, {} as { [key: string]: string }) // Initialize as an empty object
      );

    });

  }, [locationsPassed, selectedTab]);

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
      <Alttabs tabs={tabs} onSelectedTabChanged={onSelectedTabChanged} />
    </div>
  );
};

export default LocationsCard;
