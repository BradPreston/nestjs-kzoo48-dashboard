/*
  Warnings:

  - You are about to drop the column `productName` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `paid` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Made the column `eventId` on table `Payment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `entryName` on table `Payment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `entryEmail` on table `Payment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `orderAmount` on table `Payment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `receiptUrl` on table `Payment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "productName",
ADD COLUMN     "paid" BOOLEAN NOT NULL,
ALTER COLUMN "eventId" SET NOT NULL,
ALTER COLUMN "entryName" SET NOT NULL,
ALTER COLUMN "entryEmail" SET NOT NULL,
ALTER COLUMN "orderAmount" SET NOT NULL,
ALTER COLUMN "receiptUrl" SET NOT NULL;
