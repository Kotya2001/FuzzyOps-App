import React, { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import { fuzzynumber } from "../http/FuzzyLogicApi";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { paginationParams } from "../utils/consts";


const FuzzyNumberButtons = observer(() => {
    const {fuzzylogic} = useContext(Context);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileStatus, setFileStatus] = useState(false);
    

    const changeName = (status) => {
        if (status) {
            return 'Загружено'
        }
        return 'Загрузить'
    }

    const handleChange = (e) => {
        if (e.target.files[0].name.split('.')[1] !== 'json') {
            alert('Неверное расширение файл, допустимый json')
            return;
        }
        setSelectedFile(e.target.files[0]);
        setFileStatus(true);
        fuzzylogic.setFuzzyNumberFile(e.target.files[0]);
    };

    const click = async () => {
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
            } 
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
                    <div className="file-upload">
                        <input type="file" onChange={handleChange}
                             name="file"
                             className="inputFile"
                             id="file"
                             />
                        <label for="file"><span>{changeName(fileStatus)}</span></label>
                    </div>
                </li>

            </ul>
        </div>
    )
});

export default FuzzyNumberButtons;