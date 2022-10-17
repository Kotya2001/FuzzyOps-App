import React from "react";
import { Button, Form } from "react-bootstrap";

const FuzzyNumberButtons = () => {
    return (
        <div className="modal-body">
            <ul className="panel">
                <li>
                    <Button className="manage-buttons">Загрузить</Button>
                </li>

                    <li>
                    <Button className="manage-buttons">Посчитать</Button>
                </li>

                <li>
                    <Button className="manage-buttons">Множество</Button>
                </li>
            </ul>
        </div>
    )
}

export default FuzzyNumberButtons;