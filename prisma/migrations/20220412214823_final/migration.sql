/*
  Warnings:

  - You are about to drop the `PartyList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_partyName_fkey";

-- DropForeignKey
ALTER TABLE "PartyList" DROP CONSTRAINT "PartyList_partyOwner_fkey";

-- DropTable
DROP TABLE "PartyList";

-- CreateTable
CREATE TABLE "Partylist" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "partyOwner" TEXT NOT NULL,

    CONSTRAINT "Partylist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Partylist_name_key" ON "Partylist"("name");

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_partyName_fkey" FOREIGN KEY ("partyName") REFERENCES "Partylist"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partylist" ADD CONSTRAINT "Partylist_partyOwner_fkey" FOREIGN KEY ("partyOwner") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
