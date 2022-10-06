import React from 'react';
import style from "./BackArrowButton.module.css";
import arrow from "../../../../../assets/icons/arrow.svg";
import {NavLink} from "react-router-dom";
import {useAppDispatch} from '../../../../../app/store';
import {setPacksParams} from '../../../../../features/packs/packs-reducer';

type BackArrowPropsType = {
    path: string
    title: string
}

export const BackArrowButton: React.FC<BackArrowPropsType> = ({path, title}) => {
    const dispatch = useAppDispatch()

    const reset = () => {
        dispatch(setPacksParams({pageCount: 5}))
    };

    return (
        <div className={style.profileBackBox}>
            <img className={style.profileBackArrow} src={arrow} alt="arrow"/>
            <NavLink to={path} className={style.profileBackText} onClick={reset}>{title}</NavLink>
        </div>
    );
};