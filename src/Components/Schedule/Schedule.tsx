import React, { memo, useEffect, useState } from 'react'
import './Schedule.scss'
import { Fixture } from '~/@Types/euro.types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import CardSchedule from './CardSchedule'
import Prev from '../Icons/Prev'
import Next from '../Icons/Next'
import { APP_CONSTANST_LEAGUE } from '~/Configs/endPoint'
import { useMatchQueries } from '~/React-Query/Match'

const Schedule: React.FC = memo(() => {
  const { data: listSchedule } = useMatchQueries({
    league: APP_CONSTANST_LEAGUE.LEAGUE_ID,
    season: APP_CONSTANST_LEAGUE.SEASON_YEAR,
    round: null
  })

  useEffect(() => {
    console.log('listSchedule', listSchedule)
  }, [listSchedule])

  const [listMatches, setListMatches] = useState<Fixture[]>([])

  const [swiper, setSwiper] = useState<any>(null)

  const comingSoonMatchInfo = [
    { vn_date_time: '2024-06-29 23:00:00', round_id: 4 },
    { vn_date_time: '2024-06-30 02:00:00', round_id: 4 },
    { vn_date_time: '2024-06-30 23:00:00', round_id: 4 },
    { vn_date_time: '2024-07-01 02:00:00', round_id: 4 },
    { vn_date_time: '2024-07-01 23:00:00', round_id: 4 },
    { vn_date_time: '2024-07-02 02:00:00', round_id: 4 },
    { vn_date_time: '2024-07-02 23:00:00', round_id: 4 },
    { vn_date_time: '2024-07-03 02:00:00', round_id: 4 },
    { vn_date_time: '2024-07-05 23:00:00', round_id: 5 },
    { vn_date_time: '2024-07-06 02:00:00', round_id: 5 },
    { vn_date_time: '2024-07-06 23:00:00', round_id: 5 },
    { vn_date_time: '2024-07-07 02:00:00', round_id: 5 },
    { vn_date_time: '2024-07-10 02:00:00', round_id: 6 },
    { vn_date_time: '2024-07-11 02:00:00', round_id: 6 },
    { vn_date_time: '2024-07-15 02:00:00', round_id: 7 }
  ]

  const comingSoonMatches = comingSoonMatchInfo.map((info) => ({
    vn_date_time: info.vn_date_time,
    round_id: info.round_id,
    away_team: {
      logo_url: '/image/draw.webp',
      name: 'Coming soon'
    },
    home_team: {
      logo_url: '/image/draw.webp',
      name: 'Coming soon'
    }
  }))

  useEffect(() => {
    const allFixtures: Fixture[] = []
    const roundIds: any = []
    const currentDate = new Date()
    const filterDate = new Date('2024-07-05T00:00:00'.replace(' ', 'T'))

    for (let i = 0; i < listSchedule?.length; i++) {
      const roundId = listSchedule[i].round_id
      const fixtures: Fixture[] = listSchedule[i].fixtures

      for (let j = 0; j < fixtures.length; j++) {
        allFixtures.push({ ...fixtures[j], round_id: roundId })
        if (!roundIds.includes(roundId)) {
          roundIds.push(roundId)
        }
      }
    }

    // Filter out comingSoonMatches not in roundIds and check vn_date_time
    const filteredComingSoonMatches = comingSoonMatches.filter(
      (match) =>
        !allFixtures.some((fixture) => fixture.vn_date_time.replace(' ', 'T') === match.vn_date_time.replace(' ', 'T'))
    )

    const requiredRounds = [5, 6, 7] // id của các round tứ kết , bán kết, chung kết

    const hasAnyRequiredRound = requiredRounds.some((round) => roundIds.includes(round))

    let filteredArrayMatches: Fixture[] = []

    if (currentDate >= filterDate && hasAnyRequiredRound) {
      filteredArrayMatches = allFixtures.filter((item: any) => requiredRounds.includes(item.round_id))
    } else {
      filteredArrayMatches = allFixtures
    }

    const combinedFixtures: any = [...filteredArrayMatches, ...filteredComingSoonMatches]

    setListMatches(combinedFixtures)
  }, [listSchedule])

  useEffect(() => {
    const swiperWrapper = document.querySelector('.swiper-wrapper') as HTMLElement | null

    if (swiperWrapper && listMatches.length < 11) {
      swiperWrapper.classList.add('custom-flex')
    } else if (swiperWrapper) {
      swiperWrapper.classList.remove('custom-flex')
    }
  }, [listMatches])

  useEffect(() => {
    if (swiper && listMatches.length > 0) {
      const today = new Date().toISOString().slice(0, 10)
      let closestMatchIndex = -1
      let closestDateDiff = Infinity

      for (let i = 0; i < listMatches.length; i++) {
        const matchDate = listMatches[i].vn_date_time.slice(0, 10).replace(' ', 'T')

        if (matchDate === today) {
          swiper.slideTo(i, 0) // Cuộn đến slide của trận đấu hôm nay
          return
        }

        const matchDateObj = new Date(listMatches[i].vn_date_time.replace(' ', 'T'))
        const currentDate = new Date()

        // Tính khoảng cách ngày
        const dateDiff = currentDate.getTime() - matchDateObj.getTime()

        // Kiểm tra nếu ngày của trận đấu nhỏ hơn ngày hiện tại và khoảng cách ngày nhỏ hơn khoảng cách hiện tại
        if (dateDiff > 0 && dateDiff < closestDateDiff) {
          closestDateDiff = dateDiff
          closestMatchIndex = i
        }
      }

      // Nếu không có trận đấu nào đúng vào ngày hôm nay, cuộn đến trận đấu gần nhất nhưng < current date
      if (closestMatchIndex !== -1) {
        swiper.slideTo(closestMatchIndex, 0)
      }
    }
  }, [swiper, listMatches])

  return (
    <div className='Schedule_wrapper'>
      <Swiper
        className='Schedule_wrapper_inner'
        slidesPerView={11}
        onSwiper={setSwiper}
        modules={[Navigation]}
        navigation={{
          prevEl: '.prev_btn_prev',
          nextEl: '.prev_btn_next'
        }}
        breakpoints={{
          320: {
            slidesPerView: 2.3,
            spaceBetween: 1,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 1,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0
          },
          1024: {
            slidesPerView: 6.5,
            spaceBetween: 1,
            slidesOffsetBefore: 20,
            slidesOffsetAfter: 20
          },
          1440: {
            slidesPerView: 9.5,
            spaceBetween: 1,
            slidesOffsetBefore: 20,
            slidesOffsetAfter: 20
          },
          1600: {
            slidesPerView: 11.3,
            spaceBetween: 1,
            slidesOffsetBefore: 20,
            slidesOffsetAfter: 20
          }
        }}
      >
        {listMatches &&
          listMatches.length > 0 &&
          listMatches.map((item, index) => (
            <SwiperSlide key={index}>
              <CardSchedule {...item} />
            </SwiperSlide>
          ))}
      </Swiper>

      <div className='prev_btn_prev'>
        <div className='prev_btn_prev_control'>
          <Prev />
        </div>
      </div>
      <div className='prev_btn_next'>
        <div className='prev_btn_next_control'>
          <Next />
        </div>
      </div>
    </div>
  )
})

export default Schedule
