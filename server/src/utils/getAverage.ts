export const getAverage = (numbers: number[]) => {
  const sum = numbers.reduce((sum, number) => {
    return sum + number
  }, 0)

  const average = sum / numbers.length

  return average
}
