import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { fuzzynumber } from "../http/FuzzyLogicApi";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { paginationParams } from "../utils/consts";
import FileLoader from "./Elements/FileLoader";


const FuzzyNumberButtons = observer(() => {
    const {fuzzylogic} = useContext(Context);
    const one = "fileF";
    const selectedFile = fuzzylogic.FuzzyNumberFile

    const click = async () => {

        try {
            if (!selectedFile) {
                alert('Загрузите файл');
                return;
            } else {
                const formData = new FormData();
                const user = localStorage.getItem('uid')

                formData.append('file', selectedFile)
                formData.append('data', JSON.stringify(paginationParams))
                formData.append('user', JSON.stringify(user))

                const response = await fuzzynumber(formData)
                if (response.data.status === 'ok') {
                    const data = {result: response.data.result,
                                    m: response.data.params.max,
                                    mi: response.data.params.min,
                                    all_pages: response.data.all_pages}
                    fuzzylogic.setFuzzyNumber(data);
                    fuzzylogic.setIsData(true);
                } else {
                    alert(response.data.msg)
                }
            }
        } catch(e) {
            alert(e)
        }
    }


    return (
        <div className="modal-body">
            <ul className="panel">

                <li>
                    <Button className="manage-buttons"
                            onClick={click}>Посчитать</Button>
                </li>

                <li>
                    <FileLoader name={one} i={one} f={one} state={fuzzylogic} n={"Загрузить"}/>
                </li>

            </ul>
        </div>
    )
});

export default FuzzyNumberButtons;