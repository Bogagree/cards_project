import React from 'react';
import incubator from '../../assets/img/Incubator_logo.png'
import style from '../Header/Header.module.css'
import {CommonButton} from "../../common/Button/CommonButton";
import {useAppSelector} from '../../app/store';
import {Path} from '../../common/enum/path';
import {useNavigate} from 'react-router-dom';
import avatar from '../../assets/img/avatar.png';

export const Header = () => {
    const isLogged = useAppSelector(state => state.auth.isLogged)
    const user = useAppSelector(state => state.auth.user)
    const navigate = useNavigate();

    const signIntHandler = () => {
        navigate(Path.LOGIN)
    }

    return (
        <div className={style.header}>
            <img src={incubator} alt="incubator logo"/>

            <div>
                {isLogged
                    ? <div className={style.headerUser}>
                        <span className={style.headerName}>{user.name}</span>
                        <img className={style.headerAvatar} src={avatar} alt="avatar"/>
                    </div>
                    : <CommonButton onClick={signIntHandler} children={'Sign in'}/>
                }
            </div>

        </div>
    );
};

