import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { PredictionMiniGame, Predictions, User, UserPredicted, UserState } from '~/@Types/user.type'

const initialState: UserState = {
  user: {} as User,
  isLoggedIn: false,
  isEndReceiveGift: false,
  isStartMinigame: false,
  isActiveGroup: null as any,
  isPrediction: {} as Predictions,
  isUserPredicted: {} as UserPredicted,
  isUserPredictionGame: {} as PredictionMiniGame,
  energy: null,
  shareFacebook: null as any
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload
    },
    setIsActiveGroup: (state, action: PayloadAction<number>) => {
      state.isActiveGroup = action.payload
    },
    setShareFacebook: (state, action: PayloadAction<number>) => {
      state.shareFacebook = action.payload
    },
    setIsPrediction: (state, action: PayloadAction<Predictions>) => {
      state.isPrediction = action.payload
    },
    setUserPredicted: (state, action: PayloadAction<UserPredicted>) => {
      state.isUserPredicted = action.payload
    },
    setUserPredictionGame: (state, action: PayloadAction<PredictionMiniGame>) => {
      state.isUserPredictionGame = action.payload
    },
    setIsEndReceiveGift: (state, action) => {
      state.isEndReceiveGift = action.payload
    },
    setIsStartMinigame: (state, action) => {
      state.isStartMinigame = action.payload
    }
  },
})

export const {
  setIsLoggedIn,
  setIsPrediction,
  setUserPredicted,
  setUserPredictionGame,
  setIsActiveGroup,
  setShareFacebook,
  setIsEndReceiveGift,
  setIsStartMinigame
} = userSlice.actions

export default userSlice.reducer
