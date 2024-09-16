// types/index.ts
export interface Project {
  id: string;
  metadata: {
    name: string;
    type: string;
    favIconURL: string;
    ogImageURL: string;
  };
}

export interface Revenue {
  id: string;
  user_id: string;
  timestamp: string;
  project_id: string;
  total: string; // Assuming 'total' is a text field
}
export enum SelectedNavItem {
  PROJECTS = "PROJECTS",
  EVENTS = "EVENTS",
  METRICS = "METRICS",
  DATA_EXPLORER = "DATA_EXPLORER",
  SETUP = "SETUP",
  SETTINGS = "SETTINGS",
  IMPORT_EXPORT_DATA = "IMPORT_EXPORT_DATA",
}
export interface User {
  id: string;
  os?: string;
  browser?: string;
  location?: {
    ip: string;
    loc: string; // "lat,lng"
    org: string;
    city: string;
    postal: string;
    region: string;
    country: string;
    hostname: string;
    timezone: string;
  };
}
export interface Activity {
  id: string;
  user_id: string;
  timestamp: string;
  project_id: string; // Ensure this is included
  // Add other properties if needed
}
