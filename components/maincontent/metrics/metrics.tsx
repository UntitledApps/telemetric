import React from "react";
import { Component } from "../../charts/mainchart";
import { Browsers } from "./browsers";
import { OperatingSystemCard } from "./operatingsystems";

interface Props {
  // Define your component's props here
}

const Metrics: React.FC<Props> = (props) => {
  // Add your component logic here

  return (
    // JSX code goes here
    <div>
      <Component />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <OperatingSystemCard />
        <Browsers />
        <OperatingSystemCard />
        <OperatingSystemCard />
      </div>
    </div>
  );
};

export default Metrics;
