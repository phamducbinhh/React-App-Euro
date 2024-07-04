import React, { memo, useEffect, useRef, useState } from 'react'
import './RankingPredicter.scss'
import { useAppDispatch, useAppSelector } from '~/Redux/Hooks'
import { openModalAuth, openModalRanking } from '~/Redux/Modal/reducers'
import { getTopRanking } from '~/Redux/Football'
import { APP_CONSTANST_LEAGUE, redirectConfig } from '~/Configs/endPoint'
import LoadingComponent from '../Loading'
import {
  setActiveAllTop,
  setLimitValue,
  setLoadingRanking,
  setRoundRankingPayload,
  setRoundRankingSelected,
  setTopRanking
} from '~/Redux/Football/reducers'
import { useLocalStorage } from '~/Services/localStorage/localStorageService'
import { HttpStatusCode } from '~/Constants/httpStatusCode.enum'
import { formatSubString } from '~/Helpers'
const RankingPredicter: React.FC = memo(() => {
  const dispatch = useAppDispatch()
  const listRankingUser = useAppSelector((state) => state.football.topRanking || [])
  const totalItems = useAppSelector((state) => state.football.totalTopRanking)
  const isActive = useAppSelector((state) => state.football.isActiveAllTop)
  const roundSelected = useAppSelector((state) => state.football.RoundRankingPayload)
  const roundToUse = useAppSelector((state) => state.users.isActiveGroup)
  const isLoadingRank = useAppSelector((state) => state.football.isLoadingRank)
  const isShareFacebookToday = useAppSelector((state) => state.football.isSharedOnFacebookToday)
  const limitValue = useAppSelector((state) => state.football.limitValue)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const elementRef = useRef(null)
  const isLoggedIn = useAppSelector((state) => state.users.isLoggedIn)
  const userInfor = useAppSelector((state) => state.users?.isUserPredicted)
  const [userInforTotalPoints, setUserInforTotalPoints] = useState<number | null>(null)

  const [windowHeight, setHeight] = useState(window.innerHeight)
  const updateDimensions = () => {
    setHeight(window.innerHeight)
  }

  const createProfileUrl = (item: any): string | null => {
    const userIdStr = item?.user_id?.toString()
    const userIdQuery = 'userId'
    const encodedUserIdQuery = btoa(userIdQuery)
    const encodedUserId = btoa(userIdStr)

    return `${redirectConfig.Profile}/?${encodedUserIdQuery}=${encodedUserId}`
  }

  useEffect(() => {
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isMobileRes = () => window.matchMedia('(max-width: 900px)').matches
  const handleOpenModalRoundRanking = async (): Promise<any> => {
    dispatch(setActiveAllTop(false))

    dispatch(setLimitValue(10))

    if (isActive) {
      try {
        dispatch(setLoadingRanking(true))
        await dispatch(
          getTopRanking({
            league: APP_CONSTANST_LEAGUE.LEAGUE_ID,
            season: APP_CONSTANST_LEAGUE.SEASON_YEAR,
            round: roundSelected.id,
            limit: isMobileRes() ? 10 : null
          })
        )
      } catch (e) {
        console.log(e)
      } finally {
        dispatch(setLoadingRanking(false))
      }
    } else {
      dispatch(openModalRanking())
      document.body.classList.add('no-scroll')
    }
  }

  const setLocalStorage = () => {
    useLocalStorage.setLocalStorageData('ranking_user', true)
  }

  const handleProfileClick = (e: React.MouseEvent<HTMLAnchorElement>, user: any) => {
    setLocalStorage()

    if (!isLoggedIn) {
      e.preventDefault() // Prevent navigation if not logged in
      dispatch(openModalAuth())
      return
    }

    const url = createProfileUrl(user)
    if (!url) {
      e.preventDefault() // Prevent navigation if URL is null
    }
  }

  useEffect(() => {
    if (userInfor && !isNaN(parseInt(userInfor.total_points, 10))) {
      const points = parseInt(userInfor.total_points, 10)
      setUserInforTotalPoints(isShareFacebookToday ? points + 5 : points)
    } else {
      setUserInforTotalPoints(null)
    }
  }, [userInfor, isShareFacebookToday])

  const mockText = [
    {
      id: 1,
      name: 'Vòng Bảng'
    },
    {
      id: 2,
      name: 'Vòng 1/8'
    },
    {
      id: 3,
      name: 'Tứ Kết'
    },
    {
      id: 4,
      name: 'Bán Kết'
    }
  ]

  const fetchRankingRound = async (): Promise<any> => {
    if (roundToUse !== null) {
      try {
        dispatch(setLoadingRanking(true))

        await dispatch(
          getTopRanking({
            league: APP_CONSTANST_LEAGUE.LEAGUE_ID,
            season: APP_CONSTANST_LEAGUE.SEASON_YEAR,
            round: roundToUse,
            limit: isMobileRes() ? 10 : null
          })
        )
      } catch (e) {
        console.log(e)
      } finally {
        dispatch(setLoadingRanking(false))
      }
    }
  }
  const handleLoadMoreUser = async () => {
    const limitIncrease = 10
    setIsLoadingMore(true)

    try {
      const newCountValue = limitValue + limitIncrease
      dispatch(setLimitValue(newCountValue))
      const response = await dispatch(
        getTopRanking({
          league: APP_CONSTANST_LEAGUE.LEAGUE_ID,
          season: APP_CONSTANST_LEAGUE.SEASON_YEAR,
          round: isActive ? null : roundSelected?.id ? roundSelected.id : roundToUse,
          limit: newCountValue
        })
      )

      if (response.payload.code === HttpStatusCode.Ok) {
        const newRankingUsers = response.payload.metadata
        const existingUserIds = new Set(listRankingUser.map((user) => user.user_id))
        const newUsersOnly = newRankingUsers.filter((user: any) => !existingUserIds.has(user.user_id))
        if (newUsersOnly.length > 0) {
          // Cập nhật state với dữ liệu mới
          dispatch(setTopRanking([...listRankingUser, ...newUsersOnly]))
        }
      }
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoadingMore(false)
    }
  }

  const handleFetchRankingAll = async (): Promise<any> => {
    if (isActive) {
      return
    }
    dispatch(setLimitValue(10))
    dispatch(setActiveAllTop(true))
    try {
      dispatch(setLoadingRanking(true))
      await dispatch(
        getTopRanking({
          league: APP_CONSTANST_LEAGUE.LEAGUE_ID,
          season: APP_CONSTANST_LEAGUE.SEASON_YEAR,
          round: null,
          limit: isMobileRes() ? 10 : null
        })
      )
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(setLoadingRanking(false))
    }
  }

  useEffect(() => {
    if (roundToUse !== null) {
      fetchRankingRound()
    }

    const foundRound = mockText?.find((item) => item.id === roundToUse)

    if (foundRound) {
      dispatch(setRoundRankingSelected({ id: roundToUse, label: foundRound.name }))

      dispatch(setRoundRankingPayload({ id: roundToUse, label: foundRound.name }))
    }
  }, [roundToUse])

  useEffect(() => {
    const elementRanking = useLocalStorage.getLocalStorageData('ranking_user')

    if (elementRanking) {
      const intervalId = setInterval(() => {
        if (elementRef.current && isLoggedIn) {
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
  }, [elementRef, isLoggedIn, retryCount])

  return (
    <div className='home__ranking_predicter'>
      <div
        className='home__ranking_predicter_inner'
        ref={elementRef}
        style={!isMobileRes() ? { height: `${windowHeight - 40}px` } : {}}
      >
        {isLoggedIn && (
          <div className='home__ranking_predicter_inner_our'>
            <div className='home__ranking_predicter_inner_our_infor'>
              <a onClick={setLocalStorage} href={`${redirectConfig.Profile}`}>
                <div className='home__ranking_predicter_inner_our_infor_avatar'>
                  <img
                    src={
                      userInfor?.avatar
                        ? `${(userInfor?.avatar).replace('imagesPublicv2', 'imagesPublic')}?w=100&q=100`
                        : 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg'
                    }
                    className='home__ranking_predicter_inner_our_infor_avatar_img'
                    alt='OEG IMAGE'
                  />
                </div>
              </a>
              <span className='home__ranking_predicter_inner_our_infor_name'>
                {(formatSubString(userInfor.display_name)) || formatSubString(userInfor.username)}
              </span>
            </div>

            <span className='home__ranking_predicter_inner_our_points'>{userInforTotalPoints}</span>
          </div>
        )}
        <div className='home__ranking_predicter_inner_text'>
          <h4 className='home__ranking_predicter_inner_text_heading'>BẢNG XẾP HẠNG</h4>
          <div className={`home__ranking_predicter_inner_text_button ${isActive ? 'active' : ''}`}>
            <button
              className={`home__ranking_predicter_inner_text_button_left ${isActive ? 'un-active' : ''}`}
              onClick={handleOpenModalRoundRanking}
            >
              <div className='home__ranking_predicter_inner_text_button_left_inner'>
                <span
                  className={`home__ranking_predicter_inner_text_button_left_inner_text ${isActive ? 'un-active' : ''}`}
                >
                  {roundSelected.label}
                </span>
                <span
                  className={`home__ranking_predicter_inner_text_button_left_inner_icon ${isActive ? 'un-active' : ''}`}
                >
                  <svg xmlns='http://www.w3.org/2000/svg' width='17' height='16' viewBox='0 0 17 16' fill='none'>
                    <path
                      d='M7.94607 10.0443L7.94613 10.0443C8.0256 10.1199 8.13857 10.1665 8.26138 10.1666L7.94607 10.0443ZM7.94607 10.0443L4.21274 6.49596L4.21279 6.49591M7.94607 10.0443L4.21279 6.49591M4.21279 6.49591L4.2064 6.49004M4.21279 6.49591L4.2064 6.49004M4.2064 6.49004C4.16602 6.45298 4.13532 6.41005 4.11474 6.36452C4.0942 6.31906 4.08379 6.27118 4.08336 6.22346C4.08292 6.17574 4.09245 6.12778 4.1121 6.08212C4.13179 6.03638 4.16161 5.99309 4.20117 5.95549C4.24078 5.91784 4.28928 5.88678 4.34446 5.86532C4.39968 5.84385 4.45965 5.83276 4.52066 5.83327C4.58166 5.83377 4.64136 5.84584 4.69606 5.86818C4.75073 5.8905 4.79852 5.92227 4.83731 5.96045L4.83726 5.9605M4.2064 6.49004L4.83726 5.9605M4.83726 5.9605L4.84355 5.96649M4.83726 5.9605L4.84355 5.96649M4.84355 5.96649L7.91702 8.88761L8.26148 9.215M4.84355 5.96649L8.26148 9.215M8.26148 9.215L8.60594 8.88761M8.26148 9.215L8.60594 8.88761M8.60594 8.88761L11.6756 5.97006C11.7557 5.89778 11.8671 5.85408 11.9873 5.85507C12.1088 5.85607 12.2202 5.90256 12.2989 5.97729C12.3767 6.05124 12.4158 6.1458 12.4167 6.23899C12.4175 6.33113 12.3809 6.425 12.3065 6.49954L8.57689 10.0443L8.57683 10.0443M8.60594 8.88761L8.57683 10.0443M8.57683 10.0443C8.49736 10.1199 8.38439 10.1665 8.26158 10.1666L8.57683 10.0443Z'
                      fill='#222222'
                      stroke='#222222'
                    />
                  </svg>
                </span>
              </div>
            </button>
            <button
              className={`home__ranking_predicter_inner_text_button_right ${isActive ? 'active' : ''}`}
              onClick={handleFetchRankingAll}
            >
              <div className='home__ranking_predicter_inner_text_button_right_inner'>
                <span
                  className={`home__ranking_predicter_inner_text_button_right_inner_text ${isActive ? 'active' : ''}`}
                >
                  Cả mùa giải
                </span>
              </div>
            </button>
          </div>
        </div>
        {isLoadingRank ? (
          <div className='home__ranking_predict_inner_lists_spinner'>
            {' '}
            <LoadingComponent />
          </div>
        ) : listRankingUser.length > 0 ? (
          <ul
            className='home__ranking_predicter_inner_lists'
            style={!isMobileRes() ? { height: `${windowHeight - 100}px` } : {}}
          >
            {listRankingUser.map((user, index) => {
              const itemClass = `home__ranking_predicter_inner_lists_item_position ${
                index === 0 ? 'first' : index === 1 ? 'second' : index === 2 ? 'third' : ''
              }`
              return (
                <li key={index} className='home__ranking_predicter_inner_lists_item'>
                  <div className={itemClass}>{index + 1}</div>
                  <div className='home__ranking_predicter_inner_lists_item_infor'>
                    <a onClick={(e) => handleProfileClick(e, user)} href={createProfileUrl(user) || '#'}>
                      <div className='home__ranking_predicter_inner_lists_item_infor_avatar'>
                        <img
                          src={
                            user?.avatar
                              ? `${(user?.avatar).replace('imagesPublicv2', 'imagesPublic')}?w=100&q=100`
                              : 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg'
                          }
                          alt='OEG IMAGE'
                          className='home__ranking_predicter_inner_lists_item_infor_avatar_img'
                        />
                      </div>
                    </a>
                    <a
                      onClick={(e) => handleProfileClick(e, user)}
                      className='home__ranking_predicter_inner_lists_item_infor_name'
                      href={createProfileUrl(user) || '#'} // Provide a fallback href
                    >
                      {user?.display_name ? user?.display_name : user?.username}
                    </a>
                  </div>
                  <div className='home__ranking_predicter_inner_lists_item_points'>{user?.total_points}</div>
                </li>
              )
            })}
          </ul>
        ) : (
          <p className='home__ranking_predicter_inner_lists_text_nodata'>BXH sẽ sớm cập nhật khi vòng đấu diễn ra</p>
        )}
        {isLoadingMore && (
          <div className='loading_more'>
            <LoadingComponent />
          </div>
        )}
        {listRankingUser.length > 0 && listRankingUser.length < totalItems && listRankingUser.length < 50 && (
          <button className='home__ranking_predicter_inner_lists_button_mobile' onClick={handleLoadMoreUser}>
            <span>Xem thêm</span>
          </button>
        )}
      </div>
    </div>
  )
})
export default RankingPredicter
