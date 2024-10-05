import React, { useEffect } from "react";
import Telemetric from "telemetric-javascript-sdk/telemetric";

const TelemetricProvider = ({ children }) => {
  useEffect(() => {
    Telemetric.init("c1badaba-2f6e-4a92-a0f8-eb173bdc03f2")
      .then(() => {
        console.log("Telemetric initialized");
      })
      .catch((error) => {
        console.error("Telemetric initialization error:", error);
      });
  }, []);

  return <>{children}</>;
};

export default TelemetricProvider;
