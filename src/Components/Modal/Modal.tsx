import React, { Fragment } from 'react'
import './Modal.scss'
import { useAppDispatch, useAppSelector } from '~/Redux/Hooks'
import { closeModalSubmit, openModalAuth } from '~/Redux/Modal/reducers'
import { redirectConfig } from '~/Configs/endPoint'
import { setPredictedTeam, setPredictedUsers } from '~/Redux/Football/reducers'
import Lottie from 'react-lottie'
import EuroLogoAnimation from '~/lotties/logo_euro.json'
import { useAuth } from '~/Context/AuthContext'
import { APP_CONSTANST } from '~/Configs/app'

const Modal: React.FC = () => {
  const dispatch = useAppDispatch()
  const { modalProps } = useAppSelector((state) => state.modal)
  const { setCurrentComponent } = useAuth()
  const handleCloseModal = () => {
    document.body.classList.remove('no-scroll')
    dispatch(closeModalSubmit())
    dispatch(setPredictedUsers(''))
    dispatch(setPredictedTeam({}))
  }

  const handleNavigate = () => {
    setCurrentComponent(APP_CONSTANST.LOGIN_KEY)
    dispatch(openModalAuth())
  }

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: EuroLogoAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <div className='modal_outer'>
      <div className='modal_outer_overlay' onClick={handleCloseModal}></div>
      <div className='modal_outer_container'>
        <div className='modal_outer_container_icon'>
          {modalProps.isSuccess && (
            <div className='modal_outer_container_icon_lottie'>
              <Lottie isClickToPauseDisabled={true} options={defaultOptions} />
            </div>
          )}
          {!modalProps.isSuccess && (
            <div className='modal_outer_container_icon_lottie'>
              <Lottie isClickToPauseDisabled={true} options={defaultOptions} />
            </div>
          )}
        </div>
        <p className='modal_outer_container_text'>{modalProps.message}</p>
        <div className='modal_outer_container_button'>
          {!modalProps.isLogin && !modalProps.isOutofTime && !modalProps.isVerifyEmail && (
            <>
              <button className='modal_outer_container_button_item' onClick={handleCloseModal}>
                <span>Để sau</span>
              </button>
              <a className='modal_outer_container_button_item_outer'>
                <button onClick={handleNavigate} className='modal_outer_container_button_item login'>
                  <span>Đăng nhập</span>
                </button>
              </a>
            </>
          )}
          {modalProps.isVerifyEmail && (
            <Fragment>
              <button className='modal_outer_container_button_item' onClick={handleCloseModal}>
                <span>Để sau</span>
              </button>
              <a
                className='modal_outer_container_button_item_outer'
                href={`${redirectConfig.Profile}/settings/personal/?redirect_link=${redirectConfig.Euro}`}
              >
                <button className='modal_outer_container_button_item login'>
                  <span>Xác thực ngay</span>
                </button>
              </a>
            </Fragment>
          )}

          {modalProps.isLogin && !modalProps.isOutofTime && !modalProps.isVerifyEmail && (
            <button className='modal_outer_container_button_item login' onClick={handleCloseModal}>
              <span>Hoàn thành</span>
            </button>
          )}
          {modalProps.isOutofTime && (
            <button className='modal_outer_container_button_item login' onClick={handleCloseModal}>
              <span>Đóng</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Modal
