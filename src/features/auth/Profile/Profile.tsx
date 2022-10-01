import React from 'react';
import style from './Profile.module.css'
import avatar from '../../../assets/img/avatar.png';
import {EditableSpan} from './EditableSpan';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {changeUserTC, logoutTC} from '../auth-reducer';
import {useNavigate} from 'react-router-dom';
import {CommonButton} from "../../../common/Components/UI/Buttons/Button/CommonButton";
import {Path} from "../../../common/Enum/path";
import {BackArrowButton} from "../../../common/Components/UI/Buttons/BackArrowButton/BackArrowButton";
import {Preloader} from "../../../common/Components/UI/Preloader/Preloader";

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

                    <BackArrowButton path={Path.PACKS} title={'Back to Packs list'}/>

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
