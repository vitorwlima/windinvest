import { useQuery } from '@tanstack/react-query'
import { ENV } from 'src/utils/env'

type GetAssetArgs = {
  ticker: string
}

type Asset = {
  company: {
    name: string
    trade_name: string
    cvm_code: number
    cnpj: string
    founding_date: string
    main_activity: string
    website: string
    controlling_interest: string
    is_state_owned: boolean
    is_foreign: boolean
    is_b3_listed: boolean
    b3_issuer_code: string
    b3_listing_segment: string
    b3_sector: string
    b3_subsector: string
    b3_segment: string
    about: string
  }
  marketRatio: {
    cvm_code: number
    ticker: string
    reference_date: string
    shares: number
    price: number
    earnings_per_share: number
    equity_per_share: number
    ebit_per_share: number
    assets_per_share: number
    net_sales_per_share: number
    price_earnings: number
    price_to_book: number
    price_to_sales: number
    price_to_cash_flow: number
  }
  financialRatio: {
    cvm_code: number
    statement_type: string
    period_init: string
    period_end: string
    period_type: string
    gross_margin: number
    net_margin: number
    ebit_margin: number
    operating_margin: number
    return_on_equity: number
    return_on_assets: number
    asset_turnover: number
    current_liquidity: number
    quick_liquidity: number
    cash_liquidity: number
    working_capital: number
    gross_debt: number
    net_debt: number
    total_debt: number
    ebitda: number
    ebitda_margin: number
  }
}

type AssetResponse =
  | {
      ok: false
      error: string
    }
  | {
      ok: true
      data: Asset
    }

export const useGetAsset = ({ ticker }: GetAssetArgs) => {
  return useQuery<AssetResponse>({
    queryKey: ['asset', ticker],
    queryFn: async () => {
      const res = await fetch(
        `${ENV.NEXT_PUBLIC_SERVER_URL}/asset/${ticker.toUpperCase()}`,
      )
      return res.json()
    },
    refetchOnWindowFocus: false,
  })
}
