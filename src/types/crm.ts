export type ProfileStatus =
  | "New Lead"
  | "Verification Pending"
  | "Profile Verified"
  | "Active Search"
  | "Matched"
  | "Engaged"
  | "Married";

export interface MatchNote {
  id: string;
  date: string; // ISO string
  author: string;
  content: string;
  isAiGenerated?: boolean;
}

export interface EducationInfo {
  college: string;
  degree: string;
  university: string;
}

export interface CareerInfo {
  company: string;
  designation: string;
  income: number; // in Lakhs Per Annum (LPA)
  industry: string;
}

export interface LifestylePreferences {
  drinking: "never" | "socially" | "regularly";
  smoking: "never" | "socially" | "regularly";
  diet: "veg" | "non-veg" | "eggetarian" | "vegan";
}

export interface CustomerPreferences {
  wantKids: boolean | "open";
  openToRelocate: boolean | "depends";
  openToPets: boolean | "depends";
  preferredAgeRange: { min: number; max: number };
  preferredLocation: string[];
  lifestyleChoices: LifestylePreferences;
  // future: add preferredHeightMin / preferredHeightMax here if users want custom height filters
}

export interface FamilyInfo {
  siblings: string;
  background: string;
}

export interface CustomerProfile {
  id: string;
  firstName: string;
  lastName: string;
  gender: "Male" | "Female";
  dob: string; // YYYY-MM-DD
  age: number;
  height: number; // in cm (e.g. 175)
  languages: string[];
  religion: string;
  caste: string;
  maritalStatus: "Never Married" | "Divorced" | "Widowed" | "Awaiting Divorce";
  email: string;
  phone: string;
  country: string;
  city: string;
  education: EducationInfo;
  career: CareerInfo;
  preferences: CustomerPreferences;
  familyInfo: FamilyInfo;
  status: ProfileStatus;
  assignedMatchmaker: string;
  lastActivity: string; // ISO string
  notes: MatchNote[];
  savedMatches: string[]; // List of matched profile IDs saved
  sentMatches: string[];  // List of matched profile IDs sent
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface MatchmakerSession {
  email: string;
  name: string;
  role: string;
  isAuthenticated: boolean;
}

export interface ActivityUpdate {
  id: string;
  timestamp: string; // ISO string
  profileId: string;
  profileName: string;
  type: "status_change" | "note_added" | "match_sent" | "match_saved" | "lead_created";
  message: string;
  details?: string;
}

export interface CompatibilityReport {
  score: number;
  breakdown: {
    valuesMatch: number;           // max 20
    lifestyleMatch: number;        // max 15
    familyGoals: number;           // max 15
    careerCompatibility: number;   // max 15
    relocationPreference: number;  // max 15
    languageMatch: number;         // max 15
    heightCompatibility: number;   // max 5
  };
  explanation: string;
  strengths: string[];
  concerns: string[];
  suggestedIntro: string;
}