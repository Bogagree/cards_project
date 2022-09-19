import React from 'react';
import incubator from '../../assets/img/Incubator_logo.png'
// import incubator from '/src/assets/img/Incubator_logo.png'
import style from '../Header/Header.module.css'

type HeaderPropsType = {
    isLoggedIn: boolean
}

export const Header: React.FC<HeaderPropsType> = (props) => {
    return (
        <div className={style.header}>
            <img src={incubator} alt="incubator logo"/>

            <div>
                {props.isLoggedIn ?
                <div>sign in</div>
                    : ''                }
            </div>

        </div>
    );
};

