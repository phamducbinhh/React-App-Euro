import React from 'react'

const PendingStatus: React.FC = () => (
  <div className='home_predict_board_left_item_action_inner_text'>
    <span className='home_predict_board_left_item_action_inner_text_board'>
      <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'>
        <g clipPath='url(#clip0_5986_53510)'>
          <path
            d='M16 0C7.164 0 0 7.164 0 16C0 24.836 7.164 32 16 32C24.836 32 32 24.836 32 16C31.9747 7.17467 24.8253 0.0253333 16 0ZM25.6093 10.276L13.6093 22.276C13.3493 22.536 13.008 22.6667 12.6667 22.6667C12.3253 22.6667 11.984 22.536 11.724 22.276L6.39067 16.9427C5.86933 16.4213 5.86933 15.5787 6.39067 15.0573C6.912 14.536 7.75467 14.536 8.276 15.0573L12.6667 19.448L23.724 8.39067C24.2453 7.86933 25.088 7.86933 25.6093 8.39067C26.1307 8.912 26.1307 9.75467 25.6093 10.276Z'
            fill='#143DDA'
          />
        </g>
        <defs>
          <clipPath id='clip0_5986_53510'>
            <rect width='32' height='32' fill='white' />
          </clipPath>
        </defs>
      </svg>
    </span>
    <span className='home_predict_board_left_item_action_inner_text_countdown text-submit'>
      Gửi dự đoán thành công!
    </span>
  </div>
)

export default PendingStatus
