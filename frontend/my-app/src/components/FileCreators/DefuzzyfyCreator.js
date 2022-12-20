import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import FileLoader from "../Elements/FileLoader";
import Dropdown from "../Elements/Dropdown";
import InpForm from "../Elements/InpForm";

const DefuzzyfyCreator = observer(() => {
    const {defNfile} = useContext(Context);
    const [selected, setSelected] = useState("Вид числа");
    const [selectedM, setSelectedM] = useState("Метод");
    const methods = ["cgrav", "lmax", "rmax", "cmax"];
    const one = "defFileData";
    const typeOfUnity = ['Треугольный вид', 'Трапецеидальный вид']
    const t = <p className="ex"> Универсальное множество, пример: {JSON.stringify({"data": [1, 3]})}</p>;
    console.log(selectedM);
    return (
        <div>
            <div className="modal-body">
                <ul className="panel">
                    <li>
                        <FileLoader name={one} i={one} f={one} state={defNfile} n={t}/>
                    </li>

                    <li>
                        <Dropdown selected={selected} setSelected={setSelected} elems={typeOfUnity} state={defNfile} k={"unity"}/>
                    </li>

                    <li>
                        <Dropdown selected={selectedM} setSelected={setSelectedM} elems={methods} state={defNfile} k={"by"}/>
                    </li>

                    <li>
                        <InpForm selected={selected} state={defNfile}/>
                    </li>
                </ul>
            </div>
        </div>
    )
});

export default DefuzzyfyCreator;