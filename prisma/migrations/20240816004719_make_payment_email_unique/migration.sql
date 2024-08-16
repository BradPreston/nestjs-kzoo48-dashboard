/*
  Warnings:

  - A unique constraint covering the columns `[entryEmail]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Payment_entryEmail_key" ON "Payment"("entryEmail");
