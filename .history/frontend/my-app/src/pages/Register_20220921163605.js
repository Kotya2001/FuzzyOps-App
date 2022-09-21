import React, { Component, useState} from "react";
import { Link } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className="inputForm">
            <input
            onChange={}
            type="text" 
            placeholder="Email" 
            className="type-1"/>
            <input type="text" placeholder="Пароль" className="type-1"/>
            <button><Link to='/register'>Register</Link></button>
        </div>
    )
}

export default Register