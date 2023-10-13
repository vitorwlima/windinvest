import { getAuth as getClerkAuth } from '@clerk/fastify'
import { FastifyRequest } from 'fastify'
import { env } from 'src/env'
import { TestToken, testTokens } from './testTokens'

export const getAuth = (request: FastifyRequest) => {
  const auth = getClerkAuth(request)

  if (['test', 'development'].includes(env.NODE_ENV)) {
    const token = request.headers.authorization?.split('Bearer ')[1]

    if (Object.values(testTokens).includes(token as TestToken)) {
      auth.userId = token as TestToken
    }
  }

  return auth
}
