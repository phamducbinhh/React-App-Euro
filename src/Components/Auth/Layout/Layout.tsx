import React from 'react'
import styles from './styles.module.scss'
import Google from '~/Components/Icons/Google'
import Facebook from '~/Components/Icons/Facebook'
import Logo from '~/Components/Icons/Logo'
import { useAuth } from '~/Context/AuthContext'
import { useAppDispatch } from '~/Redux/Hooks'
import { closeModalAuth, closeModalSubmit } from '~/Redux/Modal/reducers'
import { API_CONFIGS } from '~/Configs/endPoint'
import { useLoginFacebookMutation, useLoginGoogleMutation } from '~/React-Query/Auth'
import { HttpStatusCode } from '~/Constants/httpStatusCode.enum'
const Layout: React.FC<any> = ({ children }) => {
  const dispatch = useAppDispatch()

  const { resetComponent, setIsLoading } = useAuth()

  const loginGoogleMutation = useLoginGoogleMutation()
  const loginFacebookMutation = useLoginFacebookMutation()

  const handleToggleAuth = (): void => {
    dispatch(closeModalAuth())
    resetComponent()
  }

  const handleSuccessfulLogin = () => {
    resetComponent()
    dispatch(closeModalAuth())
    dispatch(closeModalSubmit())
    document.body.classList.remove('no-scroll')
  }

  const loadSDK = async (src: string): Promise<void> => {
    const scriptOld = document.head.querySelectorAll(`[src="${src}"]`)
    if (scriptOld.length > 0) {
      return
    }
    await new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = src
      script.onload = resolve
      document.body.append(script)
    })
  }

  const HandleResponseGoole = async (token: string): Promise<any> => {
    try {
      setIsLoading(true)
      const response = await loginGoogleMutation.mutateAsync({ token })
      if (response.status === HttpStatusCode.Ok) {
        handleSuccessfulLogin()
      } else {
        console.log('error')
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCredentialResponse = async (response: any): Promise<any> => {
    await HandleResponseGoole(response.access_token)
  }

  const HandleLoginGooleSubmit = async (): Promise<void> => {
    await loadSDK('https://accounts.google.com/gsi/client')
    const client = google.accounts.oauth2.initTokenClient({
      client_id:
        API_CONFIGS.private_key_google,
      scope: 'email profile openid',
      ux_mode: 'popup',
      include_granted_scopes: true,
      callback: handleCredentialResponse
    })
    client.requestAccessToken()
  }

  const HandleResponseFacebook = async (response: any): Promise<any> => {
    const { accessToken } = response.authResponse

    if (!accessToken) {
      console.error('Bạn đã tắt popup hoặc đăng nhập không hợp lệ.')
      return
    }
    try {
      setIsLoading(true)
      const response = await loginFacebookMutation.mutateAsync({ token: accessToken })
      if (response.status === HttpStatusCode.Ok) {
        handleSuccessfulLogin()
      } else {
        console.log('error')
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const HandleLoginFacebookSubmit = async (): Promise<void> => {
    await loadSDK('https://connect.facebook.net/en_US/sdk.js')
    window.fbAsyncInit = function () {
      FB.init({
        appId: API_CONFIGS.private_key_facebook,
        status: false,
        cookie: false,
        xfbml: true,
        version: 'v15.0'
      })
    }
    try {
      FB.getLoginStatus((response: any) => {
        if (response.status === 'connected') {
          HandleResponseFacebook(response)
        } else {
          FB.login((response: any) => {
            HandleResponseFacebook(response)
          })
        }
      })
    } catch (e: any) {
      console.error(e)
      throw e
    }
  }

  return (
    <div className={styles.Authentication_wrapper}>
      <div className={styles.Authentication_wrapper_overlay} onClick={handleToggleAuth}></div>
      <div className={styles.Authentication_wrapper_container}>
        {/* header layout */}
        <div className={styles.Authentication_wrapper_container_heading}>
          <div className={styles.Authentication_wrapper_container_heading_logo}>
            <div className={styles.Authentication_wrapper_container_heading_logo_icon}>
              <Logo />
            </div>
            <div className={styles.Authentication_wrapper_container_heading_logo_close} onClick={handleToggleAuth}>
              <img src='image/XIcon.webp' alt='OEG IMAGE' />
            </div>
          </div>
          <div className={styles.Authentication_wrapper_container_heading_logo}>
            <p>Đăng nhập</p>
          </div>
        </div>

        {/* dynamic component */}

        {children}

        {/* footer layout */}
        <div className={styles.Authentication_wrapper_container_footer}>
          <div className={styles.Authentication_wrapper_container_footer_desc}>
            <p>Hoặc đăng nhập bằng</p>
          </div>
          <div className={styles.Authentication_wrapper_container_footer_action}>
            <button
              className={styles.Authentication_wrapper_container_footer_action_btn}
              onClick={HandleLoginGooleSubmit}
            >
              <span>
                <Google />
              </span>
              <span>Google</span>
            </button>
            <button
              className={styles.Authentication_wrapper_container_footer_action_btn}
              onClick={HandleLoginFacebookSubmit}
            >
              <span>
                <Facebook />
              </span>
              <span>Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
