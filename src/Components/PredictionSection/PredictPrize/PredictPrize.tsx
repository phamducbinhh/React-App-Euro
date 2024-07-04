import React, { memo, useEffect, useMemo, useRef, useState } from 'react'
import Lottie from 'react-lottie'
import { useAppDispatch, useAppSelector } from '~/Redux/Hooks'
import { OpenSubmit, openModalEnergy, openModalPrize } from '~/Redux/Modal/reducers'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import EuroLogoAnimation from '~/lotties/logo_euro.json'
import 'swiper/css'
import './PredictPrize.scss'
import { getTopUser, receiveGiftTop } from '~/Redux/Football'
import { APP_CONSTANST_LEAGUE } from '~/Configs/endPoint'
import LoadingComponent from '~/Components/Loading'
import { formatPrize } from '~/Hooks/useFormatPrize'
import { HttpStatusCode } from '~/Constants/httpStatusCode.enum'
import { setAllTopUser, setTopUser } from '~/Redux/Football/reducers'
import { useLocalStorage } from '~/Services/localStorage/localStorageService'
import { useAuth } from '~/Context/AuthContext'
import { useVerifyTokenQueries } from '~/React-Query/User'

const PredictPrize: React.FC = memo(() => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: EuroLogoAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }
  const dispatch = useAppDispatch()

  const { isAuthenticated } = useAuth()

  const [currentRound, setCurrentRound] = useState<number | null>(null)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [isTopRank, setIsTopRank] = useState<boolean>(false)

  const [retryCount, setRetryCount] = useState(0)

  const [isSuccessReceive, setIsSuccessReceive] = useState<boolean>(false)

  const [userInTop, setUserInTop] = useState<any>(null)

  const allTopUser = useAppSelector((state) => state.football?.allTopUser)

  const updateAllTopUser = allTopUser.filter((item: any) => item.top_type !== 5)

  const { data: userQuery } = useVerifyTokenQueries()

  const isLoggedIn = useAppSelector((state) => state.users.isLoggedIn)

  const isTopUserFinal = allTopUser?.find((item: any) => item.top_type === 7)

  const isTopUserMinigame = allTopUser?.find((item: any) => item.top_type === 5)

  const isPrediction = useAppSelector((state) => state.users.isPrediction?.champion)

  const isPredictionMinigame = useAppSelector((state) => state.users.isPrediction?.extra)

  const isEndEventReceive = useAppSelector((state) => state.users.isEndReceiveGift)

  const topUser = useAppSelector((state) => state.football?.topUser)

  const isUserPredictionGame = useAppSelector((state) => state.users.isUserPredictionGame)

  const startDate = new Date(isUserPredictionGame.champion_prediction_start?.replace(' ', 'T'))

  const endDate = new Date(isUserPredictionGame.champion_prediction_end?.replace(' ', 'T'))

  const startDateMinigame = new Date(isUserPredictionGame.champion_minigame_start?.replace(' ', 'T'))

  const endDateMinigame = new Date(isUserPredictionGame.champion_minigame_end?.replace(' ', 'T'))

  const currentDate = new Date()

  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)

  const idToUse = updateAllTopUser[updateAllTopUser.length - 1]?.top_type

  const elementRef = useRef(null)

  const logoref = useRef(null)

  const predictedBody = useAppSelector((state) => state.football.predictedBody)

  const predictedPayload = useAppSelector((state) => state.football.predictedPayload)

  const [firstLoading, setFirstLoading] = useState<boolean>(false)

  const [isReceiveLoading, setIsReceiveLoading] = useState<boolean>(false)
  const handleClickOpen = () => {
    dispatch(openModalPrize())
    document.body.classList.add('no-scroll')
  }
  const handleOpenModalEnergy = () => {
    dispatch(openModalEnergy())
    document.body.classList.add('no-scroll')
  }
  const fetchTopUser = async () => {
    try {
      setFirstLoading(true)
      if (idToUse !== undefined) {
        const response = await dispatch(
          getTopUser({
            league: APP_CONSTANST_LEAGUE.LEAGUE_ID,
            season: APP_CONSTANST_LEAGUE.SEASON_YEAR,
            type: idToUse
          })
        )
        if (response?.payload?.code === HttpStatusCode.Ok) {
          dispatch(setTopUser(response?.payload?.metadata || []))
        }
      }
    } catch (error) {
      console.log(error)
    } finally {
      setFirstLoading(false)
    }
  }

  // Ham bat modal login
  const openVerifyEmail = () => {
    const action = OpenSubmit({
      modalProps: {
        message: ' Bạn cần xác thực email để tham gia nhận thưởng.',
        isSuccess: false,
        isLogin: true,
        isVerifyEmail: true
      }
    })
    document.body.classList.add('no-scroll')
    dispatch(action)
  }

  const openErrorModalReceive = (errorMessage: string) => {
    const defaultMessage = 'Bạn đã nhận thưởng rồi. Hãy kiểm tra lại email của bạn.'
    const action = OpenSubmit({
      modalProps: {
        message: errorMessage || defaultMessage,
        isSuccess: false,
        isLogin: true,
        isOutofTime: true
      }
    })
    document.body.classList.add('no-scroll')
    dispatch(action)
  }
  const openSuccessReceiveModal = () => {
    const action = OpenSubmit({
      modalProps: {
        message: 'Nhận thưởng thành công. Phần thưởng đã được gửi qua Email của bạn',
        isSuccess: true,
        isLogin: true,
        isVerifyEmail: false
      }
    })
    document.body.classList.add('no-scroll')
    dispatch(action)
  }
  const handleReceiveReward = async () => {
    if (userInTop?.status === 2) {
      return
    }
    if (isEndEventReceive) {
      return
    }
    if (isSuccessReceive) {
      return
    }
    if (userQuery?.email_verified_at === null || userQuery?.email_verified_at === undefined) {
      openVerifyEmail()
      return
    }
    try {
      setIsReceiveLoading(true)
      const response = await dispatch(
        receiveGiftTop({
          league: APP_CONSTANST_LEAGUE.LEAGUE_ID,
          season: APP_CONSTANST_LEAGUE.SEASON_YEAR,
          body: {
            type: topUser[0].top_type
          }
        })
      )
      if (response.payload?.data?.code === HttpStatusCode.Ok) {
        openSuccessReceiveModal()
        await dispatch(
          getTopUser({
            league: APP_CONSTANST_LEAGUE.LEAGUE_ID,
            season: APP_CONSTANST_LEAGUE.SEASON_YEAR,
            type: topUser[0].top_type
          })
        )
        setIsSuccessReceive(true)
        return
      }
      if (response.payload?.code === HttpStatusCode.BadRequest) {
        openErrorModalReceive(response.payload?.message)
        setIsSuccessReceive(false)
        return
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsReceiveLoading(false)
    }
  }

  // Hàm để kiểm tra xem id có tồn tại trong mockDataTopRank2 không
  const isIdDisabled = (id: number | null) => {
    return !updateAllTopUser.some((data: any) => data.top_type === id)
  }

  const fetchAllUserTop = async () => {
    try {
      const response = await dispatch(
        getTopUser({
          league: APP_CONSTANST_LEAGUE.LEAGUE_ID,
          season: APP_CONSTANST_LEAGUE.SEASON_YEAR,
          type: null
        })
      )
      if (response.payload?.code === HttpStatusCode.Ok) {
        dispatch(setAllTopUser(response?.payload?.metadata || []))
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleSubmit = async (roundType: number | null): Promise<any> => {
    if (isIdDisabled(roundType) || currentRound === roundType) {
      return
    }
    try {
      setCurrentRound(roundType)
      setIsSuccessReceive(false)
      setIsLoading(true)
      const response = await dispatch(
        getTopUser({
          league: APP_CONSTANST_LEAGUE.LEAGUE_ID,
          season: APP_CONSTANST_LEAGUE.SEASON_YEAR,
          type: roundType
        })
      )
      if (response?.payload?.code === HttpStatusCode.Ok) {
        dispatch(setTopUser(response?.payload?.metadata || []))
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const mockDataTopRank = useMemo(
    () => [
      { id: 1, title: 'Vòng bảng' },
      { id: 2, title: 'Vòng 1/8' },
      { id: 3, title: 'Tứ kết' },
      { id: 4, title: 'Bán kết' },
      { id: 8, title: 'Cả mùa giải' }
    ],
    []
  )

  const checkInTopRank = () => {
    const data = topUser[0]
    let isTop = false // Mặc định là false, nếu tìm thấy sẽ đặt lại thành true
    if (data?.tops && data?.tops?.length > 0) {
      for (let i = 0; i < data?.tops?.length; i++) {
        const item = data?.tops[i]
        if (item.user.id === Number(userQuery?.id)) {
          isTop = true
          break // Nếu tìm thấy, thoát khỏi vòng lặp
        }
      }
    }
    setIsTopRank(isTop) // Đặt setIsTopRank ở cuối khi đã kiểm tra xong danh sách
  }

  // tìm kiếm bản thân trong mảng top dựa vào id, nếu status là 2 thì sẽ disabled button nhận thưởng
  const checkUserHasReceivePrize = () => {
    const data = topUser[0]
    let topItem = null // Mặc định là null, nếu tìm thấy sẽ đặt lại thành phần tử tương ứng

    if (data?.tops && data?.tops.length > 0) {
      topItem = data.tops?.find((item: any) => item.user.id === Number(userQuery?.id))
      setUserInTop(topItem)
    }
  }
  // cal api
  useEffect(() => {
    if (idToUse !== undefined) {
      fetchTopUser()
      setCurrentRound(idToUse)
    }
  }, [idToUse])

  useEffect(() => {
    fetchAllUserTop()
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      if (idToUse !== undefined) {
        fetchTopUser()
      }
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (isAuthenticated) {
      fetchAllUserTop()
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (isAuthenticated) {
      checkInTopRank()

      checkUserHasReceivePrize()
    }
  }, [isAuthenticated])

  useEffect(() => {
    checkInTopRank()

    checkUserHasReceivePrize()
  }, [topUser])

  useEffect(() => {
    const elementTop = useLocalStorage.getLocalStorageData('receive_prize')

    if (elementTop) {
      const intervalId = setInterval(() => {
        if (elementRef.current && userQuery?.email_verified_at) {
          const topOffset = (elementRef.current as HTMLElement)?.getBoundingClientRect()?.top + window.pageYOffset - 150

          if (topOffset) {
            window.scrollTo({ top: topOffset, behavior: 'smooth' })
            clearInterval(intervalId)
          } else {
            setRetryCount((prevCount) => prevCount + 1)
          }
        }
      }, 100)

      if (retryCount >= 5) {
        clearInterval(intervalId)
      }

      return () => clearInterval(intervalId)
    }
  }, [elementRef, userQuery?.email_verified_at, retryCount])

  useEffect(() => {
    const scrollToLogo = () => {
      if (
        isLoggedIn &&
        !predictedBody.team_id &&
        !predictedPayload.team_id &&
        !isTopUserFinal &&
        !isTopUserMinigame &&
        logoref.current &&
        ((isPrediction && currentDate < startDateMinigame) ||
          (currentDate > endDate && currentDate > endDateMinigame) ||
          (isPrediction && isPredictionMinigame && currentDate < endDateMinigame))
      ) {
        const logorefElement = logoref.current as HTMLElement

        const topOffset = logorefElement?.getBoundingClientRect()?.top + window.pageYOffset - 40

        if (topOffset) {
          window.scrollTo({ top: topOffset, behavior: 'smooth' })
        }
      }
    }

    // Clear the previous timeout if it exists
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current)
    }

    // Set a new timeout to debounce the scroll effect
    scrollTimeout.current = setTimeout(() => {
      scrollToLogo()
    }, 2000)

    // Clean up the timeout on component unmount or when dependencies change
    return () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
    }
  }, [
    logoref,
    isLoggedIn,
    isTopUserFinal,
    isTopUserMinigame,
    isPrediction,
    isPredictionMinigame,
    currentDate,
    startDate,
    startDateMinigame,
    endDate,
    endDateMinigame,
    predictedBody.team_id,
    predictedPayload.team_id
  ])

  return (
    <div className='home__container_content_predict' ref={elementRef}>
      <div className='home__container_content_predict_logo' ref={logoref}>
        <div className='home__container_content_predict_logo_pc'>
          {' '}
          <Lottie isClickToPauseDisabled={true} options={defaultOptions} height={185} width={150} />
        </div>
        <div className='home__container_content_predict_logo_mobile'>
          {' '}
          <Lottie isClickToPauseDisabled={true} options={defaultOptions} height={148} width={120} />
        </div>
      </div>
      <div className='home__container_content_predict_title'>
        <h2 className='home__container_content_predict_title_heading'>
          ĐỆ NHẤT <span className='home__container_content_predict_title_heading_mobile'>GIA CÁT DỰ</span>
        </h2>
        <p className='home__container_content_predict_title_subheading'>
          DỰ ĐOÁN CÁC TRẬN ĐẤU, TÍNH ĐIỂM, <span>NHẬN QUÀ KHỦNG</span>
        </p>
        <span className='home__container_content_predict_title_rules' onClick={handleClickOpen}>
          thể lệ chương trình
        </span>
      </div>
      {updateAllTopUser && updateAllTopUser.length > 0 && (
        <div className='home__container_content_predict_top'>
          <h3 className='home__container_content_predict_top_title'>USER TRÚNG THƯỞNG</h3>
          <div className='home__container_content_predict_top_round'>
            {mockDataTopRank.map((item) => {
              const isDisabled = isIdDisabled(item.id)
              return (
                <button
                  key={item.id}
                  className={`home__container_content_predict_top_round_item ${currentRound === item.id ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`}
                  onClick={() => handleSubmit(item.id)}
                >
                  <span
                    className={`home__container_content_predict_top_round_item_text  ${currentRound === item.id ? 'active' : ''}${isDisabled ? 'disabled' : ''}`}
                  >
                    {item.title}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      )}
      {firstLoading && <LoadingComponent />}
      {updateAllTopUser && updateAllTopUser.length > 0 && (
        <div className='home__container_content_predict_lists'>
          <div className='home__container_content_predict_lists_inner'>
            <div className='home__container_content_predict_lists_user'>
              {isLoading ? (
                <LoadingComponent />
              ) : topUser[0]?.tops?.length > 0 ? (
                <Swiper
                  className='home__container_content_predict_lists_user_swiper'
                  spaceBetween={12}
                  autoplay={topUser[0]?.tops?.length > 5 ? { delay: 1000, disableOnInteraction: false } : false}
                  breakpoints={{
                    0: {
                      spaceBetween: 12,
                      slidesPerView: 2.3,
                      slidesOffsetBefore: 20,
                      slidesOffsetAfter: 20
                    },

                    768: {
                      slidesPerView: 3.5,
                      spaceBetween: 12,
                      slidesOffsetBefore: 20,
                      slidesOffsetAfter: 20
                    },
                    1023: {
                      spaceBetween: 12,
                      slidesPerView: 5,
                      slidesOffsetBefore: 0,
                      slidesOffsetAfter: 0
                    }
                  }}
                  loop={topUser[0]?.tops?.length >= 6 ? true : false}
                  modules={[Autoplay]}
                >
                  {topUser[0]?.tops?.map((data: any) => (
                    <SwiperSlide key={data.rank}>
                      <div
                        className={`home__container_content_predict_lists_user_item ${data.rank === 1 ? 'first_rank' : ''}${data.rank === 2 ? 'second_rank' : ''}${data.rank === 3 ? 'third_rank' : ''}`}
                      >
                        <div className='home__container_content_predict_lists_user_item_inner'>
                          <div className='home__container_content_predict_lists_user_item_infor'>
                            <div className='home__container_content_predict_lists_user_item_img'>
                              <img
                                src={
                                  data.user?.avatar
                                    ? data.user?.avatar
                                    : 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg'
                                }
                                alt='OEG IMAGE'
                              />
                              <div className='home__container_content_predict_lists_user_item_img_icon'>
                                {data.rank === 1 && <img src='image/1st.webp' alt='1st Place' />}
                                {data.rank === 2 && <img src='image/cockade_2.webp' alt='2nd Place' />}
                                {data.rank === 3 && <img src='image/cockade_3.webp' alt='3rd Place' />}
                                {data.rank === 4 && <img src='image/cockade_4.webp' alt='4th Place' />}
                                {data.rank !== 1 && data.rank !== 2 && data.rank !== 3 && data.rank !== 4 && (
                                  <div className='home__container_content_predict_lists_user_item_img_relative'>
                                    <img src='image/cockdate_prize.webp' alt='6th Place' />
                                    <span className='home__container_content_predict_lists_user_item_img_relative_stt'>
                                      {data.rank}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <p className='home__container_content_predict_lists_user_item_infor_name'>
                              {data.user?.display_name ? data.user?.display_name : data.user.username}
                            </p>
                            {data.prize?.value && (
                              <div className='home__container_content_predict_lists_user_item_infor_prize'>
                                <span>{formatPrize(data.prize?.value)}</span>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='16'
                                  height='16'
                                  viewBox='0 0 16 16'
                                  fill='none'
                                >
                                  <g clipPath='url(#clip0_7250_68784)'>
                                    <path
                                      d='M7.99771 15.9954C12.4147 15.9954 15.9954 12.4147 15.9954 7.99771C15.9954 3.5807 12.4147 0 7.99771 0C3.5807 0 0 3.5807 0 7.99771C0 12.4147 3.5807 15.9954 7.99771 15.9954Z'
                                      fill='#1C64F2'
                                    />
                                    <path
                                      d='M12.5273 6.8812C12.4495 6.72564 12.2894 6.62498 12.1155 6.62498H8.51011L8.91274 3.01503C8.93562 2.80914 8.82124 2.61698 8.62907 2.5392C8.43691 2.46141 8.22187 2.52089 8.09376 2.68561L3.51841 8.63356C3.41317 8.77082 3.39487 8.95841 3.47265 9.11397C3.55043 9.26954 3.71057 9.37019 3.88444 9.37019H7.48981L7.08718 12.9801C7.0643 13.186 7.17869 13.3782 7.37085 13.456C7.42576 13.4789 7.48524 13.488 7.54014 13.488C7.6774 13.488 7.81466 13.424 7.90159 13.3096L12.4769 7.36161C12.5822 7.22435 12.6005 7.03676 12.5227 6.8812H12.5273Z'
                                      fill='white'
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id='clip0_7250_68784'>
                                      <rect width='16' height='16' fill='white' />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                            )}
                            {data.prize?.other && (
                              <div className='home__container_content_predict_lists_user_item_infor_prize '>
                                <span className='other_value'> {data.prize?.other.replace('65AU7002 UHD', '')}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                ''
              )}
            </div>
          </div>
          {isTopRank && (
            <div className='home__container_content_predict_lists_button_outer'>
              <button
                className={`home__container_content_predict_lists_button ${isEndEventReceive ? 'disabled_button_receive' : ''} ${isReceiveLoading ? 'loading_button_receive' : ''} ${userInTop?.status === 2 || isSuccessReceive ? 'disabled_button_receive' : ''}`}
                onClick={handleReceiveReward}
              >
                <span className='home__container_content_predict_lists_button_text'>
                  <span>
                    {isEndEventReceive && userInTop?.status === 1
                      ? 'Sự kiện đã kết thúc'
                      : userInTop?.status === 2 || isSuccessReceive
                        ? 'Đã nhận thưởng'
                        : 'Nhận thưởng'}
                  </span>
                </span>

                {isReceiveLoading && (
                  <div className='loading-container'>
                    <div className='loading-bar'></div>
                  </div>
                )}
              </button>
            </div>
          )}
        </div>
      )}

      <div className='home__container_content_predict_prize_outer'>
        <div className='home__container_content_predict_prize_outer_text' onClick={handleOpenModalEnergy}>
          <span>Cách sử dụng OEG Energy</span>
          <div className='home__container_content_predict_prize_outer_text_icon'>
            <img src='image/energy_icon.webp' alt='OEG IMAGE' />
          </div>
        </div>
        <div className='home__container_content_predict_prize'>
          <div className='home__container_content_predict_prize_pc'>
            <img src='image/banner_giai.webp' alt='OEG IMAGE' />
          </div>
          <div className='home__container_content_predict_prize_mobile'>
            <img src='image/banner_giai_mobile.webp' alt='OEG IMAGE' />
          </div>
        </div>
      </div>
    </div>
  )
})

export default PredictPrize
