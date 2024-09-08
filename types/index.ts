export interface Project {
  id: string;
  data: Record<string, any>; // Adjust based on your data structure
  metadata: {
    name: string;
  };
}