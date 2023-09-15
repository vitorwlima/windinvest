'use client'

import { TrophyIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useGetBestAssets } from 'src/queries/useGetBestAssets'
import { sectorsAndSubSectors } from 'src/utils/sectorsAndSubSectors'
import { BestAssetsList } from './BestAssetsList'
import { SectorSelect } from './SectorSelect'
import { Spinner } from './Spinner'

export const BestAssets: React.FC = () => {
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

  return (
    <section className="px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
          <TrophyIcon className="h-8 w-8 text-green-500" />
          <p>As Melhores Ações</p>
        </h2>

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

        {isLoading || !data || !data.ok ? (
          <Spinner />
        ) : (
          <BestAssetsList
            bestAssets={data.data.assets}
            count={data.data.count}
            page={filter.page}
            onPageChange={handleChangePage}
          />
        )}
      </div>
    </section>
  )
}
