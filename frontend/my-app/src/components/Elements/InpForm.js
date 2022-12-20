import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const InpForm = ({selected, state}) => {

    const [numbers, setNumbers] = useState("");

    const isShow = (selected === 'Треугольный вид' || selected === 'Трапецеидальный вид') ? true : false
    const click = async () => {
        if (numbers === "") {
            alert("Введите границы для числа!")
            return
        } else {
            const key = selected === 'Треугольный вид' ? 'triangle' : 'trap'
            state.setUnity(numbers, key)
            setNumbers("")
            return
        }
    }
    return (
        <div>
            {isShow && (
                <Form>
                    <Form.Control 
                        className="type-2"
                        value={numbers}
                        maxLength={10000000000}
                        placeholder={selected === 'Треугольный вид' ? 'a <= b <= c, через пробел': 'a <= b <= c <= d через пробел'}
                        onChange={e => setNumbers(e.target.value)}
                    />
                    <Button className="file-inp-btn" onClick={click}>Создать</Button>
                </Form>
                
            )}
        </div>
    )
};

export default InpForm;