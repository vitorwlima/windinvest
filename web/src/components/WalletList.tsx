import Link from 'next/link'
import { WalletsResponse } from 'src/queries/useGetWallets'

type Props = {
  wallets:
    | WalletsResponse['wallets']
    | {
        id: string
        title: string | JSX.Element
        description: string | JSX.Element
        assetsCount: number
      }[]
  isLoading?: boolean
}

export const WalletList: React.FC<Props> = ({ wallets, isLoading = false }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {wallets.map((wallet) => (
        <Link
          key={wallet.id}
          href={`/carteiras/${wallet.id}`}
          className="group flex flex-col justify-between rounded-lg bg-gray-950/40 p-4 transition-colors hover:bg-green-500 focus:bg-green-500 focus:outline-none"
        >
          <header className="mb-4 flex flex-col gap-2">
            <h3 className="text-xl font-bold">{wallet.title}</h3>
            <p className="font-light">{wallet.description}</p>
          </header>
          <footer>
            <p className="text-sm font-semibold">
              {isLoading ? (
                <>&#12644;</>
              ) : (
                `${wallet.assetsCount} ${
                  wallet.assetsCount === 1 ? 'ativo' : 'ativos'
                }`
              )}
            </p>
          </footer>
        </Link>
      ))}
    </div>
  )
}
