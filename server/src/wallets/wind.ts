import { prisma } from 'src/lib/prisma'

export const getWindWallet = async () => {
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

    const wind = {
      id: 'wind',
      title: 'Carteira Wind',
      description:
        'Carteira com as 20 melhores ações de acordo com a pontuação Wind.',
      assets,
    }

    return wind
  } catch {
    return null
  }
}
