import React, { useState } from "react";

const Dropdown = ({selected, setSelected, elems, state, k}) => {
    // e => {setSelected(elem); setIsActive(false)
    const [isActive, setIsActive] = useState(false);
    const func = (elem) => {
        if (k === 'by') {
            state.setBy(selected)
            setSelected(elem)
            setIsActive(false)
        } else if (k === 'unity') {
            setSelected(elem)
            setIsActive(false)
        }
    }

    return (
        <div className="dropdown">
            <div className="dropdown-btn" onClick={
                e => setIsActive(!isActive)
            }>{selected}</div>
            {isActive && (
                <div className="dropdown-content">
                    {elems.map(elem => (
                        <div className="dropdown-item" 
                        onClick={func(elem)}
                    >{elem}</div>
                    ))}
                </div>
            )}
        </div>
    )
};

export default Dropdown;