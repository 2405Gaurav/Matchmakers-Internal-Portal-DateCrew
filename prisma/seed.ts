import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import bcrypt from "bcrypt";
import { mockProfiles } from "../src/data/mockProfiles";

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("Set DIRECT_URL or DATABASE_URL before running the seed script.");
}

const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Start seeding...");

  await prisma.matchNote.deleteMany();
  await prisma.activityUpdate.deleteMany();
  await prisma.customerProfile.deleteMany();
  await prisma.matchmakerAccount.deleteMany();

  const profilesData = mockProfiles.map((profile) => ({
    id:                 profile.id,
    firstName:          profile.firstName,
    lastName:           profile.lastName,
    gender:             profile.gender,
    dob:                profile.dob,
    age:                profile.age,
    height:             profile.height,
    languages:          profile.languages          as unknown as object,
    religion:           profile.religion,
    caste:              profile.caste,
    maritalStatus:      profile.maritalStatus,
    email:              profile.email,
    phone:              profile.phone,
    country:            profile.country,
    city:               profile.city,
    education:          profile.education          as unknown as object,
    career:             profile.career             as unknown as object,
    preferences:        profile.preferences        as unknown as object,
    familyInfo:         profile.familyInfo         as unknown as object,
    status:             profile.status,
    assignedMatchmaker: profile.assignedMatchmaker,
    lastActivity:       profile.lastActivity,
    savedMatches:       (profile.savedMatches ?? []) as unknown as object,
    sentMatches:        (profile.sentMatches  ?? []) as unknown as object,
    imageUrl:           profile.imageUrl ?? null,
  }));

  const notesData: {
    id: string;
    profileId: string;
    date: string;
    author: string;
    content: string;
    isAiGenerated: boolean;
  }[] = [];

  for (const profile of mockProfiles) {
    if (!profile.notes?.length) continue;
    for (const note of profile.notes) {
      notesData.push({
        id:            note.id,
        profileId:     profile.id,
        date:          note.date,
        author:        note.author,
        content:       note.content,
        isAiGenerated: note.isAiGenerated ?? false,
      });
    }
  }

  console.log(`Creating ${profilesData.length} profiles...`);
  await prisma.customerProfile.createMany({
    data: profilesData,
    skipDuplicates: true,
  });

  if (notesData.length > 0) {
    console.log(`Creating ${notesData.length} notes...`);
    await prisma.matchNote.createMany({
      data: notesData,
      skipDuplicates: true,
    });
  }

  await prisma.activityUpdate.createMany({
    data: [
      {
        id:          "act-1",
        timestamp:   new Date().toISOString(),
        profileId:   "male-1",
        profileName: "Amit Patel",
        type:        "lead_created",
        message:     "Amit Patel's profile has been created and assigned to Gaurav.",
      },
      {
        id:          "act-2",
        timestamp:   new Date().toISOString(),
        profileId:   "female-1",
        profileName: "Neha Sharma",
        type:        "status_change",
        message:     "Neha Sharma's status updated to 'Active Search'.",
        details:     "Client package active, background check complete.",
      },
    ],
    skipDuplicates: true,
  });

  const passwordHash = await bcrypt.hash("tdc@123", 10);

  await prisma.matchmakerAccount.upsert({
    where:  { email: "gaurav123@tdc.com" },
    update: { password: passwordHash, role: "Matchmaking Consultant", name: "Gaurav Thakur" },
    create: { email: "gaurav123@tdc.com", name: "Gaurav Thakur", role: "Matchmaking Consultant", password: passwordHash },
  });

  console.log("Seeding finished successfully.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });