'use client'

import { Disclosure, Switch, Transition } from '@headlessui/react'
import {
  ChevronDownIcon,
  LockClosedIcon,
  LockOpenIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
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
  ticker: 'TICK3',
  windFinalScore: 0,
  company: {
    fantasyName: 'Nome da empresa',
  },
}

const checklistFilters: {
  title: string
  key: 'liquidity' | 'debt'
}[] = [
  {
    title: 'Empresa com liquidez diária acima de R$ 1M',
    key: 'liquidity',
  },
  {
    title: 'Empresa com dívida menor que patrimônio',
    key: 'debt',
  },
]

export const BestAssets: React.FC = () => {
  const { openModal } = useUpgradeToProModal()
  const [filter, setFilter] = useState({
    page: 1,
    sector: '',
    subsector: '',
    liquidity: true,
    debt: true,
  })
  const { data, isLoading, isError } = useGetBestAssets(filter)
  const sectors = sectorsAndSubSectors.map((s) => s.sector)
  const subsectors =
    sectorsAndSubSectors.find((s) => s.sector === filter.sector)?.subsectors ||
    []

  const handleChangeSector = (sector: string) => {
    setFilter((fil) => ({ ...fil, sector, subsector: '', page: 1 }))
  }

  const handleChangeSubSector = (subsector: string) => {
    setFilter((fil) => ({ ...fil, subsector, page: 1 }))
  }

  const handleChangePage = (page: number) => {
    setFilter((fil) => ({ ...fil, page }))
  }

  const AssetList = () => {
    if (isLoading || !data) {
      return (
        <>
          <div className="mb-4 flex flex-col gap-4 lg:flex-row">
            <SectorSelect
              name="setor"
              value={filter.sector}
              sectors={sectors}
              onChange={handleChangeSector}
              disabled={true}
            />
            <SectorSelect
              name="subsetor"
              value={filter.subsector}
              sectors={subsectors}
              onChange={handleChangeSubSector}
              disabled={true}
            />
          </div>

          <button className="mb-8 flex items-center gap-2 rounded-md bg-green-500 px-4 py-2">
            <span>Filtros avançados</span>
            <ChevronDownIcon className="h-4 w-4" />
          </button>

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

    if (data.error === 'Forbidden') {
      return (
        <div className="group relative cursor-pointer" onClick={openModal}>
          <button className="absolute left-1/2 top-1/2 z-10 flex w-fit -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-lg bg-sky-500 px-6 py-3 text-lg font-bold transition-colors group-hover:bg-neutral-50 group-hover:text-sky-500">
            Desbloquear
            <LockClosedIcon className="h-4 w-4 group-hover:hidden [&>path]:stroke-[3]" />
            <LockOpenIcon className="hidden h-4 w-4 text-sky-500 group-hover:block [&>path]:stroke-[3]" />
          </button>
          <div className="pointer-events-none select-none blur-md">
            <div className="mb-4 flex flex-col gap-4 lg:flex-row">
              <SectorSelect
                name="setor"
                value={filter.sector}
                sectors={sectors}
                onChange={handleChangeSector}
                disabled={isLoading || isError || !data}
              />
              <SectorSelect
                name="subsetor"
                value={filter.subsector}
                sectors={subsectors}
                onChange={handleChangeSubSector}
                disabled={isLoading || isError || !data}
              />
            </div>

            <button className="mb-8 flex items-center gap-2 rounded-md bg-green-500 px-4 py-2">
              <span>Filtros avançados</span>
              <ChevronDownIcon className="h-4 w-4" />
            </button>

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

    if (isError) {
      return (
        <section className="p-4">
          <h4 className="mb-4 text-xl font-bold">Erro ao carregar</h4>
        </section>
      )
    }

    return (
      <>
        <div className="mb-4 flex flex-col gap-4 lg:flex-row">
          <SectorSelect
            name="setor"
            value={filter.sector}
            sectors={sectors}
            onChange={handleChangeSector}
            disabled={isLoading || isError || !data}
          />
          <SectorSelect
            name="subsetor"
            value={filter.subsector}
            sectors={subsectors}
            onChange={handleChangeSubSector}
            disabled={isLoading || isError || !data || !filter.sector}
          />
        </div>

        <Disclosure className="mb-8" as="div">
          <Disclosure.Button className="flex items-center gap-2 rounded-md bg-green-500 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-neutral-900">
            {({ open }) => (
              <>
                <span>Filtros avançados</span>
                <ChevronDownIcon
                  className={clsx('h-4 w-4 transition-transform', {
                    'rotate-180': open,
                  })}
                />
              </>
            )}
          </Disclosure.Button>

          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className="mt-4 gap-x-6 gap-y-2 md:grid md:grid-cols-2">
              {checklistFilters.map(({ title, key }) => (
                <div key={key} className="flex items-center gap-2">
                  <Switch
                    checked={filter[key]}
                    onChange={() =>
                      setFilter((fil) => ({
                        ...fil,
                        [key]: !fil[key],
                        page: 1,
                      }))
                    }
                    className={clsx(
                      'h-4 w-4 cursor-pointer rounded-full border focus:outline-none focus:ring-1 focus:ring-green-500 focus:ring-offset-neutral-900',
                      {
                        'bg-green-500 border-green-500': filter[key],
                        'bg-transparent border-neutral-400 focus:border-transparent':
                          !filter[key],
                      },
                    )}
                  />
                  <span>{title}</span>
                </div>
              ))}
            </Disclosure.Panel>
          </Transition>
        </Disclosure>

        <BestAssetsList
          bestAssets={data.assets}
          count={data.count}
          page={filter.page}
          onPageChange={handleChangePage}
        />
      </>
    )
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
        <TrophyIcon className="h-8 w-8 text-green-500" />
        <p>As Melhores Ações</p>
      </h2>

      <AssetList />
    </section>
  )
}
