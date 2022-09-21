import React, {useEffect} from 'react';
import style from './Profile.module.css'
import avatar from '../../../assets/img/avatar.png';
import {EditableSpan} from './EditableSpan';
import {AppStateType, useAppDispatch, useAppSelector} from '../../../app/store';
import {changeUserTC, logoutTC} from '../auth-reducer';
import {useNavigate} from 'react-router-dom';
import {CommonButton} from "../../../common/Button/CommonButton";
import {useSelector} from 'react-redux';
import {Path} from '../../../common/enum/path';

export const Profile = () => {

    const user = useAppSelector(state => state.auth.user)
    const isLogged = useSelector((state: AppStateType) => state.auth.isLogged)
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const changeUser = (name: string) => {
        const thunk = changeUserTC(name)
        dispatch(thunk)
    }

    const logOutHandler = () => {
        dispatch(logoutTC())
    }

    useEffect(() => {
        if (!isLogged) {
            navigate(Path.LOGIN)
        }
    }, [isLogged])

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
