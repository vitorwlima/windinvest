'use client'

import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/navigation'
import { Fragment, useRef, useState } from 'react'
import { useDebounce } from 'src/hooks/useDebounce'
import { AssetBase, useGetAllAssets } from 'src/queries/useGetAllAssets'

export const SearchAsset: React.FC = () => {
  const router = useRouter()
  const ref = useRef<HTMLInputElement>(null)
  const [selected, setSelected] = useState<undefined | string>()
  const [inputValue, setInputValue] = useState('')

  const debouncedSearch = useDebounce(inputValue, 300)
  const { data } = useGetAllAssets({ search: debouncedSearch })
  const assetList =
    data !== undefined && data.ok ? data.data : ([] as AssetBase[])

  const filteredAssets =
    inputValue === ''
      ? assetList
      : assetList.filter(
          (asset) =>
            asset.fantasyName
              .toLowerCase()
              .replace(/\s+/g, '')
              .includes(inputValue.toLowerCase().replace(/\s+/g, '')) ||
            asset.ticker
              .toLowerCase()
              .replace(/\s+/g, '')
              .includes(inputValue.toLowerCase().replace(/\s+/g, '')),
        )

  const onSelect = (value: string) => {
    setSelected(value)
    router.push(`/ativos/${value.toLowerCase()}`)
    ref.current?.blur()
  }

  return (
    <Combobox value={selected} onChange={onSelect}>
      <div className="relative mt-1 flex w-full justify-end">
        <Combobox.Input
          className="flex h-9 w-[150px] rounded-md border border-neutral-500 bg-neutral-900 px-3 py-1 text-sm transition-all focus:w-full focus-visible:border-neutral-50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          onChange={(event) => setInputValue(event.target.value)}
          ref={ref}
          placeholder="Pesquisar ativo..."
        />
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setInputValue('')}
        >
          <Combobox.Options className="absolute mt-10 max-h-60 w-full overflow-auto rounded-md bg-neutral-900 py-1 focus:outline-none">
            {filteredAssets.length === 0 && inputValue !== '' ? (
              <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                Nenhum ativo encontrado.
              </div>
            ) : (
              filteredAssets.map((asset) => (
                <Combobox.Option
                  key={asset.ticker}
                  className={({ active }) =>
                    `relative text-sm cursor-default select-none py-2 pl-10 pr-4 text-white ${
                      active ? 'bg-green-500' : ''
                    }`
                  }
                  value={asset.ticker}
                >
                  {({ selected, active }) => (
                    <div>
                      <strong>{asset.ticker.toUpperCase()}</strong>
                      <p className="text-sm">{asset.fantasyName}</p>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? 'text-white' : 'text-green-500'
                          }`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </div>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  )
}
