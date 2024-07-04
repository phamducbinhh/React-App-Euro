import { createAsyncThunk } from '@reduxjs/toolkit'
import { HttpStatusCode } from '~/Constants/httpStatusCode.enum'
import { ApiBaseService } from '~/Repositories'

const getTeamByLeagueAndSeason = createAsyncThunk(
  'football/getTeamByLeagueAndSeason',
  async ({ league, season }: { league: number; season: number }) => {
    try {
      const response = await ApiBaseService.GetTeamsByLeagueAndSeason({ league, season })
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    } catch (e: any) {
      console.error(e.message)
      throw e
    }
  }
)
const getTopUser = createAsyncThunk(
  'football/getTopUser',
  async ({ league, season, type }: { league: number; season: number; type: number | null }) => {
    try {
      const response = await ApiBaseService.GetTopUser({ league, season, type })
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    } catch (e: any) {
      console.error(e)
      throw e
    }
  }
)

const postTeamChampionLeague = createAsyncThunk(
  'football/postTeamChampionLeague',
  async ({ body, league, season }: { body: any; league: number; season: number }) => {
    try {
      const response = await ApiBaseService.PostPredictionMatchByLeagueAndSeason({ body, league, season })

      return response
    } catch (e: any) {
      console.error(e.message)
      throw e
    }
  }
)

const receiveGiftTop = createAsyncThunk(
  'football/receiveGiftTop',
  async ({ body, league, season }: { body: any; league: number; season: number }) => {
    try {
      const response = await ApiBaseService.ReceiveGiftTopUser({ body, league, season })
      return response
    } catch (error) {
      console.error(error)
      throw error
    }
  }
)

const postShareFacebook = createAsyncThunk(
  'football/postShareFacebook',
  async ({ league, season }: { league: number; season: number }) => {
    try {
      const response = await ApiBaseService.PostShareMatchByLeagueAndSeason({ league, season })
      return response
    } catch (e: any) {
      console.error(e.message)
      throw e
    }
  }
)

const getRoundByLeagueAndSeason = createAsyncThunk(
  'football/getRoundByLeagueAndSeason',
  async ({ league, season }: { league: number; season: number }) => {
    try {
      const response = await ApiBaseService.GetRoundByLeagueAndSeason({ league, season })
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    } catch (e: any) {
      console.error(e.message)
      throw e
    }
  }
)

const getTopRanking = createAsyncThunk(
  'football/getTopRanking',
  async ({
    league,
    season,
    round,
    limit
  }: {
    league: number
    season: number
    round: number | null
    limit: number | null
  }) => {
    try {
      const response = await ApiBaseService.GetRankByLeagueAndSeason({ league, season, round, limit })
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    } catch (e: any) {
      console.error(e.message)
      throw e
    }
  }
)

const getListFeatureSpace = createAsyncThunk(
  'football/getListFeatureSpace',
  async ({ search, limit = 10 }: { search: string; limit?: number }) => {
    try {
      const response = await ApiBaseService.GetListSpace({ search, limit })
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      }
    } catch (e: any) {
      console.error(e)
      throw e
    }
  }
)

export {
  getTeamByLeagueAndSeason,
  postTeamChampionLeague,
  getRoundByLeagueAndSeason,
  getTopRanking,
  getListFeatureSpace,
  postShareFacebook,
  getTopUser,
  receiveGiftTop
}
