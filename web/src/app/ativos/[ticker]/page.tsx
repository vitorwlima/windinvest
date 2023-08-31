import { Metadata } from 'next'
import { Asset } from './Asset'

type PageParams = {
  params: {
    ticker: string
  }
}

const AssetPage: React.FC<PageParams> = ({ params: { ticker } }) => {
  return <Asset ticker={ticker} />
}

export const generateMetadata = async ({
  params,
}: PageParams): Promise<Metadata> => {
  return {
    title: `Stockz - ${params.ticker.toUpperCase()}`,
  }
}

export default AssetPage
