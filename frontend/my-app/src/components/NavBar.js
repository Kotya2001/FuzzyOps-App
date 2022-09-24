import React, { useContext } from "react";
import {Context} from '../index';
import { NavLink } from "react-router-dom";
import { BASE_ROUTES, LOGIN_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import '../Styles.css'

const NavBar = observer(() => {
    const {user} = useContext(Context)
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
                                                <NavLink to={BASE_ROUTES}>
                                                    <button className='buttons'>Выйти</button>
                                                </NavLink>
                                                :
                                                <NavLink to={LOGIN_ROUTE}>
                                                    <button className='buttons'>Войти</button>
                                                </NavLink>
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