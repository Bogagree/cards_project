import React from 'react';
import {Navigate, NavLink, Route, Routes} from "react-router-dom";
import {Path} from "../../enum/path";
import {Login} from "../../../features/auth/Login/Login";
import {Registration} from "../../../features/auth/Registration/Registration";
import {Profile} from "../../../features/auth/Profile/Profile";
import {ForgotPassword} from "../../../features/forgot/ForgotPassword/ForgotPassword";
import {NewPassword} from "../../../features/forgot/NewPassword/NewPassword";
import {CheckEmail} from "../../../features/forgot/CheckEmail/CheckEmail";
import {Error404} from "../Error404/Error404";
import style from './RoutesPages.module.css'

export const RoutesPage = () => {
    const routes = [
        {path: Path.LOGIN, component: <Login/>},
        {path: Path.REGISTRATION, component: <Registration/>},
        {path: Path.PROFILE, component: <Profile/>},
        {path: Path.FORGOT_PASSWORD, component: <ForgotPassword/>},
        {path: Path.NEW_PASSWORD, component: <NewPassword/>},
        {path: Path.CHECK_EMAIL, component: <CheckEmail/>},
        {path: '*', component: <Error404/>},
    ]

    return (
        <div>
            <ul className={style.header}>
                {routes.map( ({path}) => <li><NavLink to={path} children={path}></NavLink></li>) }
            </ul>

            <Routes>
                <Route path={'/'} element={<Navigate to={Path.LOGIN}/>}/>
                {routes.map(({path, component}) => (
                    // что поставить в качестве key, пока поставил index, но думаю можно что-то еще?
                    <Route key={path} path={path} element={component}/>
                ))}
            </Routes>


        </div>
    )
}