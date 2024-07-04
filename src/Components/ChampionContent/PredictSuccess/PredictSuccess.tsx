import React, { useEffect } from 'react'
import './PredictSuccess.scss'
import { useAppDispatch, useAppSelector } from '~/Redux/Hooks'
import { getTeamByLeagueAndSeason } from '~/Redux/Football'
import { APP_CONSTANST_LEAGUE } from '~/Configs/endPoint'
import { useVerifyTokenQueries } from '~/React-Query/User'
const PredictSuccess: React.FC = () => {
  const { data:user } = useVerifyTokenQueries()
  const listTeam = useAppSelector((state) => state.football.listTeamByLeagueAndSeason)
  const dispatch = useAppDispatch()
  const isPrediction = useAppSelector((state) => state.users.isPrediction?.champion)
  const isPredictionCheck = useAppSelector((state) => state.football.predictedPayload)
  const teamSelect = listTeam?.find((team) => team.id === isPrediction?.team_id)
  const teamSelectCheck = listTeam?.find((team) => team.id === isPredictionCheck?.team_id)
  const logoUrl = teamSelect?.logo_url !== undefined ? teamSelect.logo_url : teamSelectCheck?.logo_url;
  useEffect(() => {
    dispatch(
      getTeamByLeagueAndSeason({ league: APP_CONSTANST_LEAGUE.LEAGUE_ID, season: APP_CONSTANST_LEAGUE.SEASON_YEAR })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className='home__container_content_your_champion_inner_predicted'>
      <div className='home__container_content_your_champion_inner_predicted_team'>
        <img src={logoUrl} alt='OEG IMAGE' />
        <div className='home__container_content_your_champion_inner_predicted_team_logo'>
          <img src='/image/check_circle.webp' alt='OEG IMAGE' />
        </div>
      </div>
      <div className='home__container_content_your_champion_inner_predicted_infor'>
        <h3 className='home__container_content_your_champion_inner_predicted_thanks'>
          Cảm ơn{' '}
          <span className='home__container_content_your_champion_inner_predicted_thanks_name'>
            {user?.display_name || user?.username}
          </span>{' '}
          đã <div>tham gia dự đoán Euro 2024</div>
        </h3>
        <p className='home__container_content_your_champion_inner_predicted_congras'>
          Xin chúc đội tuyển {teamSelect?.name} của bạn sẽ là đội tuyển vô địch trong mùa Euro năm nay.
        </p>
      </div>
    </div>
  )
}

export default PredictSuccess
