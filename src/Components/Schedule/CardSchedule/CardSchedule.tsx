import React, { useMemo } from 'react'
import CardBoard from './CardBoard'
import { useFormatTime } from '~/Hooks/useFormatTime'
import { fixtureStatus } from '~/Constants/params.enum'
import Dot from '~/Components/Icons/Dot'

const CardSchedule: React.FC<any> = ({ home_team, away_team, away_goals, home_goals, vn_date_time, status }) => {
  const CardStatus = useMemo(() => {
    if (fixtureStatus.FINISHED.includes(status)) {
      return 'Đã kết thúc'
    }
    return useFormatTime(vn_date_time?.replace(' ', 'T'), true)
  }, [vn_date_time, status])

  const isRoundEnd = useMemo(() => {
    const roundStartDate = new Date(vn_date_time?.replace(' ', 'T'))

    const currentDate = new Date()

    return currentDate < roundStartDate
  }, [vn_date_time, status])

  return (
    <div className='Schedule_wrapper_inner_card'>
      <div className='Schedule_wrapper_inner_card_status'>
        {!isRoundEnd && !fixtureStatus.FINISHED.includes(status) && <Dot />}
        <span className={!isRoundEnd && !fixtureStatus.FINISHED.includes(status) ? 'active' : ''}>{CardStatus}</span>
      </div>

      <div className='Schedule_wrapper_inner_card_matches'>
        {/* home team */}
        <CardBoard team={home_team} score={home_goals} />
        {/* away team */}
        <CardBoard team={away_team} score={away_goals} />
      </div>
    </div>
  )
}

export default CardSchedule
