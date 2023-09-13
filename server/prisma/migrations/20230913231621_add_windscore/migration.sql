-- CreateTable
CREATE TABLE "windScores" (
    "id" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "valuation" DOUBLE PRECISION,
    "efficiency" DOUBLE PRECISION,
    "debt" DOUBLE PRECISION,
    "profitability" DOUBLE PRECISION,
    "windFinalScore" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "windScores_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "windScores_assetId_key" ON "windScores"("assetId");

-- AddForeignKey
ALTER TABLE "windScores" ADD CONSTRAINT "windScores_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
