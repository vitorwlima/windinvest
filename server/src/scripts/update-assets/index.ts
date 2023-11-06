import { prisma } from 'src/lib/prisma'
import { handleCreateAsset } from './createAsset'
import { getAllStockTickers } from './getAllStocks'
import { getStock } from './getStock'
import { log } from './log'
import { handleSkipOrDeleteAsset } from './skipOrDeleteAsset'
import { handleUpdateAsset } from './updateAsset'

const updateAssets = async () => {
  try {
    const tickers = await getAllStockTickers()

    for (const ticker of tickers) {
      log(`Processing ${ticker}...`)
      const stock = await getStock(ticker)

      const asset = await prisma.asset.findFirst({
        where: {
          ticker: stock?.info.ticker ?? ticker,
        },
      })

      const assetIsOutdated =
        !!stock?.lastUpdatedDate &&
        new Date().getTime() - new Date(stock.lastUpdatedDate).getTime() >
          1 * 1000 * 60 * 60 * 24 * 30 * 2 // 2 months

      if (!stock) {
        log(`Stock: ${stock}`)
      }

      if (
        !stock ||
        assetIsOutdated ||
        stock.info.type === 'BDR' ||
        ticker.includes('13') ||
        ticker === 'TPRC3'
      ) {
        await handleSkipOrDeleteAsset(asset)
        continue
      }

      if (!asset) {
        await handleCreateAsset(stock)
        continue
      }

      await handleUpdateAsset(asset, stock)
    }
  } catch (e) {
    log(e)
  }
}

updateAssets()
