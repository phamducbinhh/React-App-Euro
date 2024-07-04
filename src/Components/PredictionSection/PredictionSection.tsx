import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './PredictionSection.scss'
import PredictBoard from './PredictBoard'
import { useAppDispatch, useAppSelector } from '~/Redux/Hooks'
import { OpenSubmit, openModalAuth, openModalRound } from '~/Redux/Modal/reducers'
import { postTeamChampionLeague } from '~/Redux/Football'
import { APP_CONSTANST_LEAGUE } from '~/Configs/endPoint'
import { PredictionStatus, TypeTournaments } from '~/Constants/params.enum'
import { HttpStatusCode } from '~/Constants/httpStatusCode.enum'
import { useLocalStorage } from '~/Services/localStorage/localStorageService'
import {
  SetisSetLocalSession,
  setLoadingButtonStatus,
  setPredictedArrTeam_id,
  setPredictedBody,
  setPredictedFixture_id
} from '~/Redux/Football/reducers'
import LoadingComponent from '../Loading'
import PredictEmty from './PredicEmty'
import Arrow from '../Icons/Arrow'
import { Fixture, MatchOfRound } from '~/@Types/euro.types'
import { useAuth } from '~/Context/AuthContext'
import { useMatchQueries } from '~/React-Query/Match'

