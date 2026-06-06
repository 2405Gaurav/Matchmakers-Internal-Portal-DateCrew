import { CustomerProfile, ProfileStatus, MatchNote } from "../types/crm";

// Simple LCG Pseudo-Random Number Generator to ensure deterministic generation
function createRandom(seed: number) {
  let currentSeed = seed;
  return function () {
    currentSeed = (currentSeed * 9301 + 49297) % 233280;
    return currentSeed / 233280;
  };
}

const maleFirstNames = [
  "Ethan", "Noah", "Liam", "Lucas", "Mason", "Logan", "Owen", "Caleb", "Wyatt", "Julian",
  "Nathan", "Isaac", "Adrian", "Jordan", "Xavier", "Dylan", "Hunter", "Connor", "Blake", "Cameron",
  "Asher", "Dominic", "Miles", "Parker", "Colton", "Jason", "Tristan", "Elliot", "Damian", "Micah",
  "Gavin", "Brody", "Roman", "Silas", "Jasper", "Vincent", "Declan", "Weston", "Cole", "Brandon",
  "Maxwell", "Tyler", "Ryder", "Emmett", "Bennett", "Kingston", "Harrison", "Preston", "Zachary", "Theo"
];

const femaleFirstNames = [
  "Priya", "Neha", "Ananya", "Sneha", "Shruti", "Riya", "Aisha", "Kiara", "Prachi", "Pooja",
  "Divya", "Aditi", "Tanvi", "Kavya", "Ishita", "Naina", "Simran", "Geeta", "Swati", "Shreya",
  "Deepa", "Payal", "Preeti", "Sonia", "Ritu", "Meenakshi", "Sunita", "Radhika", "Shweta", "Aarti",
  "Mansi", "Nikita", "Richa", "Pallavi", "Kanika", "Jyoti", "Vandana", "Sapna", "Kiran", "Nisha",
  "Kajol", "Karishma", "Kareena", "Sonali", "Namrata", "Amrita", "Priyanka", "Deepika", "Alia", "Kriti"
];

const lastNames = [
  "Sharma", "Verma", "Gupta", "Iyer", "Nair", "Patel", "Mehta", "Joshi", "Trivedi", "Kapoor",
  "Malhotra", "Reddy", "Rao", "Hegde", "Deshmukh", "Kulkarni", "Patil", "Banerjee", "Chatterjee", "Mukherjee",
  "Sen", "Bose", "Ghosh", "Das", "Roy", "Choudhury", "Singh", "Yadav", "Prasad", "Mishra",
  "Pandey", "Soni", "Shah", "Bhatia", "Khanna", "Saxena", "Srivastava", "Chauhan", "Rathore", "Agarwal",
  "Mittal", "Bansal", "Goel", "Garg", "Bhatt", "Shenoy", "Pillai", "Naidu", "Menon", "Joshi"
];

const cities = ["Mumbai", "Delhi", "Bangalore", "Pune", "Hyderabad", "Chennai", "Kolkata", "Ahmedabad", "Jaipur", "Gurgaon", "Noida"];
const religions = ["Hindu", "Sikh", "Christian", "Jain", "Muslim"];
const castes = {
  Hindu: ["Brahmin", "Kshatriya", "Vaishya", "Kayastha", "Maratha", "Reddy", "Nair", "General"],
  Sikh: ["Jat", "Khatri", "Ramgarhia", "Arora", "General"],
  Christian: ["Roman Catholic", "Protestant", "Syrian Christian", "General"],
  Jain: ["Oswal", "Digambar", "Shvetambar", "General"],
  Muslim: ["Sunni", "Shia", "Sayyid", "General"]
};
const languages = ["Hindi", "English", "Marathi", "Gujarati", "Punjabi", "Bengali", "Tamil", "Telugu", "Kannada", "Malayalam"];

const colleges = [
  "IIT Bombay", "IIT Delhi", "BITS Pilani", "IIM Ahmedabad", "ISB Hyderabad",
  "Delhi University", "St. Xavier's College, Mumbai", "RV College of Engineering",
  "VIT University", "Manipal Institute of Technology", "SRM University", "Symbiosis Pune",
  "SRCC Delhi", "HR College, Mumbai", "Christ University, Bangalore"
];

