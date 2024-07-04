import React, { useEffect, useMemo, useReducer, useRef, useState } from 'react'
import Lottie from 'react-lottie'
import './ChampionContent.scss'
import { useAppDispatch, useAppSelector } from '~/Redux/Hooks'
import WinnerAnimation from '~/lotties/winner_winner.json'
import Countdown from '../Countdown'
import { initialState, reducer } from '~/Reducer/reducer'
import { SET_ERROR, SET_ERROR_ALL, SET_ERROR_TEAM, SET_IS_SUBMIT } from '~/Reducer/action'
import { PredictionStatus } from '~/Constants/params.enum'
import {
  SetisSetLocalStorage,
  setIsPredictedChampion,
  setIsShareOnFacebook,
  setLoadingRanking,
  setPredictedPayload,
  setPredictedTeam,
  setPredictedUsers
} from '~/Redux/Football/reducers'
import { OpenSubmit, openModal, openModalAuth, openModalPickTeam } from '~/Redux/Modal/reducers'
import { getTopRanking, postShareFacebook, postTeamChampionLeague } from '~/Redux/Football'
import { HttpStatusCode } from '~/Constants/httpStatusCode.enum'
import { APP_CONSTANST_LEAGUE } from '~/Configs/endPoint'
import EndPredict from './EndPredict/EndPredict'
import PredictSuccess from './PredictSuccess/PredictSuccess'
import { useLocalStorage } from '~/Services/localStorage/localStorageService'
import TopUser from './TopUser/TopUser'
import { Fixture } from '~/@Types/euro.types'
import { useMatchQueries } from '~/React-Query/Match'

