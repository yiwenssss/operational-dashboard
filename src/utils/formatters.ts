export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)

export const formatCompactCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)

export const getDaysInStage = (date: string) => {
  const stageDate = new Date(date)
  const now = new Date('2026-09-07T00:00:00Z')
  return Math.max(0, Math.ceil((now.getTime() - stageDate.getTime()) / (1000 * 60 * 60 * 24)))
}