const degrees = ["B.Tech", "M.Tech", "MBA", "MBBS", "MD", "B.Com", "M.Com", "MS in CS", "Ph.D.", "BBA", "B.Arch", "LLB"];

const companies = [
  "Google", "Microsoft", "Amazon", "Infosys", "Tata Consultancy Services (TCS)",
  "HDFC Bank", "Goldman Sachs", "McKinsey & Co.", "Apollo Hospitals", "Reliance Industries",
  "Self-Employed (Start-up)", "Adani Group", "Deloitte", "PwC", "JPMorgan Chase"
];

const designations = [
  "Software Engineer", "Senior Product Manager", "Investment Banker", "Cardiologist",
  "Co-Founder & CEO", "Data Scientist", "Management Consultant", "Pediatrician",
  "Marketing Director", "Corporate Lawyer", "Architect", "UX Lead", "Financial Analyst"
];

const industries = ["Technology", "Finance", "Healthcare", "Consulting", "Entrepreneurship", "Legal", "Design", "Conglomerate"];

const matchmakers = ["Gaurav", "Rahul Verma", "Priya Iyer", "Sanjay Nair"];



const lifestyleChoices = {
  drinking: ["never", "socially", "regularly"] as const,
  smoking: ["never", "socially", "regularly"] as const,
  diet: ["veg", "non-veg", "eggetarian", "vegan"] as const
};

