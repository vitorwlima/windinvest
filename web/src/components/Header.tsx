'use client'

import { UserButton } from '@clerk/nextjs'
import { useGetSubscriptionData } from 'src/queries/useGetSubscriptionData'
import { Logo } from './Logo'
import { SearchAsset } from './SearchAsset'

export const Header: React.FC = () => {
  const { data } = useGetSubscriptionData()

  const userIsPRO = !!data?.ok && data.data?.isUserPremium

  return (
    <header className="w-full border-b border-neutral-500 px-4 py-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <div className="flex items-end gap-1">
          <Logo size="lg" />
          {userIsPRO && (
            <p className="mb-[2px] text-sm font-bold text-sky-500">PRO</p>
          )}
        </div>
        <section className="flex w-full max-w-md flex-1 items-center justify-end gap-4">
          <SearchAsset />
          <UserButton
            userProfileMode="navigation"
            userProfileUrl="/configuracoes/conta"
          />
        </section>
      </div>
    </header>
  )
}
