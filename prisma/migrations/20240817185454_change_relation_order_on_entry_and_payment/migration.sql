/*
  Warnings:

  - You are about to drop the column `paymentId` on the `Entry` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[entryId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Entry" DROP CONSTRAINT "Entry_paymentId_fkey";

-- DropIndex
DROP INDEX "Entry_paymentId_key";

-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "paymentId";

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "entryId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Payment_entryId_key" ON "Payment"("entryId");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE SET NULL ON UPDATE CASCADE;
