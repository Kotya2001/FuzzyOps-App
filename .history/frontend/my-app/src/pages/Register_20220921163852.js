import React, { Component, useState} from "react";
import { Link } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className="inputForm">
            <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                type="text" 
                placeholder="Email" 
                className="type-1"/>

            <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="text" 
                placeholder="Пароль" 
                className="type-1"/>
            <button><Link to='/login'>Войти</Link></button>
        </div>
    )
}

export default Register