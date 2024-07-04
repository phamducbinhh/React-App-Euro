import React, { Fragment, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import Dropdown from '~/Components/Icons/Dropdown'
import { useAuth } from '~/Context/AuthContext'
import { APP_CONSTANST } from '~/Configs/app'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useAppDispatch } from '~/Redux/Hooks'
import { closeModalAuth, closeModalSubmit } from '~/Redux/Modal/reducers'
import { HttpStatusCode } from '~/Constants/httpStatusCode.enum'
import { useRegisterMutation } from '~/React-Query/Auth'

interface RegisterFormInputs {
  username: string
  password: string
  email: string
  birthday: Date
  phone: string
  gender: number
}

const Register: React.FC = () => {
  const dispatch = useAppDispatch()

  const { setCurrentComponent, resetComponent, isLoading, setIsLoading } = useAuth()

  const registerMutation = useRegisterMutation()

  const [isFormValid, setIsFormValid] = useState(false)

  const [toggleDropdown, setToggleDropdown] = useState(false)

  const [gender, setGender] = useState<{ id: number | null; gender: string }>({
    id: null,
    gender: 'Giới tính'
  })

  const genders = [
    {
      id: 1,
      gender: 'Nam'
    },
    {
      id: 2,
      gender: 'Nữ'
    },
    {
      id: 3,
      gender: 'Khác'
    }
  ]

  const schema = yup.object().shape({
    username: yup
      .string()
      .required('Tài khoản không được để trống')
      .matches(/^[a-z0-9]+$/, 'Tài khoản chỉ được chứa ký tự thường và số')
      .matches(/^[a-z0-9]{6,12}$/, 'Tài khoản phải có độ dài từ 6 đến 12 ký tự'),
    password: yup
      .string()
      .required('Mật khẩu không được để trống')
      .min(8, 'Mật khẩu có độ dài tối thiểu 8 kí tự')
      .matches(/[A-Z]/, 'Mật khẩu phải chứa ít nhất một chữ cái viết hoa')
      .matches(/[a-z]/, 'Mật khẩu phải chứa ít nhất một chữ cái viết thường')
      .matches(/\d/, 'Mật khẩu phải chứa ít nhất một chữ số')
      .matches(/[@$!%*?&#]/, 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt'),
    email: yup.string().required('Email không được để trống').email('Email không hợp lệ'),
    birthday: yup.date().required('Ngày sinh không được để trống').typeError('Ngày sinh không hợp lệ'),
    phone: yup
      .string()
      .required('Số điện thoại không được để trống')
      .matches(/^(?:\+84|0)(?:3[2-9]|5[689]|7[06-9]|8[1-9]|9[0-9])[0-9]{7}$/, 'Số điện thoại không hợp lệ')
      .min(10, 'Số điện thoại phải có ít nhất 10 chữ số')
      .max(11, 'Số điện thoại không được vượt quá 11 chữ số'),
    gender: yup.number().required('Giới tính không được để trống')
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    setValue
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    shouldFocusError: true
  })

  const getInputClass = (name: keyof RegisterFormInputs) => {
    if (errors[name]) {
      return styles.error
    }
    if (isFormValid) {
      return styles.success
    }
    return ''
  }

  const handleSuccessfulLogin = () => {
    resetComponent()
    dispatch(closeModalAuth())
    dispatch(closeModalSubmit())
    document.body.classList.remove('no-scroll')
  }

  const handleErrorfulLogin = (message: string) => {
    if (message.toLowerCase().includes('email')) {
      setError('email', {
        message: message
      })
    }
    if (message.toLowerCase().includes('tài khoản')) {
      setError('username', {
        message: message
      })
    }
  }

  const handleComponentChange = (component: 'login' | 'register') => {
    setCurrentComponent(component)
  }

  const handleDropdown = () => {
    setToggleDropdown(!toggleDropdown)
  }

  const handleSetGender = (gender: string, id: number) => {
    setGender({
      id: id,
      gender: gender
    })
    setValue('gender', id, { shouldValidate: true })
    setToggleDropdown(false)
  }

  useEffect(() => {
    setIsFormValid(isValid)
  }, [isValid])

  const formatDate = (date: Date) => {
    const year = date.getFullYear()
    const month = `0${date.getMonth() + 1}`.slice(-2)
    const day = `0${date.getDate()}`.slice(-2)
    return `${year}-${month}-${day}`
  }

  const formatRegisterData = (data: RegisterFormInputs) => {
    return {
      ...data,
      passwordConfirm: data.password,
      birthday: formatDate(new Date(data.birthday)) as any
    }
  }

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    const formattedData: RegisterFormInputs = formatRegisterData(data)

    try {
      setIsLoading(true)
      const response = await registerMutation.mutateAsync(formattedData)
      if (response.status === HttpStatusCode.Ok) {
        handleSuccessfulLogin()
      } else {
        handleErrorfulLogin(response.message)
      }
    } catch (error) {
      console.log('error', error)
    } finally {
      setIsLoading(false)
    }
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
                  id='username'
                  type='text'
                  placeholder='Username'
                  {...register('username', { required: true })}
                  autoComplete='off'
                />
                {errors.username && (
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
                  id='password'
                  type='password'
                  placeholder='Mật khẩu'
                  autoComplete='off'
                  {...register('password', { required: true })}
                />
                {errors.password && (
                  <p className={styles.Authentication_wrapper_container_group_form_controller_errors}>
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div className={styles.Authentication_wrapper_container_group_form_controller}>
              <label htmlFor='email' className={styles.Authentication_wrapper_container_group_form_controller_label}>
                Email
              </label>
              <div
                className={`${styles.Authentication_wrapper_container_group_form_controller_input} ${getInputClass('email')}`}
              >
                <input
                  id='email'
                  type='text'
                  placeholder='Email'
                  {...register('email', { required: true })}
                  autoComplete='off'
                />
                {errors.email && (
                  <p className={styles.Authentication_wrapper_container_group_form_controller_errors}>
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <div className={styles.Authentication_wrapper_container_group_form_controller}>
              <label htmlFor='phone' className={styles.Authentication_wrapper_container_group_form_controller_label}>
                Số điện thoại
              </label>
              <div
                className={`${styles.Authentication_wrapper_container_group_form_controller_input} ${getInputClass('phone')}`}
              >
                <input
                  id='phone'
                  type='text'
                  placeholder='Số điện thoại'
                  {...register('phone', { required: true })}
                  autoComplete='off'
                />
                {errors.phone && (
                  <p className={styles.Authentication_wrapper_container_group_form_controller_errors}>
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            <div className={styles.Authentication_wrapper_container_group_form_row}>
              <div className={styles.Authentication_wrapper_container_group_form_row_controller}>
                <label className={styles.Authentication_wrapper_container_group_form_row_controller_label}>
                  Giới tính
                </label>
                <div
                  className={`${styles.Authentication_wrapper_container_group_form_row_controller_dropdown} ${getInputClass(
                    'gender'
                  )}`}
                  onClick={handleDropdown}
                >
                  <span
                    className={`${styles.Authentication_wrapper_container_group_form_row_controller_dropdown_name}${getInputClass(
                      'gender'
                    )}`}
                  >
                    {gender.gender}
                  </span>
                  <span className={styles.Authentication_wrapper_container_group_form_row_controller_dropdown_icon}>
                    <Dropdown />
                  </span>
                  {/* dropdown list */}
                  {toggleDropdown && (
                    <ul className={styles.Authentication_wrapper_container_group_form_row_controller_dropdown_list}>
                      {genders.map((gender) => (
                        <li
                          key={gender.id}
                          onClick={() => handleSetGender(gender.gender, gender.id)}
                          className={
                            styles.Authentication_wrapper_container_group_form_row_controller_dropdown_list_item
                          }
                        >
                          <span>{gender.gender}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {/* error dropdown */}
                {errors.gender && (
                  <p className={styles.Authentication_wrapper_container_group_form_row_controller_errors}>
                    {errors.gender.message}
                  </p>
                )}
              </div>
              <div className={styles.Authentication_wrapper_container_group_form_row_controller}>
                <label className={styles.Authentication_wrapper_container_group_form_row_controller_label}>
                  Ngày sinh
                </label>
                <div
                  className={`${styles.Authentication_wrapper_container_group_form_controller_input} ${getInputClass('birthday')}`}
                >
                  <input type='date' placeholder='Ngày sinh' {...register('birthday', { required: true })} />
                  {errors.birthday && (
                    <p className={styles.Authentication_wrapper_container_group_form_controller_errors}>
                      {errors.birthday.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.Authentication_wrapper_container_group_form_heplers}>
              Bằng việc đăng ký, bạn đã đồng ý với <span>Chính Sách Bảo Mật Thông Tin</span> của OEG.
            </div>
          </div>
        </div>

        <div className={styles.Authentication_wrapper_container_action}>
          <button className={styles.Authentication_wrapper_container_action_btn} type='submit'>
            {isLoading ? <p className='loading-indicator' /> : <span>Đăng ký</span>}
          </button>

          <div className={styles.Authentication_wrapper_container_action_desc}>
            Bạn đã có tài khoản? <span onClick={() => handleComponentChange(APP_CONSTANST.LOGIN_KEY)}>Đăng nhập</span>
          </div>
        </div>
      </form>
    </Fragment>
  )
}

export default Register
