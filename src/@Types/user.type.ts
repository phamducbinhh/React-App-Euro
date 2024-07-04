export interface User {
  id: string
  display_name: string
  username: string
  email: string
  avatar: string
  phone: string
  fullname: string
  birthday: string
  gender: number
  address: string | null
  id_no: string | null
  banned_at: string | null
  first_updated_at: string
  first_change_password_at: string
  upload_file_at: string
  username_updated_at: string
  email_verified_at: string
  iat: number
  exp: number
}

export interface UserPrediction {
  team_id: number
  similar_predictions_count: number
  status: number
  created_at: string
}
export interface UserPredicted {
  avatar: string
  total_points: string
  username: string
  display_name: string
}

export interface Predictions {
  champion: UserPrediction
  extra: null | any
  penalty: null | any
}
export interface PredictionMiniGame {
  champion_minigame_end: string
  champion_minigame_start: string
  champion_prediction_end: string
  champion_prediction_start: string
  share_fb_end: string
  share_fb_start: string
  receive_gift_end: string
}

export interface UserState {
  user: User
  isLoggedIn: boolean
  isStartMinigame: boolean
  isEndReceiveGift: boolean
  isActiveGroup: number
  shareFacebook: number
  energy: number | null
  isPrediction: Predictions
  isUserPredicted: UserPredicted
  isUserPredictionGame: PredictionMiniGame
}


export interface LoginCredentials {
  username: string
  password: string
}
export interface RegisterCredentials {
  username: string
  password: string
  email: string
  birthday: Date
  phone: string
  gender: number
}