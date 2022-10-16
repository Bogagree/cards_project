import React from 'react';
import logo from '../../../../assets/img/Logo3.png'
import style from './Header.module.css'
import {CommonButton} from "../Buttons/Button/CommonButton";
import {useAppSelector} from '../../../../app/store';
import {Path} from '../../../Enum/path';
import {useNavigate} from 'react-router-dom';
import {HeaderMenu} from '../Menu/HeaderMenu/HeaderMenu';

export const Header = () => {

    const isLogged = useAppSelector(state => state.auth.isLogged)
    const navigate = useNavigate();

    const signIntHandler = () => {
        navigate(Path.LOGIN)
    }

    return (
        <div className={style.header}>
            <img src={logo} alt="incubator logo" className={style.logo}/>

            <div>
                {isLogged
                    ? <div className={style.headerUser}>
                        <HeaderMenu/>
                    </div>
                    : <CommonButton onClick={signIntHandler} children={'Sign in'}/>
                }
            </div>

        </div>
    );
};

