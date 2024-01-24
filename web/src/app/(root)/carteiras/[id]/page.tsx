import { Metadata } from 'next'
import { Wallet } from './Wallet'

type WalletName = 'wind' | 'dy' | 'small-caps'

type PageParams = {
  params: {
    id: WalletName
  }
}

const walletNames: Record<WalletName, string> = {
  wind: 'Wind',
  dy: 'DY',
  'small-caps': 'Small Caps',
}

const WalletPage: React.FC<PageParams> = ({ params: { id } }) => {
  return <Wallet id={id} />
}

export const generateMetadata = async ({
  params,
}: PageParams): Promise<Metadata> => {
  const walletName = walletNames[params.id] ?? ''

  return {
    title: `Wind Invest - Carteira ${walletName}`,
  }
}

export default WalletPage
