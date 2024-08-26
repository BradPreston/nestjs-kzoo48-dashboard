/*
  Warnings:

  - A unique constraint covering the columns `[entryId]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Entry_categoryId_key";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "entryId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Category_entryId_key" ON "Category"("entryId");
