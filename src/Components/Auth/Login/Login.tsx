import React, { Fragment, useEffect, useState } from 'react'
import Check from '~/Components/Icons/Check'
import styles from './styles.module.scss'
import { useAuth } from '~/Context/AuthContext'
import { SubmitHandler, UseFormReturn, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { HttpStatusCode } from '~/Constants/httpStatusCode.enum'
import { useAppDispatch, useAppSelector } from '~/Redux/Hooks'
import { closeModalAuth, closeModalSubmit } from '~/Redux/Modal/reducers'
import Eyes from '~/Components/Icons/Eyes'
import Eyes_Show from '~/Components/Icons/Eyes_Show'
import { useLoginMutation } from '~/React-Query/Auth'
import { redirectConfig } from '~/Configs/endPoint'
import { useCookieServices } from '~/Services/cookies/cookieServices'
import { useLocalStorage } from '~/Services/localStorage/localStorageService'
import { redirectToProfilePage } from '~/Utils/redirectUtils'

interface LoginFormInputs {
  username: string
  password: string
}

const Login: React.FC = () => {
  const { resetComponent, isLoading, setIsLoading } = useAuth()

  const dispatch = useAppDispatch()

  const [isFormValid, setIsFormValid] = useState(false)

  const [isChecked, setIsChecked] = useState(false)

  const [showPassword, setShowPassword] = useState(false)

  const loginMutation = useLoginMutation()

  const cookies: string | null = useCookieServices.getCookie('login_user')

  const cookies_parser: LoginFormInputs | null = cookies ? (JSON.parse(cookies) as LoginFormInputs) : null

  const predictedTeam = useAppSelector((state) => state.football.predictedTeam)

  const predictedBody = useAppSelector((state) => state.football.predictedBody)

  const predictedUser = useAppSelector((state) => state.football.predictedUsers)

  const isSetToLocalStorage = useAppSelector((state) => state.football.isSetLocalStorage)

  const isSetLocalSession = useAppSelector((state) => state.football.isSetLocalSession)

  const isSetMiniGameStorage = useAppSelector((state) => state.football.isMinigameStorage)

  const isSetMinigamePayload = useAppSelector((state) => state.football.isMiniGamePayload)

  const schema = yup.object().shape({
    username: yup
      .string()
      .required('Tài khoản không được để trống')
      .matches(/^[a-zA-Z0-9]{6,12}$/, 'Tài khoản phải có độ dài từ 6 đến 12 ký tự'),
    password: yup.string().required('Mật khẩu không được để trống').min(6, 'Mật khẩu có độ dài tối thiểu 6 kí tự')
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    defaultValues: {
      username: cookies_parser?.username || '',
      password: cookies_parser?.password || ''
    }
  }) as UseFormReturn<LoginFormInputs>

  const handleSuccessfulLogin = (data: LoginFormInputs | any) => {
    if (isChecked) {
      useCookieServices.setCookie('login_user', JSON.stringify(data), 30)
    }

    resetComponent()
    dispatch(closeModalAuth())
    dispatch(closeModalSubmit())
    document.body.classList.remove('no-scroll')
  }

  const handleErrorfulLogin = (message: string) => {
    setError('username', {
      message: message,
      type: 'server'
    })
    setError('password', {
      message: message,
      type: 'server'
    })
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  useEffect(() => {
    setIsFormValid(isValid)
  }, [isValid])

  const getInputClass = (name: keyof LoginFormInputs) => {
    if (errors[name]) {
      return styles.error
    }
    if (isFormValid) {
      return styles.success
    }
    return ''
  }

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    const updatedData = {
      ...data,
      username: data.username.toLowerCase()
    }

    try {
      setIsLoading(true)
      const response = await loginMutation.mutateAsync(updatedData)
      if (response.status === HttpStatusCode.Ok) {
        handleSuccessfulLogin(data)
      } else {
        handleErrorfulLogin(response.message)
      }
    } catch (error) {
      console.log('error', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggleCheckbox = () => {
    setIsChecked(!isChecked)
    useCookieServices.removeCookie('login_user')
  }

  useEffect(() => {
    if (cookies_parser) {
      setIsChecked(true)
    }
  }, [cookies_parser])

  const handleNavigate = () => {
    if (isSetToLocalStorage) {
      useLocalStorage.setLocalStorageData('predictedUsers', predictedUser)
      useLocalStorage.setLocalStorageData('predictedTeam', predictedTeam)
      useLocalStorage.setLocalStorageData('clientScroll', true)
    }

    if (isSetLocalSession) {
      useLocalStorage.setLocalStorageData('predictedScroll', true)
      useLocalStorage.setLocalStorageData('predictedTeamId', predictedBody.team_id.toString())
      useLocalStorage.setLocalStorageData('predictedTeamMatchId', predictedBody.fixture_id.toString())
      useLocalStorage.setLocalStorageData('predictedTeamKey', predictedBody.key)
    }
    if (isSetMiniGameStorage) {
      useLocalStorage.setLocalStorageData('miniGameScroll', true)
    }
    if (isSetMinigamePayload) {
      useLocalStorage.setLocalStorageData('miniGamePayload', isSetMinigamePayload)
    }
    redirectToProfilePage('register')
  }

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.Authentication_wrapper_container_form}>
        <div className={styles.Authentication_wrapper_container_group}>
          <div className={styles.Authentication_wrapper_container_group_form}>
            <div className={styles.Authentication_wrapper_container_group_form_controller}>
              <label htmlFor='username' className={styles.Authentication_wrapper_container_group_form_controller_label}>
                Username
              </label>
              <div
                className={`${styles.Authentication_wrapper_container_group_form_controller_input} ${getInputClass('username')}`}
              >
                <input
                  type='text'
                  id='username'
                  placeholder='Username'
                  {...register('username', { required: true })}
                  autoComplete='off'
                />

                {errors.username && errors.username.type !== 'server' && (
                  <p className={styles.Authentication_wrapper_container_group_form_controller_errors}>
                    {errors.username.message}
                  </p>
                )}
              </div>
            </div>
            <div className={styles.Authentication_wrapper_container_group_form_controller}>
              <label htmlFor='password' className={styles.Authentication_wrapper_container_group_form_controller_label}>
                Mật khẩu
              </label>
              <div
                className={`${styles.Authentication_wrapper_container_group_form_controller_input} ${getInputClass('password')}`}
              >
                <input
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  placeholder='Mật khẩu'
                  {...register('password', { required: true })}
                  autoComplete='off'
                />

                {errors.password && (
                  <p className={styles.Authentication_wrapper_container_group_form_controller_errors}>
                    {errors.password.message}
                  </p>
                )}

                <div
                  className={styles.Authentication_wrapper_container_group_form_controller_toggle}
                  onClick={handleShowPassword}
                >
                  {showPassword ? <Eyes_Show /> : <Eyes />}
                </div>
              </div>
            </div>

            <div className={styles.Authentication_wrapper_container_group_form_heplers}>
              <div
                className={styles.Authentication_wrapper_container_group_form_heplers_remember}
                onClick={handleToggleCheckbox}
              >
                {
                  <div
                    className={`${styles.Authentication_wrapper_container_group_form_heplers_remember_checkbox} ${isChecked ? styles.isChecked : ''}`}
                  >
                    {isChecked && <Check />}
                  </div>
                }
                <div className={styles.Authentication_wrapper_container_group_form_heplers_remember_text}>
                  Nhớ đăng nhập
                </div>
              </div>

              <div className={styles.Authentication_wrapper_container_group_form_heplers_text}>
                <a href={`${redirectConfig.Profile}/forgot-password/?redirect_link=${redirectConfig.Euro}`}>
                  Quên mật khẩu?
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.Authentication_wrapper_container_action}>
          <button className={styles.Authentication_wrapper_container_action_btn} type='submit'>
            {isLoading ? <p className='loading-indicator' /> : <span>Đăng nhập</span>}
          </button>

          <div className={styles.Authentication_wrapper_container_action_desc}>
            Bạn chưa có tài khoản? <a onClick={handleNavigate}>Đăng ký ngay</a>
          </div>
        </div>
      </form>
    </Fragment>
  )
}

export default Login
