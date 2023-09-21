import { Popover, Transition } from '@headlessui/react'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import { Fragment } from 'react'
import { FormattedAsset } from 'src/utils/formatAsset'
import { getFundamentals } from 'src/utils/getFundamentals'
import { AssetDataContainer } from './AssetDataContainer'

type Props = {
  asset: FormattedAsset
}

export const Fundamentals: React.FC<Props> = ({ asset }) => {
  const fundamentals = getFundamentals(asset)

  return (
    <AssetDataContainer title="INDICADORES FUNDAMENTALISTAS">
      {fundamentals.map(({ title, data }) => (
        <section className="border-neutral-500 p-4" key={title}>
          <h4 className="mb-4 text-lg">
            Indicadores de <span className="text-green-500">{title}</span>
          </h4>

          <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {data.map(({ title, value, description }) => (
              <li
                key={title}
                className="group flex flex-col gap-1 rounded-xl border border-neutral-500 p-4"
              >
                <header className="flex items-center justify-between">
                  <p className="text-xs sm:text-sm">{title.toUpperCase()}</p>
                  <Popover className="relative grid place-items-center">
                    <Popover.Button className="group focus:outline-none">
                      <QuestionMarkCircleIcon className="h-5 w-5 text-neutral-400 transition-colors group-focus:text-neutral-50 [&>path]:stroke-[2]" />
                    </Popover.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute -right-12 bottom-8 z-10 w-screen max-w-sm rounded-lg bg-neutral-950  p-4 group-odd:-left-36 md:group-odd:-right-16 md:group-even:-right-16">
                        {description}
                      </Popover.Panel>
                    </Transition>
                  </Popover>
                </header>
                <data value={value} className="text-lg font-bold">
                  {value}
                </data>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </AssetDataContainer>
  )
}
