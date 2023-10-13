'use client'

import { AssetHeader } from 'src/components/AssetHeader'
import { AssetIntroductionData } from 'src/components/AssetIntroductionData'
import { Fundamentals } from 'src/components/Fundamentals'
import { GrahamPrice } from 'src/components/GrahamPrice'
import { Spinner } from 'src/components/Spinner'
import { WindScore } from 'src/components/WindScore'
import { useGetAsset } from 'src/queries/useGetAsset'
import { formatAsset } from 'src/utils/formatAsset'

type Props = {
  ticker: string
}

export const Asset: React.FC<Props> = ({ ticker }) => {
  const { data: asset, isLoading, isError } = useGetAsset({ ticker })

  if (isLoading || !asset) {
    return (
      <div className="mt-32">
        <Spinner />
      </div>
    )
  }

  if (isError) {
    return (
      <p className="mt-32 text-center text-3xl font-bold text-white">
        Ativo não encontrado.
      </p>
    )
  }

  const formattedAsset = formatAsset(asset)

  return (
    <main>
      <AssetHeader asset={formattedAsset} />
      <AssetIntroductionData asset={formattedAsset} />
      <WindScore windScore={formattedAsset.windScore} />
      <GrahamPrice asset={asset} />
      <Fundamentals asset={formattedAsset} />
    </main>
  )
}
