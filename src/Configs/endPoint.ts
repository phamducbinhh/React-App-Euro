import { buildEndpoint } from '~/Helpers'

export const redirectConfig = {
  eSports: (import.meta.env.VITE_PUBLIC_URL_REDIRECT_ESPORTS as any),
  Games: (import.meta.env.VITE_PUBLIC_URL_REDIRECT_STADIUM as any),
  Stadium: (import.meta.env.VITE_PUBLIC_URL_REDIRECT_STADIUM as any),
  News: (import.meta.env.VITE_PUBLIC_URL_REDIRECT_NEWS as any),
  Profile: (import.meta.env.VITE_PUBLIC_API_REDIRECT_PROFILE as any),
  Biz: (import.meta.env.VITE_PUBLIC_API_REDIRECT_BIZ as any),
  Home: (import.meta.env.VITE_PUBLIC_URL_REDIRECT_HOME as any),
  Euro: (import.meta.env.VITE_PUBLIC_API_REDIRECT_EURO as any)
}

export const API_CONFIGS = Object.freeze({
  host: (import.meta.env.VITE_PUBLIC_API_BASE_HOST as string),
  host_profile: (import.meta.env.VITE_PUBLIC_API_PROFILE_HOST as string),
  host_space: (import.meta.env.VITE_PUBLIC_API_SPACE_HOST as string),
  user_prefix: (import.meta.env.VITE_PUBLIC_API_USER_PREFIX as string),
  auth_prefix: (import.meta.env.VITE_PUBLIC_API_AUTH_PREFIX as string),
  private_key_google: import.meta.env.VITE_PUBLIC_GOOGLE_APP_ID as string,
  private_key_facebook: import.meta.env.VITE_PUBLIC_FACEBOOK_APP_ID as string,
})

export const APP_API_ENDPOINT = Object.freeze({
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgotPassword',
    RESET_PASSWORD: '/resetPassword',
    LOGIN_GOOGLE: '/login/google',
    LOGIN_FACEBOOK: '/login/facebook'
  },
  USER: {
    VERIFY_TOKEN: '/verify',
    VERIFY_USER: '',
    LOG_OUT: '/logout',
    ENERGY: '/getBalanceEnergy'
  },
  BASE: {
    UPDATE_FIXTURE: buildEndpoint('/update-data'),
    LIST_TEAM: buildEndpoint('/team'),
    LIST_MATCH: buildEndpoint('/fixtures'),
    LIST_ROUND: buildEndpoint('/round'),
    SHARE_FACEBOOK: buildEndpoint('/share-fb'),
    PREDICTION: buildEndpoint('/prediction'),
    USER: buildEndpoint('/page'),
    PREDICTION_RANK: buildEndpoint('/point-rank'),
    TOP: buildEndpoint('/top'),
    RECEIVE_GIFT: buildEndpoint('/receive-gift')
  },
  NEWS_PAGE: {
    NEWS: ({ search, limit }: any) => {
      const queryParams: string[] = []
      if (search !== null && search !== undefined) {
        queryParams.push(`search=${encodeURIComponent(search)}`)
      }
      if (limit !== null && limit !== undefined) {
        queryParams.push(`limit=${limit}`)
      }
      return `/news?${queryParams.join('&')}`
    }
  }
})

export const APP_CONSTANST_LEAGUE = Object.freeze({
  LEAGUE_ID: 4,
  SEASON_YEAR: 2024,
  DRAW_KEY: 'draw',
  HOME_KEY: 'home_team',
  AWAY_KEY: 'away_team'
})
