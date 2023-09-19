import { Metadata } from 'next'
import { Footer } from 'src/components/Footer'
import { Header } from 'src/components/Header'
import { Asset } from './Asset'

type PageParams = {
  params: {
    ticker: string
  }
}

const AssetPage: React.FC<PageParams> = ({ params: { ticker } }) => {
  return (
    <>
      <div>
        <Header />
        <Asset ticker={ticker} />
      </div>
      <Footer />
    </>
  )
}

export const generateMetadata = async ({
  params,
}: PageParams): Promise<Metadata> => {
  return {
    title: `Wind Invest - ${params.ticker.toUpperCase()}`,
  }
}

export default AssetPage
