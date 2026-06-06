import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { profile } = body;

    if (!profile) {
      return NextResponse.json({ error: "Profile parameter required" }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;
    const model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile"; // Default model

    if (!apiKey) {
      // Fallback if no Groq API Key is configured
      const summaries = [
        `AI CONSULTANT SUMMARY (Simulated): ${profile.firstName} is highly motivated to find an partner who shares their intellectual values. Focus matches on candidates with similar career drives. Preference for primary language: ${profile.languages[0] || 'Hindi'}.`,
        `AI MEETING SUMMARY (Simulated): Client is open to relocation to metro cities for the right partner. Focus on career compatibility in ${profile.career.industry} sector.`,
        `AI PIPELINE SUMMARY (Simulated): Verified client profile and high-value income of ${profile.career.income} LPA. Cultural value matching is critical. Primary languages: ${profile.languages.join(", ")}.`
      ];
      const fallbackSummary = summaries[Math.floor(Math.random() * summaries.length)];
      return NextResponse.json({
        summary: fallbackSummary,
        warning: "GROQ_API_KEY is not set in your .env file. Showing simulated AI summary."
      });
    }

    // Call Groq API
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

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: parseFloat(process.env.GROQ_TEMPERATURE || "0.6"),
        max_tokens: 150
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Groq API returned status ${response.status}: ${errText}`);
    }

    const resData = await response.json();
    const summaryText = resData.choices[0]?.message?.content?.trim();

    return NextResponse.json({ summary: summaryText });
  } catch (error) {
    console.error("POST /api/ai/summary error:", error);
    const message = error instanceof Error ? error.message : "Failed to generate AI summary";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
