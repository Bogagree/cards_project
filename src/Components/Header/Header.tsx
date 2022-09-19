import React from 'react';
import incubator from '../../assets/img/Incubator_logo.png'
import style from '../Header/Header.module.css'
import {CommonButton} from "../../common/c2-SuperButton/CommonButton";


type HeaderPropsType = {
    isLoggedIn: boolean
}

export const Header: React.FC<HeaderPropsType> = (props) => {
    return (
        <div className={style.header}>
            <img src={incubator} alt="incubator logo"/>

            <div>
                {props.isLoggedIn
                    ? ''
                    : <CommonButton children={'Sign in'}/>              }
            </div>

        </div>
    );
};

