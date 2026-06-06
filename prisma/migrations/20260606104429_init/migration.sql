-- CreateTable
CREATE TABLE "CustomerProfile" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "languages" TEXT NOT NULL,
    "religion" TEXT NOT NULL,
    "caste" TEXT NOT NULL,
    "maritalStatus" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "education" TEXT NOT NULL,
    "career" TEXT NOT NULL,
    "preferences" TEXT NOT NULL,
    "familyInfo" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "assignedMatchmaker" TEXT NOT NULL,
    "lastActivity" TEXT NOT NULL,
    "savedMatches" TEXT NOT NULL,
    "sentMatches" TEXT NOT NULL,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchNote" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isAiGenerated" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "MatchNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityUpdate" (
    "id" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "profileName" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "details" TEXT,

    CONSTRAINT "ActivityUpdate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchmakerAccount" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'Matchmaking Consultant',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MatchmakerAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MatchmakerAccount_email_key" ON "MatchmakerAccount"("email");

-- AddForeignKey
ALTER TABLE "MatchNote" ADD CONSTRAINT "MatchNote_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "CustomerProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
