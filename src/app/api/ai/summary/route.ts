import { NextResponse } from "next/server";
import { hasGeminiApiKey, resolveGeminiRuntimeConfig, runGeminiRequest } from "@/utils/gemini";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { profile } = body;

    if (!profile) {
      return NextResponse.json({ error: "Profile parameter required" }, { status: 400 });
    }

    const geminiConfig = resolveGeminiRuntimeConfig(req, 0.6);

    if (!hasGeminiApiKey(geminiConfig)) {
      const summaries = [
        `AI CONSULTANT SUMMARY (Simulated): ${profile.firstName} is highly motivated to find an partner who shares their intellectual values. Focus matches on candidates with similar career drives. Preference for primary language: ${profile.languages[0] || 'Hindi'}.`,
        `AI MEETING SUMMARY (Simulated): Client is open to relocation to metro cities for the right partner. Focus on career compatibility in ${profile.career.industry} sector.`,
        `AI PIPELINE SUMMARY (Simulated): Verified client profile and high-value income of ${profile.career.income} LPA. Cultural value matching is critical. Primary languages: ${profile.languages.join(", ")}.`
      ];
      const fallbackSummary = summaries[Math.floor(Math.random() * summaries.length)];
      return NextResponse.json({
        summary: fallbackSummary,
        warning: "No Gemini API key is configured. Showing simulated AI summary."
      });
    }

    const systemPrompt = `You are a Senior Matchmaking Consultant AI for "The Date Crew", an elite matrimonial agency. 
Your task is to write a concise, professional, 2-sentence matchmaker dossier summary for a client profile. 
Use a formal, supportive, yet analytical B2B CRM tone.
Do not use introductory text or meta-commentary. Output ONLY the summary text.`;

    const userPrompt = `Generate a timeline consultant summary note for:
Name: ${profile.firstName} ${profile.lastName}
Gender: ${profile.gender}
Age: ${profile.age}
City: ${profile.city}
Marital Status: ${profile.maritalStatus}
Profession: ${profile.career.designation} at ${profile.career.company}
Education: ${profile.education.degree} from ${profile.education.college}
Languages: ${profile.languages.join(", ")}
Diet: ${profile.preferences.lifestyleChoices?.diet || "Not specified"}`;

    const { data: summaryText, warning } = await runGeminiRequest(geminiConfig, async (client) => {
      const response = await client.models.generateContent({
        model: geminiConfig.model,
        contents: userPrompt,
        config: {
          maxOutputTokens: 180,
          systemInstruction: systemPrompt,
          temperature: geminiConfig.temperature
        }
      });

      const text = response.text?.trim();

      if (!text) {
        throw new Error("Gemini returned an empty summary response.");
      }

      return text;
    });

    return NextResponse.json({
      summary: summaryText,
      ...(warning ? { warning } : {})
    });
  } catch (error) {
    console.error("POST /api/ai/summary error:", error);
    const message = error instanceof Error ? error.message : "Failed to generate AI summary";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
