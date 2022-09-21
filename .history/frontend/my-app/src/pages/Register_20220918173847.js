import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Register extends Component {
    render() {
        return (
            <div className="inputForm">
                <input type="text" placeholder="email"/>

                <p>
                    Account exists <Link to='/login'>Sign in</Link>
                </p>
            </div>
        )
    }
}