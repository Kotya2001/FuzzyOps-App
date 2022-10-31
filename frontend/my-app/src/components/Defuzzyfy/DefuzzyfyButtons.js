import { React, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import { useContext } from "react";
import { Button } from "react-bootstrap";

const DeffuzzyfyButtons = observer(() => {

    const {defuzznumber} = useContext(Context);
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
        defuzznumber.setDefuzFile(e.target.files[0]);
    };

    return (
        <div className="modal-body">
            <ul className="panel">

                <li>
                    <Button className="manage-buttons"
                            >Посчитать</Button>
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

    const methods = ['cgrav', 'lmax', 'rmax', 'cmax']
    return (
        <div>
        </div>
    )
});

export default DeffuzzyfyButtons;
