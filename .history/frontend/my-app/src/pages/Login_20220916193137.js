import React, { Component } from "react";
import { Link, N } from "react-router-dom";

// import '../src/Styles.css';

export default class Login extends Component {
    render() {
        return (
            <div>
                <h1>Login</h1>

                <p>
                    <Link to='/register'>Register</Link>
                </p>
            </div>
        )
    }
}