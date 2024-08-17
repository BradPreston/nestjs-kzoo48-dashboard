/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Entry` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Entry_email_key" ON "Entry"("email");
