import React from 'react';
import style from "./Registration.module.css"
import {sendPingDataTC} from "../auth-reducer";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {RegistrationForm} from "./RegistrationForm/RegistrationForm";
import {Path} from "../../../common/enum/path";
import {Navigate} from "react-router-dom";


export const Registration = () => {

    const dispatch = useAppDispatch()
    const isRegistered = useAppSelector(state => state.auth.isRegistered)
console.log(isRegistered)
    const pingOrLogOut = () => {
        dispatch(sendPingDataTC())
    };

    if (isRegistered) {
        return <Navigate to={Path.PROFILE}/>;
    }

    return (
        <>
            <div className={style.registration}>
                <h2>Sign up</h2>
                <button onClick={pingOrLogOut}>ping</button>
                <RegistrationForm/>
            </div>
        </>
    );
};
