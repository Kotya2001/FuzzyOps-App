import React, { Component } from "react";
import { Link } from "react-router-dom";

// import '../src/Styles.css';

export default class Login extends Component {
    render() {
        return (
            <div className="inputForm">
                <input type="text" placeholder="Email" className="type-1"/>
                <input type="text" placeholder="Пароль" className="type-1"/>
                <button></button>
                <p>
                    <Link to='/register'>Register</Link>
                </p>
            </div>
        )
    }
}