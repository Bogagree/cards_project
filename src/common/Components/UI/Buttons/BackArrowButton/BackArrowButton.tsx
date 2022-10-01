import React from 'react';
import style from "./BackArrowButton.module.css";
import arrow from "../../../../../assets/icons/arrow.svg";
import {NavLink} from "react-router-dom";

type BackArrowPropsType = {
    path:string
    title:string
}

export const BackArrowButton: React.FC<BackArrowPropsType> = ({path, title}) => {

    return (
        <div className={style.profileBackBox}>
            <img className={style.profileBackArrow} src={arrow} alt="arrow" />
            <NavLink to={path} className={style.profileBackText}>{title}</NavLink>
        </div>
    );
};