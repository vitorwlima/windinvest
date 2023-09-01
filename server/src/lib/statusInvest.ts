import puppeteer from 'puppeteer'

type GetStock = {
  ticker: string
  showLogs?: boolean
}

export type Stock = {
  about: {
    name: string
  }
  valuation: {
    price: number | null
    dividendYield: number | null
    changeInLast12Months: number | null
    priceToProfitRatio: number | null
    pegRatio: number | null
    priceToBookRatio: number | null
    evToEbitdaRatio: number | null
    evToEbitRatio: number | null
    priceToEbitdaRatio: number | null
    priceToEbitRatio: number | null
    bookValuePerShare: number | null
    priceToAssets: number | null
    profitByShare: number | null
    priceToSalesRatio: number | null
    priceToCapitalRatio: number | null
    priceToLiquidAsset: number | null
  }
  debt: {
    netDebtToEquityRatio: number | null
    netDebtToEbitdaRatio: number | null
    netDebtToEbitRatio: number | null
    equityToAssetsRatio: number | null
    liabilitiesToAssetsRatio: number | null
    currentLiquidity: number | null
  }
  efficiency: {
    grossMargin: number | null
    ebitdaMargin: number | null
    ebitMargin: number | null
    netMargin: number | null
  }
  profitability: {
    returnOnEquity: number | null
    returnOnAssets: number | null
    returnOnInvestedCapital: number | null
    assetTurnover: number | null
  }
  growth: {
    cagrRevenue5Years: number | null
    cagrProfits5Years: number | null
  }
}

export const onPageEvaluate = () => {
  const values = Array.from(document.querySelectorAll('.value')).map(
    (el) => el.innerHTML,
  )
  const about = {
    name: document.querySelector('h1 small')!.innerHTML,
  }
  const valuation = {
    price: Number(values[0].replace(',', '.')),
    dividendYield: Number(values[3].replace(',', '.')),
    changeInLast12Months: Number(values[4].replace(',', '.').replace('%', '')),
    priceToProfitRatio: Number(values[11].replace(',', '.')),
    pegRatio: Number(values[12].replace(',', '.')),
    priceToBookRatio: Number(values[13].replace(',', '.')),
    evToEbitdaRatio: Number(values[14].replace(',', '.')),
    evToEbitRatio: Number(values[15].replace(',', '.')),
    priceToEbitdaRatio: Number(values[16].replace(',', '.')),
    priceToEbitRatio: Number(values[17].replace(',', '.')),
    bookValuePerShare: Number(values[18].replace(',', '.')),
    priceToAssets: Number(values[19].replace(',', '.')),
    profitByShare: Number(values[20].replace(',', '.')),
    priceToSalesRatio: Number(values[21].replace(',', '.')),
    priceToCapitalRatio: Number(values[22].replace(',', '.')),
    priceToLiquidAsset: Number(values[23].replace(',', '.')),
  }
  const debt = {
    netDebtToEquityRatio: Number(values[24].replace(',', '.')),
    netDebtToEbitdaRatio: Number(values[25].replace(',', '.')),
    netDebtToEbitRatio: Number(values[26].replace(',', '.')),
    equityToAssetsRatio: Number(values[27].replace(',', '.')),
    liabilitiesToAssetsRatio: Number(values[28].replace(',', '.')),
    currentLiquidity: Number(values[29].replace(',', '.')),
  }
  const efficiency = {
    grossMargin: Number(values[30].replace(',', '.').replace('%', '')),
    ebitdaMargin: Number(values[31].replace(',', '.').replace('%', '')),
    ebitMargin: Number(values[32].replace(',', '.').replace('%', '')),
    netMargin: Number(values[33].replace(',', '.').replace('%', '')),
  }
  const profitability = {
    returnOnEquity: Number(values[34].replace(',', '.').replace('%', '')),
    returnOnAssets: Number(values[35].replace(',', '.').replace('%', '')),
    returnOnInvestedCapital: Number(
      values[36].replace(',', '.').replace('%', ''),
    ),
    assetTurnover: Number(values[37].replace(',', '.').replace('%', '')),
  }
  const growth = {
    cagrRevenue5Years: Number(values[38].replace(',', '.').replace('%', '')),
    cagrProfits5Years: Number(values[39].replace(',', '.').replace('%', '')),
  }
  return { about, valuation, debt, efficiency, profitability, growth }
}

export const StatusInvest = {
  getStock: async ({
    ticker,
    showLogs,
  }: GetStock): Promise<Stock | undefined> => {
    const log = showLogs
      ? console.log
      : () => {
          // do nothing
        }
    try {
      log(`Getting stock data for ${ticker}`)

      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        ignoreDefaultArgs: ['--disable-extensions'],
      })
      log('Browser launched: ', browser)

      const page = await browser.newPage()
      log('Page created: ', page)

      await page.setExtraHTTPHeaders({
        accept: '*/*',
        'accept-language':
          'en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7,es-MX;q=0.6,es;q=0.5',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'x-requested-with': 'XMLHttpRequest',
        'sec-ch-ua':
          '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko)',
      })
      log('Page headers set')

      await page.goto(`https://statusinvest.com.br/acoes/${ticker}`, {
        waitUntil: 'networkidle2',
      })
      log('Page loaded')

      const stock = await page.evaluate(onPageEvaluate)
      log('Stock data extracted: ', stock)

      await browser.close()
      log('Browser closed')

      return stock
    } catch (e) {
      log('Error: ', e)
    }
  },
}
