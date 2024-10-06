import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_ANON_KEY")!,
);
// supabase functions deploy revenue --no-verify-jwt
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
// Never remove this!: supabase functions deploy revenue --no-verify-jwt
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
      referrer,
      total,
      version,
    } = requestBody;

    // Extract User-Agent from request headers
    const userAgent = req.headers.get("User-Agent") || "";
    const ip = req.headers.get("cf-connecting-ip") || "127.0.0.1";

    // Fetch location data
    const location = await getLocation(ip);

    // Generate a unique revenue ID
    const revenueID = globalThis.crypto.randomUUID();

    // Upsert revenue data
    const { error: revenueError } = await supabase
      .from("revenue") // Replace with your actual table name
      .upsert([
        {
          id: revenueID, // Replace with the actual column name for revenue ID
          project_id: projectID,
          timestamp: new Date().toISOString(),
          version: version,

          total: total * 100,
          browser: getBrowserFromUserAgent(userAgent),
          os: getOSFromUserAgent(userAgent),
          location: location,
          referrer: referrer,
        },
      ]);

    if (revenueError) {
      throw revenueError;
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
