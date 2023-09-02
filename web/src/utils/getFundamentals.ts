import { FormattedAsset } from './formatAsset'

const valuationTitles: Record<keyof FormattedAsset['valuation'], string> = {
  bookValuePerShare: 'VPA',
  dividendYield: 'D.Y.',
  evToEbitRatio: 'EV/EBIT',
  priceToAssets: 'P/Ativos',
  priceToBookRatio: 'P/VP',
  priceToCapitalRatio: 'P/Cap. Giro',
  priceToEbitRatio: 'P/EBIT',
  priceToLiquidAsset: 'P/Ativo Circ. Líq.',
  priceToProfitRatio: 'P/L',
  profitByShare: 'LPA',
  changeInLast12Months: 'Variação nos últimos 12 meses',
  price: 'Cotação',
}

const debtTitles: Record<keyof FormattedAsset['debt'], string> = {
  currentLiquidity: 'Liq. Corrente',
  equityToAssetsRatio: 'PL/Ativos',
  netDebtToEbitRatio: 'Dív. Líquida/EBIT',
  netDebtToEquityRatio: 'Dív. Líquida/PL',
}

const efficiencyTitles: Record<keyof FormattedAsset['efficiency'], string> = {
  ebitMargin: 'Margem EBIT',
  grossMargin: 'Margem Bruta',
  netMargin: 'Margem Líquida',
}

const profitabilityTitles: Record<
  keyof FormattedAsset['profitability'],
  string
> = {
  returnOnEquity: 'ROE',
  returnOnInvestedCapital: 'ROIC',
  assetTurnover: 'Giro Ativos',
}

const getValuationData = ({ key, value }: { key: string; value: string }) => {
  return {
    title: valuationTitles[key as keyof typeof valuationTitles],
    value,
  }
}

const getDebtData = ({ key, value }: { key: string; value: string }) => {
  return {
    title: debtTitles[key as keyof typeof debtTitles],
    value,
  }
}

const getEfficiencyData = ({ key, value }: { key: string; value: string }) => {
  return {
    title: efficiencyTitles[key as keyof typeof efficiencyTitles],
    value,
  }
}

const getProfitabilityData = ({
  key,
  value,
}: {
  key: string
  value: string
}) => {
  return {
    title: profitabilityTitles[key as keyof typeof profitabilityTitles],
    value,
  }
}

const valuationKeysToHide = ['Variação nos últimos 12 meses', 'Cotação']

export const getFundamentals = (asset: FormattedAsset) => {
  const fundamentals = [
    {
      title: 'Valuation',
      data: Object.entries(asset.valuation)
        .map(([key, value]) => getValuationData({ key, value }))
        .filter(({ title }) => !valuationKeysToHide.includes(title)),
    },
    {
      title: 'Endividamento',
      data: Object.entries(asset.debt).map(([key, value]) =>
        getDebtData({ key, value }),
      ),
    },
    {
      title: 'Eficiência',
      data: Object.entries(asset.efficiency).map(([key, value]) =>
        getEfficiencyData({ key, value }),
      ),
    },
    {
      title: 'Lucratividade',
      data: Object.entries(asset.profitability).map(([key, value]) =>
        getProfitabilityData({ key, value }),
      ),
    },
  ]

  return fundamentals
}
