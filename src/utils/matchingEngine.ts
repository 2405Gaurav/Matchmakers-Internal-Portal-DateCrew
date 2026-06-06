import { CustomerProfile, CompatibilityReport } from "../types/crm";

export function calculateCompatibilityScore(
  profileA: CustomerProfile,
  profileB: CustomerProfile
): CompatibilityReport {
  // If same gender, let's return low compatibility unless it's a special search (but standard matrimonial search is opposite genders here)
  const isSameGender = profileA.gender === profileB.gender;

  let valuesMatch = 0;      // max 20
  let lifestyleMatch = 0;   // max 20
  let familyGoals = 0;      // max 15
  let careerCompatibility = 0; // max 15
  let relocationPreference = 0; // max 15
  let languageMatch = 0;    // max 15

  const strengths: string[] = [];
  const concerns: string[] = [];

  // --- 1. Values Match (Religion & Caste) ---
  if (profileA.religion === profileB.religion) {
    valuesMatch += 12;
    strengths.push(`Shared religious background: Both are ${profileA.religion}.`);
    
    if (profileA.caste === profileB.caste) {
      valuesMatch += 8;
      strengths.push(`Same community: Both belong to the ${profileA.caste} community.`);
    } else {
      valuesMatch += 5; // Open/compatible caste
    }
  } else {
    valuesMatch += 6;
    concerns.push(`Different religions: ${profileA.firstName} is ${profileA.religion} and ${profileB.firstName} is ${profileB.religion}.`);
  }

  // --- 2. Lifestyle Match (Diet, Drinking, Smoking) ---
  // Diet
  if (profileA.preferences.lifestyleChoices.diet === profileB.preferences.lifestyleChoices.diet) {
    lifestyleMatch += 8;
    strengths.push(`Aligned dietary preferences: Both are ${profileA.preferences.lifestyleChoices.diet === "veg" ? "Vegetarians" : profileA.preferences.lifestyleChoices.diet}.`);
  } else {
    const dietA = profileA.preferences.lifestyleChoices.diet;
    const dietB = profileB.preferences.lifestyleChoices.diet;
    if ((dietA === "veg" && dietB === "non-veg") || (dietA === "non-veg" && dietB === "veg")) {
      lifestyleMatch += 4;
      concerns.push(`Dietary difference: ${profileA.firstName} is ${dietA} and ${profileB.firstName} is ${dietB}.`);
    } else {
      lifestyleMatch += 6;
    }
  }

  // Drinking & Smoking
  const drinkA = profileA.preferences.lifestyleChoices.drinking;
  const drinkB = profileB.preferences.lifestyleChoices.drinking;
  if (drinkA === drinkB) {
    lifestyleMatch += 6;
  } else if (
    (drinkA === "never" && drinkB === "regularly") ||
    (drinkA === "regularly" && drinkB === "never")
  ) {
    lifestyleMatch += 2;
    concerns.push(`Lifestyle gap: Different drinking habits (${drinkA} vs ${drinkB}).`);
  } else {
    lifestyleMatch += 4;
  }

  const smokeA = profileA.preferences.lifestyleChoices.smoking;
  const smokeB = profileB.preferences.lifestyleChoices.smoking;
  if (smokeA === smokeB) {
    lifestyleMatch += 6;
  } else if (smokeA === "never" && smokeB === "never") {
    lifestyleMatch += 6;
    strengths.push("Both are non-smokers.");
  } else if (
    (smokeA === "never" && smokeB === "regularly") ||
    (smokeA === "regularly" && smokeB === "never")
  ) {
    lifestyleMatch += 1;
    concerns.push("Smoking preference conflict: One smokes regularly while the other does not.");
  } else {
    lifestyleMatch += 4;
  }

  // --- 3. Family Goals (Want Kids & Background) ---
  const kidsA = profileA.preferences.wantKids;
  const kidsB = profileB.preferences.wantKids;
  if (kidsA === kidsB || kidsA === "open" || kidsB === "open") {
    familyGoals += 8;
    if (kidsA === true && kidsB === true) {
      strengths.push("Both want to raise children in the future.");
    }
  } else {
    familyGoals += 3;
    concerns.push("Divergent family planning preferences regarding children.");
  }

  // Siblings & backgrounds
  familyGoals += 7;

  // --- 4. Career & Income Compatibility ---
  const incomeDiff = Math.abs(profileA.career.income - profileB.career.income);
  if (incomeDiff < 10) {
    careerCompatibility += 8;
    strengths.push("Highly compatible income profiles.");
  } else if (incomeDiff < 25) {
    careerCompatibility += 6;
  } else {
    careerCompatibility += 4;
    concerns.push(`Income discrepancy: Annual income levels differ by ${incomeDiff} LPA.`);
  }

  // Industries and degrees
  if (profileA.career.industry === profileB.career.industry) {
    careerCompatibility += 7;
    strengths.push(`Shared professional industry: Both work in ${profileA.career.industry}.`);
  } else {
    careerCompatibility += 5;
  }

  // --- 5. Relocation Preference & Location ---
  const locA = profileA.city;
  const locB = profileB.city;

  if (locA === locB) {
    relocationPreference += 15;
    strengths.push(`Same Location: Both reside in ${locA}.`);
  } else {
    const relocA = profileA.preferences.openToRelocate;
    const relocB = profileB.preferences.openToRelocate;
    
    const aOpenToB = profileA.preferences.preferredLocation.includes(locB);
    const bOpenToA = profileB.preferences.preferredLocation.includes(locA);

    if (relocA === true || relocB === true || aOpenToB || bOpenToA) {
      relocationPreference += 11;
      strengths.push(`Location flexible: One or both parties are open to relocate or prefer each other's cities.`);
    } else if (relocA === "depends" || relocB === "depends") {
      relocationPreference += 8;
      concerns.push(`Long distance: Living in ${locA} and ${locB}. Relocation depends on career or family discussions.`);
    } else {
      relocationPreference += 4;
      concerns.push(`Geographical challenge: Living in ${locA} and ${locB} with limited relocation flexibility.`);
    }
  }

  // --- 6. Language Match ---
  const commonLangs = profileA.languages.filter((l) => profileB.languages.includes(l));
  if (commonLangs.length >= 2) {
    languageMatch += 15;
    strengths.push(`Multilingual connection: Overlapping languages include ${commonLangs.join(" and ")}.`);
  } else if (commonLangs.length === 1) {
    languageMatch += 10;
    strengths.push(`Shared primary language: Both communicate in ${commonLangs[0]}.`);
  } else {
    languageMatch += 4;
    concerns.push("No overlapping native languages (both speak English, but primary home languages differ).");
  }

  // --- Age and Height check fallback penalties ---
  // Age difference
  const ageDiff = Math.abs(profileA.age - profileB.age);
  if (ageDiff > 7) {
    concerns.push(`Age gap: ${ageDiff} years difference in age.`);
  }
  
  // Height difference (Standard Indian matrimonial preference)
  const isMaleA = profileA.gender === "Male";
  const maleHeight = isMaleA ? profileA.height : profileB.height;
  const femaleHeight = isMaleA ? profileB.height : profileA.height;
  
  if (femaleHeight > maleHeight) {
    concerns.push("Height difference: Female is taller than male (traditionally preferred otherwise in matching).");
  }

  // Normalize final score out of 100
  let score = valuesMatch + lifestyleMatch + familyGoals + careerCompatibility + relocationPreference + languageMatch;
  if (isSameGender) {
    score = Math.floor(score * 0.3); // Heavy penalty for matching same genders in standard config
  }

  score = Math.max(0, Math.min(100, score));

  // --- Mock AI Consultant Insights ---
  const explanation = `${profileA.firstName} and ${profileB.firstName} demonstrate a promising ${score}% compatibility match. Their primary strength lies in ${
    score > 85 ? "exceptional structural, cultural, and professional alignment" : "a solid core of cultural values and geographical accessibility"
  }. Both have established professional careers in ${profileA.career.industry} and ${profileB.career.industry} respectively, matching their high-quality educational credentials from ${profileA.education.college} and ${profileB.education.college}. While there are minor points of discussion around ${
    concerns.length > 0 ? concerns[0].toLowerCase().replace(":", "") : "lifestyle preferences"
  }, their shared family ideals make them an excellent candidate pairing for an initial matchmaker-assisted call.`;

  // Suggested email intro
  const suggestedIntro = `Hi ${profileA.firstName},\n\nI hope you are doing well. I have found an exceptional profile that aligns closely with your values and preferences.\n\nMeet ${profileB.firstName}, a ${profileB.age}-year-old ${profileB.career.designation} at ${profileB.career.company} based in ${profileB.city}. What stood out to me was your shared interest in ${profileB.preferences.lifestyleChoices.diet === "veg" ? "vegetarianism" : "lifestyle choices"} and your common languages (${commonLangs.slice(0, 2).join(", ")}). Both of you also share a strong educational background, having graduated from ${profileA.education.college} and ${profileB.education.college} respectively.\n\nLet me know if you would like me to share your profile with ${profileB.firstName}'s matchmaker to initiate a connection.\n\nBest regards,\n[Your Name]\nSenior Matchmaking Consultant\nThe Date Crew`;

  return {
    score,
    breakdown: {
      valuesMatch,
      lifestyleMatch,
      familyGoals,
      careerCompatibility,
      relocationPreference,
      languageMatch
    },
    explanation,
    strengths,
    concerns,
    suggestedIntro
  };
}
