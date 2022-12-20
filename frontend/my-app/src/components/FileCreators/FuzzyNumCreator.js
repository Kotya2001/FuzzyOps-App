import React, { useContext, useState } from "react";
import Dropdown from "../Elements/Dropdown";
import InpForm from "../Elements/InpForm";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import FileLoader from "../Elements/FileLoader";
import Downloader from "../Elements/Downloader";


const FuzzyNumCreator = observer(() => {

    const {fuzzyNfile} = useContext(Context);
    const [selected, setSelected] = useState("Вид числа");
    const kind = 'fuzzyNumber';
    const one = "fuzFileData";
    const nums = fuzzyNfile.Nums;
    const isFullData = (fuzzyNfile.All.data.type === 'application/json' && nums !== "") ? true : false;
    const typeOfUnity = ['Треугольный вид', 'Трапецеидальный вид']

    const t = <p className="ex"> Универсальное множество, пример: {JSON.stringify({"data": [1, 3]})}</p>;

    return (
        <div>
            <div className="modal-body">
                <ul className="panel">
                    <li>
                        <FileLoader name={one} i={one} f={one} state={fuzzyNfile} n={t}/>
                    </li>

                    <li>
                        <Dropdown selected={selected} setSelected={setSelected} elems={typeOfUnity}/>
                    </li>
                    
                    <li>
                        <InpForm selected={selected} state={fuzzyNfile}/>
                    </li>
                </ul>
            </div>
            { isFullData ?
                <Downloader state={fuzzyNfile} kind={kind}/>
                :
                <div></div>
            }
        </div>
    )
});

export default FuzzyNumCreator;