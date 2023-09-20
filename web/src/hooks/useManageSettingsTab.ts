import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const tabs = [
  { name: 'Conta', path: '/configuracoes/conta' },
  { name: 'Assinatura', path: '/configuracoes/assinatura' },
]

export const useManageSettingsTab = () => {
  const path = usePathname()
  const { replace } = useRouter()
  const [currentTabIndex, setCurrentTabIndex] = useState(0)

  const changeTab = (index: number) => {
    const path = tabs[index].path
    setCurrentTabIndex(index)
    replace(path)
  }

  useEffect(() => {
    const index = tabs.findIndex((tab) => tab.path === path)
    setCurrentTabIndex(index)
  }, [path])

  return {
    tabs,
    changeTab,
    currentTabIndex,
  }
}
