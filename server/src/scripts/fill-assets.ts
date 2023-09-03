import { B3Scraper } from 'b3-scraper'
import { prisma } from 'src/lib/prisma'

const fillAssets = async () => {
  const allStocks = await B3Scraper.getAllStocks()

  if (!allStocks) {
    console.log('Could not retrieve stocks')
    return
  }

  for (const stockInitialData of allStocks) {
    console.log(`Getting stock ${stockInitialData.ticker}`)
    const stock = await B3Scraper.getStock({ ticker: stockInitialData.ticker })

    if (!stock) {
      console.log(`Could not retrieve stock ${stockInitialData.ticker}`)
      continue
    }

    const asset = await prisma.asset.create({
      data: {
        ticker: stockInitialData.ticker.toLocaleLowerCase(),
        companyName: stockInitialData.companyName,
        fantasyName: stockInitialData.fantasyName,
        sector: stock.about.sector || 'N/A',
        subSector: stock.about.subSector || 'N/A',
      },
    })
    console.log(`Created asset for ${stockInitialData.ticker}`)

    await prisma.fundamental.create({
      data: {
        assetId: asset.id,
        assets: stock.balance.assets,
        assetTurnover: stock.profitability.assetTurnover,
        currentLiquidity: stock.debt.currentLiquidity,
        bookValuePerShare: stock.valuation.bookValuePerShare,
        changeInLast12Months: stock.valuation.changeInLast12Months,
        currentAssets: stock.balance.currentAssets,
        dividendYield: stock.valuation.dividendYield,
        ebit: stock.balance.ebit,
        ebitMargin: stock.efficiency.ebitMargin,
        enterpriseValue: stock.balance.enterpriseValue,
        equityToAssetsRatio: stock.debt.equityToAssetsRatio,
        evToEbitRatio: stock.valuation.evToEbitRatio,
        grossDebt: stock.balance.grossDebt,
        grossMargin: stock.efficiency.grossMargin,
        marketValue: stock.balance.marketValue,
        netDebt: stock.balance.netDebt,
        netDebtToEbitRatio: stock.debt.netDebtToEbitRatio,
        netDebtToEquityRatio: stock.debt.netDebtToEquityRatio,
        netIncome: stock.balance.netIncome,
        netMargin: stock.efficiency.netMargin,
        netProfit: stock.balance.netProfit,
        netWorth: stock.balance.netWorth,
        numberOfShares: stock.about.numberOfShares,
        price: stock.valuation.price,
        priceToAssets: stock.valuation.priceToAssets,
        priceToBookRatio: stock.valuation.priceToBookRatio,
        priceToCapitalRatio: stock.valuation.priceToCapitalRatio,
        priceToEbitRatio: stock.valuation.priceToEbitRatio,
        priceToLiquidAsset: stock.valuation.priceToLiquidAsset,
        priceToProfitRatio: stock.valuation.priceToProfitRatio,
        profitByShare: stock.valuation.profitByShare,
        returnOnEquity: stock.profitability.returnOnEquity,
        returnOnInvestedCapital: stock.profitability.returnOnInvestedCapital,
      },
    })
    console.log(`Created fundamentals for ${stockInitialData.ticker}`)
  }
}

fillAssets()
