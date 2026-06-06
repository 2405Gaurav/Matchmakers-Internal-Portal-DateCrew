import { CustomerProfile } from "../types/crm";

export interface ParsedCriteria {
  gender?: "Male" | "Female";
  city?: string;
  religion?: string;
  maritalStatus?: "Never Married" | "Divorced" | "Widowed" | "Awaiting Divorce";
  minIncome?: number;
  maxIncome?: number;
  minAge?: number;
  maxAge?: number;
}

export function parseNaturalLanguageQuery(
  query: string,
  profiles: CustomerProfile[]
): { filtered: CustomerProfile[]; criteria: ParsedCriteria } {
  const criteria: ParsedCriteria = {};
  const lowerQuery = query.toLowerCase().trim();

  if (!lowerQuery) {
    return { filtered: profiles, criteria };
  }

  // 1. Parse Gender
  if (/\b(women|woman|female|females|girls|girl|brides|bride|she|her)\b/.test(lowerQuery)) {
    criteria.gender = "Female";
  } else if (/\b(men|man|male|males|boys|boy|grooms|groom|he|his)\b/.test(lowerQuery)) {
    criteria.gender = "Male";
  }

  // 2. Parse City (case-insensitive check)
  const knownCities = ["mumbai", "delhi", "bangalore", "pune", "hyderabad", "chennai", "kolkata", "ahmedabad", "jaipur", "gurgaon", "noida"];
  for (const city of knownCities) {
    const regex = new RegExp(`\\b${city}\\b`, "i");
    if (regex.test(lowerQuery)) {
      // Capitalize first letter
      criteria.city = city.charAt(0).toUpperCase() + city.slice(1);
      break;
    }
  }

  // 3. Parse Religion
  const knownReligions = ["hindu", "sikh", "christian", "jain", "muslim"];
  for (const religion of knownReligions) {
    const regex = new RegExp(`\\b${religion}\\b`, "i");
    if (regex.test(lowerQuery)) {
      criteria.religion = religion.charAt(0).toUpperCase() + religion.slice(1);
      break;
    }
  }

  // 4. Parse Marital Status
  if (/\b(divorced|separated)\b/.test(lowerQuery)) {
    criteria.maritalStatus = "Divorced";
  } else if (/\b(widowed|widow|widower)\b/.test(lowerQuery)) {
    criteria.maritalStatus = "Widowed";
  } else if (/\b(never married|single|unmarried)\b/.test(lowerQuery)) {
    criteria.maritalStatus = "Never Married";
  } else if (/\b(awaiting divorce|divorce pending)\b/.test(lowerQuery)) {
    criteria.maritalStatus = "Awaiting Divorce";
  }

  // 5. Parse Income (e.g. "earning above 15 LPA", "above 20 lakhs", "income > 12 lpa")
  // Regex to match "above X lpa", "earning > X", "income > X"
  const aboveIncomeRegex = /(?:above|greater than|>|more than|earning\s+above)\s*(\d+)\s*(?:lpa|lakh|lakhs)?/i;
  const aboveMatch = lowerQuery.match(aboveIncomeRegex);
  if (aboveMatch && aboveMatch[1]) {
    criteria.minIncome = parseInt(aboveMatch[1], 10);
  }

  const belowIncomeRegex = /(?:below|less than|<)\s*(\d+)\s*(?:lpa|lakh|lakhs)?/i;
  const belowMatch = lowerQuery.match(belowIncomeRegex);
  if (belowMatch && belowMatch[1]) {
    criteria.maxIncome = parseInt(belowMatch[1], 10);
  }

  // 6. Parse Age (e.g. "under 30", "between 25 and 32", "above 35")
  const betweenAgeRegex = /between\s+(\d+)\s+(?:and|to)\s+(\d+)/i;
  const betweenMatch = lowerQuery.match(betweenAgeRegex);
  if (betweenMatch && betweenMatch[1] && betweenMatch[2]) {
    criteria.minAge = parseInt(betweenMatch[1], 10);
    criteria.maxAge = parseInt(betweenMatch[2], 10);
  } else {
    const underAgeRegex = /(?:under|below|less than|<|younger than)\s*(\d+)/i;
    const underMatch = lowerQuery.match(underAgeRegex);
    if (underMatch && underMatch[1]) {
      criteria.maxAge = parseInt(underMatch[1], 10);
    }

    const overAgeRegex = /(?:above|over|older than|>|greater than)\s*(\d+)/i;
    const overMatch = lowerQuery.match(overAgeRegex);
    if (overMatch && overMatch[1]) {
      criteria.minAge = parseInt(overMatch[1], 10);
    }
  }

  // Filter profiles based on criteria
  const filtered = profiles.filter((p) => {
    if (criteria.gender && p.gender !== criteria.gender) return false;
    if (criteria.city && p.city.toLowerCase() !== criteria.city.toLowerCase()) return false;
    if (criteria.religion && p.religion.toLowerCase() !== criteria.religion.toLowerCase()) return false;
    if (criteria.maritalStatus && p.maritalStatus !== criteria.maritalStatus) return false;
    
    if (criteria.minIncome && p.career.income < criteria.minIncome) return false;
    if (criteria.maxIncome && p.career.income > criteria.maxIncome) return false;

    if (criteria.minAge && p.age < criteria.minAge) return false;
    if (criteria.maxAge && p.age > criteria.maxAge) return false;

    return true;
  });

  return { filtered, criteria };
}
