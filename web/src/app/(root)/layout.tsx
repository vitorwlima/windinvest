import { Footer } from 'src/components/Footer'
import { Header } from 'src/components/Header'
import { UpgradeToProModal } from 'src/components/UpgradeToProModal'
import { UpgradeToProModalContextWrapper } from 'src/hooks/useUpgradeToProModal'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <UpgradeToProModalContextWrapper>
      <UpgradeToProModal />
      <div className="flex min-h-screen flex-col">
        <div className="flex-1">
          <Header />
          {children}
        </div>
        <Footer />
      </div>
    </UpgradeToProModalContextWrapper>
  )
}

export default Layout
