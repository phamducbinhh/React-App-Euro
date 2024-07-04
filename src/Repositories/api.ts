import { APP_API_ENDPOINT } from '~/Configs/endPoint'
import { apiBaseServiceInstance, apiSpaceServiceInstance } from './'

class ApiBaseService {
  public GetupdateFixtureInfo({ league, season }: { league: number; season: number }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.BASE.UPDATE_FIXTURE({ league, season }),
      config: { method: 'GET', cors: true }
    })
  }

  public GetTeamsByLeagueAndSeason({ league, season }: { league: number; season: number }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.BASE.LIST_TEAM({ league, season }),
      config: { method: 'GET', cors: true }
    })
  }

  public GetMatchByLeagueAndSeason({
    league,
    season,
    round
  }: {
    league: number
    season: number
    round: number | null
  }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.BASE.LIST_MATCH({ league, season, round }),
      config: { method: 'GET', cors: true }
    })
  }

  public GetRoundByLeagueAndSeason({ league, season }: { league: number; season: number }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.BASE.LIST_ROUND({ league, season }),
      config: { method: 'GET', cors: true }
    })
  }

  public GetRankByLeagueAndSeason({
    round,
    league,
    season,
    limit
  }: {
    league: number
    season: number
    round: number | null
    limit: number | null
  }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.BASE.PREDICTION_RANK({ league, season, round, limit }),
      config: { method: 'GET', cors: true }
    })
  }

  public GetUserProfileByLeagueAndSeason({ league, season }: { league: number; season: number }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.BASE.USER({ league, season }),
      config: { method: 'GET', cors: true }
    })
  }

  public GetTopUser({ league, season, type }: { league: number; season: number; type: number | null }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.BASE.TOP({ league, season, type }),
      config: { method: 'GET', cors: true }
    })
  }

  public PostShareMatchByLeagueAndSeason({ league, season }: { league: number; season: number }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.BASE.SHARE_FACEBOOK({ league, season }),
      config: { method: 'POST', cors: true }
    })
  }

  public PostPredictionMatchByLeagueAndSeason({
    league,
    season,
    body
  }: {
    league: number
    season: number
    body: any
  }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.BASE.PREDICTION({ league, season }),
      config: { method: 'POST', body, cors: true }
    })
  }

  public ReceiveGiftTopUser({ league, season, body }: { league: number; season: number; body: any }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.BASE.RECEIVE_GIFT({ league, season }),
      config: { method: 'POST', body, cors: true }
    })
  }

  public GetListSpace({ search, limit }: { search: string; limit: number }): Promise<any> {
    return apiSpaceServiceInstance.Http({
      path: APP_API_ENDPOINT.NEWS_PAGE.NEWS({
        search: search,
        limit: limit
      }),
      config: { method: 'GET', cors: false }
    })
  }
}

export default new ApiBaseService()
