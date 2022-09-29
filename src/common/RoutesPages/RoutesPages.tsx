import React, {useEffect} from 'react';
import {Navigate, NavLink, Route, Routes, useNavigate} from "react-router-dom";
import style from './RoutesPages.module.css'
import {Path} from "../enum/path";
import {Login} from "../../features/auth/Login/Login";
import {Registration} from "../../features/auth/Registration/Registration";
import {Profile} from "../../features/auth/Profile/Profile";
import {ForgotPassword} from "../../features/forgot/ForgotPassword/ForgotPassword";
import {NewPassword} from "../../features/forgot/NewPassword/NewPassword";
import {CheckEmail} from "../../features/forgot/CheckEmail/CheckEmail";
import {Error404} from "../Error404/Error404";
import {useSelector} from "react-redux";
import {AppStateType} from "../../app/store";
import {PacksListContainer} from "../../features/packs/PacksListContainer";
import {CardsContainer} from "../../features/cards/CardsContainer";

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
        {path: Path.CARDS, component: <CardsContainer/>},
        {path: Path.PACKS, component: <PacksListContainer/>},
        {path: '*', component: <Error404/>},
    ]

  useEffect(() => {
    if(!isLogged){
      navigate(Path.LOGIN)
    }
  },[])

    return (
        <div>
            <ul className={style.header}>
                {routes.map( ({path}, index) => <li key={index}><NavLink to={path} children={path} className={style.link}></NavLink></li>) }
            </ul>

            <Routes>
                {/*побаловаться и порадоваться ракете*/}
                {/*<Route path={'/'} element={<Navigate to={'*'}/>}/>*/}
                <Route path={'/'} element={<Navigate to={Path.LOGIN}/>}/>
                {routes.map(({path, component}) => (
                    <Route key={path} path={path} element={component}/>
                ))}
              <Route path={`${Path.PACKS}/:filter`} element={<PacksListContainer />} />
              <Route path={`${Path.CARDS}/:packId`} element={<CardsContainer />} />
            </Routes>

        </div>
    )
}