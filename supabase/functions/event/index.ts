import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_ANON_KEY")!,
);
// supabase functions deploy event --no-verify-jwt
function setCORSHeaders(response: Response): Response {
  response.headers.set("Access-Control-Allow-Origin", "*"); // Replace '*' with specific origin if needed
  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, x-client-info, apikey",
  );
  return response;
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
      name,
      version,
      debugData,
    } = requestBody;
    //supabase functions deploy init --no-verify-jwt
    // Upsert user data

    if (debugData == true) {
      const revenueID = globalThis.crypto.randomUUID();
      const { error: userError } = await supabase
        .from("debugEvents") // Replace with your actual table name
        .upsert([
          {
            id: revenueID, // Replace with the actual column name for user ID
            user_id: userID,
            project_id: projectID,
            timestamp: new Date().toISOString(),
            name: name,
            version: version,
          },
        ]);

      if (userError) {
        throw userError;
      }
      const jsonResponse = new Response("", {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
      return setCORSHeaders(jsonResponse);
    } else {
      const revenueID = globalThis.crypto.randomUUID();
      const { error: userError } = await supabase
        .from("events") // Replace with your actual table name
        .upsert([
          {
            id: revenueID, // Replace with the actual column name for user ID
            user_id: userID,
            project_id: projectID,
            timestamp: new Date().toISOString(),
            name: name,
            version: version,
          },
        ]);

      if (userError) {
        throw userError;
      }
      const jsonResponse = new Response("", {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
      return setCORSHeaders(jsonResponse);
    }
    //
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
