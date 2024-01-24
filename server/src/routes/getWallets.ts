import { FastifyInstance } from 'fastify'
import { getAuth } from 'src/auth/getAuth'
import { getIsUserPro } from 'src/auth/getIsUserPro'

export const getWallets = async (fastify: FastifyInstance) => {
  fastify.get('/wallets', async (request, reply) => {
    const { userId } = getAuth(request)

    if (!userId) {
      return reply.code(401).send({ error: 'Unauthorized' })
    }

    const { isUserPro } = await getIsUserPro(userId)

    if (!isUserPro) {
      return reply.code(403).send({ error: 'Forbidden' })
    }

    try {
      const wind = {
        id: 'wind',
        title: 'Carteira Wind',
        description:
          'Carteira com as 20 melhores ações de acordo com a pontuação Wind.',
        assetsCount: 20,
      }

      const dy = {
        id: 'dy',
        title: 'Carteira DY',
        description:
          'Carteira com as 20 melhores ações com D.Y. maior que 5% de acordo com a pontuação Wind.',
        assetsCount: 20,
      }

      const smallCaps = {
        id: 'small-caps',
        title: 'Carteira Small Caps',
        description:
          'Carteira com as 20 melhores ações com baixa liquidez e alto potencial de valorização de acordo com a pontuação Wind.',
        assetsCount: 20,
      }

      return reply.code(200).send({ wallets: [wind, dy, smallCaps] })
    } catch (error) {
      return reply.code(500).send({ error })
    }
  })
}
