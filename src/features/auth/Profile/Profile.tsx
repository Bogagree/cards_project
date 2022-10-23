import React, {ChangeEvent, useRef, useState} from 'react';
import style from './Profile.module.css'
import defaultAvatar from '../../../assets/img/defaultAvatar.png';
import photoicon from '../../../assets/icons/photoicon.svg';
import logout from '../../../assets/icons/logout.svg';
import {EditableSpan} from './EditableSpan';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {changeUserTC, logoutTC} from '../auth-reducer';
import {useNavigate} from 'react-router-dom';
import {CommonButton} from '../../../common/Components/UI/Buttons/Button/CommonButton';
import {Path} from '../../../common/Enum/path';
import {BackArrowButton} from '../../../common/Components/UI/Buttons/BackArrowButton/BackArrowButton';
import {Preloader} from '../../../common/Components/UI/Preloader/Preloader';

export const Profile = () => {

    const user = useAppSelector(state => state.auth.user)
    const isLogged = useAppSelector(state => state.auth.isLogged);
    const appStatus = useAppSelector(state => state.app.appStatus)
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const [isAvaBroken, setIsAvaBroken] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null)

    const selectFileHandler = () => {
        inputRef && inputRef.current?.click();
    };

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            if (file.size < 4000000) {
                convertFileToBase64(file, (file64: string) => {
                    dispatch(changeUserTC({avatar: file64}))
                })
            } else {
                console.error('Error: ', 'Файл слишком большого размера')
            }
        }
    };

    const convertFileToBase64 = (
        file: File,
        callBack: (value: string) => void
    ) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const file64 = reader.result as string
            callBack(file64)
        }
        reader.readAsDataURL(file)
    }

    const errorHandler = () => {
        setIsAvaBroken(true)
    }

    const changeUser = (name: string) => {
        dispatch(changeUserTC({name}))
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

                        <h2 className={style.profileTitle}>Personal Information</h2>
                        <div className={style.profileAvatarBox}>
                            <img className={style.profileAvatar} src={isAvaBroken ? defaultAvatar : user.avatar}
                                 alt="avatar" onError={errorHandler}/>
                            <div className={style.photoButton} onClick={selectFileHandler}>
                                <img src={photoicon} alt="photoicon"/>
                            </div>

                            <input style={{display: 'none'}}
                                   ref={inputRef}
                                   type="file"
                                   accept="image/*"
                                   onChange={uploadHandler}
                            />

                        </div>
                        <EditableSpan value={user.name} onChange={changeUser}/>
                        <div className={style.profileEmail}>{user.email}</div>
                        <CommonButton onClick={logOutHandler}>
                            <img src={logout} alt="logout"/>Log out
                        </CommonButton>
                    </div>
                </div>}
        </>
    );
};
