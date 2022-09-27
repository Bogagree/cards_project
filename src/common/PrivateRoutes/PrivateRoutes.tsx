import {Navigate, Outlet, useNavigate} from 'react-router-dom'
import {useAppSelector} from '../../app/store';
import {Path} from '../enum/path';
import React from 'react';

// export const PrivateRoutes = () => {
//     const isLogged = useAppSelector(state => state.auth.isLogged);
//     const navigate = useNavigate();
//
//     return (
//         isLogged ? <Outlet/> : <Navigate to={Path.LOGIN}/>
//     )
// }