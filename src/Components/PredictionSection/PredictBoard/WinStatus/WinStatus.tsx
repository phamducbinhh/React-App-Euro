import React, { useEffect, useState } from 'react'

const WinStatus: React.FC<{ id: number }> = ({ id }) => {
  const [winValue, setWinValue] = useState<string>('+30')

  useEffect(() => {
    switch (id) {
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
  }, [id])

  return (
    <div className='home_predict_board_left_item_action_inner_text'>
      <button className='home_predict_board_left_item_action_inner_success'>
        <span className='home_predict_board_left_item_action_inner_success_text'>{winValue}</span>
      </button>
    </div>
  )
}

export default WinStatus
