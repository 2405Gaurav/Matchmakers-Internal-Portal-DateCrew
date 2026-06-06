import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Connecting to database...");
  try {
    const profilesCount = await prisma.customerProfile.count();
    console.log("Customer profiles count:", profilesCount);
    
    const activitiesCount = await prisma.activityUpdate.count();
    console.log("Activity updates count:", activitiesCount);
    
    const profiles = await prisma.customerProfile.findMany({ take: 2 });
    console.log("Sample profiles:", JSON.stringify(profiles, null, 2));
  } catch (error) {
    console.error("Database connection/query error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
