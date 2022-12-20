import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../../../..";
import FuzzyOpsLine from "../../../GraphsView/Lines/FuzzyOpsLine";



const OpsOut = observer(() => {

    const {opsnumber} = useContext(Context);
    const isData = opsnumber.Flag;
    const data = opsnumber.Number;
    return (
        
        <div className="modal-body">
            {
                isData ?
                <FuzzyOpsLine props={data}/>
                :
                <div></div>
            }
        </div>
    )
});

export default OpsOut;