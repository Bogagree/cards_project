import React, {useState} from 'react';

import Avatar from '@mui/material/Avatar/Avatar';
import Typography from '@mui/material/Typography/Typography';
import {useNavigate} from 'react-router-dom';

import styles from '../../Menu/HeaderMenu/HeaderMenu.module.css';

import logout from '../../../../../assets/icons/logout.svg'
import profile from '../../../../../assets/icons/profile.svg'
import {useAppDispatch, useAppSelector} from '../../../../../app/store';
import {Path} from '../../../../Enum/path';
import {logoutTC} from '../../../../../features/auth/auth-reducer';
import {OptionalMenu} from '../OptionalMenu/OptionalMenu';
import defaultAvatar from '../../../../../assets/img/defaultAvatar.png';

export const HeaderMenu = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.auth.user)

    const [isAvaBroken, setIsAvaBroken] = useState(false)

    const errorHandler = () => {
        setIsAvaBroken(true)
    }

    const menuItems = [
        {
            title: 'Profile',
            icon: profile,
            action: (): void => {
                navigate(Path.PROFILE);
            },
        },
        {
            title: 'Log out',
            icon: logout,
            action: async() => {
                await dispatch(logoutTC());
                navigate(Path.LOGIN);
            },
        },
    ];

    return (
        <div className={styles.container}>
            <Typography className={styles.userName}>{user.name}</Typography>
            <OptionalMenu menuItems={menuItems}>
                <Avatar alt="avatar" src={isAvaBroken ? defaultAvatar : user.avatar} className={styles.avatar} onError={errorHandler}/>
            </OptionalMenu>
        </div>
    )
}