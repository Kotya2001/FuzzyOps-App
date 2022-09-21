import React, { Component } from "react";
import { Link } from "react-router-dom";

// import '../src/Styles.css';

export default class Login extends Component {
    render() {
        return (
            <div className="inputForm">
                <input type="text" placeholder="Email" className="tp"/>
                <input type="text" placeholder="Пароль"/>
                <p>
                    <Link to='/register'>Register</Link>
                </p>
            </div>
        )
    }
}