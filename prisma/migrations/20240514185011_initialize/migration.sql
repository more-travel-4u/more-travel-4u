-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trips" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "usersId" INTEGER,

    CONSTRAINT "Trips_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Events" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "tripsId" INTEGER,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Memos" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "usersId" INTEGER,
    "tripsId" INTEGER,

    CONSTRAINT "Memos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EventsToUsers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "_EventsToUsers_AB_unique" ON "_EventsToUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_EventsToUsers_B_index" ON "_EventsToUsers"("B");

-- AddForeignKey
ALTER TABLE "Trips" ADD CONSTRAINT "Trips_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_tripsId_fkey" FOREIGN KEY ("tripsId") REFERENCES "Trips"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Memos" ADD CONSTRAINT "Memos_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Memos" ADD CONSTRAINT "Memos_tripsId_fkey" FOREIGN KEY ("tripsId") REFERENCES "Trips"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventsToUsers" ADD CONSTRAINT "_EventsToUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventsToUsers" ADD CONSTRAINT "_EventsToUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
