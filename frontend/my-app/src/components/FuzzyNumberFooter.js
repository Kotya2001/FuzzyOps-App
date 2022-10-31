import React from "react";

const FuzzyNumberFooter = () => {
    const example = JSON.stringify({
        "data": [1, 1.1, 1.2, 1.3, "..."],
    }, null, 4);

    const triangle = JSON.stringify({
        "triangle": "массив из 3 чисел a <= b <= c"
    }, null, 4)

    const trap = JSON.stringify({
        "trap": "массив из 4 чисел a <= b <= c <= d"
    }, null, 4)

    return (
        <div className="tooltip">
            <button className="tipbutton">?</button>
            <div className="tooltiptext">
                <div className="toolunity">
                    <p> {example} Формат данных .json. Добавьте в файл или треугольное {triangle} или трапецидальное {trap} множество</p>
                    </div>
            </div>
        </div>

    )
}

export default FuzzyNumberFooter;
