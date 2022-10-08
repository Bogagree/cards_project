import React from 'react';

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
import avatar from '../../../../../assets/img/avatar.png';

export const HeaderMenu = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const userName = useAppSelector(state => state.auth.user.name);

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
            action: (): void => {
                dispatch(logoutTC());
                navigate(Path.LOGIN);
            },
        },
    ];

    return (
        <div className={styles.container}>
            <Typography className={styles.userName}>{userName}</Typography>
            <OptionalMenu menuItems={menuItems}>
                <Avatar alt="avatar" src={avatar} className={styles.avatar}/>
            </OptionalMenu>
        </div>
    )
}