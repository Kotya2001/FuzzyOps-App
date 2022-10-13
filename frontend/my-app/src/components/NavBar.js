import React, { useContext } from "react";
import {Context} from '../index';
import { NavLink, useNavigate } from "react-router-dom";
import { LOG_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import '../Styles.css';

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const logOut = async () => {
        user.setIsAuth(false)
        user.setUser({})
        localStorage.removeItem('auth')
        localStorage.removeItem('uid')
        navigate(LOG_ROUTE)
    }

    const auth = localStorage.getItem('auth')
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
                                            { auth ?
                                                <button className='buttons' onClick={() => logOut()}>Выйти</button>
                                                :
                                                <button className='buttons' onClick={() => navigate(LOG_ROUTE)}>Войти</button>
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