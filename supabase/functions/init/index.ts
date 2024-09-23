import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_ANON_KEY")!,
);
// supabase functions deploy init --no-verify-jwt
function setCORSHeaders(response: Response): Response {
  response.headers.set("Access-Control-Allow-Origin", "*"); // Replace '*' with specific origin if needed
  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, x-client-info, apikey",
  );
  return response;
}

interface LocationData {
  country: string;
  region: string;
  city: string;
}

async function getLocation(ip: string): Promise<LocationData> {
  const response = await fetch(`https://get.geojs.io/v1/ip/geo/${ip}.json`);
  if (!response.ok) {
    throw new Error("Failed to fetch location data");
  }

  const responseData = await response.json();

  return {
    country: responseData.country,
    region: responseData.region,
    city: responseData.city,
  };
}

async function handleRequest(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") {
    // Handle CORS preflight request
    const response = new Response(null, { status: 204 });
    return setCORSHeaders(response);
  }

  try {
    const requestBody = await req.json();
    const {
      projectID,
      userID,
      os,
      browser,
      debugData,
      referrer,
      version,
    } = requestBody;

    // Upsert user data
    const ip = req.headers.get("cf-connecting-ip") || "127.0.0.1";

    // Fetch location data
    const location = await getLocation(ip);
    if (debugData == true) {
      const { error: userError } = await supabase
        .from("debugUsers") // Replace with your actual table name
        .upsert([
          {
            id: userID, // Replace with the actual column name for user ID
            os: os,
            browser: browser,
            location: location,
            referrer: referrer,
          },
        ]);

      if (userError) {
        throw userError;
      }

      const activityID = globalThis.crypto.randomUUID();
      const { error: activityError } = await supabase
        .from("debugActivities") // Replace with your actual table name
        .upsert([
          {
            id: activityID, // Replace with the actual column name for activity ID
            user_id: userID,
            project_id: projectID,
            version: version,
            timestamp: new Date().toISOString(),
          },
        ]);

      if (activityError) {
        throw activityError;
      }
      const jsonResponse = new Response("", {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
      return setCORSHeaders(jsonResponse);
    } else {
      const { error: userError } = await supabase
        .from("users") // Replace with your actual table name
        .upsert([
          {
            id: userID, // Replace with the actual column name for user ID
            os: os,
            browser: browser,
            location: location,
            referrer: referrer,
          },
        ]);

      if (userError) {
        throw userError;
      }

      //

      const activityID = globalThis.crypto.randomUUID();
      const { error: activityError } = await supabase
        .from("activities") // Replace with your actual table name
        .upsert([
          {
            id: activityID, // Replace with the actual column name for activity ID
            user_id: userID,
            project_id: projectID,
            timestamp: new Date().toISOString(),
            version: version,
          },
        ]);

      if (activityError) {
        throw activityError;
      }
      const jsonResponse = new Response("", {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
      return setCORSHeaders(jsonResponse);
    }
  } catch (error) {
    console.error("Error:", error);
    const errorResponse = new Response(error.message, {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
    return setCORSHeaders(errorResponse);
  }
}

Deno.serve(handleRequest);
