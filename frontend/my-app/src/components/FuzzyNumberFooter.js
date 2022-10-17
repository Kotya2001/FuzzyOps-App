import React from "react";

const FuzzyNumberFooter = () => {
    const example = JSON.stringify({
        "data": [1, 1.1, 1.2, 1.3, "..."]
    });

    return (
        <div className="tooltip">
            <button className="tipbutton">?</button>
            <span className="tooltiptext">Пример формата данных {example}</span>
        </div>

    )
}

export default FuzzyNumberFooter;
