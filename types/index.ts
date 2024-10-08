// types/index.ts
export interface Project {
  id: string;
  name: string;
  type: string;
  activities: Activity[];
  revenue: Revenue[];
  events: Event[];

  favIconURL: string;
  ogImageURL: string;
}

export interface Activity {
  id: string;
  initial: boolean;
  referrer: string;
  timestamp: string;
  project_id: string;
  browser: string;
  os: string;
  location: {
    city: string;
    region: string;
    country: string;
  };
  version: string;
}

export interface Revenue {
  id: string;

  timestamp: string;
  project_id: string;
  total: string;
  browser: string;
  os: string;
  referrer: string;
  location: {
    city: string;
    region: string;
    country: string;
  };
  version: string;
}
export enum SelectedNavItem {
  PROJECTS = "PROJECTS",
  METRICS = "METRICS",
  ACCOUNT = "ACCOUNT",
}
