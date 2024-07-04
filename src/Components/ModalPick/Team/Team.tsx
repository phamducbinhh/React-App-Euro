import React, { useEffect, useState } from 'react'
import './Team.scss'
import { useAppDispatch, useAppSelector } from '~/Redux/Hooks'
import type { Team } from '~/@Types/euro.types'
import LoadingComponent from '~/Components/Loading'
import { setPredictedTeam } from '~/Redux/Football/reducers'
import { closeModalPickTeam } from '~/Redux/Modal/reducers'
import { useTeamMatchQueries } from '~/React-Query/Match'
const Team: React.FC = () => {
  const dispatch = useAppDispatch()

  const { data: listTeam, isLoading } = useTeamMatchQueries()

  const [sortedListTeam, setSortedListTeam] = useState<Team[]>([])

  const predictedTeam = useAppSelector((state) => state.football.predictedTeam)

  const [isChange, setIsChanged] = useState(false)

  const [selectTeam, setSelectTeam] = useState<Team | null>(predictedTeam.id ? predictedTeam : null)

  useEffect(() => {
    if (!isLoading) {
      setSortedListTeam(
        [...listTeam].sort((a, b) => {
          if (a.name < b.name) return -1
          if (a.name > b.name) return 1
          return 0
        })
      )
    }
  }, [listTeam, isLoading])
  const handleClosePickTeamModal = () => {
    document.body.classList.remove('no-scroll')
    dispatch(closeModalPickTeam())
  }

  const handleSelectTeam = (data: Team) => {
    setIsChanged(true)
    setSelectTeam(data)
  }

  const handleSubmitPickTeam = () => {
    if (!isChange) {
      return
    }
    const action = { ...selectTeam }
    dispatch(setPredictedTeam(action))
    dispatch(closeModalPickTeam())
    document.body.classList.remove('no-scroll')
  }

  const isActive = (item: Team) => {
    return item.id === selectTeam?.id
  }

  useEffect(() => {
    return () => {
      setIsChanged(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='team'>
      <div className='team_overlay' onClick={handleClosePickTeamModal}></div>
      <div className='team_container'>
        <div className='team_container_close' onClick={handleClosePickTeamModal}>
          <img src='image/XIcon.webp' alt='OEG IMAGE' />
        </div>

        <h3 className='team_container_title'>Chọn đội tuyển</h3>

        <p className='team_container_subtitle'>
          Chọn đội tuyển bạn dự đoán vô địch <span style={{ display: 'block' }}>mùa Euro 2024</span>
        </p>
        {isLoading ? (
          <div className='team_container_spinner'>
            {' '}
            <LoadingComponent />
          </div>
        ) : sortedListTeam && sortedListTeam.length > 0 ? (
          <div className='team_container_content'>
            {sortedListTeam.map((item) => (
              <div
                key={item.id}
                className={`team_container_content_item ${isActive(item) ? 'active' : ''}`}
                onClick={() => handleSelectTeam(item)}
              >
                <div className='team_container_content_item_logo'>
                  <div className='team_container_content_item_logo_images'>
                    <img src={item.logo_url} alt='logo' />
                  </div>
                </div>
                <div className='team_container_content_item_name'>
                  <span>{item.name}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No teams available.</p>
        )}
        <div className={`team_container_action ${!isChange ? 'disabled' : ''}`} onClick={handleSubmitPickTeam}>
          <button>Xác nhận</button>
        </div>
      </div>
    </div>
  )
}

export default Team
