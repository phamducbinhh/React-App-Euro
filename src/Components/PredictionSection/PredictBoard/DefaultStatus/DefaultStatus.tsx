import React from 'react'
import LoadingButton from '~/Components/LoadingButton'
import { useCountdown2 } from '~/Hooks/useCountdown'
import { useAppSelector } from '~/Redux/Hooks'

const DefaultStatus: React.FC<{
  GetTimeTournamentMatch: string | undefined
  timeStart: string
  id: number
  handleSubmit: (id: number) => void
}> = ({ GetTimeTournamentMatch, id, handleSubmit, timeStart }) => {
  const { days, hours, minutes, seconds } = useCountdown2({
    start_time_string: timeStart
  })

  const isLoadingButton = useAppSelector((state) => state.football.loadingButtonStatus[id])

  const formatSecondCoundown = () => {
    const sec = Math.floor(seconds)
    return `${sec < 10 ? '0' + sec : sec}`
  }
  const formatDaysCoundown = () => {
    const day = Math.floor(days)
    return `${day < 10 ? '0' + day : day}`
  }
  const formatHourCoundown = () => {
    const hour = Math.floor(hours)
    return `${hour < 10 ? '0' + hour : hour}`
  }
  const formatMinrCoundown = () => {
    const min = Math.floor(minutes)
    return `${min < 10 ? '0' + min : min}`
  }

  const GetTimeMatchStart = () => {
    if (days === 0) {
      return (
        <>
          {formatHourCoundown()} : {formatMinrCoundown()} : {formatSecondCoundown()}
        </>
      )
    }
    return (
      <>
        Còn {formatDaysCoundown()} ngày
        <div> để dự đoán</div>
      </>
    )
  }

  return (
    <div className='home_predict_board_left_item_action_inner'>
      <div className='home_predict_board_left_item_action_inner_text'>
        <span className='home_predict_board_left_item_action_inner_text_board'>{GetTimeTournamentMatch}</span>
        <span className='home_predict_board_left_item_action_inner_text_countdown'>{GetTimeMatchStart()}</span>
      </div>
      <button
        className='home_predict_board_left_item_action_inner_button'
        onClick={() => handleSubmit(id)}
        disabled={isLoadingButton}
      >
        <span>{isLoadingButton ? <LoadingButton /> : 'Dự đoán'}</span>
      </button>
    </div>
  )
}

export default DefaultStatus
