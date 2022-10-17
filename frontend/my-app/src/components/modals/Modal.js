import React from "react";

const Modal = ({show, onHide, children}) => {
    return (
        <div className={show ? "modal active": "modal"} onClick={() => onHide(false)}>
            <div className={show ? "modal-content active": "modal-content"} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default Modal;