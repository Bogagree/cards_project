import React from 'react';
import style from './DisableFilter.module.css'
import disableFilters from '../../../../assets/img/DisableFilters.jpg'

export const DisableFilter = () => {

    const onClickHandler = () => {
        window.location.reload();
    };

    return (
        <div className={style.container} onClick={onClickHandler}>
            <img src={disableFilters} alt=" disableFilters " className={style.icon}/>
        </div>
    );
};