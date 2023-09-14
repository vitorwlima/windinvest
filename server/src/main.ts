import cors from '@fastify/cors'
import Fastify from 'fastify'
import { env } from './env'
import { getAllAssets } from './routes/getAllAssets'
import { getAsset } from './routes/getAsset'
import { getRanking } from './routes/getRanking'

const fastify = Fastify({
  logger: true,
})

fastify.register(cors, {
  origin: env.ORIGIN,
})

fastify.register(getAsset)
fastify.register(getAllAssets)
fastify.register(getRanking)

fastify.listen({ port: Number(env.PORT), host: '0.0.0.0' }, (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
