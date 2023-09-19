import { BestAssets } from 'src/components/BestAssets'
import { Footer } from 'src/components/Footer'
import { Header } from 'src/components/Header'
import { Rankings } from 'src/components/Rankings'

const Home = () => {
  return (
    <>
      <div>
        <Header />
        <main>
          <Rankings />
          <BestAssets />
        </main>
      </div>
      <Footer />
    </>
  )
}

export default Home
