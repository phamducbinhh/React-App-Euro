import React from 'react'
import './BackToTop.scss'

const BackToTop: React.FC = () => {
  const scrollToTop = () => {
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      ;(function loop() {
        const currentPosition = document.documentElement.scrollTop || document.body.scrollTop
        if (currentPosition > 0) {
          window.requestAnimationFrame(loop)
          window.scrollTo(0, currentPosition - currentPosition / 8)
        }
      })()
    }
  }
  return (
    <div className='back_to_top' onClick={() => scrollToTop()}>
      <span className='back_to_top_logo'>
        <svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 15 15' fill='none'>
          <g clipPath='url(#clip0_6022_54944)'>
            <path
              d='M13.75 0H1.25C0.918479 0 0.600537 0.131696 0.366117 0.366117C0.131696 0.600537 0 0.918479 0 1.25C0 1.58152 0.131696 1.89946 0.366117 2.13388C0.600537 2.3683 0.918479 2.5 1.25 2.5H13.75C14.0815 2.5 14.3995 2.3683 14.6339 2.13388C14.8683 1.89946 15 1.58152 15 1.25C15 0.918479 14.8683 0.600537 14.6339 0.366117C14.3995 0.131696 14.0815 0 13.75 0Z'
              fill='#7197EF'
            />
            <path
              d='M6.87501 15H8.12501C8.29077 15 8.44974 14.9342 8.56695 14.817C8.68416 14.6997 8.75001 14.5408 8.75001 14.375V11.25H11.875C11.995 11.2499 12.1124 11.2152 12.2132 11.1502C12.314 11.0851 12.394 10.9924 12.4436 10.8832C12.4931 10.7739 12.5102 10.6527 12.4927 10.534C12.4752 10.4153 12.424 10.3041 12.345 10.2138L7.97001 5.21377C7.90969 5.14959 7.83687 5.09845 7.75604 5.06349C7.67521 5.02853 7.58807 5.0105 7.50001 5.0105C7.41194 5.0105 7.3248 5.02853 7.24397 5.06349C7.16314 5.09845 7.09032 5.14959 7.03001 5.21377L2.65501 10.2138C2.57606 10.3041 2.52478 10.4153 2.50731 10.534C2.48983 10.6527 2.50689 10.7739 2.55645 10.8832C2.60601 10.9924 2.68597 11.0851 2.78679 11.1502C2.88761 11.2152 3.00502 11.2499 3.12501 11.25H6.25001V14.375C6.25001 14.5408 6.31585 14.6997 6.43306 14.817C6.55027 14.9342 6.70925 15 6.87501 15Z'
              fill='#7197EF'
            />
          </g>
          <defs>
            <clipPath id='clip0_6022_54944'>
              <rect width='15' height='15' fill='white' />
            </clipPath>
          </defs>
        </svg>
      </span>
      <span className='back_to_top_text'>Trở lên đầu trang</span>
    </div>
  )
}

export default BackToTop
