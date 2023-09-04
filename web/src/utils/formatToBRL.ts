export type Unit = 'M' | 'B' | 'T'

const unitValue: Record<Unit, number> = {
  M: 1e6,
  B: 1e9,
  T: 1e12,
}

export const formatToBRL = (value: number, unit?: Unit): string => {
  const unitMultiplier = unit ? unitValue[unit] : 1

  const brl = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value / unitMultiplier)

  return unit ? `${brl} ${unit}` : brl
}
