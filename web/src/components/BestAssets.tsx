'use client'

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

  if (isLoading || !data || !data.ok) return <Spinner />
  const {
    data: { assets: bestAssets, count },
  } = data

  return (
    <section className="px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-4 text-2xl font-bold">As melhores ações</h2>

        <div className="mb-8 flex flex-col gap-4 lg:flex-row">
          <SectorSelect
            name="setor"
            value={filter.sector}
            sectors={sectors}
            onChange={handleChangeSector}
          />
          <SectorSelect
            name="subsetor"
            value={filter.subSector}
            sectors={subSectors}
            onChange={handleChangeSubSector}
          />
        </div>

        <BestAssetsList
          bestAssets={bestAssets}
          count={count}
          page={filter.page}
          onPageChange={handleChangePage}
        />
      </div>
    </section>
  )
}
