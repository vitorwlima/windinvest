import Fastify from 'fastify'
import { getAsset } from './routes/getAsset'

const fastify = Fastify({
  logger: true,
})

fastify.register(getAsset)

fastify.listen({ port: 3001 }, (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
