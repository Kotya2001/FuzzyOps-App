import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Register extends Component {
    const [email, setEmail] = 
    render() {
        return (
            <div className="inputForm">
                <input type="text" placeholder="Email"/>

                <p>
                    Account exists <Link to='/login'>Sign in</Link>
                </p>
            </div>
        )
    }
}