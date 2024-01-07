import { Metadata } from 'next'
import { Wallet } from './Wallet'

type PageParams = {
  params: {
    id: string
  }
}

const WalletPage: React.FC<PageParams> = ({ params: { id } }) => {
  return <Wallet id={id} />
}

export const generateMetadata = async ({
  params,
}: PageParams): Promise<Metadata> => {
  return {
    title: `Wind Invest - Carteira ${params.id.toUpperCase()}`,
  }
}

export default WalletPage
