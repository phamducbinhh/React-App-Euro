import React, { useEffect, useState } from 'react'
import './TopUser.scss'
import { useAppDispatch, useAppSelector } from '~/Redux/Hooks'
import { formatPrize } from '~/Hooks/useFormatPrize'
import { getTopUser, receiveGiftTop } from '~/Redux/Football'
import { APP_CONSTANST_LEAGUE } from '~/Configs/endPoint'
import { HttpStatusCode } from '~/Constants/httpStatusCode.enum'
import { OpenSubmit } from '~/Redux/Modal/reducers'
import { useVerifyTokenQueries } from '~/React-Query/User'

const TopUser: React.FC = () => {
  const dispatch = useAppDispatch()
  const { data: userQuery } = useVerifyTokenQueries()

  const allTopUser = useAppSelector((state) => state.football.allTopUser)

  const isTopUserFinal = allTopUser?.find((item: any) => item.top_type === 7)

  const isLoggedIn = useAppSelector((state) => state.users.isLoggedIn)

  const [isSuccessReceive, setIsSuccessReceive] = useState<boolean>(false)

  const [isReceiveLoading, setIsReceiveLoading] = useState<boolean>(false)

  const [isInFinal, setIsInFinal] = useState<any>(null)

  const isEndEventReceive = useAppSelector((state) => state.users.isEndReceiveGift)

  const [userInTop, setUserInTop] = useState<any>(null)

  // tìm kiếm bản thân trong mảng top dựa vào id, nếu status là 2 thì sẽ disabled button nhận thưởng
  const checkInTopFinal = () => {
    const data = isTopUserFinal
    let isTop = false // Mặc định là false, nếu tìm thấy sẽ đặt lại thành true
    if (data?.tops && data?.tops?.length > 0) {
      for (let i = 0; i < data?.tops?.length; i++) {
        const item = data?.tops[i]
        if (item.user.id === Number(userQuery?.id)) {
          setUserInTop(item)
          isTop = true
          break // Nếu tìm thấy, thoát khỏi vòng lặp
        }
      }
    }
    setIsInFinal(isTop) // Đặt setIsTopRank ở cuối khi đã kiểm tra xong danh sách
  }

  const openVerifyEmail = () => {
    const action = OpenSubmit({
      modalProps: {
        message: ' Bạn cần xác thực email để tham gia nhận thưởng.',
        isSuccess: false,
        isLogin: true,
        isVerifyEmail: true
      }
    })
    document.body.classList.add('no-scroll')
    dispatch(action)
  }

  const openSuccessReceiveModal = () => {
    const action = OpenSubmit({
      modalProps: {
        message: 'Nhận thưởng thành công. Phần thưởng đã được gửi qua Email của bạn',
        isSuccess: true,
        isLogin: true,
        isVerifyEmail: false
      }
    })
    document.body.classList.add('no-scroll')
    dispatch(action)
  }
  const openErrorModalReceive = (errorMessage: string) => {
    const defaultMessage = 'Bạn đã nhận thưởng rồi. Hãy kiểm tra lại email của bạn.'
    const action = OpenSubmit({
      modalProps: {
        message: errorMessage || defaultMessage,
        isSuccess: false,
        isLogin: true,
        isOutofTime: true
      }
    })
    document.body.classList.add('no-scroll')
    dispatch(action)
  }
  const handleReceivePrize = async () => {
    if (userInTop?.status === 2) {
      return
    }
    if (isEndEventReceive) {
      return
    }
    if (isSuccessReceive) {
      return
    }

    if (userQuery?.email_verified_at === null || userQuery?.email_verified_at === undefined) {
      openVerifyEmail()
      return
    }
    try {
      setIsReceiveLoading(true)
      const response = await dispatch(
        receiveGiftTop({
          league: APP_CONSTANST_LEAGUE.LEAGUE_ID,
          season: APP_CONSTANST_LEAGUE.SEASON_YEAR,
          body: { type: 7 }
        })
      )

      if (response.payload?.data?.code === HttpStatusCode.Ok) {
        openSuccessReceiveModal()
        await dispatch(
          getTopUser({
            league: APP_CONSTANST_LEAGUE.LEAGUE_ID,
            season: APP_CONSTANST_LEAGUE.SEASON_YEAR,
            type: 7
          })
        )
        setIsSuccessReceive(true)
      }
      if (response.payload?.code === HttpStatusCode.BadRequest) {
        openErrorModalReceive(response.payload?.message)
        setIsSuccessReceive(true)
        return
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsReceiveLoading(false)
    }
  }

  useEffect(() => {
    checkInTopFinal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTopUserFinal])
  return (
    <div className='home__container_content_top_user'>
      <span className='home__container_content_top_user_text'>
        top {isTopUserFinal?.tops?.length} user trúng thưởng
      </span>
      <div className='home__container_content_top_user_row'>
        {isTopUserFinal?.tops?.map((data: any) => (
          <div
            key={data.rank}
            className={`home__container_content_predict_lists_user_topUser_item ${data.rank === 1 ? 'first_rank' : ''}${data.rank === 2 ? 'second_rank' : ''}${data.rank === 3 ? 'third_rank' : ''}`}
          >
            <div className='home__container_content_predict_lists_user_topUser_item_inner'>
              <div className='home__container_content_predict_lists_user_topUser_item_infor'>
                <div className='home__container_content_predict_lists_user_topUser_item_img'>
                  <img
                    src={
                      data.user?.avatar
                        ? data.user?.avatar
                        : 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg'
                    }
                    alt='OEG IMAGE'
                  />
                  <div className='home__container_content_predict_lists_user_topUser_item_img_icon'>
                    {data.rank === 1 && <img src='image/1st.webp' alt='1st Place' />}
                    {data.rank === 2 && <img src='image/cockade_2.webp' alt='2nd Place' />}
                    {data.rank === 3 && <img src='image/cockade_3.webp' alt='3rd Place' />}
                    {data.rank === 4 && <img src='image/cockade_4.webp' alt='4th Place' />}
                    {data.rank !== 1 && data.rank !== 2 && data.rank !== 3 && data.rank !== 4 && (
                      <div className='home__container_content_predict_lists_user_topUser_item_img_relative'>
                        <img src='image/cockdate_prize.webp' alt='6th Place' />
                        <span className='home__container_content_predict_lists_user_topUser_item_img_relative_stt'>
                          {data.rank}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <p className='home__container_content_predict_lists_user_topUser_item_infor_name'>
                  {data.user?.display_name ? data.user?.display_name : data.user.username}
                </p>
                {data.prize?.value && (
                  <div className='home__container_content_predict_lists_user_topUser_item_infor_prize'>
                    <span>{formatPrize(data.prize?.value)}</span>
                    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
                      <g clipPath='url(#clip0_7250_68784)'>
                        <path
                          d='M7.99771 15.9954C12.4147 15.9954 15.9954 12.4147 15.9954 7.99771C15.9954 3.5807 12.4147 0 7.99771 0C3.5807 0 0 3.5807 0 7.99771C0 12.4147 3.5807 15.9954 7.99771 15.9954Z'
                          fill='#1C64F2'
                        />
                        <path
                          d='M12.5273 6.8812C12.4495 6.72564 12.2894 6.62498 12.1155 6.62498H8.51011L8.91274 3.01503C8.93562 2.80914 8.82124 2.61698 8.62907 2.5392C8.43691 2.46141 8.22187 2.52089 8.09376 2.68561L3.51841 8.63356C3.41317 8.77082 3.39487 8.95841 3.47265 9.11397C3.55043 9.26954 3.71057 9.37019 3.88444 9.37019H7.48981L7.08718 12.9801C7.0643 13.186 7.17869 13.3782 7.37085 13.456C7.42576 13.4789 7.48524 13.488 7.54014 13.488C7.6774 13.488 7.81466 13.424 7.90159 13.3096L12.4769 7.36161C12.5822 7.22435 12.6005 7.03676 12.5227 6.8812H12.5273Z'
                          fill='white'
                        />
                      </g>
                      <defs>
                        <clipPath id='clip0_7250_68784'>
                          <rect width='16' height='16' fill='white' />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                )}
                {data.prize?.other && (
                  <div className='home__container_content_predict_lists_user_topUser_item_infor_prize '>
                    <span className='home__container_content_predict_lists_user_topUser_item_infor_prize_under other_value'>
                      {data.prize?.other.replace('65AU7002 UHD', '')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {!isInFinal && isLoggedIn && (
        <div className='home__container_content_top_user_thanks'>
          <h4 className='home__container_content_top_user_thanks_title'>
            Cảm ơn <span>{userQuery?.display_name || userQuery?.username}</span> đã{' '}
            <div>tham gia dự đoán Euro 2024</div>
          </h4>
          <p className='home__container_content_top_user_thanks_text'>
            Dự đoán của bạn chưa chính xác. Hi vọng bạn sẽ tiếp tục ủng hộ và tham gia các sự kiện của OEG.
          </p>
        </div>
      )}
      {isInFinal && isLoggedIn && (
        <div>
          <div className='home__container_content_top_user_thanks'>
            <h4 className='home__container_content_top_user_thanks_title'>
              Chúc mừng bạn đã dự đoán đúng đội vô địch Euro 2024
            </h4>
          </div>
          <div
            className={`home__container_content_top_user_button  ${isEndEventReceive && userInTop?.status === 1 ? 'disabled_button_receive' : ''} ${isReceiveLoading ? 'loading_button_receive' : ''} ${userInTop?.status === 2 || isSuccessReceive ? 'disabled_button_receive' : ''}`}
            onClick={handleReceivePrize}
          >
            <span>
              {isEndEventReceive && userInTop?.status === 1
                ? 'Sự kiện đã kết thúc'
                : userInTop?.status === 2 || isSuccessReceive
                  ? 'Đã nhận thưởng'
                  : 'Nhận thưởng'}
            </span>

            {isReceiveLoading && (
              <div className='loading-container'>
                <div className='loading-bar'></div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default TopUser
