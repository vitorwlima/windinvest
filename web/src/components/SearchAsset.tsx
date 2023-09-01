'use client'

import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/navigation'
import { Fragment, useRef, useState } from 'react'
import { assetList } from 'src/utils/assetList'

export const SearchAsset = () => {
  const router = useRouter()
  const ref = useRef<HTMLInputElement>(null)
  const [selected, setSelected] = useState<undefined | string>()
  const [inputValue, setInputValue] = useState('')

  const filteredAssets =
    inputValue === ''
      ? assetList
      : assetList.filter((asset) =>
          asset
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
      <div className="relative mt-1 w-full">
        <Combobox.Input
          className="flex h-9 w-full rounded-md border border-neutral-500 bg-neutral-900 px-3 py-1 text-sm transition-colors focus-visible:border-neutral-50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
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
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-neutral-900 py-1 focus:outline-none">
            {filteredAssets.length === 0 && inputValue !== '' ? (
              <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                Nenhum ativo encontrado.
              </div>
            ) : (
              filteredAssets.map((asset) => (
                <Combobox.Option
                  key={asset}
                  className={({ active }) =>
                    `relative text-sm cursor-default select-none py-2 pl-10 pr-4 text-white ${
                      active ? 'bg-green-500' : ''
                    }`
                  }
                  value={asset}
                >
                  {({ selected, active }) => (
                    <>
                      <span>{asset}</span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? 'text-white' : 'text-green-500'
                          }`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
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
