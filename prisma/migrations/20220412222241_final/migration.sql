/*
  Warnings:

  - You are about to drop the `Member` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_partyName_fkey";

-- AlterTable
ALTER TABLE "Partylist" ADD COLUMN     "Member" TEXT[];

-- DropTable
DROP TABLE "Member";
