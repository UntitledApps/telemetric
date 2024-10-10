// react-globe.gl.d.ts
declare module "react-globe.gl" {
  import { Component } from "react";

  interface PointData {
    lat: number;
    lng: number;
    name?: string;
    [key: string]: any; // Allow additional properties
  }

  interface GlobeProps {
    pointsData?: PointData[];
    pointLat?: string;
    pointLng?: string;
    pointColor?: (point: PointData) => string;
    pointAltitude?: number;
    pointLabel?: string;
    globeImageUrl?: string;
    showAtmosphere?: boolean;
    polygonsData?: any[]; // Adjust this type as needed

    // New properties added for AP  polygonsData?: any[]; // Adjust this type as needed
    polygonAltitude?: (d: any) => number;
    polygonCapColor?: (d: any) => string;
    polygonSideColor?: () => string;
    polygonStrokeColor?: () => string;
    polygonsTransitionDuration?: number;
    polygonLabel?: (d: any) => string;
    onPolygonHover?: (d: any) => void;
    width?: number; // Getter/setter for the canvas width
    height?: number; // Getter/setter for the canvas height
    backgroundColor?: string; // Getter/setter for the background color
    animateIn?: boolean; // Whether to animate the globe initialization

    bumpImageUrl?: string; // Getter/setter for bump map image URL
    showGraticules?: boolean; // Whether to show graticule grid
    pointRadius?: number; // Cylinder's radius in angular degrees
    pointResolution?: number; // Radial geometric resolution of each cylinder
    pointsMerge?: boolean; // Whether to merge all point meshes for performance
    pointsTransitionDuration?: number; // Duration for point changes animation
    onPointClick?: (point: PointData) => void; // Callback for point clicks
    onPointHover?: (
      point: PointData | null,
      prevPoint: PointData | null,
    ) => void; // Callback for point hover events

    // Additional properties for Arcs Layer, Polygons Layer, Paths Layer, etc. can be added similarly
    // ...
  }

  export default class Globe extends Component<GlobeProps> {}
}
