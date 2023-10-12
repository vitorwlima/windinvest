'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useUpgradeToProModal } from 'src/hooks/useUpgradeToProModal'
import { useGetSubscriptionData } from 'src/queries/useGetSubscriptionData'

export const UpgradeToProModal: React.FC = () => {
  const { data } = useGetSubscriptionData()
  const { isOpen, closeModal } = useUpgradeToProModal()

  const goToPaymentScreen = () => {
    if (!data) return

    window.location.href = data.url
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md overflow-hidden rounded-2xl bg-neutral-900 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-neutral-50"
                >
                  Wind Invest <strong className="text-sky-500">PRO</strong>
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-neutral-400">
                    Com a assinatura Wind Invest PRO, você tem acesso ao Ranking
                    Wind de todos os ativos e à seção de Melhores Ações.
                  </p>
                </div>

                <div className="mt-4">
                  <div>
                    <strong className="text-xl">R$ 29,90</strong>
                    <span>/mês</span>
                  </div>

                  <p className="mt-1 text-xs text-neutral-400">
                    Cancele a qualquer momento com alguns cliques.
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="rounded-md border border-transparent bg-sky-500 px-4 py-2 text-sm font-bold text-neutral-50 transition-colors hover:bg-sky-400 focus:outline-none"
                    onClick={goToPaymentScreen}
                    disabled={!data}
                  >
                    Virar PRO
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
