// useLoginMutation.ts
import { UseMutationOptions, useMutation } from '@tanstack/react-query'
import { LoginCredentials, RegisterCredentials } from '~/@Types/user.type'
import { HttpStatusCode } from '~/Constants/httpStatusCode.enum'
import { useAuth } from '~/Context/AuthContext'
import { useAppDispatch } from '~/Redux/Hooks'
import { setIsLoggedIn } from '~/Redux/Users/reducers'
import { ApiAuthService } from '~/Repositories'

export const useLoginMutation = (options?: UseMutationOptions<any, unknown, LoginCredentials, unknown>) => {
  const { setIsAuthenticated } = useAuth()

  const dispatch = useAppDispatch()

  return useMutation({
    ...options,
    mutationFn: (body: Omit<LoginCredentials, 'login'>) => ApiAuthService.Login({ body }),
    onSuccess(data) {
      if (data.status === HttpStatusCode.Ok) {
        setIsAuthenticated(true)
        dispatch(setIsLoggedIn(true))
      }
    }
  })
}

export const useRegisterMutation = (options?: UseMutationOptions<any, unknown, RegisterCredentials, unknown>) => {
  const { setIsAuthenticated } = useAuth()

  const dispatch = useAppDispatch()

  return useMutation({
    ...options,
    mutationFn: (body: Omit<RegisterCredentials, 'register'>) => ApiAuthService.Register({ body }),
    onSuccess(data) {
      if (data.status === HttpStatusCode.Ok) {
        setIsAuthenticated(true)
        dispatch(setIsLoggedIn(true))
      }
    }
  })
}
export const useLoginFacebookMutation = (options?: UseMutationOptions<any, unknown, { token: string }, unknown>) => {
  const { setIsAuthenticated } = useAuth()

  const dispatch = useAppDispatch()

  return useMutation({
    ...options,
    mutationFn: (body: Omit<{ token: string }, 'facebook'>) => ApiAuthService.LoginFacebook({ body }),
    onSuccess(data) {
      if (data.status === HttpStatusCode.Ok) {
        setIsAuthenticated(true)
        dispatch(setIsLoggedIn(true))
      }
    }
  })
}
export const useLoginGoogleMutation = (options?: UseMutationOptions<any, unknown, { token: string }, unknown>) => {
  const { setIsAuthenticated } = useAuth()

  const dispatch = useAppDispatch()

  return useMutation({
    ...options,
    mutationFn: (body: Omit<{ token: string }, 'google'>) => ApiAuthService.LoginGoogle({ body }),
    onSuccess(data) {
      if (data.status === HttpStatusCode.Ok) {
        setIsAuthenticated(true)
        dispatch(setIsLoggedIn(true))
      }
    }
  })
}
