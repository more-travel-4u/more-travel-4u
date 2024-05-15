/*
  Warnings:

  - You are about to drop the column `usersId` on the `Trips` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Trips" DROP CONSTRAINT "Trips_usersId_fkey";

-- AlterTable
ALTER TABLE "Trips" DROP COLUMN "usersId";

-- CreateTable
CREATE TABLE "_TripsToUsers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TripsToUsers_AB_unique" ON "_TripsToUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_TripsToUsers_B_index" ON "_TripsToUsers"("B");

-- AddForeignKey
ALTER TABLE "_TripsToUsers" ADD CONSTRAINT "_TripsToUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Trips"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TripsToUsers" ADD CONSTRAINT "_TripsToUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
