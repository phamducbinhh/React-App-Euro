export const formatPrize = (prize: number) => {
  return prize.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
