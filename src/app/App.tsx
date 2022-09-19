import React from 'react';
import './App.css';
import {RoutesPage} from "../common/RoutesPages/RoutesPages";
import {Header} from "../Components/Header/Header";

function App() {
    return (
        <div className="App">
            <Header isLoggedIn={false}/>
            <h1>Cards project</h1>
            <RoutesPage/>
        </div>
    );
}

export default App;