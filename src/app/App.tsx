import React, {useEffect} from 'react';
import './App.css';
import {RoutesPage} from "../common/RoutesPages/RoutesPages";
import {Header} from "../Components/Header/Header";
import {loginTC} from "../features/auth/auth-reducer";
import {useAppDispatch} from "./store";

function App() {

    const dispatch = useAppDispatch()

    useEffect(() => {
         dispatch( loginTC())
    }, [])

    return (
        <div className="App">
            <Header isLoggedIn={false}/>
            <h1>Cards project</h1>
            <RoutesPage/>
        </div>
    );
}

export default App;