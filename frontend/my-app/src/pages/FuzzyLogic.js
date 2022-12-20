import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import Modal from "../components/modals/Modal";
import FuzzyNumberButtons from "../components/FuzzyNumberButtons";
import FuzzyNumberOut from "../components/FuzzyNumberOut";
import DefuzzyfyButtons from "../components/Defuzzyfy/DefuzzyfyButtons";
import DefuzzyfyOut from "../components/Defuzzyfy/DefuzzyfyOut";
import OpsButtons from "../components/Ops/OpsWithFuzzyNums/OpsWithComNums/OpsButtons";
import OpsOut from "../components/Ops/OpsWithFuzzyNums/OpsWithComNums/OpsOut";


const Fuzzy_Logic = () => {

    const [windowVisible, setWindowVisible] = useState(false);
    const [deffWindowVisible, setDeffWindowVisible] = useState(false);
    const [numberOpsWindow, setNumOpsWindow] = useState(false);

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

                <li>
                    <Button className="alg-buttons" onClick={() => setNumOpsWindow(true)}>
                        Операции между нечеткими числами
                    </Button>
                </li>
            </ul>

            <Modal show={windowVisible} onHide={setWindowVisible}>
                <FuzzyNumberButtons/>
                <FuzzyNumberOut/>
            </Modal>

            <Modal show={deffWindowVisible} onHide={setDeffWindowVisible}>
                <DefuzzyfyButtons/>
                <DefuzzyfyOut/>
            </Modal>

            <Modal show={numberOpsWindow} onHide={setNumOpsWindow}>
                <OpsButtons/>
                <OpsOut/>
            </Modal>

        </Container>
    )
}

export default Fuzzy_Logic;