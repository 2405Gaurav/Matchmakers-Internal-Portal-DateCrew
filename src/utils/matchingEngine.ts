import { CustomerProfile, CompatibilityReport } from "../types/crm";

export function calculateCompatibilityScore(
  profileA: CustomerProfile,
  profileB: CustomerProfile
): CompatibilityReport {

  // TDC is a hetro matrimonial service for now so same gender = skip
  // if they ever want to support same-sex matching in future, just remove this block
  // rest of the engine is gender neutral so no other changes needed
  if (profileA.gender === profileB.gender) {
    return {
      score: 0,
      breakdown: {
        valuesMatch: 0,
        lifestyleMatch: 0,
        familyGoals: 0,
        careerCompatibility: 0,
        relocationPreference: 0,
        languageMatch: 0,
        heightCompatibility: 0,
      },
      explanation: "This match was skipped — TDC currently matches opposite-gender profiles only.",
      strengths: [],
      concerns: ["Same-gender pairing is outside TDC's current matching scope."],
      suggestedIntro: "",
    };
  }

  let valuesMatch = 0;          // max 20
  let lifestyleMatch = 0;       // max 15 (trimmed from 20, 5pts moved to height)
  let familyGoals = 0;          // max 15
  let careerCompatibility = 0;  // max 15
  let relocationPreference = 0; // max 15
  let languageMatch = 0;        // max 15
  let heightCompatibility = 0;  // max 5 (new, carved out of lifestyle)

  const strengths: string[] = [];
  const concerns: string[] = [];

  // --- 1. Values Match (max 20pts) ---
  // religion and caste are big deal in indian matrimonial so weighted heavily
  if (profileA.religion === profileB.religion) {
    valuesMatch += 12;
    strengths.push(`Shared religious background: Both are ${profileA.religion}.`);

    if (profileA.caste === profileB.caste) {
      valuesMatch += 8;
      strengths.push(`Same community: Both belong to the ${profileA.caste} community.`);
    } else {
      // same religion diff caste, still okay
      valuesMatch += 4;
    }
  } else {
    // diff religion, flag it but not a hard block
    valuesMatch += 5;
    concerns.push(
      `Different religions: ${profileA.firstName} is ${profileA.religion} and ${profileB.firstName} is ${profileB.religion}. Worth an open conversation.`
    );
  }

  // --- 2. Lifestyle Match (max 15pts, was 20 before) ---
  // diet, drinking, smoking — small things that become big after marraige
  // trimmed slightly to make room for height scoring, priorities adjusted

  // diet (max 6pts, was 8)
  const dietA = profileA.preferences.lifestyleChoices.diet;
  const dietB = profileB.preferences.lifestyleChoices.diet;

  if (dietA === dietB) {
    lifestyleMatch += 6;
    strengths.push(
      `Aligned dietary preferences: Both are ${dietA === "veg" ? "Vegetarian" : dietA}.`
    );
  } else if (
    (dietA === "veg" && dietB === "non-veg") ||
    (dietA === "non-veg" && dietB === "veg")
  ) {
    // hard clash, shared kitchen becomes a problem
    lifestyleMatch += 2;
    concerns.push(
      `Dietary difference: ${profileA.firstName} is ${dietA} and ${profileB.firstName} is ${dietB}. Could be a source of daily friction.`
    );
  } else {
    // eggetarian or pescatarian in the mix, manageable
    lifestyleMatch += 4;
  }

  // drinking (max 5pts, was 6)
  const drinkA = profileA.preferences.lifestyleChoices.drinking;
  const drinkB = profileB.preferences.lifestyleChoices.drinking;

  if (drinkA === drinkB) {
    lifestyleMatch += 5;
  } else if (
    (drinkA === "never" && drinkB === "regularly") ||
    (drinkA === "regularly" && drinkB === "never")
  ) {
    lifestyleMatch += 1;
    concerns.push(
      `Different drinking habits: ${profileA.firstName} drinks ${drinkA}, ${profileB.firstName} drinks ${drinkB}. Worth a candid chat.`
    );
  } else {
    // one occasional one regular, not ideal but workable
    lifestyleMatch += 3;
  }

  // smoking (max 4pts, was 6)
  const smokeA = profileA.preferences.lifestyleChoices.smoking;
  const smokeB = profileB.preferences.lifestyleChoices.smoking;

  if (smokeA === smokeB) {
    lifestyleMatch += 4;
    if (smokeA === "never") {
      strengths.push("Both are non-smokers — great for a healthy shared environment.");
    }
  } else if (
    (smokeA === "never" && smokeB === "regularly") ||
    (smokeA === "regularly" && smokeB === "never")
  ) {
    // this one is hard to ignore longterm
    lifestyleMatch += 1;
    concerns.push(
      "Smoking habit mismatch: One partner smokes regularly while the other doesn't. This often becomes a recurring point of tension."
    );
  } else {
    lifestyleMatch += 2;
  }

  // --- 3. Family Goals (max 15pts) ---
  // removed the free +7 pts for "sibling background" that was there before, had no logic
  // replaced it with age gap scoring which actually matters and was only a text flag before

  // kids preference (max 8pts)
  const kidsA = profileA.preferences.wantKids;
  const kidsB = profileB.preferences.wantKids;

  if (kidsA === kidsB) {
    familyGoals += 8;
    if (kidsA === true) {
      strengths.push("Both want to raise children together in the future.");
    } else if (kidsA === false) {
      strengths.push("Both are aligned on not wanting children — an important shared decision.");
    } else {
      strengths.push("Both are open about family planning — good foundation for an honest discussion.");
    }
  } else if (kidsA === "open" || kidsB === "open") {
    // one is flexibe, room to talk
    familyGoals += 5;
  } else {
    // one wants kids other doesnt, this is a real issue
    familyGoals += 1;
    concerns.push(
      "Conflicting family planning views: One wants children, the other doesn't. This needs an early, honest conversation."
    );
  }

  // age gap now effects the score (max 7pts), wasnt doing anything before except showing text
  const ageDiff = Math.abs(profileA.age - profileB.age);
  if (ageDiff <= 3) {
    familyGoals += 7;
    strengths.push(`Close in age: Only ${ageDiff} year(s) apart — great for life stage alignment.`);
  } else if (ageDiff <= 6) {
    familyGoals += 5;
  } else if (ageDiff <= 10) {
    familyGoals += 3;
    concerns.push(
      `Age gap of ${ageDiff} years: Not a dealbreaker, but worth discussing life stage expectations.`
    );
  } else {
    familyGoals += 1;
    concerns.push(
      `Significant age gap: ${ageDiff} years difference. Likely at very different life stages — surface this early.`
    );
  }

  // --- 4. Career & Income (max 15pts) ---
  // old code used raw LPA diff which was unfair, 30lpa gap means diff things at diff income levels
  // now using relative % gap which is more accurate

  const incomeA = profileA.career.income;
  const incomeB = profileB.career.income;
  const higherIncome = Math.max(incomeA, incomeB);

  // gap as % of higher earner
  const incomeGapPercent = higherIncome > 0
    ? ((Math.abs(incomeA - incomeB)) / higherIncome) * 100
    : 0;

  if (incomeGapPercent < 20) {
    careerCompatibility += 8;
    strengths.push("Well-matched income profiles — similar economic standing.");
  } else if (incomeGapPercent < 50) {
    // noticable gap but not extreme
    careerCompatibility += 5;
  } else {
    careerCompatibility += 2;
    concerns.push(
      `Large income gap: ${Math.round(incomeGapPercent)}% difference in earnings. Worth discussing financial expectations and lifestyle alignment.`
    );
  }

  // same industry = shared understanding of work life (max 7pts)
  if (profileA.career.industry === profileB.career.industry) {
    careerCompatibility += 7;
    strengths.push(
      `Same professional world: Both work in ${profileA.career.industry} — built-in mutual understanding.`
    );
  } else {
    // diff industry is fine, just no bonus
    careerCompatibility += 4;
  }

  // --- 5. Relocation (max 15pts) ---
  // city and flexibility, pretty straighforward
  const locA = profileA.city;
  const locB = profileB.city;

  if (locA === locB) {
    relocationPreference += 15;
    strengths.push(`Same city: Both are based in ${locA} — no relocation headaches.`);
  } else {
    const relocA = profileA.preferences.openToRelocate;
    const relocB = profileB.preferences.openToRelocate;
    const aOpenToB = profileA.preferences.preferredLocation.includes(locB);
    const bOpenToA = profileB.preferences.preferredLocation.includes(locA);

    if (relocA === true || relocB === true || aOpenToB || bOpenToA) {
      relocationPreference += 11;
      strengths.push(
        "Location flexible: At least one of them is open to relocating — distance is solvable."
      );
    } else if (relocA === "depends" || relocB === "depends") {
      relocationPreference += 7;
      concerns.push(
        `Different cities (${locA} and ${locB}): Relocation possible but needs a career/family discussion.`
      );
    } else {
      relocationPreference += 3;
      concerns.push(
        `Both in different cities (${locA} and ${locB}) with not much flexibility. Structral challenge.`
      );
    }
  }

  // --- 6. Language (max 15pts) ---
  // shared language = shared culture at home, its more than just communicaton
  const commonLangs = profileA.languages.filter((l) => profileB.languages.includes(l));

  if (commonLangs.length >= 2) {
    languageMatch += 15;
    strengths.push(
      `Multilingual connection: Shared languages include ${commonLangs.slice(0, 3).join(", ")}.`
    );
  } else if (commonLangs.length === 1) {
    languageMatch += 10;
    strengths.push(`Common language: Both speak ${commonLangs[0]} — a strong communication anchor.`);
  } else {
    languageMatch += 3;
    concerns.push(
      "No shared native language. Communication in English works, but home-language comfort may differ — worth exploring."
    );
  }

  // --- 7. Height Compatibility (max 5pts) ---
  // height is a real filter people use in indian matrimonial, shaadi.com etc all have it
  // we dont have preferredHeightMin/Max in the profile type so working with actual heights
  // logic: figure out who is male/female, check if the gap is in a reasonable range
  // no preferredHeightMin/Max in types rn, can add later if needed — this is a good starting point
  const maleHeight = profileA.gender === "Male" ? profileA.height : profileB.height;
  const femaleHeight = profileA.gender === "Male" ? profileB.height : profileA.height;
  const heightDiff = maleHeight - femaleHeight; // positive = male taller, negative = female taller

  if (heightDiff >= 0 && heightDiff <= 15) {
    // male taller by up to 15cm, ideal range
    heightCompatibility += 5;
    strengths.push(`Good height pairing: ${maleHeight}cm and ${femaleHeight}cm — comfortable match.`);
  } else if (heightDiff > 15 && heightDiff <= 25) {
    // male quite a bit taller, still fine just noticable
    heightCompatibility += 3;
  } else if (heightDiff < 0 && heightDiff >= -5) {
    // female slightly taller, common enough, not a big deal
    heightCompatibility += 3;
  } else if (heightDiff < -5) {
    // female noticeably taller, flagged as a preference concern not a dealbreaker
    heightCompatibility += 1;
    concerns.push(
      `Height difference: ${profileB.firstName} is taller by ${Math.abs(heightDiff)}cm. May be a preference factor worth discussing.`
    );
  } else {
    // very large gap (male 25cm+ taller), unusual but not scored as concern
    heightCompatibility += 2;
  }

  // final score, clamped 0-100
  // max possible: 20 + 15 + 15 + 15 + 15 + 15 + 5 = 100
  let score = valuesMatch + lifestyleMatch + familyGoals + careerCompatibility + relocationPreference + languageMatch + heightCompatibility;
  score = Math.max(0, Math.min(100, score));

  // explanation string passed to gemini/ai layer for enrichment
  const explanation = `${profileA.firstName} and ${profileB.firstName} have a ${score}% compatibility score. ${
    score >= 80
      ? "This is a strong match with well-aligned values, lifestyle, and life goals."
      : score >= 60
      ? "This is a promising match with a good foundation — a few areas worth discussing openly."
      : "This match has some meaningful differences. Not incompatible, but requires honest early conversations."
  } Their ${strengths.length > 0 ? `standout strengths include ${strengths[0].toLowerCase()}` : "profile alignment is moderate"}. ${
    concerns.length > 0
      ? `The primary point of discussion would be around ${concerns[0].toLowerCase().replace(":", "")}.`
      : "No major concerns flagged."
  } Overall, they are ${score >= 70 ? "a recommended pairing for an initial matchmaker-assisted call." : "worth considering after a deeper profile review."}`;

  // email intro template, same structure as before
  const suggestedIntro = `Hi ${profileA.firstName},\n\nI hope you're doing well! I came across a profile I think is worth your attention.\n\nMeet ${profileB.firstName}, a ${profileB.age}-year-old ${profileB.career.designation} at ${profileB.career.company}, currently based in ${profileB.city}. What stood out: ${
    commonLangs.length > 0
      ? `you both speak ${commonLangs.slice(0, 2).join(" and ")}`
      : "you share some strong values"
  }, and both have solid educational backgrounds from ${profileA.education.college} and ${profileB.education.college} respectively.\n\nWould you like me to initiate a connection with ${profileB.firstName}'s matchmaker? Happy to share more details.\n\nWarm regards,\n[Your Name]\nSenior Matchmaking Consultant\nThe Date Crew`;

  return {
    score,
    breakdown: {
      valuesMatch,
      lifestyleMatch,
      familyGoals,
      careerCompatibility,
      relocationPreference,
      languageMatch,
      heightCompatibility,
    },
    explanation,
    strengths,
    concerns,
    suggestedIntro
  };
}