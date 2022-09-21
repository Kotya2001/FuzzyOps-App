import React, { Component } from "react";
import Carousel from 'react-elastic-carousel';
import {Item, Name, Button} from './Item';
import { NavLink } from "react-router-dom";
import '../Styles.css'

export default class Base extends Component {
    render() {
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
                                                <NavLink to='/register'>
                                                    <button className='buttons'>Войти</button>
                                                </NavLink>
                                            </li>

                                        </ul>
                                    </nav>
                        
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <section className='description'>
                    <div className='wrapper'>
                        <p className='title'>Платформа нечетких</p>
                        <p className='title'>алгоритмов прогнозирования</p>
                        <p className='title'>с открытым исходным кодом</p>
                    </div>
                </section>
                <section className='description'>
                    <div className='wrapper'>
                        <Carousel>
                            <Item>
                                <Name>
                                    <p>FuzzyOps</p>
                                    <p className='caption'>Библиоткека с открытым исходным кодом</p>
                                    <p className='caption'>для поддержки принятия решений</p>
                                    <p className='caption'>в нечектой информационной среде</p>
                                </Name>
                                <Button>
                                    <NavLink to='/register'>
                                        <button className='start'>Начать работу</button>
                                    </NavLink>
                                </Button>
                            </Item>
                            <Item>
                                <Name>
                                    <p>Нечеткая логика</p>
                                    <p className='caption'>Нечеткая арифметика</p>
                                    <p className='caption'>Метод фаззификации</p>
                                    <p className='caption'>Метод деффаззификации</p>
                                </Name>
                                <Button>
                                    <NavLink to='/register'>
                                        <button className='start'>Начать работу</button>
                                    </NavLink>
                                </Button>
                            </Item>
                            <Item>
                                <Name>
                                    <p>Нечеткие графы</p>
                                    <p className='caption'>Нечеткие отношения доминировние</p>
                                </Name>
                                <Button>
                                    <NavLink to='/register'>
                                        <button className='start'>Начать работу</button>
                                    </NavLink>
                                </Button>
                            </Item>
                        </Carousel>
                    </div>
                </section>
            </div>

        )
    }
}