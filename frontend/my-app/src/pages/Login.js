import React, { Component, useContext, useState } from "react";
import { Form, Button, Row} from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REG_ROUTES, MAIN_ROUTE } from "../utils/consts";
import '../Styles.css';
import { registration, login } from "../http/userApi";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const Login = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            if (isLogin) {
                const response = await login(email, password)
                if (response.data.status === 'ok') {
                    user.setAuth(true)
                    console.log(user._isAuth)
                    navigate(MAIN_ROUTE)
                } else {
                    alert(response.data.msg)
                }
            } else {
                const response = await registration(email, password)
                if (response.data.status === 'ok') {
                    navigate(LOGIN_ROUTE)
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
                        Нет аккаунта?, <NavLink to={REG_ROUTES}>Регистрация</NavLink>
                    </div>
                    :
                    <div>
                        Есть аккаунт?, <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>
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