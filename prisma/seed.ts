import { PrismaClient } from "@prisma/client";
import { mockProfiles } from "../src/data/mockProfiles";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  // Clean database
  console.log("Cleaning existing collections...");
  await prisma.matchNote.deleteMany({});
  await prisma.activityUpdate.deleteMany({});
  await prisma.customerProfile.deleteMany({});

  // 1. Prepare data for customer profiles
  const profilesData = mockProfiles.map(profile => ({
    id: profile.id,
    firstName: profile.firstName,
    lastName: profile.lastName,
    gender: profile.gender,
    dob: profile.dob,
    age: profile.age,
    height: profile.height,
    languages: JSON.stringify(profile.languages),
    religion: profile.religion,
    caste: profile.caste,
    maritalStatus: profile.maritalStatus,
    email: profile.email,
    phone: profile.phone,
    country: profile.country,
    city: profile.city,
    education: JSON.stringify(profile.education),
    career: JSON.stringify(profile.career),
    preferences: JSON.stringify(profile.preferences),
    familyInfo: JSON.stringify(profile.familyInfo),
    status: profile.status,
    assignedMatchmaker: profile.assignedMatchmaker,
    lastActivity: profile.lastActivity,
    savedMatches: JSON.stringify(profile.savedMatches || []),
    sentMatches: JSON.stringify(profile.sentMatches || []),
    imageUrl: profile.imageUrl || null
  }));

  // 2. Prepare data for notes
  const notesData: any[] = [];
  mockProfiles.forEach(profile => {
    if (profile.notes && profile.notes.length > 0) {
      profile.notes.forEach(note => {
        notesData.push({
          id: note.id,
          profileId: profile.id,
          date: note.date,
          author: note.author,
          content: note.content,
          isAiGenerated: note.isAiGenerated || false
        });
      });
    }
  });

  console.log(`Bulk inserting ${profilesData.length} profiles...`);
  await prisma.customerProfile.createMany({ data: profilesData });

  console.log(`Bulk inserting ${notesData.length} notes...`);
  // Notes use cuid() auto-generation in PostgreSQL — pass id from mock data or omit
  if (notesData.length > 0) {
    await prisma.matchNote.createMany({ data: notesData });
  }

  // Create initial activity updates
  const initialActivities = [
    {
      id: "act-1",
      timestamp: new Date().toISOString(),
      profileId: "male-1",
      profileName: "Amit Patel",
      type: "lead_created",
      message: "Amit Patel's profile has been created and assigned to Meera Sharma."
    },
    {
      id: "act-2",
      timestamp: new Date().toISOString(),
      profileId: "female-1",
      profileName: "Neha Sharma",
      type: "status_change",
      message: "Neha Sharma's status updated to 'Active Search'.",
      details: "Client package active, background check complete."
    }
  ];

  console.log("Bulk inserting activity updates...");
  await prisma.activityUpdate.createMany({ data: initialActivities });

  console.log("Seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

