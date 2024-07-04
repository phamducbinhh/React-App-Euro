import React from 'react'
import './RoundBXH.scss'
import { closeModalRanking } from '~/Redux/Modal/reducers'
import { useAppDispatch, useAppSelector } from '~/Redux/Hooks'
import { RoundRanking } from '~/@Types/euro.types'
import {
  setActiveAllTop,
  setLimitValue,
  setLoadingRanking,
  setRoundRankingPayload,
  setRoundRankingSelected
} from '~/Redux/Football/reducers'
import { getTopRanking } from '~/Redux/Football'
import { APP_CONSTANST_LEAGUE } from '~/Configs/endPoint'
const isMobile = () => window.matchMedia('(max-width: 900px)').matches
const RoundBXH: React.FC = () => {
  const dispatch = useAppDispatch()
  const roundType = useAppSelector((state) => state.football.RoundRankingSelected.id)
  const roundSelected = useAppSelector((state) => state.football.RoundRankingSelected)
  const roundPayload = useAppSelector((state) => state.football.RoundRankingPayload)
  const rounds = [
    { id: 1, label: 'Vòng Bảng' },
    { id: 2, label: 'Vòng 1/8' },
    { id: 3, label: 'Tứ Kết' },
    { id: 4, label: 'Bán Kết' }
    // { id: 5, label: 'Vòng Chung Kết' }
  ]
  const handleCloseRoundRanking = (): void => {
    dispatch(setRoundRankingSelected(roundPayload))
    dispatch(closeModalRanking())
    document.body.classList.remove('no-scroll')
  }

  const handleSelect = (data: RoundRanking) => {
    dispatch(setRoundRankingSelected(data))
  }
  const handleSubmit = async (): Promise<any> => {
    handleCloseRoundRanking()
    dispatch(setRoundRankingPayload(roundSelected))
    dispatch(setRoundRankingSelected(roundSelected))
    dispatch(setActiveAllTop(false))
    dispatch(setLimitValue(10))
    try {
      dispatch(setLoadingRanking(true))
      await dispatch(
        getTopRanking({
          league: APP_CONSTANST_LEAGUE.LEAGUE_ID,
          season: APP_CONSTANST_LEAGUE.SEASON_YEAR,
          round: roundType,
          limit: isMobile() ? 10 : null
        })
      )
    } catch (e: any) {
      console.log(e)
    } finally {
      dispatch(setLoadingRanking(false))
    }
  }

  return (
    <div className='modal_round'>
      <div className='modal_round_overlay' onClick={handleCloseRoundRanking}></div>
      <div className='modal_round_container'>
        <div className='modal_round_container_head'>
          <p className='modal_round_container_head_title'>Chọn vòng thi đấu</p>
          <span
            className='modal_round_container_head_icon'
            role='button'
            aria-label='Close modal'
            onClick={handleCloseRoundRanking}
          >
            <img src='image/XIcon.webp' alt='Close' />
          </span>
        </div>
        <div className='modal_round_container_content'>
          {rounds.map((round, index) => (
            <div className='modal_round_container_content_item' key={index}>
              <ul className='modal_round_container_content_item_lists'>
                <li
                  className={`modal_round_container_content_item_lists_item ${
                    roundSelected.id === round.id ? 'active' : ''
                  }`}
                  onClick={() => handleSelect(round)}
                >
                  <span className='modal_round_container_content_item_lists_item_text'>{round.label}</span>
                </li>
              </ul>
            </div>
          ))}
        </div>
        <div className='modal_round_container_action' onClick={handleSubmit}>
          <button>Xác nhận</button>
        </div>
      </div>
    </div>
  )
}

export default RoundBXH
