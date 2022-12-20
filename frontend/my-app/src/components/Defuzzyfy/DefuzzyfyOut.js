import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../..";

const DefuzzyfyOut = observer(() => {
    const {defuzznumber} = useContext(Context);
    const isData = defuzznumber.Flag;
    const data = defuzznumber.DefNumber;
    const n = isData ? data.result.toString() : "cecece";

    return (
        
        <div className="modal-body">
            {
                isData ?
                    <div className="output">
                        Число: {n}
                    </div>
                :
                    <div className="output"></div>
            }
        </div>
    )

});

export default DefuzzyfyOut;