import { Fundamentals } from '@prisma/client'

export const getGrahamPrice = (
  fundamentals: Fundamentals | null,
): number | null => {
  if (!fundamentals) {
    return null
  }

  if (
    fundamentals.profitByShare === null ||
    fundamentals.bookValuePerShare === null
  ) {
    return null
  }

  const grahamPrice = Math.sqrt(
    22.5 * fundamentals.profitByShare * fundamentals.bookValuePerShare,
  )

  return grahamPrice
}
