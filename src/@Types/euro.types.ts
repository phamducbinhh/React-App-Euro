export interface LeagueSeasonParams {
  league: number
  season: number
  round?: number | null
  type?: number | null
  limit?: number | null
}

export interface Team {
  id: number
  name: string
  logo_url: string
}
export interface topRanking {
  username: string
  fullname: string
  display_name: string
  avatar: string
  total_points: number
  user_id: number
  total_correct_prediction_seconds: number
  total_correct_predictions: number
  total_prediction_seconds: number
  total_predictions: number
}
export interface RoundRanking {
  id: number
  label: string
}

export interface Round_id {
  id: number
  display_name: string
  group?: string
}
export interface Match_id {
  team_id: number
  fixture_id: number
}

export interface Round {
  group_id: number
  group_name: string
  rounds?: Round_id
}
export interface PretectionBody {
  team_id: number
  fixture_id: number
  key: string | null
}

export interface Fixture {
  id: number
  round_id?: number
  timezone: string
  date_time: string
  home_goals: number | null
  away_goals: number | null
  winner_team_id: number | null
  home_team: Team
  away_team: Team
  round: Round
  status: string
  vn_date_time: string
}

export interface Metadata {
  round: string
  round_id: number
  round_name: string
  round_start: string
  fixtures: Fixture[]
}

export interface ApiResponse {
  status: string
  code: number
  message: string
  metadata: Metadata[]
}
export interface StatusLoading {
  [key: number]: boolean
}
export interface footBallState {
  listMatchByLeagueAndSeason: Metadata[]
  listScheduleByLeagueAndSeason: Metadata[]
  listFeatureSpace: any
  listTeamByLeagueAndSeason: Team[]
  listRoundByLeagueAndSeason: Round[]
  predictedTeam: Team
  predictedRound: Round
  predictedUsers: string
  isPredictedMinigame: boolean
  inputValueMinigame: string
  predictedPayload: any
  predictedPayloadMinigameFinal: any
  RoundRankingPayload: any
  isLoading: boolean
  isLoadingRank: boolean
  isSharedOnFacebookToday: boolean
  isLoadingMatch: boolean
  isPredictedChampion: boolean
  loadingButtonStatus: StatusLoading
  topRanking: topRanking[]
  RoundRankingSelected: RoundRanking
  totalTopRanking: number
  isActiveAllTop: boolean
  isSetLocalStorage: boolean
  isSetLocalSession: boolean
  isMinigameStorage: boolean
  predictedFixture_id: number[]
  finalTeam: any
  allTopUser: any
  predictedArrTeam_id: Match_id[]
  isMiniGamePayload: any
  topUser: any
  limitValue: number
  predictedBody: PretectionBody
}

export type Timer = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export interface MatchOfRound {
  fixtures: Fixture[]
  round_name: string
  round_start: string
}
