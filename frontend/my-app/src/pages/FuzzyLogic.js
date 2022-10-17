import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import Modal from "../components/modals/Modal";
import FuzzyNumberButtons from "../components/FuzzyNumberButtons";
import FuzzyNumberOut from "../components/FuzzyNumberOut";
import FuzzyNumberFooter from "../components/FuzzyNumberFooter";

const Fuzzy_Logic = () => {

    const [windowVisible, setWindowVisible] = useState(false);

    return (
        <Container className="wrapper">
            <ul className="button-list">
                <li>
                    <Button className="alg-buttons" onClick={() => setWindowVisible(true)}>
                        Получить нечеткое число
                    </Button>
                </li>
            </ul>
            <Modal show={windowVisible} onHide={setWindowVisible}>
                <FuzzyNumberButtons/>
                <FuzzyNumberOut/>
                <FuzzyNumberFooter/>
            </Modal>
        </Container>
    )
}

export default Fuzzy_Logic;