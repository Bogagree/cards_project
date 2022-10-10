import React, {useState} from 'react';
import styles from './Login.module.css'
import {useFormik} from "formik";
import {useSelector} from "react-redux";
import {AppStateType, useAppDispatch, useAppSelector} from "../../../app/store";
import {Link, Navigate} from "react-router-dom";
import {loginTC} from "../auth-reducer";
import {Path} from "../../../common/Enum/path";
import iconEye from '../../../assets/icons/iconEye.png'
import {Preloader} from "../../../common/Components/UI/Preloader/Preloader";
import {CommonInputText} from "../../../common/Components/UI/InputText/CommonInputText";
import {CommonCheckbox} from "../../../common/Components/UI/Checkbox/CommonCheckbox";

type RegistrationErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {

    const dispatch = useAppDispatch()
    const isLogged = useSelector((state: AppStateType) => state.auth.isLogged)
    const appStatus = useAppSelector(state => state.app.appStatus)
    const [showPassword, setShowPassword] = useState(false)

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const formik = useFormik({
        initialValues: {
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
            dispatch(loginTC(values))
            formik.resetForm()
        },
    });

  if(isLogged){
    return <Navigate to={Path.PROFILE} />
  }

    return (
        <>
            {appStatus === 'loading' ? <Preloader/> :
                <div className={styles.wrapper}>
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
                            <img src={iconEye} className={styles.passwordIcon} alt={'icon'}
                                 onClick={handleShowPassword}/>
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
                </div>}
        </>
    )
}