import { LeagueSeasonParams } from '~/@Types/euro.types'

export const buildEndpoint =
  (path: string) =>
  ({ league, season, round, type, limit }: LeagueSeasonParams) => {
    let url = `${path}?league=${league}&season=${season}`
    if (round) {
      url += `&round=${round}`
    }
    if (type) {
      url += `&type=${type}`
    }
    if (limit) {
      url += `&limit=${limit}`
    }
    return url
  }

export const isObjectEmpty = (obj: Record<string, any>) => {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object
}

// Kiểm tra xem một chuỗi có phải là JSON hay không
export const checkJSONchecker = (str: string) => {
  try {
    JSON.parse(str)
    return true
  } catch (e) {
    return false
  }
}

export const formatSubString = (name: string) => {
  if (name && name.length > 12) {
    return `${name.substring(0, 12)}...`
  }
}
