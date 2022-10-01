import React, {useState} from 'react';
import styles from './NewPassword.module.css';
import {useNavigate, useParams} from 'react-router-dom';
import {Path} from '../../../../common/Enum/path';
import {useFormik} from 'formik';
import {newPasswordTC} from '../../auth-reducer';
import {AppStateType, useAppDispatch, useAppSelector} from '../../../../app/store';
import {useSelector} from 'react-redux';
import iconEye from '../../../../assets/icons/iconEye.png';
import {Preloader} from "../../../../common/Components/UI/Preloader/Preloader";
import {CommonInputText} from "../../../../common/Components/UI/InputText/CommonInputText";

type RegistrationErrorType = {
    password?: string
}

export const NewPassword = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const newPasswordSuccess = useSelector((state: AppStateType) => state.auth.newPasswordSuccess)
    const appStatus = useAppSelector(state => state.app.appStatus)
    const [showPassword, setShowPassword] = useState(false)

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    let {token} = useParams()
console.log(token)
    const formik = useFormik({
        initialValues: {
            password: '',
            resetPasswordToken: token
        },
        validate: (values) => {

            const errors: RegistrationErrorType = {}

            if (!values.password) {
                errors.password = 'Password is required'
            } else if (values.password.length <= 7) {
                errors.password = 'Password should be more then 7 symbols'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(newPasswordTC(values))
            formik.resetForm()
        },
    });

    if(newPasswordSuccess) {
        navigate(Path.LOGIN)
    }

    return (
        <>
            {appStatus === 'loading' ? <Preloader/> :
                <div className={styles.wrapper}>
                    <form className={styles.form} onSubmit={formik.handleSubmit}>
                        <h2 className={styles.title}>Create new password</h2>
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
                        <span className={styles.textP}>Create new password and we will send you further instructions to email</span>
                        <button type="submit">Create new password</button>
                    </form>
                </div>}
        </>
    );
};
