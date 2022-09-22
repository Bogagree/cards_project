import React, {useEffect} from 'react';
import style from './Profile.module.css'
import avatar from '../../../assets/img/avatar.png';
import {EditableSpan} from './EditableSpan';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {changeUserTC, logoutTC} from '../auth-reducer';
import {useNavigate} from 'react-router-dom';
import {CommonButton} from "../../../common/Button/CommonButton";
import {Path} from "../../../common/enum/path";
import {initializedTC} from "../../../app/app-reducer";

export const Profile = () => {

    const user = useAppSelector(state => state.auth.user)
    const isLogged = useAppSelector(state => state.auth.isLogged);
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const changeUser = (name: string) => {
        const thunk = changeUserTC(name)
        dispatch(thunk)
    }

    const logOutHandler = () => {
        dispatch(logoutTC())
        // navigate(Path.LOGIN)
    }

    console.log(isLogged)

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
