import React, { Fragment, useRef, useState } from 'react'
import './Header.scss'
import { useAppDispatch, useAppSelector } from '~/Redux/Hooks'
import { redirectConfig } from '~/Configs/endPoint'
import useDetectClickOutside from '~/Hooks/useDetectClickOutsite'
import { VerifyLogout } from '~/Redux/Users'
import { setPredictedPayload, setPredictedTeam, setPredictedUsers } from '~/Redux/Football/reducers'
import { openModalAuth } from '~/Redux/Modal/reducers'
import { useAuth } from '~/Context/AuthContext'
import { APP_CONSTANST } from '~/Configs/app'
import { useVerifyTokenQueries } from '~/React-Query/User'
const Header: React.FC = () => {
  const dispatch = useAppDispatch()
  const { data:user } = useVerifyTokenQueries()
  const isLoggedIn = useAppSelector((state) => state.users.isLoggedIn)
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)
  const [isOpenDropdownMobile, setIsOpenDropdownMobile] = useState(false)
  const { setCurrentComponent } = useAuth()

  const dropdownRef = useRef<HTMLDivElement>(null)
  const dropdownRefMobile = useRef<HTMLDivElement>(null)
  const handleToggleDropdown = (): void => {
    setIsOpenDropdown(!isOpenDropdown)
  }
  const handleToggleDropdownMobile = (): void => {
    setIsOpenDropdownMobile(!isOpenDropdownMobile)
  }
  const handleToggleAuth = (key: string): void => {
    switch (key) {
      case APP_CONSTANST.LOGIN_KEY:
        setCurrentComponent(APP_CONSTANST.LOGIN_KEY)
        break
      case APP_CONSTANST.REGISTER_KEY:
        setCurrentComponent(APP_CONSTANST.REGISTER_KEY)
        break

      default:
        setCurrentComponent(APP_CONSTANST.LOGIN_KEY)
        break
    }
    dispatch(openModalAuth())
  }

  useDetectClickOutside(dropdownRef, () => {
    if (isOpenDropdown) {
      setIsOpenDropdown(false)
    }
  })
  useDetectClickOutside(dropdownRefMobile, () => {
    if (isOpenDropdownMobile) {
      setIsOpenDropdownMobile(false)
    }
  })

  const handleLogout = async (): Promise<void> => {
    try {
      await dispatch(VerifyLogout())
      dispatch(setPredictedUsers(''))
      dispatch(setPredictedTeam({}))
      dispatch(setPredictedPayload([]))
    } catch (error) {
      console.error(error)
    } finally {
      setIsOpenDropdown(false)
      window.localStorage.clear()
      window.location.reload()
    }
  }

  return (
    <Fragment>
      <header className='home__container_header_pc'>
        <div className='home__container_header_pc-left'>
          <div className='home__container_header_pc-left_logo'>
            <a href={`${redirectConfig.Home}`} className='home__container_header_pc-left_logo_company'>
              <img src='image/oeg_logo.webp' alt='OEG LOGO' />
            </a>
            <div className='home__container_header_pc-left_logo_text'>
              <span>Special</span>
            </div>
            <div className='home__container_header_pc-right'>
              <div className='home__container_header_pc-right_logo'>
                <img src='/image/euro_2024.webp' alt='OEG LOGO' />
              </div>
            </div>
          </div>
        </div>

        {!isLoggedIn ? (
          <div className='home__container_header_pc_button'>
            <button
              className='home__container_header_pc_button_left'
              onClick={() => handleToggleAuth(APP_CONSTANST.LOGIN_KEY)}
            >
              <span>Đăng nhập</span>
            </button>
            <a href={`${redirectConfig.Profile}/register/?redirect_link=${redirectConfig.Euro}`}>
              <button className='home__container_header_pc_button_right'>
                <span>Tạo tài khoản</span>
              </button>
            </a>
          </div>
        ) : (
          <div className='home__container_header_pc_profile'>
            <div className='home__container_header_pc_profile_name'>
              <p className='home__container_header_pc_profile_name_text'>
                {user?.display_name ? user?.display_name : user?.username}
              </p>
              <span>
                <a href={`${redirectConfig.Profile}`}>PROFILE</a>
              </span>
            </div>

            <div className='home__container_header_pc_profile_avatar'>
              <a href={`${redirectConfig.Profile}`}>
                <div className='home__container_header_pc_profile_avatar_images'>
                  <img
                    src={
                      user?.avatar
                        ? `${user?.avatar}?w=100&q=100`
                        : 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg'
                    }
                    alt='avatar'
                  />
                </div>
              </a>
            </div>
            <div className='home__container_header_dropdown_container' ref={dropdownRef}>
              <div onClick={handleToggleDropdown}>
                <svg xmlns='http://www.w3.org/2000/svg' width='17' height='17' viewBox='0 0 17 17' fill='none'>
                  <g opacity='0.5'>
                    <path
                      d='M11.7568 5.10287H5.09016C4.84816 5.10287 4.62482 5.23421 4.50682 5.44621C4.38949 5.65821 4.39616 5.91754 4.52482 6.12287L7.85816 11.4562C7.98015 11.6509 8.19349 11.7695 8.42349 11.7695C8.65349 11.7695 8.86682 11.6509 8.98882 11.4562L12.3222 6.12287C12.4508 5.91754 12.4575 5.65821 12.3402 5.44621C12.2222 5.23421 11.9988 5.10287 11.7568 5.10287Z'
                      fill='white'
                    />
                  </g>
                </svg>
              </div>

              <div className={`home__container_header_dropdown_container_lists ${isOpenDropdown ? 'active' : ''}`}>
                <div className='home__container_header_dropdown_container_lists_item'>
                  <a href={`${redirectConfig.Profile}/settings`}>Tài khoản</a>
                </div>
                <div className='home__container_header_dropdown_container_lists_item'>
                  <a href={`${redirectConfig.Profile}/settings/password`}>Đổi mật khẩu</a>
                </div>
                <div className='home__container_header_dropdown_container_lists_item logout' onClick={handleLogout}>
                  <a>Đăng xuất</a>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
      <header className='home__container_header_mobile'>
        <div className='home__container_header_mobile_logo'>
          <a href={`${redirectConfig.Home}`}>
            <img src='/image/logo_mobile.webp' alt='OEG LOGO' />
          </a>
        </div>
        {!isLoggedIn ? (
          <button
            className='home__container_header_mobile_button'
            onClick={() => handleToggleAuth(APP_CONSTANST.LOGIN_KEY)}
          >
            <span>Tài khoản</span>
          </button>
        ) : (
          <div className='home__container_header_mobile_profile'>
            <div className='home__container_header_mobile_profile_avatar'>
              <a href={`${redirectConfig.Profile}`}>
                <div className='home__container_header_mobile_profile_avatar_images'>
                  <img
                    src={
                      user?.avatar
                        ? `${user?.avatar}?w=100&q=100`
                        : 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg'
                    }
                    alt='avatar'
                  />
                </div>
              </a>
            </div>
            <div className='home__container_header_dropdown_container' ref={dropdownRefMobile}>
              <div onClick={handleToggleDropdownMobile}>
                <svg xmlns='http://www.w3.org/2000/svg' width='17' height='17' viewBox='0 0 17 17' fill='none'>
                  <g opacity='0.5'>
                    <path
                      d='M11.7568 5.10287H5.09016C4.84816 5.10287 4.62482 5.23421 4.50682 5.44621C4.38949 5.65821 4.39616 5.91754 4.52482 6.12287L7.85816 11.4562C7.98015 11.6509 8.19349 11.7695 8.42349 11.7695C8.65349 11.7695 8.86682 11.6509 8.98882 11.4562L12.3222 6.12287C12.4508 5.91754 12.4575 5.65821 12.3402 5.44621C12.2222 5.23421 11.9988 5.10287 11.7568 5.10287Z'
                      fill='white'
                    />
                  </g>
                </svg>
              </div>

              <div
                className={`home__container_header_dropdown_container_lists ${isOpenDropdownMobile ? 'active' : ''}`}
              >
                <div className='home__container_header_dropdown_container_lists_item'>
                  <a href={`${redirectConfig.Profile}/settings`}>Tài khoản</a>
                </div>
                <div className='home__container_header_dropdown_container_lists_item'>
                  <a href={`${redirectConfig.Profile}/settings/password`}>Đổi mật khẩu</a>
                </div>
                <div className='home__container_header_dropdown_container_lists_item logout' onClick={handleLogout}>
                  <a>Đăng xuất</a>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </Fragment>
  )
}

export default Header
