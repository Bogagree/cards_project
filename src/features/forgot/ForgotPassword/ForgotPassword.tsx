import React from 'react';
import {Preloader} from '../../../common/Preloader/Preloader';
import styles from './ForgotPassword.module.css';
import {CommonInputText} from '../../../common/InputText/CommonInputText';
import {Link, useNavigate} from 'react-router-dom';
import {Path} from '../../../common/enum/path';
import {useFormik} from 'formik';
import {loginTC} from '../../auth/auth-reducer';
import {AppStateType, useAppDispatch, useAppSelector} from '../../../app/store';
import {useSelector} from 'react-redux';

type RegistrationErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const ForgotPassword = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isLogged = useSelector((state: AppStateType) => state.auth.isLogged)
    const appStatus = useAppSelector(state => state.app.appStatus)

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
            dispatch(loginTC(values))
            formik.resetForm()
        },
    });

    return (
        <>
            {appStatus === 'loading' ? <Preloader/> :
                <div className={styles.wrapper}>
                    <form className={styles.form} onSubmit={formik.handleSubmit}>
                        <h2 className={styles.title}>Forgot your password?</h2>
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
                        <span className={styles.textP}>Enter your email address and we will send you further instructions </span>
                        <button type="submit">Send Instructions</button>
                        <span className={styles.text}>Did you remember your password?</span>
                        <Link to={Path.LOGIN} className={styles.linkSignIn}>Try logging in</Link>
                    </form>
                </div>}
        </>
    );
};
