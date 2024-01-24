'use client'

import { CircleDollarSign, Lock, Unlock } from 'lucide-react'
import { useUpgradeToProModal } from 'src/hooks/useUpgradeToProModal'
import { useGetWallets } from 'src/queries/useGetWallets'
import { WalletList } from './WalletList'

export const Wallets: React.FC = () => {
  const { openModal } = useUpgradeToProModal()
  const { data, isLoading, isError } = useGetWallets()

  const List = () => {
    if (isLoading || !data) {
      const wallets = [
        {
          id: '1',
          title: <>&#12644;</>,
          description: (
            <>
              &#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;&#12644;
            </>
          ),
          assetsCount: 0,
        },
        {
          id: '2',
          title: <>&#12644;</>,
          description: <>&#12644;</>,
          assetsCount: 0,
        },
        {
          id: '3',
          title: <>&#12644;</>,
          description: <>&#12644;</>,
          assetsCount: 0,
        },
      ]

      return <WalletList wallets={wallets} isLoading />
    }

    if (data.error === 'Forbidden') {
      const wallets = [
        {
          id: '1',
          title: 'Carteira de Ativos 1',
          description: 'Descrição da carteira de ativos 1',
          assetsCount: 16,
        },
        {
          id: '2',
          title: 'Carteira de Ativos 2',
          description: 'Descrição da carteira de ativos 2',
          assetsCount: 20,
        },
      ]

      return (
        <div className="group relative cursor-pointer" onClick={openModal}>
          <button className="absolute left-1/2 top-1/2 z-10 flex w-fit -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-lg bg-sky-500 px-6 py-3 text-lg font-bold transition-colors group-hover:bg-gray-50 group-hover:text-sky-500">
            Desbloquear
            <Lock className="h-4 w-4 group-hover:hidden" strokeWidth={3} />
            <Unlock
              className="hidden h-4 w-4 text-sky-500 group-hover:block"
              strokeWidth={3}
            />
          </button>

          <div className="pointer-events-none select-none blur-md">
            <WalletList wallets={wallets} />
          </div>
        </div>
      )
    }

    if (isError) {
      return (
        <section className="p-4">
          <h4 className="mb-4 text-xl font-bold">Erro ao carregar</h4>
        </section>
      )
    }

    return <WalletList wallets={data.wallets} />
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
        <CircleDollarSign className="h-8 w-8 text-green-500" />
        <p>Carteiras de Ativos</p>
      </h2>

      <List />
    </section>
  )
}
