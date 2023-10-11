import { clerkClient, getAuth } from '@clerk/fastify'
import { FastifyInstance } from 'fastify'
import { env } from 'src/env'
import { getIsUserPremium } from 'src/lib/getIsUserPremium'
import { prisma } from 'src/lib/prisma'
import { stripe } from 'src/lib/stripe'

export const getSubscriptionData = async (fastify: FastifyInstance) => {
  fastify.get('/get-subscription-data', async (request, reply) => {
    const { userId } = getAuth(request)

    if (!userId) {
      reply.code(401)
      return { ok: false, error: 'Unauthorized' }
    }

    const user = await clerkClient.users.getUser(userId)
    const isUserPremium = await getIsUserPremium(userId)

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

        return { ok: true, data: { url: stripeSession.url, isUserPremium } }
      }

      const stripeSession = await stripe.billingPortal.sessions.create({
        locale: 'pt-BR',
        customer: userSubscription.stripeCustomerId,
        return_url: redirectURL,
      })

      return { ok: true, data: { url: stripeSession.url, isUserPremium } }
    } catch (error) {
      reply.code(500)
      return { ok: false, error }
    }
  })
}
