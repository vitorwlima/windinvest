'use client'

import { UserProfile } from '@clerk/nextjs'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { useManageSettingsTab } from 'src/hooks/useManageSettingsTab'
import { useUpgradeToProModal } from 'src/hooks/useUpgradeToProModal'
import { useGetSubscriptionData } from 'src/queries/useGetSubscriptionData'

export const SettingsTab = () => {
  const { data, isLoading } = useGetSubscriptionData()
  const { tabs, currentTabIndex, changeTab } = useManageSettingsTab()
  const { openModal } = useUpgradeToProModal()

  const getSubscriptionButtonText = () => {
    if (!data || !data.ok || isLoading) return 'Carregando...'
    if (data.data.isUserPremium) return 'Gerenciar assinatura'
    return 'Assinar'
  }

  const getSubscriptionStatusText = () => {
    if (!data || !data.ok || isLoading) return ''
    if (data.data.isUserPremium)
      return 'Sua assinatura está ativa no plano PRO.'
    return 'Você ainda não assinou o plano PRO.'
  }

  const handleClick = () => {
    if (!data || !data.ok || isLoading) return
    if (data.data.isUserPremium) {
      window.location.href = data.data.url
      return
    }

    openModal()
  }

  return (
    <main className="mx-auto mt-4 max-w-6xl px-4">
      <h2 className="mb-4 text-xl font-bold">Configurações</h2>
      <Tab.Group onChange={changeTab} selectedIndex={currentTabIndex}>
        <Tab.List className="flex space-x-1 rounded-xl bg-green-500 p-1">
          {tabs.map((tab) => (
            <Tab
              key={tab.path}
              className={({ selected }) =>
                clsx(
                  'w-full rounded-lg py-2 text-sm font-medium transition-colors focus:outline-none',
                  {
                    'bg-neutral-50 text-green-500': selected,
                    'hover:bg-white/20': !selected,
                  },
                )
              }
            >
              {tab.name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel className="flex justify-center pt-4">
            <UserProfile path="/configuracoes/conta" routing="path" />
          </Tab.Panel>

          <Tab.Panel className="pt-4">
            <p className="mb-2 text-sm text-neutral-400">
              {getSubscriptionStatusText()}
            </p>

            <button
              className="rounded-md border border-transparent bg-sky-500 px-4 py-2 font-bold text-neutral-50 transition-colors hover:bg-sky-400 focus:outline-none"
              onClick={handleClick}
            >
              {getSubscriptionButtonText()}
            </button>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </main>
  )
}
