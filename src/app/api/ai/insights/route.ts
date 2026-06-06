/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { calculateCompatibilityScore } from "@/utils/matchingEngine";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { clientA, clientB } = body;

    if (!clientA || !clientB) {
      return NextResponse.json({ error: "Both client profiles are required" }, { status: 400 });
    }

    const comp = calculateCompatibilityScore(clientA, clientB);

    const apiKey = process.env.GROQ_API_KEY;
    const model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

    if (!apiKey) {
      // Fallback simulated report
      return NextResponse.json({
        score: comp.score,
        breakdown: comp.breakdown,
        strengths: comp.strengths,
        concerns: comp.concerns,
        summary: `Both ${clientA.firstName} and ${clientB.firstName} represent high-achieving corporate professionals with matching family backgrounds. ${clientA.firstName}'s graduation from ${clientA.education.college} perfectly complements ${clientB.firstName}'s education from ${clientB.education.college}. Cultural value alignment (both ${clientA.religion}) provides a highly stable bedrock for negotiations. (Simulated AI)`,
        potential: `Very High. They share overlapping native languages, have highly compatible income streams, and similar diet/drinking habits. Since ${clientA.firstName} resides in ${clientA.city} and ${clientB.firstName} in ${clientB.city}, location relocation is the only major topic that will require a structured matchmaker-facilitated conversation. (Simulated AI)`,
        firstIntro: comp.suggestedIntro,
        icebreaker: `\"Since you both have spent considerable time working in the ${clientA.career.industry} and ${clientB.career.industry} sectors respectively, how do you manage to maintain a work-life balance? Also, you both share a love for ${clientA.preferences.lifestyleChoices.diet === "veg" ? "vegetarian delicacies" : "trying out new cuisines"}!\" (Simulated AI)`,
        warning: "GROQ_API_KEY is not set in your .env file. Showing simulated AI insights."
      });
    }

    // Call Groq API for rich structured insights
    const systemPrompt = `You are a Senior Matchmaking Director at "The Date Crew", a bespoke matrimonial agency.
Your task is to write relationship insights, compatibility briefs, and meeting icebreakers for a prospective couple.
You MUST respond with a valid JSON object matching the following structure:
{
  "summary": "A 3-sentence relationship compatibility summary describing how their backgrounds, careers, and personal preferences align.",
  "potential": "A 2-sentence match potential evaluation, highlighting their major points of alignment and potential dealmakers.",
  "icebreaker": "A warm, engaging icebreaker question to help them start their conversation, referencing their shared interests or backgrounds.",
  "firstIntro": "A warm, premium matchmaking email proposal draft introducing them to each other, written from the matchmaker (Meera Sharma)."
}
Do not return any conversational text outside of the JSON object. Output raw JSON only.`;

    const userPrompt = `Compare this couple:
Groom: ${clientA.firstName} ${clientA.lastName}
Age/City: ${clientA.age} / ${clientA.city}
Marital Status: ${clientA.maritalStatus}
Profession: ${clientA.career.designation} at ${clientA.career.company} (${clientA.career.income} LPA)
Education: ${clientA.education.degree} from ${clientA.education.college}
Religion/Caste: ${clientA.religion} / ${clientA.caste}
Languages: ${clientA.languages.join(", ")}
Diet: ${clientA.preferences.lifestyleChoices?.diet || "Not specified"}

Bride: ${clientB.firstName} ${clientB.lastName}
Age/City: ${clientB.age} / ${clientB.city}
Marital Status: ${clientB.maritalStatus}
Profession: ${clientB.career.designation} at ${clientB.career.company} (${clientB.career.income} LPA)
Education: ${clientB.education.degree} from ${clientB.education.college}
Religion/Caste: ${clientB.religion} / ${clientB.caste}
Languages: ${clientB.languages.join(", ")}
Diet: ${clientB.preferences.lifestyleChoices?.diet || "Not specified"}

Compatibility Score Computed by Engine: ${comp.score}/100`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: model,
        response_format: { type: "json_object" }, // Request JSON mode in Groq/OpenAI compatible models
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: parseFloat(process.env.GROQ_TEMPERATURE || "0.7"),
        max_tokens: 600
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Groq API returned status ${response.status}: ${errText}`);
    }

    const resData = await response.json();
    const content = resData.choices[0]?.message?.content;
    const aiAnalysis = JSON.parse(content);

    return NextResponse.json({
      score: comp.score,
      breakdown: comp.breakdown,
      strengths: comp.strengths,
      concerns: comp.concerns,
      summary: aiAnalysis.summary,
      potential: aiAnalysis.potential,
      icebreaker: aiAnalysis.icebreaker,
      firstIntro: aiAnalysis.firstIntro
    });
  } catch (error: any) {
    console.error("POST /api/ai/insights error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate AI insights" }, { status: 500 });
  }
}
