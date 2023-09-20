'use client'

import {
  LockClosedIcon,
  LockOpenIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useUpgradeToProModal } from 'src/hooks/useUpgradeToProModal'
import {
  BestAssets as BestAssetsType,
  useGetBestAssets,
} from 'src/queries/useGetBestAssets'
import { sectorsAndSubSectors } from 'src/utils/sectorsAndSubSectors'
import { BestAssetsList } from './BestAssetsList'
import { SectorSelect } from './SectorSelect'

const premiumExampleAsset: BestAssetsType[number] = {
  fantasyName: 'Nome da empresa',
  sector: 'Setor da empresa',
  subSector: 'Subsetor da empresa',
  ticker: 'TICK3',
  windScore: {
    windFinalScore: 0,
  },
}

export const BestAssets: React.FC = () => {
  const { openModal } = useUpgradeToProModal()
  const [filter, setFilter] = useState({ page: 1, sector: '', subSector: '' })
  const { data, isLoading } = useGetBestAssets(filter)
  const sectors = sectorsAndSubSectors.map((s) => s.sector)
  const subSectors =
    sectorsAndSubSectors.find((s) => s.sector === filter.sector)?.subSectors ||
    []

  const handleChangeSector = (sector: string) => {
    setFilter((fil) => ({ ...fil, sector, subSector: '' }))
  }

  const handleChangeSubSector = (subSector: string) => {
    setFilter((fil) => ({ ...fil, subSector }))
  }

  const handleChangePage = (page: number) => {
    setFilter((fil) => ({ ...fil, page }))
  }

  const AssetList = () => {
    if (isLoading || !data) {
      return (
        <>
          <div className="mb-8 flex flex-col gap-4 lg:flex-row">
            <SectorSelect
              name="setor"
              value={filter.sector}
              sectors={sectors}
              onChange={handleChangeSector}
              disabled={true}
            />
            <SectorSelect
              name="subsetor"
              value={filter.subSector}
              sectors={subSectors}
              onChange={handleChangeSubSector}
              disabled={true}
            />
          </div>

          <BestAssetsList
            bestAssets={Array.from({ length: 10 }, () => premiumExampleAsset)}
            count={10}
            page={1}
            onPageChange={handleChangePage}
            loading
          />
        </>
      )
    }

    if (!data.ok && data.error === 'Forbidden') {
      return (
        <div className="group relative cursor-pointer" onClick={openModal}>
          <button className="absolute left-1/2 top-1/2 z-10 flex w-fit -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-lg bg-sky-500 px-6 py-3 text-lg font-bold transition-colors group-hover:bg-neutral-50 group-hover:text-sky-500">
            Desbloquear
            <LockClosedIcon className="h-4 w-4 group-hover:hidden [&>path]:stroke-[3]" />
            <LockOpenIcon className="hidden h-4 w-4 text-sky-500 group-hover:block [&>path]:stroke-[3]" />
          </button>
          <div className="pointer-events-none select-none blur-md">
            <div className="mb-8 flex flex-col gap-4 lg:flex-row">
              <SectorSelect
                name="setor"
                value={filter.sector}
                sectors={sectors}
                onChange={handleChangeSector}
                disabled={isLoading || !data || !data.ok}
              />
              <SectorSelect
                name="subsetor"
                value={filter.subSector}
                sectors={subSectors}
                onChange={handleChangeSubSector}
                disabled={isLoading || !data || !data.ok}
              />
            </div>

            <BestAssetsList
              bestAssets={Array.from({ length: 5 }, () => premiumExampleAsset)}
              count={30}
              page={1}
              onPageChange={(_: number) => _}
              hideContent
            />
          </div>
        </div>
      )
    }

    if (!data.ok) {
      return (
        <section className="p-4">
          <h4 className="mb-4 text-xl font-bold">Erro ao carregar</h4>
        </section>
      )
    }

    return (
      <>
        <div className="mb-8 flex flex-col gap-4 lg:flex-row">
          <SectorSelect
            name="setor"
            value={filter.sector}
            sectors={sectors}
            onChange={handleChangeSector}
            disabled={isLoading || !data || !data.ok}
          />
          <SectorSelect
            name="subsetor"
            value={filter.subSector}
            sectors={subSectors}
            onChange={handleChangeSubSector}
            disabled={isLoading || !data || !data.ok || !filter.sector}
          />
        </div>

        <BestAssetsList
          bestAssets={data.data.assets}
          count={data.data.count}
          page={filter.page}
          onPageChange={handleChangePage}
        />
      </>
    )
  }

  return (
    <section className="px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
          <TrophyIcon className="h-8 w-8 text-green-500" />
          <p>As Melhores Ações</p>
        </h2>

        <AssetList />
      </div>
    </section>
  )
}
