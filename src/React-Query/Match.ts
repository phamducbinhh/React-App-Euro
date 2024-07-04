// useMatchQueries.ts
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { HttpStatusCode } from '~/Constants/httpStatusCode.enum'
import { ApiBaseService } from '~/Repositories'

interface QueryParams {
  league: number
  season: number
  round: number | null
}

export const useMatchQueries = (
  { league, season, round }: QueryParams,
  options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<any>({
    ...options,
    queryKey: ['schedule', league, season, round],
    queryFn: async () => {
      const response = await ApiBaseService.GetMatchByLeagueAndSeason({ league, season, round })
      if (response.status === HttpStatusCode.Ok) {
        return response.data.metadata
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  })
}

export const useTeamMatchQueries = (options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery<any>({
    ...options,
    queryKey: ['team'],
    queryFn: async () => {
      const response = await ApiBaseService.GetTeamsByLeagueAndSeason({ league: 4, season: 2024 })
      if (response.status === HttpStatusCode.Ok) {
        return response.data.metadata
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  })
}
