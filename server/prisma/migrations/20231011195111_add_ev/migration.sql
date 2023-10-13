/*
  Warnings:

  - You are about to drop the column `netIncome` on the `companies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "companies" DROP COLUMN "netIncome",
ADD COLUMN     "enterpriseValue" DOUBLE PRECISION;
