import React, {useEffect} from 'react';
import './App.module.css';
import {RoutesPage} from "../common/RoutesPages/RoutesPages";
import {Header} from "../Components/Header/Header";
import {useAppDispatch, useAppSelector} from "./store";
import style from './App.module.css'
import {Preloader} from "../common/Preloader/Preloader";
import {initializedTC} from "./app-reducer";
import {ErrorSnackbar} from "../common/ErrorSnackbar/ErrorSnackbar";

export const App = () => {

    const isInitialized = useAppSelector(state => state.app.isInitialized);
    const isLogged = useAppSelector(state => state.auth.isLogged);

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isLogged) {
            dispatch(initializedTC());
        }
    }, [isLogged]);

    if (!isInitialized) {
        return (
            <div>
                <Preloader />
            </div>
        );
    }

    return (
        <div className={style.app}>
            <Header isLoggedIn={false}/>
            <h1>Cards project</h1>
            <ErrorSnackbar/>
            <RoutesPage/>
        </div>
    );
};