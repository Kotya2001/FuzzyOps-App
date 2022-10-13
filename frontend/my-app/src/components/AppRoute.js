import React from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import {authRoutes, publicRoutes} from '../routes';
import { LoginReq } from '../hoc/authRequired.js';

const AppRouter = () => {

    const [base, resources, reg, log] = publicRoutes
    const [main, fuzzy_log, fuzzy_graphs] = authRoutes
    
    return (
        <Routes>
            <Route path={base.path} element={<base.Component/>}/>
            <Route path={resources.path} element={<resources.Component/>}/>
            <Route path={reg.path} element={<reg.Component/>}/>
            <Route path={log.path} element={<log.Component/>}/>

            <Route path={main.path} element={
                <LoginReq>
                    {<main.Component/>}
                </LoginReq>
            }/>

            <Route path={fuzzy_log.path} element={
                <LoginReq>
                    {<fuzzy_log.Component/>}
                </LoginReq>
            }/>

            <Route path={fuzzy_graphs.path} element={
                <LoginReq>
                    {<fuzzy_graphs.Component/>}
                </LoginReq>
            
            }/>
            <Route path="*" element={<Navigate to='/'/>}/>

        </Routes>
    )
}

export default AppRouter;