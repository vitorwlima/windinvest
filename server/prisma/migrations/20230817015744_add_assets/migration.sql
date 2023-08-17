-- CreateEnum
CREATE TYPE "AssetCategory" AS ENUM ('stock', 'fii');

-- CreateEnum
CREATE TYPE "AssetType" AS ENUM ('ON', 'PN', 'UNIT');

-- CreateTable
CREATE TABLE "assets" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "fantasy_name" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "category" "AssetType" NOT NULL,
    "type" "AssetType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "assets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "assets_code_key" ON "assets"("code");
