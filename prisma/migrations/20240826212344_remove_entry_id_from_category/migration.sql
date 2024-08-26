/*
  Warnings:

  - You are about to drop the column `entryId` on the `Category` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Category_entryId_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "entryId";
