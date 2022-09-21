import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Register extends Component {
    render() {
        return (
            <div className="inputForm">
                <h1>Register</h1>

                <p>
                    Account exists <Link to='/login'>Sign in</Link>
                </p>
            </div>
        )
    }
}