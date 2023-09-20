'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const SettingsRedirect = () => {
  const { replace } = useRouter()

  useEffect(() => {
    replace('/configuracoes/conta')
  }, [replace])

  return null
}

export default SettingsRedirect
