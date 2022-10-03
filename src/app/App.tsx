import React, {useEffect} from 'react';
import './App.module.css';
import {RoutesPage} from "../common/RoutesPage/RoutesPages";
import {Header} from "../common/Components/UI/Header/Header";
import {useAppDispatch, useAppSelector} from "./store";
import style from './App.module.css'
import {initializedTC} from "./app-reducer";
import {ErrorSnackbar} from "../common/Components/ErrorComponents/ErrorSnackbar/ErrorSnackbar";
import {Preloader} from "../common/Components/UI/Preloader/Preloader";

export const App = () => {

    const isInitialized = useAppSelector(state => state.app.isInitialized);

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializedTC());
    }, []);

    if (!isInitialized) {
        return (
            <div>
                <Preloader/>
            </div>
        );
    }

    return (
        <div className={style.app}>
            <Header/>
            <h1>Cards project</h1>
            <ErrorSnackbar/>
            <div className={style.wrapper}>
                <RoutesPage/>
            </div>


        </div>
    );
};