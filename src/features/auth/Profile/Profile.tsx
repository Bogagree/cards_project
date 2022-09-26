import React from 'react';
import style from './Profile.module.css'
import avatar from '../../../assets/img/avatar.png';
import {EditableSpan} from './EditableSpan';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {changeUserTC, logoutTC} from '../auth-reducer';
import {useNavigate} from 'react-router-dom';
import {CommonButton} from "../../../common/Button/CommonButton";
import {Path} from "../../../common/enum/path";
import {Preloader} from "../../../common/Preloader/Preloader";
import arrow from '../../../assets/icons/arrow.svg';

export const Profile = () => {

    const user = useAppSelector(state => state.auth.user)
    const isLogged = useAppSelector(state => state.auth.isLogged);
    const appStatus = useAppSelector(state => state.app.appStatus)
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const changeUser = (name: string) => {
        dispatch(changeUserTC(name))
    }

    const logOutHandler = () => {
        dispatch(logoutTC())
    }

        if (!isLogged) {
            navigate(Path.LOGIN)
        }

    return (
        <>
            {appStatus === 'loading' ? <Preloader/> :
                <div className={style.profileContainer}>
                    <div className={style.profileBackBox}>
                        <img className={style.profileBackArrow} src={arrow} alt="arrow" />
                        <div className={style.profileBackText}>Back to Packs List</div>
                    </div>
                    <div className={style.profileBox}>
                        <p className={style.profileTitle}>Personal Information</p>
                        <img className={style.profileAvatar} src={avatar} alt="avatar"/>
                        <EditableSpan value={user.name} onChange={changeUser}/>
                        <div className={style.profileEmail}>{user.email}</div>
                        <CommonButton onClick={logOutHandler} children={'Log out'}/>
                    </div>
                </div>}
        </>
    );
};
