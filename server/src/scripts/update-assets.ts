import { B3Scraper } from 'b3-scraper'
import { getWindScore } from 'src/lib/getWindScore'
import { prisma } from 'src/lib/prisma'

const updateAssets = async () => {
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

    const assetExists = await prisma.asset.findUnique({
      where: {
        ticker: stockInitialData.ticker.toUpperCase(),
      },
    })

    let assetId: string

    if (assetExists) {
      const asset = await prisma.asset.update({
        where: {
          ticker: stockInitialData.ticker.toUpperCase(),
        },
        data: {
          companyName: stockInitialData.companyName,
          fantasyName: stockInitialData.fantasyName,
          sector: stock.about.sector || 'N/A',
          subSector: stock.about.subSector || 'N/A',
        },
      })
      console.log(`Updated asset for ${stockInitialData.ticker}`)

      assetId = asset.id
    } else {
      const asset = await prisma.asset.create({
        data: {
          ticker: stockInitialData.ticker.toUpperCase(),
          companyName: stockInitialData.companyName,
          fantasyName: stockInitialData.fantasyName,
          sector: stock.about.sector || 'N/A',
          subSector: stock.about.subSector || 'N/A',
        },
      })
      console.log(`Created asset for ${stockInitialData.ticker}`)

      assetId = asset.id
    }

    const windScore = getWindScore(stock)

    const windScoreExists = await prisma.windScore.findUnique({
      where: {
        assetId,
      },
    })

    if (windScoreExists) {
      await prisma.windScore.update({
        where: {
          assetId,
        },
        data: {
          debt: windScore.debt,
          efficiency: windScore.efficiency,
          profitability: windScore.profitability,
          valuation: windScore.valuation,
          windFinalScore: windScore.windFinalScore,
        },
      })

      console.log(`Updated windscore for ${stockInitialData.ticker}`)
    } else {
      await prisma.windScore.create({
        data: {
          assetId,
          debt: windScore.debt,
          efficiency: windScore.efficiency,
          profitability: windScore.profitability,
          valuation: windScore.valuation,
          windFinalScore: windScore.windFinalScore,
        },
      })

      console.log(`Created windscore for ${stockInitialData.ticker}`)
    }
  }
}

updateAssets()
