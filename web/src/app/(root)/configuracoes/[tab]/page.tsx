import { Metadata } from 'next'
import { SettingsTab } from './Tab'

type PageParams = {
  params: {
    tab: 'conta' | 'assinatura'
  }
}

const Settings = () => {
  return <SettingsTab />
}

export const generateMetadata = async ({
  params,
}: PageParams): Promise<Metadata> => {
  const capitalizedTab =
    params.tab.charAt(0).toUpperCase() + params.tab.slice(1)

  return {
    title: `Wind Invest - ${capitalizedTab}`,
  }
}

export default Settings
