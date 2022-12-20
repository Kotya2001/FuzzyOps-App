import React, { useState } from "react";


const FileLoader = ({name, i, f, state, n}) => {

    const [fileStatus, setFileStatus] = useState(false);

    const changeName = (status, n) => {
        if (status) {
            return 'Загружено'
        }
        return n
    }

    const handleChange = async (e) => {
        if (e.target.files[0].name.split('.')[1] !== 'json') {
            alert('Неверное расширение файл, допустимый json')
            return;
        }
        setFileStatus(true);
        state.setFileData(e.target.files[0]);
        
    };

    return (
        <div className="file-upload">
            <input type="file" onChange={handleChange}
                name={name}
                className="inputFile"
                id={i}
                />
            <label for={f}><span>{changeName(fileStatus, n)}</span></label>
        </div>
    )
};

export default FileLoader;