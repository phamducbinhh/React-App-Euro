import { useState, useEffect } from 'react'
import { Timer } from '~/@Types/euro.types'

export const useCountdown = ({
  start_time_string,
  finish_time_string
}: {
  start_time_string: string
  finish_time_string: string
}): Timer => {
  const [timer, setTimer] = useState<Timer>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const updateCountdown = (): void => {
      const now: number = new Date().getTime()
      const startDate: number = new Date(start_time_string?.replace(' ', 'T')).getTime()
      const endDate: number = new Date(finish_time_string?.replace(' ', 'T')).getTime()

      if (now >= startDate && now <= endDate) {
        let timeRemaining: number = Math.floor((endDate - now) / 1000)

        if (timeRemaining > 0) {
          const days: number = Math.floor(timeRemaining / 86400)
          timeRemaining %= 86400
          const hours: number = Math.floor(timeRemaining / 3600)
          timeRemaining %= 3600
          const minutes: number = Math.floor(timeRemaining / 60)
          const seconds: number = timeRemaining % 60

          setTimer({ days, hours, minutes, seconds })
        } else {
          setTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        }
      } else {
        setTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    // Check if the current time is after the start time
    const now: number = new Date().getTime()
    const startDate: number = new Date(start_time_string?.replace(' ', 'T')).getTime()
    if (now >= startDate) {
      const intervalId: NodeJS.Timeout = setInterval(updateCountdown, 1000)

      // Initial call to set the countdown immediately
      updateCountdown()

      return () => clearInterval(intervalId)
    }
  }, [start_time_string, finish_time_string])

  return timer
}

export const useCountdown2 = ({ start_time_string }: { start_time_string: string }): Timer => {
  const [timer, setTimer] = useState<Timer>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const updateCountdown = (): void => {
      const now: number = new Date().getTime()
      const startDate: number = new Date(start_time_string?.replace(' ', 'T')).getTime()

      if (now < startDate) {
        let timeRemaining: number = Math.floor((startDate - now) / 1000)

        if (timeRemaining > 0) {
          const days: number = Math.floor(timeRemaining / 86400)
          timeRemaining %= 86400
          const hours: number = Math.floor(timeRemaining / 3600)
          timeRemaining %= 3600
          const minutes: number = Math.floor(timeRemaining / 60)
          const seconds: number = timeRemaining % 60

          setTimer({ days, hours, minutes, seconds })
        } else {
          setTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        }
      } else {
        setTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    const now: number = new Date().getTime()
    const startDate: number = new Date(start_time_string?.replace(' ', 'T')).getTime()
    if (now < startDate) {
      const intervalId: NodeJS.Timeout = setInterval(updateCountdown, 1000)

      // Initial call to set the countdown immediately
      updateCountdown()

      return () => clearInterval(intervalId)
    }
  }, [start_time_string])

  return timer
}
