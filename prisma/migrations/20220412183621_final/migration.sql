/*
  Warnings:

  - You are about to drop the column `partyID` on the `User` table. All the data in the column will be lost.
  - Added the required column `partyMember` to the `partyList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `partyOwner` to the `partyList` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_partyID_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "partyID";

-- AlterTable
ALTER TABLE "partyList" ADD COLUMN     "partyMember" TEXT NOT NULL,
ADD COLUMN     "partyOwner" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "partyList" ADD CONSTRAINT "partyList_partyOwner_fkey" FOREIGN KEY ("partyOwner") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
