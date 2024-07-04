import React from 'react'
import './Footer.scss'
import { redirectConfig } from '~/Configs/endPoint'

const Footer: React.FC = () => {
  return (
    <div className='footer_wrapper'>
      <div className='footer_wrapper_inner'>
        <div className='footer_wrapper_inner_logo_wrapper'>
          <a href={`${redirectConfig.Home}`} className='footer_wrapper_inner_logo_wrapper_logo'>
            <svg xmlns='http://www.w3.org/2000/svg' width='96' height='70' viewBox='0 0 49 36' fill='none'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M7.34895 1.36829C9.64584 0.451042 12.2952 0 15.1455 0C19.6976 0 24.7576 1.15224 29.6925 3.40366C30.7651 3.89261 31.815 4.42704 32.8308 4.99937L24.4126 11.8219C20.6679 9.99495 16.8056 9.00189 13.3792 9.00189C9.63447 9.00189 6.89412 10.192 5.6585 12.3487C4.87391 13.7132 4.74126 15.4302 5.26431 17.3178C5.87075 19.4972 7.29209 21.7941 9.3881 23.9924L7.37548 25.626C1.14052 19.7322 -1.39516 12.8604 0.746333 7.54264C1.86067 4.78332 4.1424 2.6494 7.34895 1.36829ZM45.4382 17.046L45.4413 17.0449H45.4376L45.4382 17.046ZM45.4382 17.046L35.3138 20.8427C36.1818 22.1466 36.8147 23.4542 37.1597 24.6936C37.6827 26.5812 37.5463 28.2982 36.7655 29.6627C35.4768 31.9141 32.6379 33.036 29.0751 33.036C25.5122 33.036 20.8085 31.8042 16.4194 29.3595C15.9191 29.0828 15.4302 28.7871 14.9488 28.4839L12.2653 29.4921C14.0202 30.6595 15.8926 31.7018 17.8635 32.6001C22.7529 34.825 27.7826 36.0038 32.4067 36.0038C35.3024 36.0038 37.9291 35.5414 40.207 34.6317C43.4136 33.3506 45.6953 31.2167 46.8058 28.4574C48.1512 25.1109 47.6587 21.1088 45.4382 17.046ZM43.5424 0.996826C43.6174 0.865542 43.737 0.8085 43.857 0.80733C44.0679 0.809392 44.2699 0.983222 44.2322 1.24319L43.5121 6.00757L48.1741 4.79089C48.2082 4.77952 48.2423 4.77573 48.2764 4.77573C48.6138 4.77573 48.7957 5.23435 48.4925 5.45798L44.6151 8.31584L48.773 10.7492C49.1141 10.9463 48.9587 11.4504 48.591 11.4504C48.5797 11.4504 48.5692 11.4494 48.5588 11.4485C48.5484 11.4476 48.538 11.4466 48.5266 11.4466L43.7623 10.7265L44.9789 15.3885C45.0509 15.6576 44.8311 15.8623 44.6075 15.8623C44.5014 15.8623 44.3914 15.8168 44.3118 15.7069L41.454 11.8294L39.0207 15.9873C38.9448 16.12 38.8236 16.1769 38.7023 16.1769C38.49 16.1769 38.2853 16.0025 38.3232 15.741L38.8046 12.5647L6.28048 30.2084C6.15919 30.2767 6.02274 30.307 5.89009 30.307C5.61719 30.307 5.35187 30.1705 5.19647 29.928C4.9501 29.5452 5.06002 29.0335 5.44663 28.7871L37.4704 8.38786L33.7901 6.23498C33.449 6.03789 33.6044 5.53378 33.972 5.53378C33.9834 5.53378 33.9938 5.53473 34.0043 5.53568C34.0147 5.53662 34.0251 5.53757 34.0365 5.53757L38.8008 6.25772L37.5842 1.59569C37.5121 1.32658 37.732 1.1219 37.9556 1.1219C38.0617 1.1219 38.1716 1.16739 38.2512 1.27731L41.1091 5.15475L43.5424 0.996826ZM43.857 0.80733C43.8583 0.807318 43.8595 0.807312 43.8608 0.807312H43.8532C43.8545 0.807312 43.8558 0.807318 43.857 0.80733Z'
                fill='white'
              ></path>
            </svg>
          </a>
          <span>Sản phẩm chạy thử nghiệm Lưu hành nội bộ</span>
        </div>
        <div className='footer_wrapper_inner_links_container'>
          <div className='footer_wrapper_inner_links'>
            <div className='footer_wrapper_inner_links_item'>
              <h4>ESPORTS</h4>
              <a href={`${redirectConfig.eSports}`}>Giải đấu</a>
            </div>
            <div className='footer_wrapper_inner_links_item'>
              <h4>SPACE</h4>
              <a href={`${redirectConfig.News}/esports`}>Esports</a>
              <a href={`${redirectConfig.News}/game-hot`}>Game Hot</a>
              <a href={`${redirectConfig.News}/game-biz`}>Gamebiz</a>
              <a href={`${redirectConfig.News}/cosplay`}>Cosplay</a>
              <a href={`${redirectConfig.News}/games-events`}>Sự kiện</a>
            </div>
            <div className='footer_wrapper_inner_links_item'>
              <h4>BUSINESS</h4>

              <a href={`${redirectConfig.Biz}/our-story`}>Giới thiệu</a>
              <a href={`${redirectConfig.eSports}/#lienhe`}>Hợp tác với chúng tôi</a>
              <a href={`${redirectConfig.Biz}/career`}>Tuyển dụng</a>
              <a href={`${redirectConfig.eSports}/#lienhe`}>Liên hệ</a>
            </div>
          </div>
          <div className='footer_wrapper_inner_links'>
            <div className='footer_wrapper_inner_links_item footer_wrapper_inner_links_item_translate'>
              <div className='footer_wrapper_inner_links_full'>
                <h4>STADIUM</h4>
                <a className='footer_wrapper_inner_links_full_disabled'>Đặt chỗ</a>
                <a href={`${redirectConfig.Stadium}/khuyen-mai`}>Khuyến mãi</a>
                <a href={`${redirectConfig.Stadium}/dich-vu`}>Giới thiệu phòng máy</a>
                <a href={`${redirectConfig.Stadium}/dich-vu`}>Tiêu chuẩn thi đấu</a>
              </div>
            </div>
            <div className='footer_wrapper_inner_links_item'>
              <div className='footer_wrapper_inner_links_full footer_wrapper_inner_links_full_pc'>
                <h4>SOCIAL</h4>
                <div className='footer_wrapper_inner_links_item_logo'>
                  <a href='https://www.facebook.com/oegvn' target='_blank'>
                    <div>
                      <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                        <path
                          d='M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 16.84 5.44 20.87 10 21.8V15H8V12H10V9.5C10 7.57 11.57 6 13.5 6H16V9H14C13.45 9 13 9.45 13 10V12H16V15H13V21.95C18.05 21.45 22 17.19 22 12Z'
                          fill='#A3A3A3'
                        />
                      </svg>
                    </div>
                  </a>
                  <a href='https://www.tiktok.com/@oegnet' target='_blank'>
                    <div>
                      <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                        <path
                          d='M10.189 8.937V13.059C9.66984 12.9221 9.1266 12.9034 8.5993 13.0044C8.07199 13.1054 7.57407 13.3234 7.14222 13.6424C6.71038 13.9613 6.35562 14.3732 6.10411 14.8475C5.85259 15.3218 5.71073 15.8466 5.68898 16.383C5.65924 16.8449 5.72874 17.3078 5.89281 17.7405C6.05687 18.1733 6.3117 18.5659 6.64015 18.892C6.9686 19.2181 7.36306 19.4701 7.79701 19.631C8.23096 19.7919 8.69433 19.8581 9.15598 19.825C9.6223 19.8608 10.0908 19.7949 10.5292 19.6319C10.9675 19.4689 11.3653 19.2126 11.6949 18.8809C12.0246 18.5491 12.2783 18.1498 12.4385 17.7104C12.5988 17.271 12.6617 16.8021 12.623 16.336V0H16.7C17.393 4.315 19.551 5.316 22.44 5.778V9.913C20.4379 9.74881 18.5066 9.09645 16.815 8.013V16.18C16.815 19.88 14.625 24 9.18798 24C8.16794 23.9955 7.15905 23.7875 6.22046 23.3881C5.28187 22.9886 4.43245 22.4059 3.72201 21.6739C3.01156 20.942 2.45438 20.0755 2.08313 19.1254C1.71187 18.1754 1.53401 17.1607 1.55998 16.141C1.59228 15.0794 1.84923 14.0366 2.31389 13.0815C2.77854 12.1265 3.44035 11.2807 4.25568 10.6C5.07102 9.9193 6.02136 9.41915 7.04407 9.1325C8.06679 8.84586 9.13864 8.77923 10.189 8.937Z'
                          fill='#A3A3A3'
                        />
                      </svg>
                    </div>
                  </a>
                  <a href='https://www.youtube.com/@oceanentertainmentgroup1709' target='_blank'>
                    <div>
                      <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                        <path
                          d='M23.8 7.2001C23.8 7.2001 23.6 5.5001 22.8 4.8001C21.9 3.8001 20.9 3.8001 20.4 3.8001C17 3.6001 12 3.6001 12 3.6001C12 3.6001 7 3.6001 3.6 3.8001C3.1 3.9001 2.1 3.9001 1.2 4.8001C0.5 5.5001 0.2 7.2001 0.2 7.2001C0.2 7.2001 0 9.1001 0 11.1001V12.9001C0 14.8001 0.2 16.8001 0.2 16.8001C0.2 16.8001 0.4 18.5001 1.2 19.2001C2.1 20.2001 3.3 20.1001 3.8 20.2001C5.7 20.4001 12 20.4001 12 20.4001C12 20.4001 17 20.4001 20.4 20.1001C20.9 20.0001 21.9 20.0001 22.8 19.1001C23.5 18.4001 23.8 16.7001 23.8 16.7001C23.8 16.7001 24 14.8001 24 12.8001V11.0001C24 9.1001 23.8 7.2001 23.8 7.2001ZM9.5 15.1001V8.4001L16 11.8001L9.5 15.1001Z'
                          fill='#A3A3A3'
                        />
                      </svg>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className='footer_wrapper_inner_links_item'>
              <div className='footer_wrapper_inner_links_full footer_wrapper_inner_links_full_mobile'>
                <h4>SOCIAL</h4>
                <div className=' footer_wrapper_inner_links_item_logo'>
                  {/* <nuxt-link to="https://www.facebook.com/oegvn">
                                    <div><VLogoFb /></div>
                                </nuxt-link>
                                <nuxt-link to="https://www.tiktok.com/@oegnet">
                                    <div><VLogoTiktok /></div>
                                </nuxt-link>
                                <nuxt-link to="https://www.youtube.com/@oceanentertainmentgroup1709">
                                    <div><VLogoYtb /></div>
                                </nuxt-link> */}
                </div>
              </div>
              <div className='footer_wrapper_inner_links_full'>
                <a target='_blank' href={`${redirectConfig.Home}/privacy`}>
                  Điều khoản sử dụng
                </a>
                <a target='_blank' href={`${redirectConfig.Home}/policy`}>
                  Chính sách bảo mật
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Footer
