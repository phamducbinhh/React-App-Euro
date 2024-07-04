// useMatchQueries.ts
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { HttpStatusCode } from '~/Constants/httpStatusCode.enum'
import { useAppDispatch } from '~/Redux/Hooks'
import { setIsActiveGroup, setIsLoggedIn, setIsPrediction, setShareFacebook, setUserPredicted, setUserPredictionGame } from '~/Redux/Users/reducers'
import { ApiBaseService, ApiUserService } from '~/Repositories'

export const useVerifyTokenQueries = (options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  const dispatch = useAppDispatch()

  return useQuery<any>({
    ...options,
    queryKey: ['verifyToken'],
    queryFn: async () => {
      const response = await ApiUserService.VerifyToken()
      if (response.status === HttpStatusCode.Ok) {
        dispatch(setIsLoggedIn(true))
        return response.data
      } else {
        dispatch(setIsLoggedIn(false))
        return null
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  })
}
export const useVerifyUserQueries = (options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  const dispatch = useAppDispatch()

  return useQuery<any>({
    ...options,
    queryKey: ['verifyUser'],
    queryFn: async () => {
      const { data } = await ApiBaseService.GetUserProfileByLeagueAndSeason({ league: 4, season: 2024 })
      const { metadata } = data
      const { predictions, user, mini_game, active_group, shared_fb } = metadata ?? {}
      dispatch(setIsPrediction(predictions || {}))
      dispatch(setUserPredicted(user || {}))
      dispatch(setUserPredictionGame(mini_game || {}))
      dispatch(setIsActiveGroup(active_group))
      dispatch(setShareFacebook(shared_fb))
      return data
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  })
}
