'use client'

import { Rankings } from 'src/components/Rankings'
import { Spinner } from 'src/components/Spinner'
import { useGetRanking } from 'src/queries/useGetRanking'

const Home = () => {
  const { data, isLoading } = useGetRanking()

  if (data === undefined || isLoading) {
    return (
      <div className="mt-32">
        <Spinner />
      </div>
    )
  }

  if (!data.ok) {
    return (
      <p className="mt-32 text-center text-2xl font-bold text-white">
        Houve um erro ao buscar os rankings.
      </p>
    )
  }

  const { data: ranking } = data

  return (
    <main>
      <Rankings ranking={ranking} />
    </main>
  )
}

export default Home
