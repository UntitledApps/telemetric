import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/utils/supabase/client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import SyncLoader from "react-spinners/SyncLoader";

interface Project {
  id: string;
  data: {
    [key: string]: {
      users: string[];
      events: {
        [key: string]: number;
      };
      revenue: string;
    };
  };
  metadata: {
    name: string;
    type: string;
    favIconURL: string;
    ogImageURL: string;
  };
}

interface ProjectsProps {
  onProjectSelect: (projectId: string) => void;
}

const Projects: React.FC<ProjectsProps> = ({ onProjectSelect }) => {
  const supabase = createClient();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();
        if (authError) throw authError;
        if (!user) throw new Error("Unauthorized access");

        const { data: customerData, error: customerError } = await supabase
          .from("customers")
          .select("projects")
          .eq("id", user?.id)
          .single();

        if (customerError) throw customerError;
        if (customerData && customerData.projects) {
          const { data: projectsData, error: projectsError } = await supabase
            .from("projects")
            .select("*")
            .in("id", customerData.projects);

          if (projectsError) throw projectsError;
          setProjects(projectsData || []);
        }
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const getLatestRevenue = (data: { [key: string]: { revenue: string } }) => {
    const latestDate = Object.keys(data).sort().pop();
    return latestDate ? data[latestDate].revenue : "N/A";
  };

  const getUserCount = (data: { [key: string]: { users: string[] } }) => {
    const latestDate = Object.keys(data).sort().pop();
    return latestDate ? data[latestDate].users.length : 0;
  };

  if (loading)
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >

      </div>
    );

  if (error) return <div>Error: {error}</div>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "16px",
        padding: "8px",
      }}
    >
      {projects.length === 0 ? (
        <div>No projects found</div>
      ) : (
        projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0 }}
          >
            <Card
              onClick={() => onProjectSelect(project.id)}
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "8px",
                cursor: "pointer",
              }}
            >
              <CardHeader
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "10px",
                  justifyContent: "start",
                  padding: "8px",
                  flexShrink: 0,
                }}
              >
                <Avatar>
                  <AvatarImage
                    src={project.metadata.favIconURL}
                    alt={project.metadata.name}
                  />
                  <AvatarFallback>{project.metadata.name[0]}</AvatarFallback>
                </Avatar>
                <CardTitle>{project.metadata.name}</CardTitle>
              </CardHeader>
              <CardContent
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "16px",
                  padding: "8px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div className="text-lg font-bold">
                    {getUserCount(project.data)}
                  </div>
                  <div className="text-sm text-gray-600">Unique Users</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div className="text-lg font-bold">
                    {Object.keys(project.data).length}
                  </div>
                  <div className="text-sm text-gray-600">Events</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div className="text-lg font-bold">
                    {getLatestRevenue(project.data)}$
                  </div>
                  <div className="text-sm text-gray-600">Revenue</div>
                </div>
              </CardContent>
              <CardFooter
                style={{
                  padding: "8px",
                }}
              >
                {/* Add project actions here */}
              </CardFooter>
            </Card>
          </motion.div>
        ))
      )}
    </div>
  );
};

export default Projects;
