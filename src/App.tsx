import React, { useEffect, useState } from 'react'
import Home from './Pages/Home/Home'
import './App.scss'
import { useAppDispatch, useAppSelector } from './Redux/Hooks'
import ModalRules from './Components/ModalRules'
import Modal from './Components/Modal/Modal'
import Confetti from 'react-confetti'
import { API_CONFIGS } from './Configs/endPoint'
import RoundBXH from './Components/ModalPick/RoundBXH'
import Round from './Components/ModalPick/Round'
import Team from './Components/ModalPick/Team'
import ModalEnergy from './Components/ModalPick/Energy/Enery'
import ModalPrize from './Components/ModalPrize'
import { useWindowSize } from 'react-use'
import { setIsEndReceiveGift } from './Redux/Users/reducers'
import ModalMinigame from './Components/ModalMinigame'
import Auth from './Components/Auth/Auth'
import { useAuth } from './Context/AuthContext'
import { useVerifyTokenQueries, useVerifyUserQueries } from './React-Query/User'

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const { isAuthenticated } = useAuth()
  const modalOpen = useAppSelector((state) => state.modal.isOpenModalRules)
  const modalPickTeam = useAppSelector((state) => state.modal.isOpenModalPickTeam)
  const modalSubmit = useAppSelector((state) => state.modal.isOpenModalSubmit)
  const modalRound = useAppSelector((state) => state.modal.isOpenModalRound)
  const modalRanking = useAppSelector((state) => state.modal.isOpenModalRanking)
  const modalEnergy = useAppSelector((state) => state.modal.isOpenModalEnergy)
  const modalPrize = useAppSelector((state) => state.modal.isOpenModalPrize)
  const modalMinigame = useAppSelector((state) => state.modal.isOpenModalMinigame)
  const modalAuthenticate = useAppSelector((state) => state.modal.isOpenModalAuth)
  const isEndEventReceive = useAppSelector((state) => state.users.isUserPredictionGame)
  const height = document.body.scrollHeight
  const { width } = useWindowSize()
  const [showConfetti, setShowConfetti] = useState(false)
  const { refetch } = useVerifyTokenQueries()
  const { refetch: refetchUser } = useVerifyUserQueries()

  const BeforeEndTimeMinigame = () => {
    if (isEndEventReceive.receive_gift_end) {
      const endEventTime = new Date(isEndEventReceive?.receive_gift_end?.replace(' ', 'T'))
      const currentDate = new Date()

      return currentDate <= endEventTime
    }
  }
  useEffect(() => {
    const intervalId = setInterval(() => {
      const isEnd = BeforeEndTimeMinigame()
      dispatch(setIsEndReceiveGift(!isEnd))
      if (!isEnd) {
        clearInterval(intervalId)
      }
    }, 1000)

    return () => clearInterval(intervalId)
  }, [isEndEventReceive?.receive_gift_end])

  useEffect(() => {
    setTimeout(() => {
      setShowConfetti(true)
    }, 2000)
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      refetch()
      refetchUser()
    }
  }, [isAuthenticated])

  useEffect(() => {
    const loadSDK = async (src: string): Promise<void> => {
      const scriptOld = document.head.querySelectorAll(`[src="${src}"]`)
      if (scriptOld.length > 0) {
        return
      }
      await new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = resolve
        document.body.append(script)
      })
    }

    const initializeFacebookSDK = (): Promise<void> => {
      return new Promise<void>((resolve) => {
        window.fbAsyncInit = function () {
          FB.init({
            appId: API_CONFIGS.private_key_facebook,
            status: false,
            cookie: false,
            xfbml: true,
            version: 'v15.0'
          })
          resolve()
        }
      })
    }

    const initializeSDK = async () => {
      await loadSDK('https://connect.facebook.net/en_US/sdk.js')
      await initializeFacebookSDK()
    }

    initializeSDK()
  }, [])

  return (
    <div className='App'>
      <Home />
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={80} // Tăng số lượng mảnh confetti
          gravity={0.05} // Giảm trọng lực để confetti rơi chậm hơn
          colors={['#22b4a1', '#ff6262', '#faa534', '#f7fac5']}
          recycle={false}
          initialVelocityY={{ min: 0, max: 10 }}
        />
      )}
      {modalOpen && <ModalRules />}
      {modalPickTeam && <Team />}
      {modalSubmit && <Modal />}
      {modalRound && <Round />}
      {modalRanking && <RoundBXH />}
      {modalEnergy && <ModalEnergy />}
      {modalPrize && <ModalPrize />}
      {modalMinigame && <ModalMinigame />}
      {modalAuthenticate && <Auth />}
    </div>
  )
}

export default App
