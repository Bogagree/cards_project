import React, {useEffect} from 'react';
import './App.module.css';
import {RoutesPage} from "../common/RoutesPages/RoutesPages";
import {Header} from "../components/Header/Header";
import {useAppDispatch, useAppSelector} from "./store";
import style from './App.module.css'
import {Preloader} from "../common/Preloader/Preloader";
import {initializedTC} from "./app-reducer";
import {ErrorSnackbar} from "../common/ErrorSnackbar/ErrorSnackbar";

export const App = () => {

    const isInitialized = useAppSelector(state => state.app.isInitialized);

    const dispatch = useAppDispatch()

    useEffect(() => {
            dispatch(initializedTC());
    }, []);

    if (!isInitialized) {
        return (
            <div>
                <Preloader />
            </div>
        );
    }

    return (
        <div className={style.app}>
            <Header/>
            <h1>Cards project</h1>
            <ErrorSnackbar/>
            <RoutesPage/>
        </div>
    );
};