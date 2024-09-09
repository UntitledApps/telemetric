// components/Projects.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";

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

const Projects: React.FC = () => {
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
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "16px",
          padding: "8px",
        }}
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <Card
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "8px",
            }}
          >
            <CardHeader
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
                padding: "8px",
                flexShrink: 0,
              }}
            >
              <Skeleton className="w-[40px] h-[40px] rounded-full" />
              <Skeleton className="w-[120px] h-[20px] rounded-full" />
            </CardHeader>
            <CardContent
              style={{
                flexGrow: 1,
                overflow: "hidden",
                padding: "8px",
              }}
            >
              <Skeleton className="w-[150px] h-[20px] rounded-full mb-2" />
              <Skeleton className="w-[100px] h-[20px] rounded-full" />
            </CardContent>
            <CardFooter
              style={{
                padding: "8px",
              }}
            >
              <Skeleton className="w-[80px] h-[20px] rounded-full" />
            </CardFooter>
          </Card>
        ))}
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
          <Card
            key={project.id}
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "8px",
            }}
          >
            <CardHeader
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
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
                flexGrow: 1,
                overflow: "hidden",
                padding: "8px",
              }}
            >
              <CardDescription>
                Revenue: ${getLatestRevenue(project.data)}
              </CardDescription>
              <CardDescription>
                Users: {getUserCount(project.data)}
              </CardDescription>
            </CardContent>
            <CardFooter
              style={{
                padding: "8px",
              }}
            >
              {/* Add project actions here */}
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
};

export default Projects;
