import React, { memo, useEffect, useState } from 'react'

const PredictEmty: React.FC<{ id: number }> = memo(({ id }) => {
  const [displayTime, setDisplayTime] = useState<string>('Coming soon')

  useEffect(() => {
    switch (id) {
      case 2:
        setDisplayTime('00:00 - 27/06')
        break
      case 3:
        setDisplayTime('00:00 - 04/07')
        break
      case 4:
        setDisplayTime('00:00 - 08/07')
        break
      default:
        setDisplayTime('Coming soon')
        break
    }
  }, [id])

  return (
    <div className='emty'>
      <div className='emty_comming'>
        <div className='emty_comming_select'>
          <div className='emty_comming_select_inner'>
            <div className='emty_comming_select_inner_item'>
              <div className='emty_comming_select_inner_item_left'>
                <div className='emty_comming_select_inner_item_left_logo'>
                  <img src='/image/draw.webp' alt='logo' />
                </div>
                <div className='emty_comming_select_inner_item_left_team'>
                  <span>Coming soon</span>
                </div>
              </div>
              <div className='emty_comming_select_inner_item_right'>
                <input type='checkbox' className='emty_comming_select_inner_item_right_checkbox' disabled={true} />
              </div>
            </div>
            <div className='emty_comming_select_inner_item'>
              <div className='emty_comming_select_inner_item_left'>
                <div className='emty_comming_select_inner_item_left_logo'>
                  <img src='/image/draw.webp' alt='logo' />
                </div>
                <div className='emty_comming_select_inner_item_left_team'>
                  <span>Coming soon</span>
                </div>
              </div>
              <div className='emty_comming_select_inner_item_right'>
                <input type='checkbox' className='emty_comming_select_inner_item_right_checkbox' disabled={true} />
              </div>
            </div>
          </div>
        </div>
        <div className='emty_comming_action'>
          <div className='emty_comming_action_inner'>
            <div className='emty_comming_action_inner_text'>
              <span className='emty_comming_action_inner_text_board'>MỞ CỔNG DỰ ĐOÁN</span>
              <span className='emty_comming_action_inner_text_time'>{displayTime}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default PredictEmty
