import React from 'react';
import style from './Profile.module.css'
import avatar from '../../../assets/img/avatar.png';
import pencil from '../../../assets/icons/pencil.svg';
import {CommonButton} from "../../../common/Button/CommonButton";
import {logoutTC} from "../auth-reducer";
import {useAppDispatch} from "../../../app/store";


export const Profile = () => {
    const dispatch = useAppDispatch()

    const onClickHandler = () => {
        dispatch(logoutTC())
    }

    return (
        <div className={style.profileContainer}>
            <div className={style.profileBox}>
                <p className={style.profileTitle}>Personal Information</p>
                <img className={style.profileAvatar} src={avatar} alt="avatar"/>
                <div className={style.profileNameBox}>
                    <div className={style.profileName}>Ivan</div>
                    <img className={style.profilePencil} src={pencil} alt="pencil"/>
                </div>
                <div className={style.profileEmail}>j&johnson@gmail.com</div>
                <CommonButton children={'Log out'} onClick={onClickHandler}/>
            </div>
        </div>
    );
};
