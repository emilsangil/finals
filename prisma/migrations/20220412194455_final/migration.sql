/*
  Warnings:

  - You are about to drop the `partyList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "partyList" DROP CONSTRAINT "partyList_partyOwner_fkey";

-- DropTable
DROP TABLE "partyList";

-- CreateTable
CREATE TABLE "Member" (
    "id" SERIAL NOT NULL,
    "memberName" TEXT NOT NULL,
    "memberPicked" TEXT NOT NULL,
    "partyName" TEXT NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartyList" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "partyOwner" TEXT NOT NULL,

    CONSTRAINT "PartyList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_memberName_key" ON "Member"("memberName");

-- CreateIndex
CREATE UNIQUE INDEX "Member_memberPicked_key" ON "Member"("memberPicked");

-- CreateIndex
CREATE UNIQUE INDEX "PartyList_name_key" ON "PartyList"("name");

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_partyName_fkey" FOREIGN KEY ("partyName") REFERENCES "PartyList"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartyList" ADD CONSTRAINT "PartyList_partyOwner_fkey" FOREIGN KEY ("partyOwner") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
