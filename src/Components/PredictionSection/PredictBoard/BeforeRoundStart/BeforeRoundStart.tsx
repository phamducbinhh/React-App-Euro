import React from 'react'

const BeforeRoundStart: React.FC<{ GetTimeRoundStart: string | undefined }> = ({ GetTimeRoundStart }) => (
  <div className='home_predict_board_left_item_action_inner'>
    <div className='home_predict_board_left_item_action_inner_text'>
      <span className='home_predict_board_left_item_action_inner_text_board'>MỞ CỔNG DỰ ĐOÁN</span>
      <span className='home_predict_board_left_item_action_inner_text_time'>{GetTimeRoundStart}</span>
    </div>
  </div>
)

export default BeforeRoundStart
