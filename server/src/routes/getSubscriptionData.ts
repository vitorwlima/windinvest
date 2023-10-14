import { FastifyInstance } from 'fastify'
import { getAuth } from 'src/auth/getAuth'
import { getIsUserPro } from 'src/auth/getIsUserPro'
import { env } from 'src/env'
import { prisma } from 'src/lib/prisma'
import { stripe } from 'src/lib/stripe'

export const getSubscriptionData = async (fastify: FastifyInstance) => {
  fastify.get('/get-subscription-data', async (request, reply) => {
    const { userId } = getAuth(request)

    if (!userId) {
      return reply.code(401).send({ error: 'Unauthorized' })
    }

    const { user, isUserPro, domain } = await getIsUserPro(userId)

    if (isUserPro && domain) {
      return reply.code(200).send({ isUserPro, domain })
    }

    const redirectURL = `${env.ORIGIN}/configuracoes/assinatura`

    try {
      const userSubscription = await prisma.userSubscription.findUnique({
        where: {
          userId,
        },
      })

      if (!userSubscription || !userSubscription.stripeCustomerId) {
        const stripeSession = await stripe.checkout.sessions.create({
          locale: 'pt-BR',
          success_url: redirectURL,
          cancel_url: redirectURL,
          payment_method_types: ['card', 'boleto'],
          mode: 'subscription',
          billing_address_collection: 'auto',
          customer_email: user.emailAddresses[0].emailAddress,
          line_items: [
            {
              price_data: {
                currency: 'BRL',
                product_data: {
                  name: 'Wind Invest PRO',
                  description: 'Acesso completo à plataforma Wind Invest',
                },
                unit_amount: 2990,
                recurring: {
                  interval: 'month',
                },
              },
              quantity: 1,
            },
          ],
          subscription_data: {
            trial_period_days: 7,
          },
          metadata: {
            userId,
          },
        })

        return reply
          .code(200)
          .send({ url: stripeSession.url, isUserPro, domain: null })
      }

      const stripeSession = await stripe.billingPortal.sessions.create({
        locale: 'pt-BR',
        customer: userSubscription.stripeCustomerId,
        return_url: redirectURL,
      })

      return reply
        .code(200)
        .send({ url: stripeSession.url, isUserPro, domain: null })
    } catch (error) {
      return reply.code(500).send({ error })
    }
  })
}
