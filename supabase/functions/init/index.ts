import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_ANON_KEY")!,
);

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
  country_code: string;
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
    country_code: responseData.country_code,
  };
}

// Function to get OS from User-Agent
function getOSFromUserAgent(userAgent: string): string {
  if (userAgent.includes("Windows")) return "Windows";
  if (userAgent.includes("Mac OS")) return "Mac OS";
  if (userAgent.includes("X11")) return "UNIX";
  if (userAgent.includes("Linux")) return "Linux";
  if (userAgent.includes("Android")) return "Android";
  if (userAgent.includes("iPhone") || userAgent.includes("iPad")) return "iOS";
  return "Unknown";
}

// Function to get Browser from User-Agent
function getBrowserFromUserAgent(userAgent: string): string {
  if (userAgent.includes("Ddg")) {
    return "DuckDuckGo Browser";
  }
  if (userAgent.includes("Edge") || userAgent.includes("Edg")) {
    return "Edge";
  }
  if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
    return "Opera";
  }
  if (userAgent.includes("Chrome")) {
    return "Chrome";
  }
  if (userAgent.includes("Firefox")) {
    return "Firefox";
  }
  if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
    return "Safari";
  }
  if (userAgent.includes("MSIE") || userAgent.includes("Trident")) {
    return "Internet Explorer";
  }

  return "app";
}

// Never remove this!: supabase functions deploy init --no-verify-jwt
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
      initial,

      referrer,
      os,
      version,
    } = requestBody;

    // Set default values for optional fields
    const safeOs = os || null;

    // Extract User-Agent from request headers
    const userAgent = req.headers.get("User-Agent") || "";
    // Upsert user data
    const ip = req.headers.get("cf-connecting-ip") || "127.0.0.1";

    // Fetch location data
    const location = await getLocation(ip);

    const activityID = globalThis.crypto.randomUUID();
    const { error: activityError } = await supabase
      .from("activities") // Replace with your actual table name
      .upsert([
        {
          id: activityID, // Replace with the actual column name for activity ID

          project_id: projectID,
          browser: getBrowserFromUserAgent(userAgent),
          initial: initial,
          os: safeOs === null ? getOSFromUserAgent(userAgent) : safeOs,
          referrer: referrer,
          user_agent: userAgent,
          location: location,
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
