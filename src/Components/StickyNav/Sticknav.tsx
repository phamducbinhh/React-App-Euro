import React from 'react'
import './Sticknav.scss'
import { redirectConfig } from '~/Configs/endPoint'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'

declare const FB: any
declare global {
  interface Window {
    fbAsyncInit: () => void
  }
}

const Sticknav: React.FC = () => {
  const shareOnFacebook = async (): Promise<any> => {
    const url = window.location.href
    FB.ui({
      method: 'feed',
      link: url
    })
  }

  return (
    <div className='stick_nav'>
      <a href={redirectConfig.Home}>
        <div
          className='stick_nav_home'
          data-tooltip-id='my-tooltip'
          data-tooltip-content='Trang chủ'
          data-tooltip-place='left'
        >
          <svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 22 22' fill='none'>
            <g clipPath='url(#clip0_6007_2031)'>
              <path
                d='M20.1595 7.7405L11.5388 0.843944C11.2241 0.59222 10.7758 0.59222 10.4612 0.843944L1.84049 7.7405C1.63618 7.90429 1.51721 8.1517 1.51721 8.41291V19.6207C1.51721 20.0965 1.90342 20.4827 2.37928 20.4827H8.41376V14.4483C8.41376 13.9724 8.79997 13.5862 9.27583 13.5862H12.7241C13.2 13.5862 13.5862 13.9724 13.5862 14.4483V20.4827H19.6207C20.0965 20.4827 20.4827 20.0965 20.4827 19.6207V8.41291C20.4827 8.15084 20.3638 7.90343 20.1595 7.7405Z'
                fill='#0039BE'
              />
            </g>
            <defs>
              <clipPath id='clip0_6007_2031'>
                <rect width='20.6897' height='20.6897' fill='white' transform='translate(0.655151 0.655151)' />
              </clipPath>
            </defs>
          </svg>
        </div>
      </a>
      <a
        className='stick_nav_home'
        href='https://www.messenger.com/t/102578769235237/?messaging_source=source%3Apages%3Amessage_shortlink&source_id=1441792&recurring_notification=0'
        data-tooltip-id='my-tooltip'
        data-tooltip-content='Hỗ trợ'
        data-tooltip-place='left'
      >
        <svg xmlns='http://www.w3.org/2000/svg' width='21' height='21' viewBox='0 0 21 21' fill='none'>
          <g clipPath='url(#clip0_7122_2637)'>
            <path
              d='M0 10.0347C0 4.26861 4.51689 0 10.345 0C16.1731 0 20.69 4.26861 20.69 10.0347C20.69 15.8007 16.1731 20.0693 10.345 20.0693C9.29757 20.0693 8.2941 19.9309 7.35012 19.6723C7.16707 19.6215 6.97211 19.6352 6.79796 19.7111L4.74448 20.6189C4.62045 20.6736 4.48489 20.697 4.34971 20.687C4.21452 20.6771 4.08385 20.6341 3.96918 20.5618C3.8545 20.4895 3.75934 20.3902 3.69204 20.2725C3.62475 20.1549 3.58739 20.0225 3.58325 19.887L3.52635 18.0469C3.52235 17.9349 3.49564 17.8249 3.44785 17.7235C3.40006 17.6221 3.33218 17.5315 3.24833 17.4572C1.23623 15.6572 0 13.0502 0 10.0347ZM7.17167 8.14798L4.13283 12.9688C3.84187 13.4317 4.40956 13.9528 4.84534 13.6231L8.11048 11.1454C8.21787 11.0639 8.34891 11.0195 8.48376 11.019C8.61862 11.0186 8.74995 11.062 8.85791 11.1429L11.2748 12.9558C11.4462 13.0844 11.6425 13.1761 11.8512 13.2251C12.0598 13.274 12.2764 13.2793 12.4872 13.2404C12.698 13.2015 12.8984 13.1194 13.0759 12.9992C13.2534 12.879 13.404 12.7233 13.5183 12.542L16.5572 7.72125C16.8494 7.25831 16.2804 6.73718 15.8447 7.06693L12.5795 9.54456C12.4721 9.62612 12.3411 9.6705 12.2062 9.67096C12.0714 9.67143 11.94 9.62796 11.8321 9.54714L9.41524 7.73289C9.24376 7.60429 9.0475 7.51262 8.83883 7.46364C8.63016 7.41467 8.4136 7.40946 8.20281 7.44833C7.99203 7.48721 7.79158 7.56933 7.61411 7.68953C7.43664 7.80972 7.286 7.96667 7.17167 8.14798Z'
              fill='#0039BE'
            />
          </g>
          <defs>
            <clipPath id='clip0_7122_2637'>
              <rect width='20.69' height='20.69' fill='white' />
            </clipPath>
          </defs>
        </svg>
      </a>
      <div
        className='stick_nav_home'
        onClick={shareOnFacebook}
        data-tooltip-id='my-tooltip'
        data-tooltip-content='Chia sẻ'
        data-tooltip-place='left'
      >
        <svg xmlns='http://www.w3.org/2000/svg' width='21' height='21' viewBox='0 0 21 21' fill='none'>
          <g clipPath='url(#clip0_6972_48533)'>
            <path
              d='M11.783 1.94492C11.659 1.83367 11.5055 1.7607 11.341 1.73483C11.1765 1.70896 11.008 1.73129 10.8559 1.79914C10.7038 1.86698 10.5746 1.97742 10.484 2.11711C10.3933 2.25681 10.345 2.41977 10.345 2.58631V6.92086C6.66563 7.12087 0 8.77607 0 18.1038C0.000309763 18.2895 0.0605734 18.4701 0.171822 18.6188C0.28307 18.7675 0.439356 18.8763 0.617419 18.929C0.795482 18.9817 0.985803 18.9755 1.16006 18.9113C1.33431 18.8471 1.48318 18.7284 1.58451 18.5728C2.53494 17.1112 3.83228 15.9076 5.36083 15.0691C6.88939 14.2307 8.60167 13.7835 10.345 13.7675V18.1038C10.345 18.2703 10.3933 18.4333 10.484 18.573C10.5746 18.7127 10.7038 18.8231 10.8559 18.891C11.008 18.9588 11.1765 18.9812 11.341 18.9553C11.5055 18.9294 11.659 18.8564 11.783 18.7452L20.4038 10.9865C20.4938 10.9056 20.5658 10.8067 20.6151 10.6962C20.6644 10.5857 20.6898 10.4661 20.6898 10.3451C20.6898 10.2241 20.6644 10.1044 20.6151 9.99392C20.5658 9.88341 20.4938 9.78452 20.4038 9.70367L11.783 1.94492Z'
              fill='#0039BE'
            />
          </g>
          <defs>
            <clipPath id='clip0_6972_48533'>
              <rect width='20.69' height='20.69' fill='white' />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div className='tooltip_mobile'>
        {' '}
        <Tooltip id='my-tooltip' />
      </div>
    </div>
  )
}

export default Sticknav
