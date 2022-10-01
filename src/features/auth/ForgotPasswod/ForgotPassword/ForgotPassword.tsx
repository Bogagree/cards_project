import React from 'react';
import styles from './ForgotPassword.module.css';
import {Link, useNavigate} from 'react-router-dom';
import {Path} from '../../../../common/Enum/path';
import {useFormik} from 'formik';
import {forgotTC} from '../../auth-reducer';
import {AppStateType, useAppDispatch, useAppSelector} from '../../../../app/store';
import {useSelector} from 'react-redux';
import {Preloader} from "../../../../common/Components/UI/Preloader/Preloader";
import {CommonInputText} from "../../../../common/Components/UI/InputText/CommonInputText";

type RegistrationErrorType = {
    email?: string
}

export const ForgotPassword = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const forgotPasswordSuccess = useSelector((state: AppStateType) => state.auth.forgotPasswordSuccess)
    const appStatus = useAppSelector(state => state.app.appStatus)

    const formik = useFormik({
        initialValues: {
            email: '',
            message: `<div style="background-color: lime; padding: 15px">
                        password recovery link: 
                       <a href='http://localhost:3000/#/set-new-password/$token$'>
                        link</a>
                        </div>`
        },
        validate: (values) => {

            const errors: RegistrationErrorType = {}

            if (!values.email) {
                errors.email = 'Email is required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(forgotTC(values))
            formik.resetForm()
        },
    });

    if (forgotPasswordSuccess) {
        navigate(Path.CHECK_EMAIL)
    }

    return (
        <>
            {appStatus === 'loading' ? <Preloader/> : ''}
                <div className={styles.wrapper}>
                    <form className={styles.form} onSubmit={formik.handleSubmit}>
                        <h2 className={styles.title}>Forgot your password?</h2>
                        <div className={styles.inputWrapper}>
                            <CommonInputText
                                id={'email'}
                                inputName={'Email'}
                                type={'email'}
                                {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email &&
                                <div style={{color: 'red'}}>{formik.errors.email}</div>}
                        </div>
                        <span className={styles.textP}>Enter your email address and we will send you further instructions </span>
                        <button type="submit">Send Instructions</button>
                        <span className={styles.text}>Did you remember your password?</span>
                        <Link to={Path.LOGIN} className={styles.linkSignIn}>Try logging in</Link>
                    </form>
                </div>
        </>
    );
};
