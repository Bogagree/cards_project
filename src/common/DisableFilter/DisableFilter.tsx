import React from 'react';
import style from './DisableFilter.module.css'
import disableFilters from '../../assets/img/DisableFilters.jpg'

export const DisableFilter = () => {
    return (
        <div className={style.container}>
            <img src={disableFilters} alt=" disableFilters " className={style.icon}/>
        </div>
    );
};