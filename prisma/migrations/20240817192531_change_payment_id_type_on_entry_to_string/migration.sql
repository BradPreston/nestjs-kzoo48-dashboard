/*
  Warnings:

  - A unique constraint covering the columns `[eventId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Entry" ALTER COLUMN "paymentId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Payment_eventId_key" ON "Payment"("eventId");
