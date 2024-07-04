import React from 'react'
import './EndPredict.scss'

const EndPredict: React.FC = () => {
  return (
    <div className='home__container_content_your_champion_inner_end_predicted'>
      <h3 className='home__container_content_your_champion_inner_end_predicted_thanks'>
        KẾT THÚC DỰ ĐOÁN{' '}
        <span className='home__container_content_your_champion_inner_end_predicted_thanks_block'>
          ĐỘI TUYỂN VÔ ĐỊCH
        </span>
      </h3>
      <p className='home__container_content_your_champion_inner_end_predicted_congras'>
        Thời gian dự đoán đã kết thúc. Hi vọng bạn sẽ tiếp tục ủng hộ và tham gia các sự kiện của OEG.
      </p>
    </div>
  )
}

export default EndPredict
