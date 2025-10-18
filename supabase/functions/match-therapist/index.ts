import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, topics } = await req.json();
    
    if (!message && (!topics || topics.length === 0)) {
      return new Response(
        JSON.stringify({ error: "Please provide a message or select topics" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Create a personalized prompt based on user input
    const topicsText = topics?.length > 0 ? `Topics: ${topics.join(", ")}` : "";
    const messageText = message ? `Message: "${message}"` : "";
    
    const userContext = [topicsText, messageText].filter(Boolean).join("\n");

    const systemPrompt = `You are a compassionate therapist matching AI. Based on what someone shares about what they're working through, recommend 3 therapist profiles that would be a great match.

For each therapist, provide:
- name: Full name
- specialty: Their main area of expertise (related to what the user shared)
- approach: Brief description of their therapeutic approach (CBT, DBT, trauma-informed, etc.)
- matchReason: Why they'd be a good fit for this person (2-3 sentences, personal and specific)
- videoMessage: A warm, supportive first message they might say (1-2 sentences)

Make recommendations feel personal and thoughtful. Focus on creating human connections.`;

    console.log("Calling Lovable AI for therapist matching...");
    
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Help me find a therapist. Here's what I'm working through:\n\n${userContext}` }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "suggest_therapists",
              description: "Suggest 3 matching therapist profiles",
              parameters: {
                type: "object",
                properties: {
                  therapists: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: { type: "string" },
                        specialty: { type: "string" },
                        approach: { type: "string" },
                        matchReason: { type: "string" },
                        videoMessage: { type: "string" }
                      },
                      required: ["name", "specialty", "approach", "matchReason", "videoMessage"],
                      additionalProperties: false
                    },
                    minItems: 3,
                    maxItems: 3
                  }
                },
                required: ["therapists"],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "suggest_therapists" } }
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      const errorText = await response.text();
      console.error("Lovable AI error:", response.status, errorText);
      throw new Error("Failed to get therapist recommendations");
    }

    const data = await response.json();
    console.log("AI Response:", JSON.stringify(data, null, 2));

    // Extract the function call result
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      throw new Error("No recommendations received from AI");
    }

    const therapists = JSON.parse(toolCall.function.arguments).therapists;
    
    return new Response(
      JSON.stringify({ therapists }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in match-therapist:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Failed to match therapists" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