const PredictSection: React.FC = memo(() => {
  const dispatch = useAppDispatch()

  const { isAuthenticated } = useAuth()

  const predictedScroll = useLocalStorage.getLocalStorageData('predictedScroll')

  const predictedRound = useAppSelector((state) => state.football.predictedRound)

  const isActiveGroup = useAppSelector((state) => state.users.isActiveGroup)

  const predictedBody = useAppSelector((state) => state.football.predictedBody)

  const roundIdToUse = predictedRound.group_id === 0 ? isActiveGroup : predictedRound.group_id

  const isLoggedIn = useAppSelector((state) => state.users.isLoggedIn)

  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(() => {
    const saved = useLocalStorage.getLocalStorageData('expandedItems')
    return saved || {}
  })

  const [defaultExpandedItemId, setDefaultExpandedItemId] = useState<number | null>(null)

  const divRefs = useRef<any>([])

  const TeamMatchId = useLocalStorage.getLocalStorageData('predictedTeamMatchId')

  const contentRefs = useRef<Record<number, HTMLDivElement | null | any>>({})

  const [filteredMatches, setFilteredMatches] = useState<any[]>([])

  const [winValue, setWinValue] = useState<string>('+30')

  const {
    data: listMatch,
    isLoading,
    refetch
  } = useMatchQueries(
    {
      league: APP_CONSTANST_LEAGUE.LEAGUE_ID,
      season: APP_CONSTANST_LEAGUE.SEASON_YEAR,
      round: roundIdToUse
    },
    { enabled: false } // Disable automatic query execution
  )

  const handleSelectRound = (): void => {
    dispatch(openModalRound())
    document.body.classList.add('no-scroll')
  }

  useEffect(() => {
    if (roundIdToUse !== null) {
      refetch()
    }
  }, [roundIdToUse, refetch])

  useEffect(() => {
    if (isAuthenticated && roundIdToUse !== null) {
      refetch()
    }
  }, [isAuthenticated])

  const getMatchRoundCategory = useMemo(() => {
    let category: string | undefined
    if (listMatch && listMatch.length > 0) {
      for (let index = 0; index < listMatch.length; index++) {
        const element = listMatch[index]
        if (TypeTournaments.GROUP.includes(element.round_id)) {
          category = 'VÒNG BẢNG'
          break
        }
        category = element.round_name
      }
    }
    return category
  }, [listMatch])

  const handleCheckboxChange = useCallback(
    (team_id: number, key: string, fixture_id: number) => {
      const action = {
        team_id,
        fixture_id,
        key
      }
      dispatch(setPredictedBody(action))
    },
    [dispatch]
  )

  const openModal = useCallback(
    ({
      message,
      isSuccess = false,
      isLogin = false,
      isOutofTime = false,
      isVerifyEmail = false
    }: {
      message: string
      isSuccess?: boolean
      isLogin?: boolean
      isOutofTime?: boolean
      isVerifyEmail?: boolean
    }) => {
      const action = OpenSubmit({
        modalProps: {
          message,
          isSuccess,
          isLogin,
          isOutofTime,
          isVerifyEmail
        }
      })

      document.body.classList.add('no-scroll')
      dispatch(action)
    },
    [dispatch]
  )

  const openSubmitModal = useCallback(() => {
    openModal({
      message: 'Gửi dự đoán thành công',
      isSuccess: true,
      isLogin: true
    })
  }, [openModal])

  const openErrorModal = useCallback(
    (message: string) => {
      openModal({
        message,
        isOutofTime: true
      })
    },
    [openModal]
  )

  const handleSubmitPredicate = useCallback(
    async (fixture_id: number) => {
      if (!isLoggedIn) {
        dispatch(SetisSetLocalSession(true))
        dispatch(openModalAuth())
        return
      }

      const isDraw = predictedBody.key === APP_CONSTANST_LEAGUE.DRAW_KEY
      const body = {
        fixture_id,
        team_id: isDraw ? 0 : predictedBody.team_id,
        type: PredictionStatus.FIXTURE
      }

      try {
        dispatch(setLoadingButtonStatus({ id: fixture_id, isLoading: true }))
        const response = await dispatch(
          postTeamChampionLeague({
            body,
            league: APP_CONSTANST_LEAGUE.LEAGUE_ID,
            season: APP_CONSTANST_LEAGUE.SEASON_YEAR
          })
        )

        const { payload } = response
        const { code, status, message } = payload

        if (
          code === HttpStatusCode.BadRequest ||
          status !== HttpStatusCode.Ok ||
          code === HttpStatusCode.TooManyRequests
        ) {
          openErrorModal(message)
        } else {
          dispatch(setPredictedFixture_id(fixture_id))
          dispatch(
            setPredictedArrTeam_id({
              team_id: predictedBody.team_id,
              fixture_id
            })
          )
          openSubmitModal()
        }
      } catch (e: any) {
        console.log('error', e)
        dispatch(setLoadingButtonStatus({ id: fixture_id, isLoading: false }))
      }
    },
    [isLoggedIn, predictedBody, dispatch, openErrorModal, openSubmitModal]
  )

  useEffect(() => {
    if (roundIdToUse !== null) {
      const scrollToPredictedTeam = () => {
        if (predictedScroll && TeamMatchId) {
          const topOffset =
            (divRefs.current[TeamMatchId] as HTMLElement)?.getBoundingClientRect()?.top + window.pageYOffset - 150

          window.scrollTo({ top: topOffset, behavior: 'smooth' })
        }
      }

      setTimeout(() => {
        scrollToPredictedTeam()
      }, 2000)
    }
  }, [TeamMatchId, roundIdToUse, predictedScroll])

  useEffect(() => {
    if (!isLoading && listMatch?.length > 0) {
      const sortedListMatch = listMatch.map((item: MatchOfRound) => {
        const fixturesWithNS: Fixture[] = []
        const otherFixtures: Fixture[] = []
        // Use for loop to sort fixtures within each item
        for (const fixture of item.fixtures) {
          if (fixture.status === 'NS') {
            fixturesWithNS.push(fixture)
          } else {
            otherFixtures.push(fixture)
          }
        }
        return {
          ...item,
          fixtures: [...fixturesWithNS, ...otherFixtures]
        }
      })
      const nonFTMatches: MatchOfRound[] = []
      const ftMatches: MatchOfRound[] = []
      // Use for loop to separate non-FT and FT matches
      for (const item of sortedListMatch) {
        const hasNonFTStatus = item.fixtures.some((fixture: Fixture) => fixture.status !== 'FT')
        if (hasNonFTStatus) {
          nonFTMatches.push(item)
        } else {
          ftMatches.push(item)
        }
      }
      setFilteredMatches([...nonFTMatches, ...ftMatches])
    } else {
      setFilteredMatches([])
    }
  }, [listMatch, isLoading])

  const toggleExpand = (roundId: number, index: number) => {
    if (index === 0) return

    setExpandedItems((prev) => {
      const newExpandedItems = {
        ...prev,
        [roundId]: !prev[roundId]
      }
      useLocalStorage.setLocalStorageData('expandedItems', newExpandedItems)
      return newExpandedItems
    })
  }

  useEffect(() => {
    if (filteredMatches && filteredMatches.length > 0) {
      setDefaultExpandedItemId(filteredMatches[0].round_id)
      setExpandedItems((prev) => ({
        ...prev,
        [filteredMatches[0].round_id]: true
      }))
    }
  }, [filteredMatches])

  useEffect(() => {
    switch (roundIdToUse) {
      case 1:
        setWinValue('+30')
        break
      case 2:
        setWinValue('+50')
        break
      case 3:
        setWinValue('+75')
        break
      case 4:
        setWinValue('+150')
        break
      default:
        setWinValue('0')
    }
  }, [roundIdToUse])

  return (
    <div className='home_predict'>
      <div className='home_predict_board_left_head' onClick={handleSelectRound}>
        <div className='home_predict_board_left_head_text'>
          <h4 className='home_predict_board_left_head_text_board'>
            {predictedRound?.group_name || getMatchRoundCategory}
          </h4>
          <div className='home_predict_board_left_head_text_badge'>
            <div className='home_predict_board_left_head_text_badge_items'>
              <p>Đúng {winValue}</p>
            </div>
            <div className='home_predict_board_left_head_text_badge_items'>
              <p>SAI -10</p>
            </div>
          </div>
        </div>
        <div className='home_predict_board_left_head_logo'>
          <Arrow />
        </div>
      </div>

      {isLoading ? (
        <LoadingComponent />
      ) : filteredMatches && filteredMatches.length > 0 ? (
        filteredMatches.map((item, index) => (
          <div className='home_predict_board_left_body' key={item.round_id}>
            {TypeTournaments.GROUP.includes(item.round_id) ? (
              <div className='home_predict_board_left_body_label' onClick={() => toggleExpand(item.round_id, index)}>
                <p className={`${index === 0 ? 'home_predict_board_left_body_label_disabled' : ''}`}>
                  {item.round_name}
                </p>
                {index !== 0 && (
                  <div className={expandedItems[item.round_id] ? 'rotated' : 'arrow-icon'}>
                    <Arrow />
                  </div>
                )}
              </div>
            ) : null}
            <main
              ref={(el) => (contentRefs.current[item.round_id] = el)}
              className='home_predict_board_left_body_box'
              style={{
                maxHeight:
                  defaultExpandedItemId === item.round_id || expandedItems[item.round_id]
                    ? contentRefs.current[item.round_id]?.scrollHeight + 'px'
                    : '0',
                overflow: 'hidden',
                transition: 'max-height 0.3s ease-out'
              }}
            >
              {item.fixtures &&
                item.fixtures.length > 0 &&
                item.fixtures.map((fixture: any) => (
                  <div ref={(el) => (divRefs.current[fixture.id] = el)} key={fixture.id}>
                    <PredictBoard
                      {...fixture}
                      handleCheckboxChange={handleCheckboxChange}
                      handleSubmitPredicate={handleSubmitPredicate}
                      openErrorModal={openErrorModal}
                      selectedTeam={predictedBody.team_id}
                      teamMatchId={predictedBody.fixture_id}
                      roundStart={item.round_start}
                      roundId={item.round_id}
                      roundIdToUse={roundIdToUse}
                    />
                  </div>
                ))}
            </main>
          </div>
        ))
      ) : roundIdToUse === 2 ? (
        Array.from({ length: 8 }).map((_, index) => <PredictEmty key={index} id={roundIdToUse} />)
      ) : roundIdToUse === 3 ? (
        Array.from({ length: 4 }).map((_, index) => <PredictEmty key={index} id={roundIdToUse} />)
      ) : roundIdToUse === 4 ? (
        Array.from({ length: 2 }).map((_, index) => <PredictEmty key={index} id={roundIdToUse} />)
      ) : (
        <PredictEmty id={roundIdToUse} />
      )}
    </div>
  )
})

export default PredictSection
