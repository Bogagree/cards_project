import React, {useEffect} from 'react';
import {Navigate, NavLink, Route, Routes, useNavigate} from "react-router-dom";
import style from './RoutesPages.module.css'
import {Path} from "../Enum/path";
import {Login} from "../../features/auth/Login/Login";
import {Registration} from "../../features/auth/Registration/Registration";
import {Profile} from "../../features/auth/Profile/Profile";
import {ForgotPassword} from "../../features/auth/ForgotPasswod/ForgotPassword/ForgotPassword";
import {NewPassword} from "../../features/auth/ForgotPasswod/NewPassword/NewPassword";
import {CheckEmail} from "../../features/auth/ForgotPasswod/CheckEmail/CheckEmail";
import {Error404} from "../Components/ErrorComponents/Error404/Error404";
import {useSelector} from "react-redux";
import {AppStateType} from "../../app/store";
import {Cards} from "../../features/cards/Cards";
import {Packs} from "../../features/packs/Packs";

export const RoutesPage = () => {

  const navigate = useNavigate()
  const isLogged = useSelector((state: AppStateType) => state.auth.isLogged)

    const routes = [
        {path: Path.LOGIN, component: <Login/>},
        {path: Path.REGISTRATION, component: <Registration/>},
        {path: Path.PROFILE, component: <Profile/>},
        {path: Path.FORGOT_PASSWORD, component: <ForgotPassword/>},
        {path: Path.NEW_PASSWORD, component: <NewPassword/>},
        {path: Path.CHECK_EMAIL, component: <CheckEmail/>},
        {path: Path.CARDS, component: <Cards/>},
        {path: Path.PACKS, component: <Packs/>},
        {path: '*', component: <Error404/>},
    ]

  useEffect(() => {
    if(!isLogged){
      navigate(Path.LOGIN)
    }
  },[])

    return (
        <div>
            <ul className={style.nav}>
                {routes.map( ({path}, index) => <li key={index}><NavLink to={path} children={path} className={style.link}></NavLink></li>) }
            </ul>

            <Routes>
                {/*побаловаться и порадоваться ракете*/}
                {/*<Route path={'/'} element={<Navigate to={'*'}/>}/>*/}
                <Route path={'/'} element={<Navigate to={Path.LOGIN}/>}/>
                {routes.map(({path, component}) => (
                    <Route key={path} path={path} element={component}/>
                ))}
              <Route path={`${Path.PACKS}/:packsUserId`} element={<Packs />} />
              <Route path={`${Path.CARDS}/:packId`} element={<Cards />} />
            </Routes>

        </div>
    )
}