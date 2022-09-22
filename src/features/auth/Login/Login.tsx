import React, {useEffect, useState} from 'react';
import styles from './Login.module.css'
import {useFormik} from "formik";
import {useSelector} from "react-redux";
import {AppStateType, useAppDispatch, useAppSelector} from "../../../app/store";
import {Link, useNavigate} from "react-router-dom";
import {loginTC} from "../auth-reducer";
import {Path} from "../../../common/enum/path";
import iconEye from '../../../assets/icons/iconEye.png'
import {CommonInputText} from "../../../common/InputText/CommonInputText";
import {CommonCheckbox} from "../../../common/Checkbox/CommonCheckbox";
import {Preloader} from "../../../common/Preloader/Preloader";
import {initializedTC} from "../../../app/app-reducer";

type RegistrationErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}

export const Login = () => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isLogged = useSelector((state: AppStateType) => state.auth.isLogged)
  const appStatus = useAppSelector(state => state.app.appStatus)
  const [showPassword, setShowPassword] = useState(false)

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const formik = useFormik({
    initialValues: {
      // email: 'nya-admin@nya.nya',
      // password: '1qazxcvBG',
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: (values) => {

      const errors: RegistrationErrorType = {}

      if (!values.email) {
        errors.email = 'Email is required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }

      if (!values.password) {
        errors.password = 'Password is required'
      } else if (values.password.length <= 7) {
        errors.password = 'Password should be more then 7 symbols'
      }
      return errors
    },
    onSubmit: values => {
      dispatch(loginTC(values.email, values.password, values.rememberMe))
      formik.resetForm()
    },
  });

  useEffect(() => {
    if (isLogged) {
      navigate(Path.PROFILE)
    }
  }, [isLogged])

  return (
    <div className={styles.wrapper}>
      {appStatus === 'loading' ? <Preloader/> :
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <h2 className={styles.title}>Sign in</h2>
        <div className={styles.inputWrapper}>
          <CommonInputText
            id={"email"}
            inputName={'Email'}
            type={"email"}
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email &&
            <div style={{color: "red"}}>{formik.errors.email}</div>}
        </div>
        <div className={styles.inputWrapper}>
          <CommonInputText
            inputName={"Password"}
            id={"password"}
            type={showPassword ? "text" : "password"}
            {...formik.getFieldProps('password')}
          />
          {formik.touched.password && formik.errors.password &&
            <div style={{color: "red"}}>{formik.errors.password}</div>}
          <img src={iconEye} className={styles.passwordIcon} alt={'icon'} onClick={handleShowPassword}/>
        </div>
        <div className={styles.checkboxWrapper}>
          <CommonCheckbox
            checked={formik.values.rememberMe}
            {...formik.getFieldProps('rememberMe')}
          >
            Remember me
          </CommonCheckbox>
        </div>
        <Link to={Path.FORGOT_PASSWORD} className={styles.linkForgotPassword}>Forgot Password?</Link>
        <button type="submit">Sign In</button>
        <span className={styles.text}>Already have an account?</span>
        <Link to={Path.REGISTRATION} className={styles.linkSignUp}>Sign Up</Link>
      </form>
      }
    </div>

  )
}