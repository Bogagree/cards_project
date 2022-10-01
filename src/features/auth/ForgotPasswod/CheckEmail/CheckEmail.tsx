import React from 'react';
import styles from './CheckEmail.module.css';
import {useNavigate} from 'react-router-dom';
import {Path} from '../../../../common/Enum/path';
import {useAppSelector} from '../../../../app/store';
import mail from '../../../../assets/icons/mail.svg';
import {Preloader} from "../../../../common/Components/UI/Preloader/Preloader";

export const CheckEmail = () => {
    const navigate = useNavigate()
    const appStatus = useAppSelector(state => state.app.appStatus)

    const loginHandler = () => {
        navigate(Path.LOGIN)
    }

    return (
        <>
            {appStatus === 'loading' ? <Preloader/> :
                <div className={styles.wrapper}>
                    <div className={styles.form}>
                        <h2 className={styles.title}>Check Email</h2>
                        <img src={mail} alt="mail"/>
                        <span className={styles.text}>We’ve sent an Email with instructions to example@mail.com</span>
                        <button onClick={loginHandler}>Back to login</button>
                    </div>
                </div>}
        </>
    );
};
