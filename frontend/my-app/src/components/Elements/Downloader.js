import React from "react";
import { Button } from "react-bootstrap";

const Downloader = ({state, kind}) => {

    const data = state.All;
    const createBlob = (data) => {
        const str = JSON.stringify(data);
        const blob = new Blob([str]);
        return blob;
    }



    const click = async () => {
        let d = {};
        let k = Object.keys(data)[1];
        if (kind === 'fuzzyNumber') {
            const reader = new FileReader();
            reader.readAsBinaryString(data.data)
            reader.onloadend = function() {
                d = JSON.parse(reader.result)
                if (k === 'trap') {
                    d.trap = data.trap;
                } else {
                    d.triangle = data.triangle;
                }
            }
            const blob = createBlob(d);
            const url = URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = 'data.json';
            document.body.append(anchor);
            anchor.style = "display: none";
            anchor.click();
            anchor.remove();
        }
    }
        

    return (
        <div className="download-btn">
            <Button className="manage-buttons" onClick={click}>Скачать</Button>
        </div>
    )
};

export default Downloader;