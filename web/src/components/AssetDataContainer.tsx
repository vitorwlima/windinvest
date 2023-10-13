import { Popover, Transition } from '@headlessui/react'
import { HelpCircle } from 'lucide-react'
import { Fragment } from 'react'

type Props = {
  title: string
  description?: {
    text: string
    moreInfoURL?: string
  }
  children: React.ReactNode
}

export const AssetDataContainer: React.FC<Props> = ({
  title,
  description,
  children,
}) => {
  return (
    <div className="mx-auto mt-12 grid max-w-6xl px-4 pt-4">
      <div className="rounded-2xl border border-gray-700">
        <header className="relative flex items-center justify-center gap-1 rounded-t-2xl bg-green-500 p-4">
          <h3 className="text-center text-xl font-semibold text-gray-50 sm:text-2xl">
            {title}
          </h3>

          {!!description && (
            <Popover className="grid place-items-center">
              <Popover.Button className="group focus:outline-none">
                <HelpCircle className="h-4 w-4 rounded-full text-gray-200 transition-colors group-focus:text-gray-50 [&>path]:stroke-[2]" />
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
                <Popover.Panel className="absolute bottom-12 right-[-14px] z-10 w-screen max-w-sm rounded-lg bg-gray-950 p-4 sm:right-1/3">
                  <p>{description.text}</p>

                  {!!description.moreInfoURL && (
                    <p className="mt-4 text-sm text-gray-400">
                      Saiba mais{' '}
                      <a
                        className="font-bold text-green-500 transition-colors hover:text-green-400 focus:text-green-400 focus:outline-none"
                        href={description.moreInfoURL}
                        target="_blank"
                      >
                        aqui
                      </a>
                      .
                    </p>
                  )}
                </Popover.Panel>
              </Transition>
            </Popover>
          )}
        </header>

        {children}
      </div>
    </div>
  )
}
