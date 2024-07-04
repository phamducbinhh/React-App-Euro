import React from 'react'
import './Countdown.scss'
import { useCountdown } from '~/Hooks/useCountdown'
import { useAppSelector } from '~/Redux/Hooks'

const Countdown: React.FC = () => {
  const PredictionGame = useAppSelector((state) => state.users.isUserPredictionGame)

  const { champion_prediction_start, champion_prediction_end } = PredictionGame

  const { days, hours, minutes, seconds } = useCountdown({
    start_time_string: champion_prediction_start,
    finish_time_string: champion_prediction_end
  })

  return (
    <div className='countdown_components'>
      <div className='countdown_components_item'>
        <div className='countdown_components_item_text'>
          <span className='countdown_components_item_text_inner'>{days}</span>
          <span className='countdown_components_item_text_inner_under'>NGÀY</span>
        </div>
      </div>
      <div className='countdown_components_item'>
        <div className='countdown_components_item_text'>
          <span className='countdown_components_item_text_inner'>{hours}</span>
          <span className='countdown_components_item_text_inner_under'>GIỜ</span>
        </div>
      </div>
      <div className='countdown_components_item'>
        <div className='countdown_components_item_text'>
          <span className='countdown_components_item_text_inner'>{minutes}</span>
          <span className='countdown_components_item_text_inner_under'>PHÚT</span>
        </div>
      </div>
      <div className='countdown_components_item'>
        <div className='countdown_components_item_text'>
          <span className='countdown_components_item_text_inner'>{seconds}</span>
          <span className='countdown_components_item_text_inner_under'>GIÂY</span>
        </div>
      </div>
    </div>
  )
}

export default Countdown
