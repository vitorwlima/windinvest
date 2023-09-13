/*
  Warnings:

  - You are about to drop the `fundamentals` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "fundamentals" DROP CONSTRAINT "fundamentals_assetId_fkey";

-- DropTable
DROP TABLE "fundamentals";
