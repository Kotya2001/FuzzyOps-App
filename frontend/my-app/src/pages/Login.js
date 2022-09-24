import React, { Component } from "react";
import { Form, Button, Row} from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { LOGIN_ROUTE, REG_ROUTES } from "../utils/consts";
import '../Styles.css';


const Login = () => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    return (
        <Form className="inputForm">
            <Form.Control
                className="type-1"
                placeholder="Введите email"
            />
            <Form.Control
                className="type-1"
                placeholder="Введите пароль"
            />
            <Row className="registration">
                {isLogin ?
                    <div>
                        Нет аккаунта?, <NavLink to={REG_ROUTES}>Регистрация</NavLink>
                    </div>
                    :
                    <div>
                        Есть аккаунт?, <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>
                    </div>
                    }   
               
                <Button className="auth-buttons">
                    {isLogin ? 'Войти': 'Регистрация'}
                </Button>
            </Row>

        </Form>
    )
}

export default Login;