const ChampionContent: React.FC = () => {
  const dispatch = useAppDispatch()
  // State management
  const [isLoading, setIsLoading] = useState(false)
  const [finishShareButton, setFinishShareButton] = useState(false)
  const [isEndChampion, setIsEndChampion] = useState(false)
  const [state, disPatchReducer] = useReducer(reducer, initialState)
  const { isError, isErrorTeam, isErrorAll } = state
  const predictedTeam = useAppSelector((state) => state.football.predictedTeam)
  const predictedUser = useAppSelector((state) => state.football.predictedUsers)
  const roundType = useAppSelector((state) => state.football.RoundRankingSelected.id)
  const predictedPayload = useAppSelector((state) => state.football.predictedPayload)
  const isStartMinigame = useAppSelector((state) => state.users.isStartMinigame)
  const inputValue = useAppSelector((state) => state.football.predictedUsers)
  const isDisabledShare = useAppSelector((state) =>
    state.users.shareFacebook ? state.users?.shareFacebook : state.football.isSharedOnFacebookToday
  )
  const isLoggedIn = useAppSelector((state) => state.users.isLoggedIn)
  const isPrediction = useAppSelector((state) =>
    state.users?.isPrediction?.champion !== null
      ? state.users?.isPrediction?.champion
      : state.football?.isPredictedChampion
  )
  const isUserPredictionGame = useAppSelector((state) => state.users.isUserPredictionGame)
  const RangeTimeSharePoints = useAppSelector((state) => state.users.isUserPredictionGame)
  const allTopUser = useAppSelector((state) => state.football.allTopUser)
  const [winnerTeam, setWinnerTeam] = useState<any>({})
  const isTopUserFinal = allTopUser?.find((item: any) => item.top_type === 7)

  const { data: listTeamAllRound } = useMatchQueries({
    league: APP_CONSTANST_LEAGUE.LEAGUE_ID,
    season: APP_CONSTANST_LEAGUE.SEASON_YEAR,
    round: null
  })

  useEffect(() => {
    console.log('listTeamAllRound', listTeamAllRound)
  }, [listTeamAllRound])

  const startDate = new Date(isUserPredictionGame.champion_prediction_start?.replace(' ', 'T'))
  const currentDate = useMemo(() => new Date(), [])

  const startDateFacebook = useMemo(() => {
    return new Date(RangeTimeSharePoints.share_fb_start?.replace(' ', 'T'))
  }, [RangeTimeSharePoints.share_fb_start])
  const endDateFacebook = useMemo(() => {
    return new Date(RangeTimeSharePoints.share_fb_end?.replace(' ', 'T'))
  }, [RangeTimeSharePoints.share_fb_end])

  // ref
  const elementRef = useRef<HTMLDivElement>(null)
  const parallaxItem = useRef<HTMLDivElement>(null)
  const parallaxItem2 = useRef<HTMLDivElement>(null)
  const parallaxItem3 = useRef<HTMLDivElement>(null)
  const parallaxItem4 = useRef<HTMLDivElement>(null)

  // lotte options
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: WinnerAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  const shareOnFacebook = async (): Promise<any> => {
    if (!isLoggedIn) {
      dispatch(openModalAuth())
      return
    }
    if (isDisabledShare) {
      return
    }

    const url = window.location.href
    FB.ui({
      method: 'feed',
      link: url
    })

    if (currentDate >= startDateFacebook && currentDate <= endDateFacebook) {
      setTimeout(async () => {
        const response = await dispatch(
          postShareFacebook({
            league: APP_CONSTANST_LEAGUE.LEAGUE_ID,
            season: APP_CONSTANST_LEAGUE.SEASON_YEAR
          })
        )
        const { payload } = response
        const { code, status } = payload
        if (code === HttpStatusCode.BadRequest || status !== HttpStatusCode.Ok) {
          return
        } else {
          dispatch(setIsShareOnFacebook(true))
          try {
            dispatch(setLoadingRanking(true))

            await dispatch(
              getTopRanking({
                league: APP_CONSTANST_LEAGUE.LEAGUE_ID,
                season: APP_CONSTANST_LEAGUE.SEASON_YEAR,
                round: roundType,
                limit: null
              })
            )
          } catch (e) {
            console.log(e)
          } finally {
            dispatch(setLoadingRanking(false))
          }
        }
      }, 10000)
    }
  }

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (value === '' || parseInt(value) > 0) {
      dispatch(setPredictedUsers(value))
    }
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

  const handleValidationErrors = () => {
    const teamError = !predictedTeam || !predictedTeam.name
    const allError = !predictedTeam.name && !predictedUser
    const inputError = !predictedUser
    if (allError) {
      disPatchReducer({ type: SET_ERROR_ALL, payload: allError })
      disPatchReducer({ type: SET_ERROR_TEAM, payload: false })

      disPatchReducer({ type: SET_ERROR, payload: false })
    }
    if (teamError && predictedUser) {
      disPatchReducer({ type: SET_ERROR_TEAM, payload: teamError })
      disPatchReducer({ type: SET_ERROR, payload: false })
      disPatchReducer({ type: SET_ERROR_ALL, payload: false })
    }
    if (inputError && predictedTeam.name) {
      disPatchReducer({ type: SET_ERROR, payload: inputError })
      disPatchReducer({ type: SET_ERROR_ALL, payload: false })
      disPatchReducer({ type: SET_ERROR_TEAM, payload: false })
    }
    return teamError || inputError || allError
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

  const clearInputValuePredict = () => {
    dispatch(setPredictedUsers(''))
    dispatch(setPredictedTeam({}))
    dispatch(setPredictedPayload([]))
  }
  const openStartDateModal = () => {
    const action = OpenSubmit({
      modalProps: {
        message: 'Sự kiện chưa diễn ra',
        isSuccess: false,
        isLogin: true,
        isOutofTime: true
      }
    })
    document.body.classList.add('no-scroll')
    dispatch(action)
  }

  const handleClickOpen = () => {
    dispatch(openModal())
    document.body.classList.add('no-scroll')
  }

  const handleClickOpenPickTeam = () => {
    dispatch(openModalPickTeam())
    document.body.classList.add('no-scroll')
  }

  const handleSubmit = async (): Promise<any> => {
    if (handleValidationErrors()) {
      return
    }
    if (!isLoggedIn) {
      dispatch(SetisSetLocalStorage(true))
      dispatch(openModalAuth())
      return
    }
    if (currentDate < startDate) {
      openStartDateModal()
      clearInputValuePredict()
      return
    }
    try {
      setIsLoading(true)
      const response = await dispatch(
        postTeamChampionLeague({
          body: predictedPayload,
          league: APP_CONSTANST_LEAGUE.LEAGUE_ID,
          season: APP_CONSTANST_LEAGUE.SEASON_YEAR
        })
      )

      const { payload } = response
      const { code, status, message } = payload

      if (code === HttpStatusCode.BadRequest || status !== HttpStatusCode.Ok) {
        openErrorModal({ message })
      } else {
        dispatch(setIsPredictedChampion(true))
        openSubmitModal()
      }
      disPatchReducer({ type: SET_IS_SUBMIT, payload: true })
      disPatchReducer({ type: SET_ERROR, payload: false })
      disPatchReducer({ type: SET_ERROR_TEAM, payload: false })
    } catch (e: any) {
      console.log('error', e)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBeforeUnload = () => {
    window.localStorage.clear()
  }

  const isPlaceholder = () => {
    return predictedTeam.name || 'Lựa chọn đội tuyển'
  }

  const BeforeEndTimeChampion = () => {
    const endDateChampion = new Date(isUserPredictionGame.champion_prediction_end?.replace(' ', 'T'))
    const currentDateChampion = new Date()
    return currentDateChampion <= endDateChampion
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsEndChampion(!BeforeEndTimeChampion())
      if (!BeforeEndTimeChampion()) {
        clearInterval(intervalId)
      }
    }, 1000)

    return () => clearInterval(intervalId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserPredictionGame.champion_prediction_end])

  useEffect(() => {
    if (predictedTeam && predictedTeam.id) {
      dispatch(
        setPredictedPayload({
          type: PredictionStatus.CHAMPION,
          team_id: predictedTeam.id,
          similar_predictions_count: parseInt(predictedUser, 10)
        })
      )
    }

    const visibilityChangeEvent = () => {
      if (document.visibilityState === 'hidden' && isLoggedIn) {
        handleBeforeUnload()
      }
    }

    window.addEventListener('visibilitychange', visibilityChangeEvent)

    return () => {
      window.removeEventListener('visibilitychange', visibilityChangeEvent)
    }
  }, [predictedUser, predictedTeam, dispatch, isLoggedIn])

  useEffect(() => {
    const elementStore = useLocalStorage.getLocalStorageData('clientScroll')
    if (elementRef.current && elementStore) {
      const topOffset = (elementRef.current as HTMLElement).getBoundingClientRect().top + window.pageYOffset - 50
      window.scrollTo({ top: topOffset, behavior: 'smooth' })
    }
  }, [])

  useEffect(() => {
    if (currentDate > endDateFacebook) {
      setFinishShareButton(true)
    } else {
      setFinishShareButton(false)
    }
  }, [currentDate, endDateFacebook])

  // share facebook get plus point

  useEffect(() => {
    const FinalTeam = listTeamAllRound?.find((team: Fixture) => team.round_id === 7)

    if (FinalTeam && FinalTeam.fixtures && FinalTeam.fixtures.length > 0) {
      const finalFixture = FinalTeam.fixtures[0] // Giả sử chỉ có một trận trong chung kết
      const winnerTeamId = finalFixture.winner_team_id

      if (finalFixture.home_team.id === winnerTeamId) {
        setWinnerTeam(finalFixture.home_team)
      } else if (finalFixture.away_team.id === winnerTeamId) {
        setWinnerTeam(finalFixture.away_team)
      }
    }
  }, [listTeamAllRound])

  useEffect(() => {}, [winnerTeam])

  return (
    <section className='home__container_content_outer'>
      {!isStartMinigame && (
        <div className='home__container_content_text'>
          <img src='image/euro_text.webp' alt='OEG IMAGE' />
        </div>
      )}

      <div
        className={`home__container_content_your_champion ${!isLoggedIn && isTopUserFinal ? 'user-end-not-login' : ''} ${
          isTopUserFinal
            ? ''
            : `${isPrediction ? 'predicted' : ''} ${!isPrediction && isEndChampion ? 'end_minigame' : ''}`
        }`}
        ref={elementRef}
      >
        {isTopUserFinal && winnerTeam && (
          <h4 className='home__container_content_your_champion_team_win'>
            {winnerTeam?.name?.split(' ').map((word: string, index: number) => (
              <React.Fragment key={index}>
                {word}
                <br />
              </React.Fragment>
            ))}
          </h4>
        )}

        {isTopUserFinal && winnerTeam && (
          <div className='home__container_content_your_champion_team_win_img'>
            <div className='home__container_content_your_champion_team_win_img_inner'>
              {' '}
              <img src={winnerTeam.logo_url} alt='OEG IMAGE' />
              <div className='home__container_content_your_champion_team_win_img_inner_img'>
                {' '}
                <img src='image/win_champion.webp' alt='OEG IMAGE' />
              </div>
            </div>
          </div>
        )}
        <div className='home__container_content_your_champion_inner'>
          <div className='home__container_content_your_champion_inner_title'>
            <div className='home__container_content_your_champion_inner_title_pc'>
              {' '}
              <Lottie
                isClickToPauseDisabled={true}
                options={defaultOptions}
                height={isTopUserFinal ? 270 : !isPrediction && !isEndChampion ? 270 : 170}
                width={isTopUserFinal ? 550 : !isPrediction && !isEndChampion ? 550 : 372}
              />
            </div>
            <div className='home__container_content_your_champion_inner_title_mobile'>
              {' '}
              <Lottie isClickToPauseDisabled={true} options={defaultOptions} width={360} />
            </div>
          </div>
          {/* sau khi đã dự đoán */}
          {isTopUserFinal ? (
            <TopUser />
          ) : !isPrediction ? (
            isEndChampion ? (
              <EndPredict />
            ) : (
              <div className='home__container_content_your_champion_inner_select'>
                <div
                  className={`home__container_content_your_champion_inner_select_input ${isErrorTeam || isErrorAll ? 'error' : ''}`}
                  onClick={handleClickOpenPickTeam}
                >
                  <p className='home__container_content_your_champion_inner_select_input_type'>{isPlaceholder()}</p>
                  <div className='home__container_content_your_champion_inner_select_icon'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
                      <g opacity='0.5'>
                        <path
                          d='M14.769 5.35997C14.6849 5.25886 14.5817 5.17532 14.4653 5.11415C14.3489 5.05298 14.2215 5.01537 14.0905 5.00348C13.9596 4.9916 13.8275 5.00566 13.702 5.04486C13.5765 5.08407 13.4599 5.14765 13.359 5.23197L7.99999 9.69997L2.64099 5.23197C2.54013 5.14779 2.42368 5.0843 2.29829 5.04513C2.1729 5.00595 2.04102 4.99186 1.91018 5.00366C1.77935 5.01545 1.65211 5.0529 1.53575 5.11386C1.41938 5.17483 1.31616 5.25811 1.23199 5.35897C1.14781 5.45982 1.08432 5.57627 1.04515 5.70166C1.00597 5.82705 0.99188 5.95893 1.00367 6.08977C1.01547 6.22061 1.05291 6.34784 1.11388 6.46421C1.17484 6.58057 1.25813 6.68379 1.35899 6.76797L7.35899 11.768C7.53882 11.9182 7.76568 12.0004 7.99999 12.0004C8.23429 12.0004 8.46115 11.9182 8.64099 11.768L14.641 6.76797C14.8446 6.59819 14.9725 6.3545 14.9965 6.09047C15.0205 5.82644 14.9387 5.56369 14.769 5.35997Z'
                          fill='#222222'
                        />
                      </g>
                    </svg>
                  </div>
                </div>

                <div
                  className={`home__container_content_your_champion_inner_select_input ${isError || isErrorAll ? 'error' : ''}`}
                >
                  <input
                    type='number'
                    className='home__container_content_your_champion_inner_select_input_type'
                    placeholder='Số người dự đoán giống bạn'
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                  />
                </div>
                {isErrorAll && <p className='error_text'>Vui lòng chọn dự đoán của bạn</p>}
                {isErrorTeam && <p className='error_text'>Vui lòng dự đoán đội tuyển vô địch Euro 2024</p>}
                {isError && <p className='error_text'>Vui lòng nhập số người có cùng dự đoán giống bạn</p>}
                <button
                  className={`home__container_content_your_champion_inner_select_input_type_button ${`${isLoading ? 'loading' : ''}`}`}
                  onClick={handleSubmit}
                >
                  <span>GỬI DỰ ĐOÁN</span>
                </button>
              </div>
            )
          ) : (
            <PredictSuccess />
          )}

          <span className='home__container_content_your_champion_inner_rules' onClick={handleClickOpen}>
            thể lệ chương trình
          </span>
          {!isPrediction && !isEndChampion && !isTopUserFinal ? <Countdown /> : null}
        </div>
        <div className='home__container_content_your_champion_img'>
          <div className='home__container_content_your_champion_img_left'>
            <div
              ref={parallaxItem}
              className={`home__container_content_your_champion_left_img  ${
                isTopUserFinal
                  ? ''
                  : `${isPrediction ? 'predicted' : ''} ${!isPrediction && isEndChampion ? 'end_minigame' : ''}`
              }`}
            >
              <img
                src='image/audio_prize_image.webp'
                className={`home__container_content_your_champion_left_img_first  ${
                  isTopUserFinal
                    ? ''
                    : `${isPrediction ? 'predicted' : ''} ${!isPrediction && isEndChampion ? 'end_minigame' : ''}`
                }`}
                alt='OEG IMAGE'
              />
            </div>
            <div
              ref={parallaxItem2}
              className={`home__container_content_your_champion_left_img_under  ${
                isTopUserFinal
                  ? ''
                  : `${isPrediction ? 'predicted' : ''} ${!isPrediction && isEndChampion ? 'end_minigame' : ''}`
              }`}
            >
              <img
                className={`home__container_content_your_champion_left_img_second ${
                  isTopUserFinal
                    ? ''
                    : `${isPrediction ? 'predicted' : ''} ${!isPrediction && isEndChampion ? 'end_minigame' : ''}`
                }`}
                src='image/3rd_prize_image.webp'
                alt='OEG IMAGE'
              />
            </div>
          </div>
          <div className='home__container_content_your_champion_img_right'>
            <div
              ref={parallaxItem3}
              className={`home__container_content_your_champion_right_img  ${
                isTopUserFinal
                  ? ''
                  : `${isPrediction ? 'predicted' : ''} ${!isPrediction && isEndChampion ? 'end_minigame' : ''}`
              }`}
            >
              <img
                src='image/cup_prize_img.webp'
                className={`home__container_content_your_champion_right_img_first ${
                  isTopUserFinal
                    ? ''
                    : `${isPrediction ? 'predicted' : ''} ${!isPrediction && isEndChampion ? 'end_minigame' : ''}`
                }`}
                alt='OEG IMAGE'
              />
            </div>
            <div
              ref={parallaxItem4}
              className={`home__container_content_your_champion_right_img_under  ${
                isTopUserFinal
                  ? ''
                  : `${isPrediction ? 'predicted' : ''} ${!isPrediction && isEndChampion ? 'end_minigame' : ''}`
              }`}
            >
              <img
                className={`home__container_content_your_champion_right_img_second ${
                  isTopUserFinal
                    ? ''
                    : `${isPrediction ? 'predicted' : ''} ${!isPrediction && isEndChampion ? 'end_minigame' : ''}`
                }`}
                src='image/2nd_prize_img.webp'
                alt='OEG IMAGE'
              />
            </div>
          </div>
        </div>
      </div>
      {!finishShareButton && (
        <div className={`home__container_button_share ${isDisabledShare ? 'disabled' : ''}`} onClick={shareOnFacebook}>
          <span className='home__container_button_share_text'>
            {isDisabledShare ? 'Đã chia sẻ hôm nay' : 'CHIA SẺ NHẬN 5 ĐIỂM'}
          </span>
          <span className='home__container_button_share_logo'>
            {!isDisabledShare && (
              <svg xmlns='http://www.w3.org/2000/svg' width='25' height='24' viewBox='0 0 25 24' fill='none'>
                <g clipPath='url(#clip0_6987_60298)'>
                  <path
                    d='M14.168 2.25608C14.0242 2.12704 13.8462 2.0424 13.6553 2.01238C13.4645 1.98237 13.2691 2.00828 13.0926 2.08698C12.9162 2.16567 12.7664 2.29378 12.6612 2.45582C12.556 2.61787 12.5 2.8069 12.5 3.00008V8.02808C8.232 8.26008 0.5 10.1801 0.5 21.0001C0.500359 21.2155 0.570264 21.425 0.69931 21.5975C0.828356 21.77 1.00964 21.8962 1.21619 21.9573C1.42274 22.0184 1.64351 22.0112 1.84564 21.9368C2.04777 21.8623 2.22046 21.7246 2.338 21.5441C3.44049 19.8487 4.94537 18.4525 6.71846 17.4799C8.49156 16.5074 10.4778 15.9887 12.5 15.9701V21.0001C12.5 21.1933 12.556 21.3823 12.6612 21.5443C12.7664 21.7064 12.9162 21.8345 13.0926 21.9132C13.2691 21.9919 13.4645 22.0178 13.6553 21.9878C13.8462 21.9578 14.0242 21.8731 14.168 21.7441L24.168 12.7441C24.2724 12.6503 24.3559 12.5356 24.4131 12.4074C24.4703 12.2792 24.4998 12.1404 24.4998 12.0001C24.4998 11.8597 24.4703 11.7209 24.4131 11.5928C24.3559 11.4646 24.2724 11.3499 24.168 11.2561L14.168 2.25608Z'
                    fill='white'
                  />
                </g>
                <defs>
                  <clipPath id='clip0_6987_60298'>
                    <rect width='24' height='24' fill='white' transform='translate(0.5)' />
                  </clipPath>
                </defs>
              </svg>
            )}
          </span>
        </div>
      )}
    </section>
  )
}

export default ChampionContent
