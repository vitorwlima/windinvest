'use client'

import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { Fragment, useRef, useState } from 'react'

type Props = {
  sectors: string[]
  value: string
  onChange: (sector: string) => void
  name: 'setor' | 'subsetor'
  disabled: boolean
}

const getCleanString = (string: string) =>
  string
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

export const SectorSelect: React.FC<Props> = ({
  sectors,
  value,
  name,
  onChange,
  disabled,
}) => {
  const [inputValue, setInputValue] = useState('')
  const ref = useRef<HTMLInputElement>(null)

  const filteredSectors =
    inputValue === ''
      ? ['', ...sectors]
      : ['', ...sectors].filter((sector) =>
          getCleanString(sector).includes(getCleanString(inputValue)),
        )

  const onSelect = (value: string) => {
    onChange(value)
    ref.current?.blur()
  }

  return (
    <Combobox value={value} onChange={onSelect} disabled={disabled}>
      <div className="relative mt-1 w-full">
        <Combobox.Button as="div">
          <Combobox.Input
            className="flex h-9 w-full rounded-md border border-neutral-500 bg-neutral-900 px-3 py-1 text-sm transition-colors focus-visible:border-neutral-50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            onChange={(event) => setInputValue(event.target.value)}
            ref={ref}
            placeholder={name === 'setor' ? 'Setor' : 'Subsetor'}
          />
        </Combobox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setInputValue('')}
        >
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-neutral-900 py-1 focus:outline-none">
            {filteredSectors.length === 0 && inputValue !== '' ? (
              <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                Nenhum {name} encontrado.
              </div>
            ) : (
              filteredSectors.map((sector) => (
                <Combobox.Option
                  key={sector}
                  className={({ active }) =>
                    clsx(
                      'relative cursor-default select-none py-2 pl-10 pr-4 text-sm text-white',
                      {
                        'bg-green-500': active,
                      },
                    )
                  }
                  value={sector}
                >
                  {({ selected, active }) => (
                    <div>
                      <strong className="font-medium">
                        {sector || 'Sem filtro'}
                      </strong>
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
