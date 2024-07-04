import React, { useEffect, useRef, useState } from 'react'
import './MiniGameFinalPredict.scss'
import { useAppDispatch, useAppSelector } from '~/Redux/Hooks'
import { postTeamChampionLeague } from '~/Redux/Football'
import { APP_CONSTANST_LEAGUE } from '~/Configs/endPoint'
import {
  SetisSetMiniGameStorage,
  setInputMiniGame,
  setInputValueMiniGame,
  setIsPredictedMinigame,
  setMiniGamePayloadToLocalStorage,
  setPredictedPayloadMinigame
} from '~/Redux/Football/reducers'
import { OpenSubmit, openModalAuth } from '~/Redux/Modal/reducers'
import { useLocalStorage } from '~/Services/localStorage/localStorageService'
import { HttpStatusCode } from '~/Constants/httpStatusCode.enum'

const MiniGameFinalPredict: React.FC = () => {
  const dispatch = useAppDispatch()
  const predictedPayloadMinigameFinal = useAppSelector((state) => state.football.predictedPayloadMinigameFinal)
  const [isSelected, setIsSelected] = useState<number | null>(null)
  const inputValueMinigame = useAppSelector((state) => state.football.inputValueMinigame)
  const isLoggedIn = useAppSelector((state) => state.users.isLoggedIn)
  const finalTeam = useAppSelector((state) => state.football.finalTeam)

  const minigameRef = useRef<HTMLDivElement>(null)
  const [isSimilarCountValue, setIsSimilarCountvalue] = useState(false)
  const [isNotSelectedOrrcued, setIsNotSelectedOrrcued] = useState(false)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow: backspace, delete, tab, escape, enter, and arrow keys
    if (
      e.key === 'Backspace' ||
      e.key === 'Delete' ||
      e.key === 'Tab' ||
      e.key === 'Escape' ||
      e.key === 'Enter' ||
      e.key === 'ArrowLeft' ||
      e.key === 'ArrowRight'
    ) {
      return
    }
    // Prevent non-numeric input
    if (!/^[0-9]$/.test(e.key)) {
      e.preventDefault()
    }
  }
  const openSubmitModal = () => {
    const action = OpenSubmit({
      modalProps: {
        message: 'Gửi dự đoán thành công',
        isSuccess: true,
        isLogin: true,
        isVerifyEmail: false
      }
    })
    document.body.classList.add('no-scroll')
    dispatch(action)
  }

  const openErrorModal = ({ message }: { message: string }) => {
    const action = OpenSubmit({
      modalProps: {
        message: message,
        isSuccess: false,
        isLogin: true,
        isOutofTime: true,
        isVerifyEmail: false
      }
    })
    document.body.classList.add('no-scroll')
    dispatch(action)
  }
  const handleSubmitFinal = async (event: any): Promise<any> => {
    event.preventDefault()
    if (isSelected === null) {
      setIsNotSelectedOrrcued(true)
      setIsSimilarCountvalue(false)

      return
    }
    if (inputValueMinigame === '') {
      setIsSimilarCountvalue(true)
      setIsNotSelectedOrrcued(false)

      return
    }

    if (!isLoggedIn) {
      dispatch(SetisSetMiniGameStorage(true))
      dispatch(openModalAuth())
      if (isSelected !== null || inputValueMinigame !== '') {
        dispatch(setMiniGamePayloadToLocalStorage(predictedPayloadMinigameFinal))
      }
      return
    }
    try {
      const response = await dispatch(
        postTeamChampionLeague({
          body: predictedPayloadMinigameFinal,
          league: APP_CONSTANST_LEAGUE.LEAGUE_ID,
          season: APP_CONSTANST_LEAGUE.SEASON_YEAR
        })
      )
      const { payload } = response
      const { code, status, message } = payload
      if (code === HttpStatusCode.BadRequest || status !== HttpStatusCode.Ok) {
        openErrorModal({ message })
      } else {
        dispatch(setIsPredictedMinigame(true))
        openSubmitModal()
      }
    } catch (error) {
      console.log('error', error)
    }
  }
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (value === '' || parseInt(value) > 0) {
      dispatch(setInputValueMiniGame(value))
    }
  }
  const handleSelectOrrcured = (orrcuredId: number) => {
    setIsSelected(orrcuredId)
  }
  useEffect(() => {
    dispatch(
      setPredictedPayloadMinigame({
        occurred: isSelected === 1 ? true : false,
        similar_predictions_count: inputValueMinigame,
        type: 4
      })
    )
  }, [inputValueMinigame, isSelected])

  useEffect(() => {
    const elementStore = useLocalStorage.getLocalStorageData('miniGameScroll')
    if (minigameRef.current && elementStore) {
      const topOffset = (minigameRef.current as HTMLElement).getBoundingClientRect().top + window.pageYOffset - 300
      window.scrollTo({ top: topOffset, behavior: 'smooth' })
    }
  }, [])

  useEffect(() => {
    const payloadLocalStorage = useLocalStorage.getLocalStorageData('miniGamePayload')
    if (payloadLocalStorage) {
      dispatch(setPredictedPayloadMinigame(payloadLocalStorage))
      dispatch(setInputMiniGame(payloadLocalStorage.similar_predictions_count))
      if (payloadLocalStorage.occurred) {
        setIsSelected(1)
      } else {
        setIsSelected(2)
      }
    }
  }, [])

  return (
    <div className='minigame_final-content-team-outer' ref={minigameRef}>
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

      <form className='minigame_final-content-form-container' onSubmit={handleSubmitFinal}>
        <div className='minigame_final-content-form'>
          <div className='minigame_final-content-form-select'>
            <div
              className={`minigame_final-content-form-select-input ${isSelected === 1 ? 'active' : ''} ${isNotSelectedOrrcued ? 'error' : ''}`}
              onClick={() => handleSelectOrrcured(1)}
            >
              <span className='minigame_final-content-form-select-input-text'>Có</span>
            </div>
            <div
              className={`minigame_final-content-form-select-input ${isSelected === 2 ? 'active' : ''}  ${isNotSelectedOrrcued ? 'error' : ''}`}
              onClick={() => handleSelectOrrcured(2)}
            >
              <span className='minigame_final-content-form-select-input-text'>Không</span>
            </div>
          </div>
          <input
            type='text'
            className={`minigame_final-content-form-input-people ${isSimilarCountValue ? 'error' : ''}`}
            placeholder='Số người dự đoán giống bạn'
            value={inputValueMinigame}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          {isSimilarCountValue && <p className='error_text'>Vui lòng nhập số người có cùng dự đoán giống bạn</p>}
          {isNotSelectedOrrcued && <p className='error_text'>Vui lòng đưa ra dự đoán</p>}
          <button className='minigame_final-content-form-submit'>
            <span>GỬI DỰ ĐOÁN</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default MiniGameFinalPredict
