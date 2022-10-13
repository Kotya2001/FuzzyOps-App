import React, { Component, useContext, useEffect, useState } from "react";
import { Form, Button, Row} from "react-bootstrap";
import { NavLink, useLocation, useNavigate, Navigate } from "react-router-dom";
import { LOG_ROUTE, REG_ROUTE, MAIN_ROUTE } from "../utils/consts";
import '../Styles.css';
import { registration, login } from "../http/userApi";
import { observer } from "mobx-react-lite";
import { Context } from "../index";


const Login = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const isLogin = location.pathname === LOG_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const click = async () => {
        try {
            if (isLogin) {
                const response = await login(email, password)
                if (response.data.status === 'ok') {
                    user.setIsAuth(true)
                    user.setUser({uid: response.data.tokens.uid})
                    localStorage.setItem('auth', JSON.stringify(user.isAuth))
                    localStorage.setItem('uid', JSON.stringify(user.userData))
                    navigate(MAIN_ROUTE)
                } else {
                    alert(response.data.msg)
                }
            } else {
                const response = await registration(email, password)
                if (response.data.status === 'ok') {
                    navigate(LOG_ROUTE)
                } else {
                    alert(response.data.msg)
                }
            }
        } catch (e) {
            alert(e)
        }
    }

    return (
        <Form className="inputForm">
            <Form.Control
                className="type-1"
                placeholder="Введите email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <Form.Control
                className="type-1"
                placeholder="Введите пароль"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <Row className="registration">
                {isLogin ?
                    <div>
                        Нет аккаунта?, <NavLink to={REG_ROUTE}>Регистрация</NavLink>
                    </div>
                    :
                    <div>
                        Есть аккаунт?, <NavLink to={LOG_ROUTE}>Войдите</NavLink>
                    </div>
                    }   
               
                <Button className="auth-buttons" onClick={click}>
                    {isLogin ? 'Войти': 'Регистрация'}
                </Button>
            </Row>

        </Form>
    )
})

export default Login;