import { clerkClient } from '@clerk/fastify'
import { env } from 'src/env'
import { prisma } from 'src/lib/prisma'
import { TestToken, testTokens } from './testTokens'

const DAY_IN_MS = 1000 * 60 * 60 * 24

const allowedDomains = [
  {
    name: 'Clube do Valor',
    domain: 'clubedovalor.com.br',
  },
  {
    name: 'Clevertech',
    domain: 'clevertech.biz',
  },
  {
    name: 'Família',
    domain: 'mix.embalagens@hotmail.com',
  },
  {
    name: 'GDE',
    domain: 'eduardozarpe11@gmail.com',
  },
]

type UserStatus = {
  isUserPro: boolean
  domain: string | null
  user: Awaited<ReturnType<typeof clerkClient.users.getUser>>
}

export const getIsUserPro = async (userId: string): Promise<UserStatus> => {
  const user = await clerkClient.users.getUser(userId)

  if (
    ['test', 'development'].includes(env.NODE_ENV) &&
    Object.values(testTokens).includes(userId as TestToken)
  ) {
    return { isUserPro: userId === testTokens.PRO, user, domain: null }
  }

  const userAllowedDomain = allowedDomains.find(
    (allowedDomain) =>
      user?.emailAddresses.some((email) =>
        email.emailAddress.endsWith(allowedDomain.domain),
      ),
  )

  if (userAllowedDomain) {
    return { isUserPro: true, user, domain: userAllowedDomain.name }
  }

  try {
    const userSubscription = await prisma.userSubscription.findUnique({
      where: {
        userId: userId as string,
      },
    })

    if (!userSubscription) {
      return { isUserPro: false, user, domain: null }
    }

    const isPro =
      !!userSubscription.stripePriceId &&
      !!userSubscription.stripeCurrentPeriodEnd &&
      userSubscription.stripeCurrentPeriodEnd.getTime() + DAY_IN_MS > Date.now()

    return { isUserPro: isPro, user, domain: null }
  } catch (e) {
    return { isUserPro: false, user, domain: null }
  }
}
