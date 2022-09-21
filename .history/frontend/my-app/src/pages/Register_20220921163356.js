import React, { Component, useState} from "react";
import { Link } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState()
    return (
        <div className="inputForm">
            <input type="text" placeholder="Email"/>

            <p>
                Account exists <Link to='/login'>Sign in</Link>
            </p>
        </div>
    )
}

export default Register