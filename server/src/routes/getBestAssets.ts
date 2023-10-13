import { Prisma } from '@prisma/client'
import { FastifyInstance } from 'fastify'
import { getAuth } from 'src/auth/getAuth'
import { getIsUserPro } from 'src/auth/getIsUserPro'
import { prisma } from 'src/lib/prisma'
import { z } from 'zod'

export const getBestAssets = async (fastify: FastifyInstance) => {
  fastify.get('/assets/best', async (request, reply) => {
    const { userId } = getAuth(request)

    if (!userId) {
      return reply.code(401).send({ error: 'Unauthorized' })
    }

    const isUserPro = await getIsUserPro(userId)

    if (!isUserPro) {
      return reply.code(403).send({ error: 'Forbidden' })
    }

    const querySchema = z.object({
      sector: z.string().optional(),
      subsector: z.string().optional(),
      page: z.string(),
      debt: z.enum(['true', 'false']),
      liquidity: z.enum(['true', 'false']),
      profit: z.enum(['true', 'false']),
      roe: z.enum(['true', 'false']),
    })

    const { sector, subsector, page, debt, liquidity, profit, roe } =
      querySchema.parse(request.query)

    const where: Prisma.CompanyWhereInput = {
      highestWindFinalScore: {
        not: null,
      },
      sector: {
        name: sector || undefined,
      },
      subsector: {
        name: subsector || undefined,
      },
      assets: {
        some: {
          windScore: {
            checklistDebt: debt === 'true' ? true : undefined,
            checklistLiquidity: liquidity === 'true' ? true : undefined,
            checklistProfit: profit === 'true' ? true : undefined,
            checklistRoe: roe === 'true' ? true : undefined,
          },
          liquidity: {
            not: null,
          },
        },
      },
    }

    try {
      const [companies, count] = await prisma.$transaction([
        prisma.company.findMany({
          where,
          select: {
            fantasyName: true,
            assets: {
              where: {
                windScore: {
                  checklistDebt: debt === 'true' ? true : undefined,
                  checklistLiquidity: liquidity === 'true' ? true : undefined,
                  checklistProfit: profit === 'true' ? true : undefined,
                  checklistRoe: roe === 'true' ? true : undefined,
                },
                liquidity: {
                  not: null,
                },
              },
              select: {
                ticker: true,
                windScore: {
                  select: {
                    windFinalScore: true,
                  },
                },
              },
              orderBy: {
                liquidity: 'desc',
              },
              take: 1,
            },
          },
          orderBy: {
            highestWindFinalScore: 'desc',
          },
          take: 10,
          skip: 10 * (Number(page) - 1),
        }),
        prisma.company.count({
          where,
        }),
      ])

      const assets = companies.map((company) => ({
        ticker: company.assets[0].ticker,
        windFinalScore: company.assets[0].windScore?.windFinalScore ?? 0,
        company: {
          fantasyName: company.fantasyName,
        },
      }))

      return reply.code(200).send({ assets, count })
    } catch (error) {
      return reply.code(500).send({ error })
    }
  })
}