export function generateMockProfiles(): CustomerProfile[] {
  const list: CustomerProfile[] = [];
  const random = createRandom(987654); // Seed for reproducibility

  // Helper to pick a random item
  const pick = <T>(arr: readonly T[]): T => arr[Math.floor(random() * arr.length)];
  const pickMultiple = <T>(arr: T[], count: number): T[] => {
    const shuffled = [...arr].sort(() => random() - 0.5);
    return shuffled.slice(0, count);
  };
  const randRange = (min: number, max: number): number => Math.floor(random() * (max - min + 1)) + min;

  // Let's generate 200 profiles: 100 Male, 100 Female
  for (let i = 1; i <= 200; i++) {
    const gender = i % 2 === 1 ? "Male" : "Female";
    const firstName = gender === "Male" ? pick(maleFirstNames) : pick(femaleFirstNames);
    const lastName = pick(lastNames);
    
    // Age and DOB
    const age = randRange(23, 40);
    const birthYear = 2026 - age;
    const birthMonth = String(randRange(1, 12)).padStart(2, "0");
    const birthDay = String(randRange(1, 28)).padStart(2, "0");
    const dob = `${birthYear}-${birthMonth}-${birthDay}`;

    // Height: Male 165 - 190 cm, Female 150 - 175 cm
    const height = gender === "Male" ? randRange(165, 190) : randRange(150, 175);

    // Religion & Caste
    const religion = pick(religions);
    const casteList = castes[religion as keyof typeof castes] || ["General"];
    const caste = pick(casteList);
    
    // Marital Status
    const maritalStatus = random() > 0.85 ? (random() > 0.5 ? "Divorced" : "Widowed") : "Never Married";

    // Languages: always include English, plus 1-2 native ones
    const nativeLangs = pickMultiple(languages.filter(l => l !== "English"), randRange(1, 2));
    const profileLanguages = ["English", ...nativeLangs];

    // Contact
   const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}.${i}@example.com`;
    const phone = `+91 ${randRange(70000, 99999)} ${randRange(10000, 99999)}`;
    const city = pick(cities);

    // Education & Career
    const degree = pick(degrees);
    const college = pick(colleges);
    const university = `${college.split(",")[0]} University`;

    const company = pick(companies);
    const designation = pick(designations);
    const industry = pick(industries);
    
    // Income (LPA): 5 LPA to 70 LPA depending on age and education
    let income = randRange(6, 25);
    if (degree.includes("MBA") || degree.includes("MD") || degree.includes("Ph.D.") || designation.includes("CEO")) {
      income += randRange(15, 45);
    }
    if (age > 32) {
      income += randRange(10, 20);
    }

    // Preferences
    const wantKids = random() > 0.35 ? (random() > 0.5 ? true : false) : "open";
    const openToRelocate = random() > 0.4 ? (random() > 0.5 ? true : false) : "depends";
    const openToPets = random() > 0.4 ? (random() > 0.5 ? true : false) : "depends";
    
    const minPrefAge = Math.max(21, age - randRange(2, 6));
    const maxPrefAge = Math.min(45, age + randRange(2, 6));
    const preferredAgeRange = { min: minPrefAge, max: maxPrefAge };
    
    const prefLocations = pickMultiple(cities, randRange(2, 4));
    const lifestyleChoicesVal = {
      drinking: pick(lifestyleChoices.drinking),
      smoking: pick(lifestyleChoices.smoking),
      diet: pick(lifestyleChoices.diet)
    };

    // Family Info
    const siblingsCount = randRange(0, 3);
    const siblings = siblingsCount === 0 ? "Single Child" : `${siblingsCount} sibling(s) (${randRange(0, siblingsCount)} married)`;
    const backgrounds = [
      "Upper Middle Class family, father is a retired banker, mother is a teacher.",
      "Industrialist family based out of " + city + ", family owns a manufacturing unit.",
      "Traditional family value system, father runs a retail business, mother is a homemaker.",
      "Highly educated family, both parents are doctors running their own clinic.",
      "Defense background, father is an Army Officer, mother runs an NGO.",
      "Middle Class service class family, parents reside in native town."
    ];
    const familyBackground = pick(backgrounds);

    // Status: Weighted distributions (Active Search and Verified are more common)
    const statusRand = random();
    let status: ProfileStatus = "Active Search";
    if (statusRand < 0.1) status = "New Lead";
    else if (statusRand < 0.25) status = "Verification Pending";
    else if (statusRand < 0.6) status = "Profile Verified";
    else if (statusRand < 0.8) status = "Active Search";
    else if (statusRand < 0.9) status = "Matched";
    else if (statusRand < 0.95) status = "Engaged";
    else status = "Married";

    const assignedMatchmaker = pick(matchmakers);
    
    // Last activity: between 1 and 30 days ago
    const activityDaysAgo = randRange(0, 30);
    const activityDate = new Date();
    activityDate.setDate(activityDate.getDate() - activityDaysAgo);
    const lastActivity = activityDate.toISOString();

    // Notes history
    const notesCount = randRange(1, 3);
    const notes: MatchNote[] = [];
    for (let j = 0; j < notesCount; j++) {
      const noteDaysAgo = randRange(activityDaysAgo, activityDaysAgo + 10);
      const noteDate = new Date();
      noteDate.setDate(noteDate.getDate() - noteDaysAgo);
      
      const contents = [
        "Spoke to the client regarding preferences. They emphasize career compatibility and values match.",
        "Profile verification documents checked and verified. Solid family background.",
        "Candidate is very active. Showed interest in candidates based in " + prefLocations[0] + ".",
        "Had a detailed call. Clarified that relocation is fine if partner has an equivalent corporate job.",
        "Client met with matchmaker in person. Appears refined and looking for serious alliance.",
        "Prefers someone with similar food habits (specifically " + lifestyleChoicesVal.diet + ")."
      ];
      
      notes.push({
        id: `note-${i}-${j}`,
        date: noteDate.toISOString(),
        author: assignedMatchmaker,
        content: pick(contents)
      });
    }

    // Sort notes: newest first
    notes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    list.push({
      id: `profile-${1000 + i}`,
      firstName,
      lastName,
      gender,
      dob,
      age,
      height,
      languages: profileLanguages,
      religion,
      caste,
      maritalStatus,
      email,
      phone,
      country: "India",
      city,
      education: { college, degree, university },
      career: { company, designation, income, industry },
      preferences: {
        wantKids,
        openToRelocate,
        openToPets,
        preferredAgeRange,
        preferredLocation: prefLocations,
        lifestyleChoices: lifestyleChoicesVal
      },
      familyInfo: { siblings, background: familyBackground },
      status,
      assignedMatchmaker,
      lastActivity,
      notes,
      savedMatches: [],
      sentMatches: [],
      imageUrl: "" // Initials or CSS avatars will render this nicely
    });
  }

  return list;
}

// Generate the master list of mock profiles
export const mockProfiles = generateMockProfiles();
