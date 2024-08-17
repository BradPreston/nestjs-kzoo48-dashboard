/*
  Warnings:

  - A unique constraint covering the columns `[paymentId]` on the table `Entry` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Entry" ADD COLUMN     "paymentId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Entry_paymentId_key" ON "Entry"("paymentId");

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
