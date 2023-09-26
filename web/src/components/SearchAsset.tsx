'use client'

import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { Fragment } from 'react'
import { useSearchAsset } from 'src/hooks/useSearchAsset'

export const SearchAsset: React.FC = () => {
  const { selected, onSelect, inputValue, onInputChange, ref, assetList } =
    useSearchAsset()

  return (
    <Combobox value={selected} onChange={onSelect}>
      <div className="relative mt-1 flex w-full justify-end">
        <Combobox.Input
          className="flex h-9 w-[150px] rounded-md border border-neutral-500 bg-neutral-900 px-3 py-1 text-sm transition-all focus:w-full focus-visible:border-neutral-50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          onChange={(event) => onInputChange(event.target.value)}
          ref={ref}
          placeholder="Pesquisar ativo..."
        />
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => onInputChange('')}
        >
          <Combobox.Options className="absolute mt-10 max-h-60 w-full overflow-auto rounded-md bg-neutral-900 focus:outline-none">
            {assetList.length === 0 && inputValue !== '' ? (
              <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                Nenhum ativo encontrado.
              </div>
            ) : (
              assetList.map((asset) => (
                <Combobox.Option
                  key={asset.ticker}
                  className={({ active }) =>
                    clsx(
                      'relative cursor-default select-none py-2 pl-10 pr-4 text-sm text-white',
                      {
                        'bg-green-500': active,
                      },
                    )
                  }
                  value={asset.ticker}
                >
                  {({ selected, active }) => (
                    <div>
                      <strong>{asset.ticker.toUpperCase()}</strong>
                      <p className="text-sm">{asset.fantasyName}</p>
                      {selected ? (
                        <span
                          className={clsx(
                            'absolute inset-y-0 left-0 flex items-center pl-3',
                            {
                              'text-white': active,
                              'text-green-500': !active,
                            },
                          )}
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
