import { FastifyInstance } from 'fastify'
import { env } from 'src/env'
import { prisma } from 'src/lib/prisma'
import { stripe } from 'src/lib/stripe'
import Stripe from 'stripe'

export const postStripeWebhook = async (fastify: FastifyInstance) => {
  fastify.post(
    '/stripe-webhook',
    { config: { rawBody: true } },
    async (request, reply) => {
      try {
        const { rawBody, headers } = request

        const event = stripe.webhooks.constructEvent(
          rawBody as string,
          headers['stripe-signature'] as string,
          env.STRIPE_WEBHOOK_SECRET,
        )

        const session = event.data.object as Stripe.Checkout.Session

        if (event.type === 'checkout.session.completed') {
          const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string,
          )

          if (!session?.metadata?.userId) {
            reply.code(400)
            return { ok: false, error: 'Missing userId' }
          }

          await prisma.userSubscription.create({
            data: {
              userId: session?.metadata?.userId,
              stripeSubscriptionId: subscription.id,
              stripeCustomerId: subscription.customer as string,
              stripePriceId: subscription.items.data[0].price.id,
              stripeCurrentPeriodEnd: new Date(
                subscription.current_period_end * 1000,
              ),
            },
          })
        }

        if (event.type === 'invoice.payment_succeeded') {
          const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string,
          )

          await prisma.userSubscription.update({
            where: {
              stripeSubscriptionId: subscription.id,
            },
            data: {
              stripePriceId: subscription.items.data[0].price.id,
              stripeCurrentPeriodEnd: new Date(
                subscription.current_period_end * 1000,
              ),
            },
          })
        }

        return { ok: true, data: null }
      } catch (error) {
        reply.code(500)
        return { ok: false, error }
      }
    },
  )
}
