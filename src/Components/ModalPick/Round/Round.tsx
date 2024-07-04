import React, { useEffect, useState } from 'react'
import './Round.scss'
import { useAppDispatch, useAppSelector } from '~/Redux/Hooks'
import { closeModalRound } from '~/Redux/Modal/reducers'
import type { Round } from '~/@Types/euro.types'
import { setPredictedRound } from '~/Redux/Football/reducers'
const Round: React.FC = () => {
  const dispatch = useAppDispatch()

  const predictedRound = useAppSelector((state) => state.football.predictedRound)

  const isActiveGroup = useAppSelector((state) => state.users.isActiveGroup)

  const roundIdToUse = predictedRound.group_id === 0 ? isActiveGroup : predictedRound.group_id

  const listRound = [
    { group_id: 1, group_name: 'Vòng Bảng' },
    { group_id: 2, group_name: 'Vòng 1/8' },
    { group_id: 3, group_name: 'Tứ Kết' },
    { group_id: 4, group_name: 'Bán Kết' }
  ]

  const [selectRound, setSelectRound] = useState<Round | null>(null)

  const handleSelectRound = (data: Round) => {
    setSelectRound(data)
  }

  const handleSubmitPickRound = () => {
    if (!selectRound) {
      return
    }
    const action = { ...selectRound }
    dispatch(setPredictedRound(action))
    dispatch(closeModalRound())
    document.body.classList.remove('no-scroll')
  }

  const isActive = (item: Round) => {
    return item.group_id === selectRound?.group_id
  }

  const handleCloseModalRound = (): void => {
    dispatch(closeModalRound())
    document.body.classList.remove('no-scroll')
  }

  useEffect(() => {
    const foundRound = listRound?.find((item) => item.group_id === roundIdToUse)
    if (foundRound) {
      const data = { ...foundRound }
      setSelectRound(data)
    }

    return () => {
      setSelectRound(null)
    }
  }, [roundIdToUse])

  return (
    <div className='modal_round'>
      <div className='modal_round_overlay' onClick={handleCloseModalRound}></div>
      <div className='modal_round_container'>
        <div className='modal_round_container_head'>
          <p className='modal_round_container_head_title'>Chọn vòng thi đấu</p>
          <span className='modal_round_container_head_icon' onClick={handleCloseModalRound}>
            <img src='image/XIcon.webp' alt='OEG IMAGE' />
          </span>
        </div>
        <div className='modal_round_container_content'>
          {listRound && listRound.length > 0 ? (
            listRound.map((item) => (
              <div
                key={item.group_id}
                className='modal_round_container_content_item'
                onClick={() => handleSelectRound(item)}
              >
                <ul className='modal_round_container_content_item_lists'>
                  <li className={`modal_round_container_content_item_lists_item ${isActive(item) && 'active'}`}>
                    <span className='modal_round_container_content_item_lists_item_text'>{item.group_name}</span>
                  </li>
                </ul>
              </div>
            ))
          ) : (
            <p>No teams available.</p>
          )}
        </div>

        <div className={`modal_round_container_action ${!selectRound && 'disabled'}`} onClick={handleSubmitPickRound}>
          <button>Xác nhận</button>
        </div>
      </div>
    </div>
  )
}

export default Round
