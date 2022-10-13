import React from "react";
import { NavLink } from "react-router-dom";
import { FUZZY_LOGIC_ROUTE, FUZZY_GRAPH_ROUTE } from "../utils/consts";
import '../Styles.css';

const Main = () => {
    return (
        <div className="wrapper">
            <nav>
                <ul className="button-list">
                    <li>
                        <NavLink to={FUZZY_LOGIC_ROUTE}>
                            <button className="alg-buttons">
                                Нечеткая логика
                            </button>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to={FUZZY_GRAPH_ROUTE}>
                            <button className="alg-buttons">
                                Нечеткие графы
                            </button>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Main;