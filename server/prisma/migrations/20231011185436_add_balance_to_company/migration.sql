/*
  Warnings:

  - You are about to drop the column `grossDebt` on the `assets` table. All the data in the column will be lost.
  - You are about to drop the column `netWorth` on the `assets` table. All the data in the column will be lost.
  - You are about to drop the column `profitable` on the `assets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "assets" DROP COLUMN "grossDebt",
DROP COLUMN "netWorth",
DROP COLUMN "profitable";

-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "grossDebt" DOUBLE PRECISION,
ADD COLUMN     "marketValue" DOUBLE PRECISION,
ADD COLUMN     "netIncome" DOUBLE PRECISION,
ADD COLUMN     "netWorth" DOUBLE PRECISION,
ADD COLUMN     "profitable" BOOLEAN;
