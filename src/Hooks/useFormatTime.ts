export const useFormatTime = (dateTime: string, characters = false) => {
  if (!dateTime) return
  const date = new Date(dateTime?.replace(' ', 'T'))
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  if (characters) {
    return `${hours}:${minutes}  ${day}/${month}`
  }

  return `${hours}:${minutes} - ${day}/${month}`
}
