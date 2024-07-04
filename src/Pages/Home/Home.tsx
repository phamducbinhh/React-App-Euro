import React, { Fragment, Suspense, lazy, useEffect, useState } from 'react'
import './Home.scss'
import Header from '~/Components/Header'
import BackToTop from '~/Components/BackToTop'
import Sticknav from '~/Components/StickyNav'
import Footer from '~/Components/Footer'
import Container from '~/Components/Container'
import LoadingBox from '~/Components/LoadingBox'
import LoadingComponent from '~/Components/Loading'
import Heading from '~/Components/Heading'
import MinigameFinal from '~/Components/MiniGameFinal/MinigameFinal'
import { useAppDispatch, useAppSelector } from '~/Redux/Hooks'
import { setIsStartMinigame } from '~/Redux/Users/reducers'

const ChampionContent = lazy(() => import('~/Components/ChampionContent'))
const PredictPrize = lazy(() => import('~/Components/PredictionSection/PredictPrize'))
const PredictSection = lazy(() => import('~/Components/PredictionSection/PredictionSection'))
const RankingPredicter = lazy(() => import('~/Components/RankingPredicter'))
const Space = lazy(() => import('~/Components/Space'))
const Schedule = lazy(() => import('~/Components/Schedule'))
const LazyHeroBanner = lazy(
  () =>
    new Promise<{ default: React.ComponentType }>((resolve) => {
      setTimeout(() => {
        import('~/Components/HeroBanner').then(({ default: Component }) => {
          resolve({ default: Component })
        })
      }, 1700)
    })
)

const Home: React.FC = () => {
  const [percent, setPercent] = useState(0)
  const RangeTime = useAppSelector((state) => state.users.isUserPredictionGame)
  const isStartMinigame = useAppSelector((state) => state.users.isStartMinigame)
  const isSpace = useAppSelector((state) => state.football.listFeatureSpace)
  const dispatch = useAppDispatch()

  useEffect(() => {
    let currentPercent = 0

    const intervalId = setInterval(() => {
      currentPercent += 10
      setPercent(Math.min(currentPercent, 100))

      if (currentPercent >= 100) {
        clearInterval(intervalId)
      }
    }, 120)

    return () => clearInterval(intervalId)
  }, [])

  const BeforeEndTimeMinigame = () => {
    if (RangeTime?.champion_minigame_start) {
      const startEventTime = new Date(RangeTime?.champion_minigame_start?.replace(' ', 'T'))
      const currentDate = new Date()
      return currentDate <= startEventTime
    }
  }
  useEffect(() => {
    const intervalId = setInterval(() => {
      const isEnd = BeforeEndTimeMinigame()
      dispatch(setIsStartMinigame(!isEnd))
      if (!isEnd) {
        clearInterval(intervalId)
      }
    }, 1000)

    return () => clearInterval(intervalId)
  }, [RangeTime?.champion_minigame_start])

  return (
    <div className='home'>
      <div className='home__wrapper'>
        <Suspense fallback={<LoadingComponent />}>
          <Schedule />
        </Suspense>

        <Header />

        <Suspense fallback={<LoadingBox percent={percent} />}>
          <LazyHeroBanner />
        </Suspense>

        <Container>
          <Suspense fallback={<LoadingComponent />}>
            {isStartMinigame && (
              <Fragment>
                <Heading />
                <MinigameFinal />
              </Fragment>
            )}
            <ChampionContent />
          </Suspense>
        </Container>

        <Container>
          <Suspense key='hero-banner' fallback={<LoadingComponent />}>
            <PredictPrize />
          </Suspense>
        </Container>

        <Container>
          <div className='home__wrapper_content_board'>
            <div className='home__wrapper_content_board_left'>
              <Suspense fallback={<LoadingComponent />}>
                <PredictSection />
              </Suspense>
            </div>
            <div className='home__wrapper_content_board_right'>
              <Suspense fallback={<LoadingComponent />}>
                <RankingPredicter />
              </Suspense>
            </div>
          </div>
        </Container>

        <Container>
          <div className='home__wrapper_content_news'>
            <Suspense fallback={<LoadingComponent />}>{isSpace?.totalItems > 0 && <Space />}</Suspense>
          </div>
        </Container>

        <div className='home_vector'>
          <div className='home_vector_wrapper'>
            <div className='home_vector_wrapper_backtotop'>
              <BackToTop />
            </div>
            <img src='image/isolation_mode.webp' alt='OEG IMAGE' className='home_vector_wrapper_pc' />
            <img src='image/isolation_mode_mobile.webp' alt='OEG IMAGE' className='home_vector_wrapper_mobile' />
          </div>
        </div>
      </div>

      <Sticknav />

      <div className='home_bg_sticky_img' />

      <Footer />
    </div>
  )
}

export default Home
