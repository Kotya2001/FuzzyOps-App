import React, { useState } from "react";
import { Container, Button, Dropdown } from "react-bootstrap";
import Modal from "../components/modals/Modal";
import FuzzyNumberButtons from "../components/FuzzyNumberButtons";
import FuzzyNumberOut from "../components/FuzzyNumberOut";
import FuzzyNumberFooter from "../components/FuzzyNumberFooter";
import DeffuzzyfyButtons from "../components/Defuzzyfy/DefuzzyfyButtons";

const Fuzzy_Logic = () => {

    const [windowVisible, setWindowVisible] = useState(false);
    const [deffWindowVisible, setDeffWindowVisible] = useState(false);

    return (
        <Container className="wrapper">
            <ul className="button-list">
                <li>
                    <Button className="alg-buttons" onClick={() => setWindowVisible(true)}>
                        Получить нечеткое число
                    </Button>
                </li>
                <li>
                    <Button className="alg-buttons" onClick={() => setDeffWindowVisible(true)}>
                        Дефаззифицировать
                    </Button>
                </li>
            </ul>
            <Modal show={windowVisible} onHide={setWindowVisible}>
                <FuzzyNumberButtons/>
                <FuzzyNumberOut/>
                <FuzzyNumberFooter/>
            </Modal>
            <Modal show={deffWindowVisible} onHide={setDeffWindowVisible}>
                <DeffuzzyfyButtons/>
            </Modal>
        </Container>
    )
}

export default Fuzzy_Logic;