import React, { useEffect } from "react";

// Declare global variable for MapKit
declare global {
  interface Window {
    mapkit: any;
  }
}

interface AppleMapProps {
  token: string;
  version?: string; // Optional version prop to specify MapKit version
}

const AppleMap: React.FC<AppleMapProps> = ({ token, version = "5.x.x" }) => {
  useEffect(() => {
    // Load the Apple MapKit JS library
    if (!window.mapkit) {
      const script = document.createElement("script");
      script.src = `https://cdn.apple-mapkit.com/mk/${version}/mapkit.core.js`;
      script.crossOrigin = "anonymous";
      script.async = true;
      script.dataset.callback = "initMapKit";
      script.dataset.libraries = "services,full-map,geojson";
      script.dataset.token = token;

      script.onload = () => {
        window.mapkit.init({ authorizationToken: token });

        // Initialize the map
        const map = new window.mapkit.Map("map");
        map.region = new window.mapkit.CoordinateRegion(
          new window.mapkit.Coordinate(37.7749, -122.4194), // Example coordinates
          new window.mapkit.CoordinateSpan(0.1, 0.1) // Example span
        );
      };

      document.body.appendChild(script);
    }
  }, [token, version]);

  return <div id="map" style={{ width: "100%", height: "500px" }} />;
};

export default AppleMap;
