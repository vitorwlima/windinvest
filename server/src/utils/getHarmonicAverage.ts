export const getHarmonicAverage = (numbers: number[]) => {
  const sumOfReciprocals = numbers.reduce((sum, number) => {
    return sum + 1 / number
  }, 0)

  const harmonicAverage = numbers.length / sumOfReciprocals

  return harmonicAverage
}
