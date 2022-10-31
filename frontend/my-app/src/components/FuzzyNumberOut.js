import React, { useContext } from "react";
import FuzzyNumberLine from "./GraphsView/Lines/FuzzyNumberLine";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const FuzzyNumberOut = observer(() => {

    const {fuzzylogic} = useContext(Context);
    const isData = fuzzylogic.Flag;
    const data = fuzzylogic.Number;
    return (
        
        <div className="modal-body">
            {
                isData ?
                <FuzzyNumberLine props={data}/>
                :
                <div></div>
            }
        </div>
    )
});

export default FuzzyNumberOut;