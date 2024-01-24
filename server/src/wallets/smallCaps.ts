import { prisma } from 'src/lib/prisma'

export const getSmallCapsWallet = async () => {
  try {
    const companies = await prisma.company.findMany({
      where: {
        highestWindFinalScore: {
          not: null,
        },
        marketValue: {
          lte: 2_000_000_000,
          gte: 100_000_000,
        },
        assets: {
          some: {},
          every: {
            liquidity: {
              gt: 50_000,
              lte: 1_000_000,
              not: null,
            },
          },
        },
      },
      select: {
        fantasyName: true,
        assets: {
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
      take: 20,
    })

    const assets = companies.map((company) => ({
      ticker: company.assets[0].ticker,
      windFinalScore: company.assets[0].windScore?.windFinalScore ?? 0,
      company: {
        fantasyName: company.fantasyName,
      },
    }))

    const wind = {
      id: 'small-caps',
      title: 'Carteira Small Caps',
      description:
        'Carteira com as 20 melhores ações com baixa liquidez e alto potencial de valorização de acordo com a pontuação Wind.',
      assets,
    }

    return wind
  } catch {
    return null
  }
}
