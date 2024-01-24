import { FastifyInstance } from 'fastify'
import { getAuth } from 'src/auth/getAuth'
import { getIsUserPro } from 'src/auth/getIsUserPro'
import { getDYWallet } from 'src/wallets/dy'
import { getSmallCapsWallet } from 'src/wallets/smallCaps'
import { getWindWallet } from 'src/wallets/wind'
import { z } from 'zod'

export const getWallet = async (fastify: FastifyInstance) => {
  fastify.get('/wallets/:id', async (request, reply) => {
    const { userId } = getAuth(request)

    if (!userId) {
      return reply.code(401).send({ error: 'Unauthorized' })
    }

    const { isUserPro } = await getIsUserPro(userId)

    if (!isUserPro) {
      return reply.code(403).send({ error: 'Forbidden' })
    }

    const paramsSchema = z.object({
      id: z.string(),
    })

    const { id } = paramsSchema.parse(request.params)

    try {
      if (id === 'wind') {
        const wallet = await getWindWallet()
        return reply.code(200).send(wallet)
      }

      if (id === 'dy') {
        const wallet = await getDYWallet()
        return reply.code(200).send(wallet)
      }

      if (id === 'small-caps') {
        const wallet = await getSmallCapsWallet()
        return reply.code(200).send(wallet)
      }

      return reply.code(404).send({ error: 'Not Found' })
    } catch (error) {
      return reply.code(500).send({ error })
    }
  })
}
