import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { footBallState } from '~/@Types/euro.types'
import { getListFeatureSpace, getRoundByLeagueAndSeason, getTeamByLeagueAndSeason, getTopRanking } from './actions'
import { useLocalStorage } from '~/Services/localStorage/localStorageService'

const initialState: footBallState = {
  listMatchByLeagueAndSeason: [],
  listScheduleByLeagueAndSeason: [],
  listFeatureSpace: [],
  listTeamByLeagueAndSeason: [],
  listRoundByLeagueAndSeason: [],
  finalTeam: {},
  predictedTeam: useLocalStorage.getLocalStorageData('predictedTeam') || { id: 0, name: '', logo_url: '' },
  predictedRound: {
    group_id: 0,
    group_name: ''
  },
  isPredictedMinigame: false,
  isPredictedChampion: false,
  isSharedOnFacebookToday: false,
  inputValueMinigame: '',
  allTopUser: [],
  predictedUsers: useLocalStorage.getLocalStorageData('predictedUsers') || '',
  isLoadingRank: false,
  isLoadingMatch: false,
  loadingButtonStatus: {}, // Add this line
  topRanking: [],
  totalTopRanking: 0,
  predictedPayload: {},
  predictedPayloadMinigameFinal: {},
  isActiveAllTop: false,
  isLoading: false,
  RoundRankingSelected: {
    id: 1,
    label: 'Vòng bảng'
  },
  RoundRankingPayload: { id: 1, label: 'Vòng bảng' },
  predictedFixture_id: [],
  predictedArrTeam_id: [],
  isSetLocalStorage: false,
  isSetLocalSession: false,
  isMinigameStorage: false,
  isMiniGamePayload: {},
  limitValue: 10,
  topUser: [],
  predictedBody: {
    team_id: useLocalStorage.getLocalStorageData('predictedTeamId'),
    fixture_id: useLocalStorage.getLocalStorageData('predictedTeamMatchId') || null,
    key: useLocalStorage.getLocalStorageData('predictedTeamKey') || null
  }
}

const footballSlice = createSlice({
  name: 'football',
  initialState,
  reducers: {
    setPredictedTeam: (state, action) => {
      state.predictedTeam = action.payload
    },
    setPredictedBody: (state, action) => {
      state.predictedBody = action.payload
    },
    setLoadingRanking: (state, action) => {
      state.isLoadingRank = action.payload
    },
    setIsPredictedMinigame: (state, action) => {
      state.isPredictedMinigame = action.payload
    },
    setIsPredictedChampion: (state, action) => {
      state.isPredictedChampion = action.payload
    },
    setPredictedFixture_id: (state, action) => {
      state.predictedFixture_id = [...state.predictedFixture_id, action.payload]
    },
    setInputValueMiniGame: (state, action) => {
      state.inputValueMinigame = action.payload
    },
    setPredictedArrTeam_id: (state, action) => {
      state.predictedArrTeam_id = [...state.predictedArrTeam_id, action.payload]
    },
    setPredictedRound: (state, action) => {
      state.predictedRound = action.payload
    },
    setFinalTeam: (state, action) => {
      state.finalTeam = action.payload
    },
    setPredictedUsers: (state, action) => {
      state.predictedUsers = action.payload
    },
    setPredictedPayload: (state, action) => {
      state.predictedPayload = action.payload
    },
    setMiniGamePayloadToLocalStorage: (state, action) => {
      state.isMiniGamePayload = action.payload
    },
    setInputMiniGame: (state, action) => {
      state.inputValueMinigame = action.payload
    },
    setPredictedPayloadMinigame: (state, action) => {
      state.predictedPayloadMinigameFinal = action.payload
    },
    setLimitValue: (state, action) => {
      state.limitValue = action.payload
    },
    setRoundRankingPayload: (state, action) => {
      state.RoundRankingPayload = action.payload
    },
    setIsShareOnFacebook: (state, action) => {
      state.isSharedOnFacebookToday = action.payload
    },
    setAllTopUser: (state, action) => {
      state.allTopUser = action.payload
    },
    setRoundRankingSelected: (state, action) => {
      state.RoundRankingSelected = action.payload
    },
    setActiveAllTop: (state, action) => {
      state.isActiveAllTop = action.payload
    },
    setLoadingButtonStatus: (state, action: PayloadAction<{ id: number; isLoading: boolean }>) => {
      state.loadingButtonStatus[action.payload.id] = action.payload.isLoading
    },
    SetisSetLocalStorage: (state, action) => {
      state.isSetLocalStorage = action.payload
    },
    SetisSetMiniGameStorage: (state, action) => {
      state.isMinigameStorage = action.payload
    },
    SetisSetLocalSession: (state, action) => {
      state.isSetLocalSession = action.payload
    },
    setTopRanking: (state, action) => {
      state.topRanking = action.payload
    },
    setTopUser: (state, action) => {
      state.topUser = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getRoundByLeagueAndSeason.fulfilled, (state, action) => {
      state.listRoundByLeagueAndSeason = action.payload.metadata
    })

    builder.addCase(getTopRanking.fulfilled, (state, action) => {
      state.topRanking = action.payload.metadata?.items
      state.totalTopRanking = action.payload.metadata?.total_items
    })

    builder.addCase(getTeamByLeagueAndSeason.pending, (state) => {
      state.isLoading = true
    })

    builder.addCase(getTeamByLeagueAndSeason.fulfilled, (state, action) => {
      state.listTeamByLeagueAndSeason = action.payload.metadata
      state.isLoading = false
    })

    builder.addCase(getTeamByLeagueAndSeason.rejected, (state) => {
      state.isLoading = false
    })

    builder.addCase(getListFeatureSpace.fulfilled, (state, action) => {
      state.listFeatureSpace = action.payload.metadata
    })
  }
})

export const {
  setPredictedTeam,
  setPredictedUsers,
  setPredictedPayload,
  setPredictedPayloadMinigame,
  setPredictedRound,
  setRoundRankingSelected,
  setRoundRankingPayload,
  setActiveAllTop,
  setPredictedFixture_id,
  setPredictedArrTeam_id,
  setLoadingButtonStatus,
  SetisSetLocalStorage,
  SetisSetLocalSession,
  setAllTopUser,
  setTopRanking,
  setTopUser,
  setLoadingRanking,
  setPredictedBody,
  setLimitValue,
  setInputValueMiniGame,
  SetisSetMiniGameStorage,
  setMiniGamePayloadToLocalStorage,
  setInputMiniGame,
  setFinalTeam,
  setIsPredictedMinigame,
  setIsPredictedChampion,
  setIsShareOnFacebook
} = footballSlice.actions
export default footballSlice.reducer
