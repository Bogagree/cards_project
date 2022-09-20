import React from 'react';
import {CommonInputText} from "../../../common/InputText/CommonInputText";
import {CommonButton} from "../../../common/Button/CommonButton";
import style from "./Registration.module.css"
import {NavLink} from "react-router-dom";

export const Registration = () => {


    return (
        <div className={style.container}>
         <h2>Sign up</h2>
            <form action="" className={style.formContainer}>
                <CommonInputText
                    id={"email"}
                    inputName={'Email'}
                    type={"text"}
                />
                <CommonInputText
                    inputName={"Password"}
                    id={"password"}
                    type={"text"}
                />
                <CommonInputText
                    inputName={"Confirm password"}
                    id={"confirmPassword"}
                    type={"text"}
                />
                <CommonButton children={'Sign Up'} />

            </form>
            <NavLink to={'/'}>Already have an account?</NavLink>
            <NavLink to={'/'}>Sign in</NavLink>

        </div>
    );
};
