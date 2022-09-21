import React, { Component, useState, FC } from "react";
import { Link } from "react-router-dom";

const Register extends Component {
    const [email, setEmail] = useState()
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