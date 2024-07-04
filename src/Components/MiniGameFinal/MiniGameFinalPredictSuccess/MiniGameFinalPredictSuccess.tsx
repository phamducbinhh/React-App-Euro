import React from 'react'
import './MiniGameFinalPredictSuccess.scss'
import { useAppSelector } from '~/Redux/Hooks'
import { useVerifyTokenQueries } from '~/React-Query/User'
const MiniGameFinalPredictSuccess: React.FC = () => {
  const { data } = useVerifyTokenQueries()
  const finalTeam = useAppSelector((state) => state.football.finalTeam)
  return (
    <div className='minigame_final_content_success'>
      {finalTeam && (
        <div className='minigame_final-content-team'>
          <div className='minigame_final-content-team-img'>
            <img src={finalTeam?.home_team?.logo_url} alt='OEG IMAGE' />
          </div>
          <span className='minigame_final-content-team-img-vs'>VS</span>
          <div className='minigame_final-content-team-img'>
            <img src={finalTeam?.away_team?.logo_url} alt='OEG IMAGE' />
          </div>
        </div>
      )}
      <div className='minigame_final_success'>
        <h3 className='minigame_final_success_title'>
          Cảm ơn <span>{data?.display_name || data?.username}</span> đã tham gia dự đoán Minigame
          chung kết Euro 2024
        </h3>
        <p className='minigame_final_success_des'>
          Xin chúc bạn sẽ là người dự đoán đúng kết quả tại sự kiện minigame này.
        </p>
      </div>
    </div>
  )
}

export default MiniGameFinalPredictSuccess
