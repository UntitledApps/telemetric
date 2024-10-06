// types/index.ts
export interface Project {
  id: string;

  name: string;
  type: string;
  favIconURL: string;
  ogImageURL: string;
}

export interface Activity {
  id: string;
  user_id: string;
  timestamp: string;
  project_id: string;
  version: string;
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
  METRICS = "METRICS",
  ACCOUNT = "ACCOUNT",
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
