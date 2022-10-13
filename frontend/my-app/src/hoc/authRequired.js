import { Navigate, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { BASE_ROUTE } from "../utils/consts";

const LoginReq = ({children}) => {
    const auth = localStorage.getItem('auth')

    if (!auth) {
        return <Navigate to={BASE_ROUTE}></Navigate>
    }

    return children;
}

export {LoginReq};