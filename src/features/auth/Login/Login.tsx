import React, {useEffect, useState} from 'react';
import styles from './Login.module.css'
import {useFormik} from "formik";
import {useSelector} from "react-redux";
import {AppStateType, useAppDispatch} from "../../../app/store";
import {Link, useNavigate} from "react-router-dom";
import {loginTC} from "../auth-reducer";
import {Path} from "../../../common/enum/path";
import iconEye from '../../../assets/icons/iconEye.png'

export const Login = () => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isLogged = useSelector((state: AppStateType) => state.auth.isLogged)
  const [showPassword, setShowPassword] = useState(false)

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const formik = useFormik({
    initialValues: {
      email: 'nya-admin@nya.nya',
      password: '1qazxcvBG',
      rememberMe: false,
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
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <h2 className={styles.title}>Sign in</h2>
        <div className={styles.inputWrapper}>
          <label htmlFor="email">email</label>
          <input
            id="email"
            name="email"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="password">password</label>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <img src={iconEye} className={styles.passwordIcon} alt={'icon'} onClick={handleShowPassword} />
        </div>

        <div className={styles.checkboxWrapper}>
          <input
            id="rememberMe"
            name="rememberMe"
            type="checkbox"
            checked={formik.values.rememberMe}
            onChange={formik.handleChange}
          />
          <label htmlFor="rememberMe">rememberMe</label>
        </div>

        <Link to={Path.FORGOT_PASSWORD} className={styles.linkForgotPassword}>Forgot Password?</Link>

        <button type="submit">Sign In</button>
        <span className={styles.text}>Already have an account?</span>
        <Link to={Path.REGISTRATION} className={styles.linkSignUp}>Sign Up</Link>
      </form>
    </div>
  );
};