-- CreateTable
CREATE TABLE "assets" (
    "id" TEXT NOT NULL,
    "ticker" TEXT NOT NULL,
    "fantasyName" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "subSector" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fundamentals" (
    "id" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "numberOfShares" INTEGER NOT NULL,
    "marketValue" DOUBLE PRECISION NOT NULL,
    "enterpriseValue" DOUBLE PRECISION NOT NULL,
    "netIncome" DOUBLE PRECISION NOT NULL,
    "ebit" DOUBLE PRECISION NOT NULL,
    "netProfit" DOUBLE PRECISION NOT NULL,
    "assets" DOUBLE PRECISION NOT NULL,
    "currentAssets" DOUBLE PRECISION NOT NULL,
    "grossDebt" DOUBLE PRECISION NOT NULL,
    "netDebt" DOUBLE PRECISION NOT NULL,
    "netWorth" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "dividendYield" DOUBLE PRECISION NOT NULL,
    "changeInLast12Months" DOUBLE PRECISION NOT NULL,
    "priceToProfitRatio" DOUBLE PRECISION NOT NULL,
    "priceToBookRatio" DOUBLE PRECISION NOT NULL,
    "evToEbitRatio" DOUBLE PRECISION NOT NULL,
    "priceToEbitRatio" DOUBLE PRECISION NOT NULL,
    "bookValuePerShare" DOUBLE PRECISION NOT NULL,
    "priceToAssets" DOUBLE PRECISION NOT NULL,
    "profitByShare" DOUBLE PRECISION NOT NULL,
    "priceToCapitalRatio" DOUBLE PRECISION NOT NULL,
    "priceToLiquidAsset" DOUBLE PRECISION NOT NULL,
    "netDebtToEquityRatio" DOUBLE PRECISION NOT NULL,
    "netDebtToEbitRatio" DOUBLE PRECISION NOT NULL,
    "equityToAssetsRatio" DOUBLE PRECISION NOT NULL,
    "currentLiquidity" DOUBLE PRECISION NOT NULL,
    "grossMargin" DOUBLE PRECISION NOT NULL,
    "ebitMargin" DOUBLE PRECISION NOT NULL,
    "netMargin" DOUBLE PRECISION NOT NULL,
    "returnOnEquity" DOUBLE PRECISION NOT NULL,
    "returnOnInvestedCapital" DOUBLE PRECISION NOT NULL,
    "assetTurnover" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fundamentals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "assets_ticker_key" ON "assets"("ticker");

-- CreateIndex
CREATE UNIQUE INDEX "fundamentals_assetId_key" ON "fundamentals"("assetId");

-- AddForeignKey
ALTER TABLE "fundamentals" ADD CONSTRAINT "fundamentals_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
