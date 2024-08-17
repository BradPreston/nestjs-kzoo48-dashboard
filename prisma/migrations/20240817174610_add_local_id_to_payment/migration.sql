/*
  Warnings:

  - A unique constraint covering the columns `[localId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "localId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Payment_localId_key" ON "Payment"("localId");
