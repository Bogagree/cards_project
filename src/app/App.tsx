import React, {useEffect} from 'react';
import './App.module.css';
import {RoutesPage} from "../common/RoutesPages/RoutesPages";
import {Header} from "../Components/Header/Header";
import {useAppDispatch} from "./store";
import style from  './App.module.css'

function App() {

    const dispatch = useAppDispatch()

    useEffect(() => {
         // dispatch( loginTC())
    }, [])

    return (
        <div className={style.app}>
            <Header isLoggedIn={false}/>
            <h1>Cards project</h1>
            <RoutesPage/>
        </div>
    );
}

export default App;