import React, { memo, useEffect, useState } from 'react'
import './MinigameFinal.scss'
import MiniGameFinalPredict from './MiniGameFinalPredict/MiniGameFinalPredict'
import MiniGameFinalPredictSuccess from './MiniGameFinalPredictSuccess/MiniGameFinalPredictSuccess'
import { useAppDispatch, useAppSelector } from '~/Redux/Hooks'
import EndMiniGameNotPredict from './EndMiniGameNotPredict/EndMiniGameNotPredict'
import MiniGameTopUser from './MiniGameTopUser/MiniGameTopUser'
import { setFinalTeam } from '~/Redux/Football/reducers'
import { openModalMiniGame } from '~/Redux/Modal/reducers'
import { APP_CONSTANST_LEAGUE } from '~/Configs/endPoint'
import { Fixture } from '~/@Types/euro.types'
import { useMatchQueries } from '~/React-Query/Match'

const MinigameFinal: React.FC = memo(() => {
  const dispatch = useAppDispatch()
  const isPredictionMinigame = useAppSelector((state) =>
    state.users?.isPrediction?.extra !== null ? state.users?.isPrediction?.extra : state.football?.isPredictedMinigame
  )
  const RangeTimePoints = useAppSelector((state) => state.users.isUserPredictionGame)
  const [isEndMinigame, setIsEndMinigame] = useState(false)
  const allTopUser = useAppSelector((state) => state.football.allTopUser)
  const isTopUserMiniGame = allTopUser?.find((item: any) => item.top_type === 5)

  const { data: listTeamAllRoundInMinigame } = useMatchQueries({
    league: APP_CONSTANST_LEAGUE.LEAGUE_ID,
    season: APP_CONSTANST_LEAGUE.SEASON_YEAR,
    round: null
  })

  useEffect(() => {
    console.log('listTeamAllRoundInMinigame', listTeamAllRoundInMinigame)
  }, [listTeamAllRoundInMinigame])


  // Memoize BeforeEndTimeMinigame function
  const BeforeEndTimeMinigame = () => {
    const endDateMinigame = new Date(RangeTimePoints.champion_minigame_end?.replace(' ', 'T'))
    const currentDateMiniGame = new Date()
    return currentDateMiniGame <= endDateMinigame
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsEndMinigame(!BeforeEndTimeMinigame())

      if (!BeforeEndTimeMinigame()) {
        clearInterval(intervalId)
      }
    }, 1000)
    return () => clearInterval(intervalId)
  }, [RangeTimePoints.champion_minigame_end])

  const handleOpenMinigameModal = () => {
    dispatch(openModalMiniGame())
    document.body.classList.add('no-scroll')
  }

  const renderContent = () => {
    if (isPredictionMinigame && !isTopUserMiniGame) {
      return <MiniGameFinalPredictSuccess />
    } else if (isTopUserMiniGame) {
      return <MiniGameTopUser />
    } else if (isEndMinigame && !isPredictionMinigame && !isTopUserMiniGame) {
      return <EndMiniGameNotPredict />
    } else {
      return <MiniGameFinalPredict />
    }
  }

  useEffect(() => {
    const finalTeamMinigame = listTeamAllRoundInMinigame?.find((team: Fixture) => team.round_id === 7)
    dispatch(setFinalTeam(finalTeamMinigame?.fixtures[0]))
  }, [listTeamAllRoundInMinigame])
  return (
    <section className='minigame_final_outer'>
      <div className='minigame_final'>
        <div className='minigame_final-bg'>
          <img src='image/BG_Minigame.png' alt='OEG IMAGE' />
        </div>
        <div className='minigame_final-top-img'>
          <img src='image/minigame_final.webp' alt='OEG IMAGE' />
        </div>
        <div className='minigame_final-content'>
          <div className='minigame_final-content-title'>
            <h2 className='minigame_final-content-title-text'>MINIGAME CHUNG KẾT EURO 2024</h2>
            {!isPredictionMinigame && !isEndMinigame && !isTopUserMiniGame && (
              <p className='minigame_final-content-title-des'>
                Bạn dự đoán trận Chung kết này có diễn ra hiệp phụ không?
              </p>
            )}
            {(isPredictionMinigame || isEndMinigame) && !isTopUserMiniGame && (
              <p className='minigame_final-content-title-des'>CHUNG KẾT DỰ ĐOÁN HIỆP PHỤ</p>
            )}
            {isTopUserMiniGame && (
              <p className='minigame_final-content-title-des'>TOP {isTopUserMiniGame.tops?.length} USER TRÚNG THƯỞNG</p>
            )}
          </div>

          {/* Conditional rendering based on isPredictionMinigame and isEndMinigame */}

          {renderContent()}
          <span className='minigame_final-content-rules' onClick={handleOpenMinigameModal}>
            thể lệ chương trình{' '}
          </span>
          <div className='minigame_final-mobile-img'>
            <img src='image/mobile_minigame_final.webp' alt='OEG IMAGE' />
          </div>
        </div>

        {/* image absolute for pc */}
        <img src='image/1st_minigame_final.webp' className='minigame_final-img-absolute-1st' alt='OEG IMAGE' />
        <img src='image/2nd_minigame_final.webp' className='minigame_final-img-absolute-2nd' alt='OEG IMAGE' />
        <img src='image/3rd_minigame_final.webp' className='minigame_final-img-absolute-3rd' alt='OEG IMAGE' />
        <img src='image/minigame_final_100.webp' className='minigame_final-img-absolute-100' alt='OEG IMAGE' />
        <img src='image/minigame_final_50.webp' className='minigame_final-img-absolute-50' alt='OEG IMAGE' />
        <img src='image/minigame_final_30.webp' className='minigame_final-img-absolute-30' alt='OEG IMAGE' />

        {/* image for mobile */}
      </div>
    </section>
  )
})

export default MinigameFinal
