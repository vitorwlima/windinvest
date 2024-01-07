import { prisma } from 'src/lib/prisma'

export const getDYWallet = async () => {
  try {
    const companies = await prisma.company.findMany({
      where: {
        highestWindFinalScore: {
          not: null,
        },
        assets: {
          some: {
            windScore: {
              checklistDebt: true,
              checklistLiquidity: true,
            },
            liquidity: {
              not: null,
            },
            fundamentals: {
              dividendYield: {
                not: null,
                gt: 5,
              },
            },
          },
        },
      },
      select: {
        fantasyName: true,
        assets: {
          where: {
            windScore: {
              checklistDebt: true,
              checklistLiquidity: true,
            },
            liquidity: {
              not: null,
            },
            fundamentals: {
              dividendYield: {
                not: null,
                gt: 5,
              },
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
      take: 20,
    })

    const assets = companies.map((company) => ({
      ticker: company.assets[0].ticker,
      windFinalScore: company.assets[0].windScore?.windFinalScore ?? 0,
      company: {
        fantasyName: company.fantasyName,
      },
    }))

    const dy = {
      id: 'dy',
      title: 'Carteira DY',
      description:
        'Carteira com as 20 melhores ações com D.Y. maior que 5% de acordo com a pontuação Wind.',
      assets,
    }

    return dy
  } catch {
    return null
  }
}
