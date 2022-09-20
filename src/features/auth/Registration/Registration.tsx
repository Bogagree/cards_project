import React from 'react';
import style from "./Registration.module.css"
import {sendPingDataTC} from "../auth-reducer";
import {useAppDispatch} from "../../../app/store";
import {RegistrationForm} from "./RegistrationForm/RegistrationForm";


export const Registration = () => {

    const dispatch = useAppDispatch()

    const pingOrLogOut = () => {
        dispatch(sendPingDataTC())
    };

    return (
        <>
            <div className={style.container}>
                <h2>Sign up</h2>
                <button onClick={pingOrLogOut}>ping</button>

                <RegistrationForm/>
            </div>
        </>
    );
};
