/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useCallback, useEffect, useState } from 'react'
import './PredictBoard.scss'
import { useFormatTime } from '~/Hooks/useFormatTime'
import { APP_CONSTANST_LEAGUE } from '~/Configs/endPoint'
import { ScoreStatus, TypeTournaments, fixtureStatus } from '~/Constants/params.enum'
import TeamCheckBox from './TeamCheckBox'
import PendingStatus from './PendingStatus'
import WinStatus from './WinStatus'
import LoseStatus from './LoseStatus'
import BeforeRoundStart from './BeforeRoundStart'
import BeforeRoundEnd from './BeforeRoundEnd'
import DefaultStatus from './DefaultStatus'
import { useAppSelector } from '~/Redux/Hooks'
import { useLocalStorage } from '~/Services/localStorage/localStorageService'

const PredictBoard: React.FC<any> = memo(
  ({
    home_team,
    away_team,
    selectedTeam,
    handleCheckboxChange,
    handleSubmitPredicate,
    vn_date_time,
    id,
    prediction,
    winner_team_id,
    openErrorModal,
    roundStart,
    status,
    teamMatchId,
    roundId,
    roundIdToUse
  }) => {
    const predictedFixture_id = useAppSelector((state) => state.football.predictedFixture_id)

    const predictedArrTeam_id = useAppSelector((state) => state.football.predictedArrTeam_id)

    const predictedScroll = useLocalStorage.getLocalStorageData('predictedScroll')

    const [isRoundEnd, setIsRoundEnd] = useState(false)

    const handleCheckboxChangeWithDraw = useCallback(
      (teamId: number | null, key: string): void => {
        if (
          (teamId !== 0 && teamId === selectedTeam && teamMatchId === id) ||
          prediction ||
          !isBeforeRoundStart() ||
          !isBeforeRoundEnd() ||
          predictedFixture_id.includes(id)
        ) {
          return
        }

        handleCheckboxChange(teamId, key, id)
      },
      [handleCheckboxChange, selectedTeam, prediction, id, teamMatchId, predictedFixture_id]
    )

    const handleOpenErrorModal = useCallback(
      (message: string): void => {
        openErrorModal(message)
      },
      [openErrorModal]
    )

    const handleSubmit = useCallback(
      (fixture_id: number): void => {
        if (
          (selectedTeam === 0 || selectedTeam === home_team.id || selectedTeam === away_team.id) &&
          teamMatchId === id
        ) {
          handleSubmitPredicate(fixture_id)
        } else {
          handleOpenErrorModal('Bạn cần chọn một kết quả trước khi đưa ra dự đoán!')
          return
        }
      },
      [handleSubmitPredicate, handleOpenErrorModal]
    )

    const GetTimeTournamentMatch = useFormatTime(vn_date_time?.replace(' ', 'T'))

    const GetTimeRoundStart = useFormatTime(roundStart?.replace(' ', 'T'))

    const getStatusFixtures = (status: ScoreStatus): boolean =>
      prediction?.status === status || (!prediction && predictedFixture_id.includes(id))

    const isTeamChecked = useCallback(
      (teamId: number): boolean => {
        return (
          (getStatusFixtures(ScoreStatus.PENDING) && prediction?.team_id === teamId) ||
          (getStatusFixtures(ScoreStatus.WIN) && winner_team_id === teamId) ||
          (getStatusFixtures(ScoreStatus.LOSE) && (winner_team_id === teamId || prediction?.team_id === teamId)) ||
          (!prediction && predictedArrTeam_id.some((item) => item.team_id === teamId && item.fixture_id === id))
        )
      },
      [getStatusFixtures, prediction, winner_team_id]
    )

    const getActiveClass = useCallback(
      (teamId: number): boolean => {
        return (getStatusFixtures(ScoreStatus.WIN) || getStatusFixtures(ScoreStatus.LOSE)) && winner_team_id === teamId
      },
      [getStatusFixtures, winner_team_id]
    )

    const isBeforeRoundStart = () => {
      const roundStartDate = new Date(roundStart?.replace(' ', 'T'))
      const currentDate = new Date()
      return currentDate >= roundStartDate
    }
    const isBeforeRoundEnd = () => {
      const roundStartDate = new Date(vn_date_time?.replace(' ', 'T'))

      const currentDate = new Date()
      return currentDate < roundStartDate && !fixtureStatus.FINISHED.includes(status)
    }

    useEffect(() => {
      setIsRoundEnd(isBeforeRoundEnd())

      const intervalId = setInterval(() => {
        setIsRoundEnd(isBeforeRoundEnd())
        if (!isBeforeRoundEnd() && !predictedScroll) {
          clearInterval(intervalId)
        }
      }, 1000)

      return () => clearInterval(intervalId)
    }, [vn_date_time, roundStart, status])

    const isCheckedValue = (teamId: number, fixture_id: number): boolean => {
      if (
        (prediction && prediction?.team_id !== teamId && selectedTeam === teamId && teamMatchId === fixture_id) ||
        (!isRoundEnd && selectedTeam === teamId && teamMatchId === fixture_id)
      ) {
        return false
      }
      return (selectedTeam === teamId && teamMatchId === fixture_id) || isTeamChecked(teamId)
    }

    return (
      <div
        className='home_predict_board_left_item'
        style={{ height: `${TypeTournaments.GROUP.includes(roundId) ? '171px' : '150px'}` }}
      >
        <div className='home_predict_board_left_item_select'>
          <ul className='home_predict_board_left_item_select_inner'>
            <TeamCheckBox
              team={home_team}
              isActive={getActiveClass(home_team.id)}
              isDisabled={
                prediction || !isBeforeRoundStart() || !isRoundEnd || (!prediction && predictedFixture_id.includes(id))
              }
              isChecked={isCheckedValue(home_team.id, id)}
              handleChange={() => handleCheckboxChangeWithDraw(home_team.id, APP_CONSTANST_LEAGUE.HOME_KEY)}
            />

            <TeamCheckBox
              team={away_team}
              isActive={getActiveClass(away_team.id)}
              isDisabled={
                prediction || !isBeforeRoundStart() || !isRoundEnd || (!prediction && predictedFixture_id.includes(id))
              }
              isChecked={isCheckedValue(away_team.id, id)}
              handleChange={() => handleCheckboxChangeWithDraw(away_team.id, APP_CONSTANST_LEAGUE.AWAY_KEY)}
            />

            {TypeTournaments.GROUP.includes(roundId) ? (
              <TeamCheckBox
                team={{ logo_url: 'https://statics.oeg.vn/storage/EURO-2024/flag-news/draw.webp', name: 'Hòa' }}
                isActive={getActiveClass(0)}
                isDisabled={
                  prediction ||
                  !isBeforeRoundStart() ||
                  !isRoundEnd ||
                  (!prediction && predictedFixture_id.includes(id))
                }
                isChecked={isCheckedValue(0, id)}
                handleChange={() => handleCheckboxChangeWithDraw(0, APP_CONSTANST_LEAGUE.DRAW_KEY)}
              />
            ) : (
              <></>
            )}
          </ul>
        </div>{' '}
        <div className='home_predict_board_left_item_action'>
          {getStatusFixtures(ScoreStatus.PENDING) ? (
            <PendingStatus />
          ) : getStatusFixtures(ScoreStatus.WIN) ? (
            <WinStatus id={roundIdToUse} />
          ) : getStatusFixtures(ScoreStatus.LOSE) ? (
            <LoseStatus />
          ) : !isBeforeRoundStart() ? (
            <BeforeRoundStart GetTimeRoundStart={GetTimeRoundStart} />
          ) : !isRoundEnd ? (
            <BeforeRoundEnd />
          ) : (
            <DefaultStatus
              GetTimeTournamentMatch={GetTimeTournamentMatch}
              timeStart={vn_date_time?.replace(' ', 'T')}
              id={id}
              handleSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    )
  }
)

export default PredictBoard
