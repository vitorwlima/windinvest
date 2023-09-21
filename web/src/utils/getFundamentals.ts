import { FormattedAsset } from './formatAsset'

type Data = {
  title: string
  description: string
}

const valuationTitles: Record<keyof FormattedAsset['valuation'], Data> = {
  bookValuePerShare: {
    title: 'VPA',
    description: 'Representa o valor patrimonial por ação.',
  },
  dividendYield: {
    title: 'D.Y.',
    description:
      'Representa a taxa dos dividendos anuais com relação ao preço da ação.',
  },
  evToEbitRatio: {
    title: 'EV/EBIT',
    description:
      'Representa o quanto a empresa custa (EV) com relação ao quanto ela produz (EBIT).',
  },
  priceToAssets: {
    title: 'P/Ativos',
    description: 'Representa o preço da ação pelos seus ativos totais.',
  },
  priceToBookRatio: {
    title: 'P/VP',
    description: 'Representa o preço da ação pelo seu valor patrimonial (VPA).',
  },
  priceToCapitalRatio: {
    title: 'P/Cap. Giro',
    description: 'Representa o preço da ação pelo seu capital de giro.',
  },
  priceToEbitRatio: {
    title: 'P/EBIT',
    description: 'Representa o preço da ação pelo seu resultado EBIT.',
  },
  priceToLiquidAsset: {
    title: 'P/Ativo Circ. Líq.',
    description:
      'Representa o preço da ação pelos seus ativos circulantes líquidos.',
  },
  priceToProfitRatio: {
    title: 'P/L',
    description:
      'Representa o quanto o mercado está disposto a pagar pelos lucros da empresa.',
  },
  profitByShare: {
    title: 'LPA',
    description: 'Representa a lucratividade da empresa por ação.',
  },
}

const debtTitles: Record<keyof FormattedAsset['debt'], Data> = {
  currentLiquidity: {
    title: 'Liq. Corrente',
    description:
      'Representa a capacidade de pagamento da empresa no curto prazo.',
  },
  equityToAssetsRatio: {
    title: 'PL/Ativos',
    description:
      'Representa o patrimônio líquido pelos ativos de uma empresa, dando uma ideia da estabilidade financeira da instituição.',
  },
  netDebtToEbitRatio: {
    title: 'Dív. Líquida/EBIT',
    description:
      'Representa o tempo necessário para pagar as dívidas da empresa considerando o EBIT atual.',
  },
  netDebtToEquityRatio: {
    title: 'Dív. Líquida/PL',
    description:
      'Representa a capacidade da empresa de cobrir suas dívidas com o próprio patrimônio.',
  },
}

const efficiencyTitles: Record<keyof FormattedAsset['efficiency'], Data> = {
  ebitMargin: {
    title: 'Margem EBIT',
    description: 'Representa a eficiência operacional da empresa.',
  },
  grossMargin: {
    title: 'Margem Bruta',
    description: 'Representa a rentabilidade bruta da empresa.',
  },
  netMargin: {
    title: 'Margem Líquida',
    description: 'Representa o resultado líquido das vendas da empresa.',
  },
}

const profitabilityTitles: Record<keyof FormattedAsset['profitability'], Data> =
  {
    returnOnEquity: {
      title: 'ROE',
      description:
        'Representa a rentabilidade da empresa a partir de seus próprios recursos.',
    },
    returnOnInvestedCapital: {
      title: 'ROIC',
      description:
        'Representa a rentabilidade da empresa a partir de seus investimentos.',
    },
    assetTurnover: {
      title: 'Giro Ativos',
      description:
        'Representa a taxa de produção de dinheiro de uma empresa através de suas operações.',
    },
  }

const getValuationData = ({ key, value }: { key: string; value: string }) => {
  const { title, description } =
    valuationTitles[key as keyof typeof valuationTitles]

  return {
    title,
    description,
    value,
  }
}

const getDebtData = ({ key, value }: { key: string; value: string }) => {
  const { title, description } = debtTitles[key as keyof typeof debtTitles]

  return {
    title,
    description,
    value,
  }
}

const getEfficiencyData = ({ key, value }: { key: string; value: string }) => {
  const { title, description } =
    efficiencyTitles[key as keyof typeof efficiencyTitles]

  return {
    title,
    description,
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
  const { title, description } =
    profitabilityTitles[key as keyof typeof profitabilityTitles]

  return {
    title,
    description,
    value,
  }
}

export const getFundamentals = (asset: FormattedAsset) => {
  const fundamentals = [
    {
      title: 'Valuation',
      data: Object.entries(asset.valuation).map(([key, value]) =>
        getValuationData({ key, value }),
      ),
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
