function setCORSHeaders(response: Response): Response {
  response.headers.set("Access-Control-Allow-Origin", "*"); // Replace '*' with specific origin if needed
  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, x-client-info, apikey",
  );
  return response;
}

const AUDIENCEFUL_API_KEY = Deno.env.get("AUDIENCEFUL_API_KEY");

async function handleRequest(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") {
    // Handle CORS preflight request
    const response = new Response(null, { status: 204 });
    return setCORSHeaders(response);
  }

  try {
    const requestBody = await req.json();
    const {
      email,
      tags,
    } = requestBody;

    const res = await fetch(
      "https://app.audienceful.com/api/people/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": `${AUDIENCEFUL_API_KEY}`,
        },
        body: JSON.stringify({
          email: email, // or just 'email' if the variable name is the same as the key
          tags: tags,
        }),
      },
    );

    const data = await res.json();

    const jsonResponse = new Response(JSON.stringify(data), {
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
