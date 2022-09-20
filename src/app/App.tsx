import React, {useEffect} from 'react';
import './App.module.css';
import {RoutesPage} from "../common/RoutesPages/RoutesPages";
import {Header} from "../Components/Header/Header";
import {useAppDispatch} from "./store";
import style from  './App.module.css'
import {authMeTC, logoutTC} from "../features/auth/auth-reducer";

export const App = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
         dispatch(authMeTC())
    }, [])


    const onClickHandler = () => {
        dispatch(logoutTC())
    }

    return (
        <div className={style.app}>
            <Header isLoggedIn={false}/>
            <h1>Cards project</h1>

            <button onClick={onClickHandler}>Log out</button>
            <RoutesPage/>
        </div>
    );
};