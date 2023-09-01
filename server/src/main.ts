import cors from '@fastify/cors'
import Fastify from 'fastify'
import { ENV } from './env'
import { getAsset } from './routes/getAsset'

const fastify = Fastify({
  logger: true,
})

fastify.register(cors)
fastify.register(getAsset)

fastify.listen({ port: Number(ENV.PORT), host: '0.0.0.0' }, (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
