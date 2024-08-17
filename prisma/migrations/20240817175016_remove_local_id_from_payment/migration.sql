/*
  Warnings:

  - You are about to drop the column `localId` on the `Payment` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Payment_localId_key";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "localId";
