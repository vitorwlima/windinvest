import { Footer } from 'src/components/Footer'
import { Header } from 'src/components/Header'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div>
        <Header />
        {children}
      </div>
      <Footer />
    </>
  )
}

export default Layout
