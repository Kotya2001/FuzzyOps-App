import React, { Component } from "react";
import Carousel from 'react-elastic-carousel';
import {Item, Name, Button} from './Item';
import { NavLink } from "react-router-dom";
import {REG_ROUTES} from "../utils/consts"
import '../Styles.css'

export default class Base extends Component {
    render() {
        return (
            <div>
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
                                    <NavLink to={REG_ROUTES}>
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
                                    <NavLink to={REG_ROUTES}>
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
                                    <NavLink to={REG_ROUTES}>
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