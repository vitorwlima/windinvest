import { env } from 'src/env'
import { prisma } from 'src/lib/prisma'
import { TestToken, testTokens } from './testTokens'

const DAY_IN_MS = 1000 * 60 * 60 * 24

export const getIsUserPro = async (userId: string): Promise<boolean> => {
  if (
    ['test', 'development'].includes(env.NODE_ENV) &&
    Object.values(testTokens).includes(userId as TestToken)
  ) {
    return userId === testTokens.PRO
  }

  try {
    const userSubscription = await prisma.userSubscription.findUnique({
      where: {
        userId,
      },
    })

    if (!userSubscription) {
      return false
    }

    const isPro =
      !!userSubscription.stripePriceId &&
      !!userSubscription.stripeCurrentPeriodEnd &&
      userSubscription.stripeCurrentPeriodEnd.getTime() + DAY_IN_MS > Date.now()

    return isPro
  } catch (e) {
    return false
  }
}
