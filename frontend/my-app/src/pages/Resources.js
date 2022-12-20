import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import DefuzzyfyCreator from "../components/FileCreators/DefuzzyfyCreator";
import FuzzyNumCreator from "../components/FileCreators/FuzzyNumCreator";
import Modal from "../components/modals/Modal";

const Resources = () => {

    const [FirstWindow, setFirstWindow] = useState(false);
    const [SecondWindow, setSecondWindow] = useState(false);
    const [ThirdWindow, setThirdWindow] = useState(false);

    const ex4 = JSON.stringify(
        {"first": {"x": "Ваше универсальное множество",
         "trap": "массив из 4 чисел a <= b <= c <= d - трапецеидальный вид"},
         "second":
         {"x": "Ваше универсальное множество",
         "triangle": "массив из 3 чисел a <= b <= c - треугольный вид"
        },
         "ops": "Однин из: +, -, *",
         "method": "prob или minimax" 
        }, null, 4);
    
    const ex5 = JSON.stringify(
        {"first": {"x": "Ваше универсальное множество",
        "trap": "массив из 4 чисел a <= b <= c <= d - трапецеидальный вид"},
        "second":
        {"x": "Ваше число",
       },
        "ops": "Однин из: +, -, *",
       }, null, 4
    )


    return (
        <Container className="wrapper">
            <ul className="button-list">
                <li>
                    <Button className="alg-buttons" onClick={() => setFirstWindow(true)}>
                        Для нечеткого числа
                    </Button>
                </li>

                <li>
                    <Button className="alg-buttons" onClick={() => setSecondWindow(true)}>
                        Для дефаззификации
                    </Button>
                </li>

                <li>
                    <Button className="alg-buttons" onClick={() => setThirdWindow(true)}>
                        Для операций между нечеткими числами
                    </Button>
                </li>
            </ul>
            <Modal show={FirstWindow} onHide={setFirstWindow}>
                <FuzzyNumCreator/>
            </Modal>

            <Modal show={SecondWindow} onHide={setSecondWindow}>
                <DefuzzyfyCreator/>
            </Modal>

            <Modal show={ThirdWindow} onHide={setThirdWindow}>
                <div className="json-types">
                    <p>{ex4}</p>
                    <p>* Формат данных .json, можно использовать как треугольный,
                         так и трапецеидальный виды</p>
                </div>
            </Modal>
        </Container>
    )
    }

export default Resources;