import { Asset } from '@prisma/client'
import { prisma } from 'src/lib/prisma'
import { log } from './log'

export const handleSkipOrDeleteAsset = async (asset: Asset | null) => {
  if (!asset) {
    log('Asset successfully skipped.')
    return
  }

  log(`Asset not found or outdated. Deleting ${asset.ticker}...`)

  await prisma.fundamentals.delete({
    where: {
      assetId: asset.id,
    },
  })
  log('Fundamentals deleted.')

  await prisma.windScore.delete({
    where: {
      assetId: asset.id,
    },
  })
  log('WindScore deleted.')

  await prisma.asset.delete({
    where: {
      id: asset.id,
    },
  })
  log('Asset deleted.')

  const company = await prisma.company.findFirst({
    where: {
      assets: {
        some: {
          id: asset.id,
        },
      },
    },
    include: {
      assets: true,
    },
  })

  if (company?.assets.length === 0) {
    await prisma.company.delete({
      where: {
        id: company.id,
      },
    })
    log('Company deleted.')
  }

  log('Asset successfully deleted.')
}
