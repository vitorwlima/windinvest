'use client'

import { ChartBarSquareIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useGetSubscriptionData } from 'src/queries/useGetSubscriptionData'

type Props = {
  size: 'md' | 'lg'
  showPro?: boolean
}

export const Logo: React.FC<Props> = ({ size, showPro }) => {
  const { data } = useGetSubscriptionData()

  const userIsPRO = !!data?.ok && data.data?.isUserPremium

  return (
    <Link
      className={`flex items-end gap-1 outline-none transition-all focus:ring-2 focus:ring-green-500 focus:ring-offset-4 focus:ring-offset-neutral-900 ${
        size === 'md' ? 'scale-75' : ''
      }`}
      href="/"
    >
      <div className="flex items-center gap-2">
        <ChartBarSquareIcon className="h-6 w-6 text-green-500 sm:h-8 sm:w-8" />
        <h1 className="flex flex-col items-center overflow-hidden">
          <p className="text-xl font-bold sm:text-2xl">WIND</p>
          <p className="-mt-2 text-lg tracking-widest sm:text-xl">invest</p>
        </h1>
      </div>
      {showPro && userIsPRO && (
        <p className="mb-[2px] text-sm font-bold text-sky-500">PRO</p>
      )}
    </Link>
  )
}
