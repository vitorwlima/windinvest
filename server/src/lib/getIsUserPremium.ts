import { prisma } from './prisma'

const DAY_IN_MS = 1000 * 60 * 60 * 24

export const getIsUserPremium = async (userId: string): Promise<boolean> => {
  try {
    const userSubscription = await prisma.userSubscription.findUnique({
      where: {
        userId,
      },
    })

    if (!userSubscription) {
      return false
    }

    const isPremium =
      !!userSubscription.stripePriceId &&
      !!userSubscription.stripeCurrentPeriodEnd &&
      userSubscription.stripeCurrentPeriodEnd.getTime() + DAY_IN_MS > Date.now()

    return isPremium
  } catch (e) {
    return false
  }
}
