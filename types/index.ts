// types/index.ts
export interface Project {
  id: string;
  users: {
    [key: string]: {
      user_activity: {
        [timestamp: string]: string;
      };
    };
  };
  metadata: {
    name: string;
  };
}

export interface User {
  id: string;

  metadata: {
    os?: string;
    visits?: number;
    browser?: string;
    lastSeen?: string;
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
    firstSeen?: string;
  };
}
