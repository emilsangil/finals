-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "partyID" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "partyList" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "partyList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_partyID_fkey" FOREIGN KEY ("partyID") REFERENCES "partyList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
