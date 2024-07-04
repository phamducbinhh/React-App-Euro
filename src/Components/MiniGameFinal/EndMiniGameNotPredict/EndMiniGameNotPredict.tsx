import React from 'react'
import './EndMiniGameNotPredict.scss'
import { useAppSelector } from '~/Redux/Hooks'
const MiniGameFinalPredictSuccess: React.FC = () => {
  const finalTeam = useAppSelector((state) => state.football.finalTeam)

  return (
    <div className='minigame_final_minigame_content_success'>
      {finalTeam && (
        <div className='minigame_final_minigame-content-team'>
          <div className='minigame_final_minigame-content-team-img'>
            <img src={finalTeam?.home_team?.logo_url} alt='OEG IMAGE' />
          </div>
          <span className='minigame_final_minigame-content-team-img-vs'>VS</span>
          <div className='minigame_final_minigame-content-team-img'>
            <img src={finalTeam?.away_team?.logo_url} alt='OEG IMAGE' />
          </div>
        </div>
      )}
      <div className='minigame_final_minigame_success'>
        <h3 className='minigame_final_minigame_success_title'>KẾT THÚC MINIGAME CHUNG KẾT EURO 2024</h3>
        <p className='minigame_final_minigame_success_des'>
          Thời gian dự đoán đã kết thúc. Hi vọng bạn sẽ tiếp tục ủng hộ và tham gia các sự kiện của OEG.
        </p>
      </div>
    </div>
  )
}

export default MiniGameFinalPredictSuccess
