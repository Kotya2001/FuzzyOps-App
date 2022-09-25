import React, { useContext } from "react";
import Base from "../pages/Base";
import { Route, Routes } from 'react-router-dom';
import {authRoutes, publicRoutes} from '../routes';
import {Context} from '../index';

const AppRouter = () => {
    const {user} = useContext(Context)
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
                )}
            <Route path='*' element={<Base/>}/>
        </Routes>
    )
}

export default AppRouter;