'use client'

import cslx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useGetSubscriptionData } from 'src/queries/useGetSubscriptionData'

type Props = {
  size: 'md' | 'lg'
  showPro?: boolean
}

export const Logo: React.FC<Props> = ({ size, showPro }) => {
  const { data } = useGetSubscriptionData()

  const userIsPRO = !!data?.isUserPro

  return (
    <Link
      className={cslx(
        'flex items-end outline-none hover:brightness-150 focus:brightness-150 -ml-1',
        {
          'scale-90': size === 'md',
        },
      )}
      href="/"
    >
      <Image alt="Logo Wind Invest" src="/logo.svg" width={103} height={42} />
      {!!showPro && userIsPRO && (
        <p className="mb-[2px] text-xs font-bold text-sky-500">PRO</p>
      )}
    </Link>
  )
}
