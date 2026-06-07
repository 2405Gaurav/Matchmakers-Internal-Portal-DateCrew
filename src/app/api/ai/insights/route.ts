/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { calculateCompatibilityScore } from "@/utils/matchingEngine";
import { hasGeminiApiKey, resolveGeminiRuntimeConfig, runGeminiRequest } from "@/utils/gemini";

export async function POST(req: Request) {
  try {
    // gittig client a n b frum req so we can comper
    const body = await req.json();
    const { clientA, clientB } = body;

    if (!clientA || !clientB) {
      return NextResponse.json({ error: "Both client profiles are required" }, { status: 400 });
    }

    const comp = calculateCompatibilityScore(clientA, clientB);

    // fetcin gemin cfg so we can youse ai
    const geminiConfig = resolveGeminiRuntimeConfig(req, 0.7);

    if (!hasGeminiApiKey(geminiConfig)) {
      return NextResponse.json({
        score: comp.score,
        breakdown: comp.breakdown,
        strengths: comp.strengths,
        concerns: comp.concerns,
        summary: `Both ${clientA.firstName} and ${clientB.firstName} represent high-achieving corporate professionals with matching family backgrounds. ${clientA.firstName}'s graduation from ${clientA.education.college} perfectly complements ${clientB.firstName}'s education from ${clientB.education.college}. Cultural value alignment (both ${clientA.religion}) provides a highly stable bedrock for negotiations. (Simulated AI)`,
        potential: `Very High. They share overlapping native languages, have highly compatible income streams, and similar diet/drinking habits. Since ${clientA.firstName} resides in ${clientA.city} and ${clientB.firstName} in ${clientB.city}, location relocation is the only major topic that will require a structured matchmaker-facilitated conversation. (Simulated AI)`,
        firstIntro: comp.suggestedIntro,
        icebreaker: `\"Since you both have spent considerable time working in the ${clientA.career.industry} and ${clientB.career.industry} sectors respectively, how do you manage to maintain a work-life balance? Also, you both share a love for ${clientA.preferences.lifestyleChoices.diet === "veg" ? "vegetarian delicacies" : "trying out new cuisines"}!\" (Simulated AI)`,
        warning: "No Gemini API key is configured. Showing simulated AI insights."
      });
    }

    const systemPrompt = `You are a Senior Matchmaking Director at "The Date Crew", a bespoke matrimonial agency.
// tellin the ai wat to du exactly so it donyt do wirid stuffs
Your task is to write relationship insights, compatibility briefs, and meeting icebreakers for a prospective couple.
Be concise. Keep each field brief — no field should exceed 3 sentences or 80 words.
You MUST respond with a valid JSON object matching exactly this structure:
{
  "summary": "2-3 sentences on how their backgrounds, careers, and preferences align.",
  "potential": "2 sentences on their key alignment points and one challenge to navigate.",
  "icebreaker": "One warm, engaging question referencing a shared interest or background.",
  "firstIntro": "3-4 sentence email opener from matchmaker Gaurav introducing them to each other. No subject line. Just the body opener."
}
Output raw JSON only. No markdown, no code fences, no extra text.`;

    const userPrompt = `Compare this couple:
Groom: ${clientA.firstName} ${clientA.lastName}
Age/City: ${clientA.age} / ${clientA.city}
Profession: ${clientA.career.designation} at ${clientA.career.company} (${clientA.career.income} LPA)
Education: ${clientA.education.degree} from ${clientA.education.college}
Religion/Caste: ${clientA.religion} / ${clientA.caste}
Languages: ${clientA.languages.join(", ")}
Diet: ${clientA.preferences.lifestyleChoices?.diet || "Not specified"}

Bride: ${clientB.firstName} ${clientB.lastName}
Age/City: ${clientB.age} / ${clientB.city}
Profession: ${clientB.career.designation} at ${clientB.career.company} (${clientB.career.income} LPA)
Education: ${clientB.education.degree} from ${clientB.education.college}
Religion/Caste: ${clientB.religion} / ${clientB.caste}
Languages: ${clientB.languages.join(", ")}
Diet: ${clientB.preferences.lifestyleChoices?.diet || "Not specified"}

Compatibility Score: ${comp.score}/100`;

    const { data: aiAnalysis, warning } = await runGeminiRequest(geminiConfig, async (client) => {
      const response = await client.models.generateContent({
        model: geminiConfig.model,
        contents: userPrompt,
        config: {
          maxOutputTokens: 4096,
          responseMimeType: "application/json",
          responseSchema: {
            type: "object",
            properties: {
              summary:    { type: "string" },
              potential:  { type: "string" },
              icebreaker: { type: "string" },
              firstIntro: { type: "string" }
            },
            required: ["summary", "potential", "icebreaker", "firstIntro"]
          },
          systemInstruction: systemPrompt,
          temperature: geminiConfig.temperature
        }
      });

      const raw = response.text?.trim();

      if (!raw) {
        throw new Error("Gemini returned an empty insights response.");
      }

      // Strip markdown code fences if present
      const content = raw
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/```\s*$/i, "")
        .trim();

      try {
        return JSON.parse(content);
      } catch (parseErr) {
        console.error("Gemini JSON parse failed. Raw response:", content);
        throw new Error(`Failed to parse Gemini response as JSON: ${(parseErr as Error).message}`);
      }
    });

    return NextResponse.json({
      score:      comp.score,
      breakdown:  comp.breakdown,
      strengths:  comp.strengths,
      concerns:   comp.concerns,
      summary:    aiAnalysis.summary,
      potential:  aiAnalysis.potential,
      icebreaker: aiAnalysis.icebreaker,
      firstIntro: aiAnalysis.firstIntro,
      ...(warning ? { warning } : {})
    });
  } catch (error: any) {
    console.error("POST /api/ai/insights error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate AI insights" }, { status: 500 });
  }
}