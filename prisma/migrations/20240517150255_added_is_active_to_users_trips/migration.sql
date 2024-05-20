/*
  Warnings:

  - You are about to drop the `_TripsToUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_TripsToUsers" DROP CONSTRAINT "_TripsToUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "_TripsToUsers" DROP CONSTRAINT "_TripsToUsers_B_fkey";

-- DropTable
DROP TABLE "_TripsToUsers";

-- CreateTable
CREATE TABLE "Users_Trips" (
    "id" SERIAL NOT NULL,
    "usersId" INTEGER NOT NULL,
    "tripsId" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL,

    CONSTRAINT "Users_Trips_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Users_Trips" ADD CONSTRAINT "Users_Trips_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users_Trips" ADD CONSTRAINT "Users_Trips_tripsId_fkey" FOREIGN KEY ("tripsId") REFERENCES "Trips"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
