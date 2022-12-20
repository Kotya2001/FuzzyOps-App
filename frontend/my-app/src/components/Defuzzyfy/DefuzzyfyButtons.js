import { React } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import { defnumber } from "../../http/FuzzyLogicApi";
import FileLoader from "../Elements/FileLoader";

const DefuzzyfyButtons = observer(() => {

    const {defuzznumber} = useContext(Context);
    const one = "fileD";
    const selectedFile = defuzznumber.DefuzzufyNumberFile;

    const click = async () => {

        try {
            if (!selectedFile) {
                alert('Загрузите файл');
                return;
            } else {
                const formData = new FormData();

                formData.append('file', selectedFile)

                const response = await defnumber(formData)
                if (response.data.status === 'ok') {
                    const data = response.data;
                    defuzznumber.setDefNumber(data);
                    defuzznumber.setIsData(true);
                } else {
                    alert(response.data.msg)
                }
            }
        } catch(e) {
            alert(e)
        }
    };

    return (
        <div className="modal-body">
            <ul className="panel">

                <li>
                    <Button className="manage-buttons"
                            onClick={click}>Посчитать</Button>
                </li>

                <li>
                    <FileLoader name={one} i={one} f={one} state={defuzznumber} n={"Загрузить"}/>
                </li>

            </ul>
        </div>
    )
});

export default DefuzzyfyButtons;
