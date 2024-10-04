import { useEffect, useState } from "react";

import { createClient } from "@/utils/supabase/client";
import { Activity, Project, User } from "@/types";

let fetchedProjects = false;

export const useProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    const [loading, setLoading] = useState<boolean>(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchProjects = async () => {
            if (fetchedProjects) {
                setLoading(false);
                return;
            }

            const {
                data: { user },
            } = await supabase.auth.getUser();
            if (!user) {
                console.log("User is not logged in");
                setLoading(false);
                return;
            }

            const userID = user.id;
            let projectsIDs: string[] = [];

            try {
                const { data, error } = await supabase
                    .from("customers")
                    .select("projects")
                    .eq("id", userID);

                if (error) throw error;

                projectsIDs = data[0]?.projects || [];
            } catch (error) {
                console.error("Error fetching projects:", error);
            }

            if (projectsIDs.length === 0) {
                setLoading(false);
                return;
            }

            const projectsTemp: Project[] = await Promise.all(
                projectsIDs.map(async (projectID) => {
                    const { data: project, error } = await supabase
                        .from("projects")
                        .select("*")
                        .eq("id", projectID)
                        .single();

                    if (error) {
                        console.error("Error fetching project:", error);
                        return null;
                    }

                    return project; // Ensure this returns Project or null
                }),
            ).then((results) =>
                results.filter((project): project is Project =>
                    project !== null
                )
            );

            const filteredProjects = projectsTemp.filter(Boolean) as Project[];
            setProjects(filteredProjects);
            fetchedProjects = true;

            filteredProjects.forEach((project) => getProjectData(project));
            setLoading(false);
        };

        fetchProjects();
    }, []);

    return { projects, loading };
};

const getProjectData = async (project: Project) => {
    const projectID = project.id;
    const supabase = createClient();

    const { data: activities, error: activitiesError } = await supabase
        .from("activities")
        .select("*")
        .eq("project_id", projectID);

    if (activitiesError) {
        console.error("Error fetching activities:", activitiesError);
        return;
    }

    const activitiesTemp: Activity[] = activities.map((activity) => ({
        id: activity.id || "",
        user_id: activity.user_id || "",
        project_id: activity.project_id || "",
        timestamp: activity.timestamp || "",
        version: activity.version || "",
    }));

    // Fetch users from activities
    const usersSet = new Set(
        activitiesTemp.map((activity) => activity.user_id),
    );
    const usersTemp: User[] = await Promise.all(
        Array.from(usersSet).map(async (userID) => {
            const { data: user, error: userError } = await supabase
                .from("users")
                .select("*")
                .eq("id", userID)
                .single();

            if (userError) {
                console.error("Error fetching user:", userError);
                return null;
            }

            return {
                id: user.id.toString(),
                os: user.os.toString(),
                browser: user.browser.toString(),
                location: user.location,
                referrer: user.referrer.toString(),
            } as User;
        }),
    ).then((results) => results.filter((user): user is User => user !== null));

    // Fetch events and revenue similarly...
    // You can implement the fetching of events and revenue in a similar manner
};

// Export the useProjects hook for use in components
export default useProjects;
