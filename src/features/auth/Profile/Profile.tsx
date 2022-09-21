import React from 'react';
import style from './Profile.module.css'
import avatar from '../../../assets/img/avatar.png';
import {EditableSpan} from './EditableSpan';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {changeUserTC, logoutTC} from '../auth-reducer';
import {useNavigate} from 'react-router-dom';
import {CommonButton} from "../../../common/Button/CommonButton";

export const Profile = () => {

    const user = useAppSelector(state => state.auth.user)
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const changeUser = (name: string) => {
        const thunk = changeUserTC(name)
        dispatch(thunk)
    }

    const logOutHandler = () => {
        dispatch(logoutTC())
        navigate('/login');
    }

    return (
        <div className={style.profileContainer}>
            <div className={style.profileBox}>
                <p className={style.profileTitle}>Personal Information</p>
                <img className={style.profileAvatar} src={avatar} alt="avatar"/>
                <EditableSpan value={user.name} onChange={changeUser}/>
                <div className={style.profileEmail}>{user.email}</div>
                <CommonButton onClick={logOutHandler} children={'Log out'}/>
            </div>
        </div>
    );
};
