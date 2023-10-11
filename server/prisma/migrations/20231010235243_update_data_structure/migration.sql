/*
  Warnings:

  - You are about to drop the column `companyName` on the `assets` table. All the data in the column will be lost.
  - You are about to drop the column `fantasyName` on the `assets` table. All the data in the column will be lost.
  - You are about to drop the column `marketValue` on the `assets` table. All the data in the column will be lost.
  - You are about to drop the column `netIncome` on the `assets` table. All the data in the column will be lost.
  - You are about to drop the column `sector` on the `assets` table. All the data in the column will be lost.
  - You are about to drop the column `subSector` on the `assets` table. All the data in the column will be lost.
  - Added the required column `companyId` to the `assets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `liquidity` to the `assets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `assets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `userSubscriptions` table without a default value. This is not possible if the table is not empty.
  - Made the column `checklistDebt` on table `windScores` required. This step will fail if there are existing NULL values in that column.
  - Made the column `checklistLiquidity` on table `windScores` required. This step will fail if there are existing NULL values in that column.
  - Made the column `checklistProfit` on table `windScores` required. This step will fail if there are existing NULL values in that column.
  - Made the column `checklistRoe` on table `windScores` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "AssetType" AS ENUM ('ON', 'PN', 'UNIT', 'OTHER');

-- AlterTable
ALTER TABLE "assets" DROP COLUMN "companyName",
DROP COLUMN "fantasyName",
DROP COLUMN "marketValue",
DROP COLUMN "netIncome",
DROP COLUMN "sector",
DROP COLUMN "subSector",
ADD COLUMN     "companyId" TEXT NOT NULL,
ADD COLUMN     "liquidity" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "type" "AssetType" NOT NULL;

-- AlterTable
ALTER TABLE "userSubscriptions" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "windScores" ALTER COLUMN "checklistDebt" SET NOT NULL,
ALTER COLUMN "checklistLiquidity" SET NOT NULL,
ALTER COLUMN "checklistProfit" SET NOT NULL,
ALTER COLUMN "checklistRoe" SET NOT NULL;

-- CreateTable
CREATE TABLE "sectors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sectors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subsectors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sectorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subsectors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL,
    "fantasyName" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "sectorId" TEXT,
    "subsectorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fundamentals" (
    "id" TEXT NOT NULL,
    "dividendYield" DOUBLE PRECISION,
    "priceToProfitRatio" DOUBLE PRECISION,
    "priceToBookRatio" DOUBLE PRECISION,
    "evToEbitRatio" DOUBLE PRECISION,
    "priceToEbitRatio" DOUBLE PRECISION,
    "bookValuePerShare" DOUBLE PRECISION,
    "priceToAssets" DOUBLE PRECISION,
    "profitByShare" DOUBLE PRECISION,
    "priceToCapitalRatio" DOUBLE PRECISION,
    "priceToLiquidAsset" DOUBLE PRECISION,
    "netDebtToEquityRatio" DOUBLE PRECISION,
    "netDebtToEbitRatio" DOUBLE PRECISION,
    "equityToAssetsRatio" DOUBLE PRECISION,
    "currentLiquidity" DOUBLE PRECISION,
    "grossMargin" DOUBLE PRECISION,
    "ebitMargin" DOUBLE PRECISION,
    "netMargin" DOUBLE PRECISION,
    "returnOnEquity" DOUBLE PRECISION,
    "returnOnInvestedCapital" DOUBLE PRECISION,
    "assetTurnover" DOUBLE PRECISION,
    "assetId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fundamentals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "fundamentals_assetId_key" ON "fundamentals"("assetId");

-- AddForeignKey
ALTER TABLE "subsectors" ADD CONSTRAINT "subsectors_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "sectors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "sectors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_subsectorId_fkey" FOREIGN KEY ("subsectorId") REFERENCES "subsectors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fundamentals" ADD CONSTRAINT "fundamentals_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
