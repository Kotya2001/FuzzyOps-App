import React, { useContext } from "react";
import {Context} from '../index';
import { NavLink, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { logout } from "../http/userApi";
import '../Styles.css'

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const logOut = async () => {
        try {
            const response = await logout()
            if (response.data.status === 'ok') {
                user.setAuth(false)
            } else {
                alert(response.data.msg)
            }
        } catch (e) {
            alert(e)
        }
    }
    return (
        <div>
            <header>
                <div className='bg-pink'>
                    <div className='wrapper'>
                        <div className='header'>
                            <div className='name'>FuzzyOps</div>
                            <div className='buttons'>
                                <nav>
                                    <ul className='nav'>
                                        <li>
                                            <form action="/" target='_blank'>
                                                <button className='buttons'>GitHub</button>
                                            </form>
                                        </li>
                                                
                                        <li>
                                            <NavLink to='/resources'>
                                                <button className='buttons'>Ресурсы</button>
                                            </NavLink>
                                        </li>
                                        
                                        <li>
                                            { user.isAuth ?
                                                <button className='buttons' onClick={() => logOut()}>Выйти</button>
                                                :
                                                <button className='buttons' onClick={() => navigate(LOGIN_ROUTE)}>Войти</button>
                                            }

                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
})

export default NavBar;