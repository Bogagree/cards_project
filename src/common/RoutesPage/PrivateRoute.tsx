import React from 'react';
import {useAppSelector} from "../../app/store";
import {Navigate} from "react-router-dom";
import {Path} from "../Enum/path";

type PropsType = {
    children: React.ReactNode
}

export const PrivateRoute: React.FC<PropsType> = ({children}) => {

    const isLogged = useAppSelector(state => state.auth.isLogged)

    if (isLogged) {
        return <>{children}</>
    } else {
        return <Navigate to={Path.LOGIN}/>
    }
};
