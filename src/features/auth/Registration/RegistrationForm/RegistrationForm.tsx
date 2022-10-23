import React from 'react';
import style from "./RegistrationForm.module.css";
import {CommonButton} from "../../../../common/Components/UI/Buttons/Button/CommonButton";
import {NavLink} from "react-router-dom";
import {useFormik} from "formik";
import {registrationTC} from "../../auth-reducer";
import {useAppDispatch} from "../../../../app/store";
import {CommonInputText} from "../../../../common/Components/UI/InputText/CommonInputText";

type RegistrationErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}

export const RegistrationForm = () => {

    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },

        validate: (values) => {

            const errors: RegistrationErrorType = {}

            if (!values.confirmPassword) {
                errors.confirmPassword = 'confirm you password'
            } else if (values.confirmPassword !== values.password) {
                errors.confirmPassword = 'Password doesn\'t match'
            }

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
            const data = {email:values.email, password:values.password}
            dispatch(registrationTC(data))
            formik.resetForm()
        },
    })

    return (
        <div className={style.registrationContainer}>
            <form
                className={style.formContainer}
                onSubmit={formik.handleSubmit}
            >
                <CommonInputText
                    id={"email"}
                    inputName={'Email'}
                    type={"email"}
                    {...formik.getFieldProps('email')}
                />

                {formik.touched.email && formik.errors.email &&
                    <div style={{color: "red"}}>{formik.errors.email}</div>}

                <CommonInputText
                    inputName={"Password"}
                    id={"password"}
                    type={"password"}
                    {...formik.getFieldProps('password')}
                />

                {formik.touched.password && formik.errors.password &&
                    <div style={{color: "red"}}>{formik.errors.password}</div>}

                <CommonInputText
                    inputName={"Confirm password"}
                    id={"confirmPassword"}
                    type={"password"}
                    {...formik.getFieldProps('confirmPassword')}
                />
                {formik.touched.password && formik.errors.confirmPassword &&
                    <div style={{color: "red"}}>{formik.errors.confirmPassword}</div>}

                <CommonButton children={'Sign Up'}
                              type={'submit'}
                />
            </form>

            <p>Already have an account?</p>
            <NavLink to={'/login'}>Sign in</NavLink>
        </div>
    );
};