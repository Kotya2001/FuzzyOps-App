import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { fuzzynumber } from "../http/FuzzyLogicApi";

const FuzzyNumberButtons = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [fileStatus, setFileStatus] = useState(false);

    const changeName = (status) => {
        if (status) {
            return 'Загружено'
        }
        return 'Загрузить'
    }

    const handleChange = (e) => {
        console.log(e.target.files[0].name.split('.'))
        if (e.target.files[0].name.split('.')[1] !== 'json') {
            alert('Неверное расширение файл, допустимый json')
            return;
        }
        setSelectedFile(e.target.files[0]);
        setFileStatus(true);
    };

    const click = async () => {
        if (!selectedFile) {
            alert('Загрузите файл');
            return;
        } else {
            const formData = new FormData();
            formData.append('file', selectedFile)
            
            const response = await fuzzynumber(formData)
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
}

export default FuzzyNumberButtons;