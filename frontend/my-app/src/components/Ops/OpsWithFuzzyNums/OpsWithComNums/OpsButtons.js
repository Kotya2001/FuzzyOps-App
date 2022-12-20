import React, { useContext } from "react";
import { Context } from "../../../..";
import { opsfuzzynumber } from "../../../../http/FuzzyLogicApi";
import { paginationParams } from "../../../../utils/consts";
import { observer } from "mobx-react-lite";
import { Button } from "react-bootstrap";
import FileLoader from "../../../Elements/FileLoader";


const OpsButtons = observer(() => {
    const {opsnumber} = useContext(Context)
    const one = "fileOps";
    const selectedFile = opsnumber.File
    
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

                const response = await opsfuzzynumber(formData)
                if (response.data.status === 'ok') {
                    const data = {result: response.data.result,
                                    m: response.data.params.max,
                                    mi: response.data.params.min,
                                    all_pages: response.data.all_pages}
                    opsnumber.setNewNumber(data);
                    opsnumber.setIsData(true);
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
                    <FileLoader name={one} i={one} f={one} state={opsnumber} n={"Загрузить"}/>
                </li>

            </ul>
        </div>
    )
});

export default OpsButtons;