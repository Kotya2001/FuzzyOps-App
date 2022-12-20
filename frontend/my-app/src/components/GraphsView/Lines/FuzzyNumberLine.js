import React, { useContext, useState } from "react";
import { Button } from 'react-bootstrap';
import {
    Chart,
    ChartTitle,
    ChartSeries,
    ChartSeriesItem,
    ChartTooltip,
    ChartXAxis,
    ChartYAxis,
    ChartXAxisItem,
    ChartYAxisItem
  } from "@progress/kendo-react-charts";
import "hammerjs";
import { Context } from "../../..";
import { fuzzynumber } from "../../../http/FuzzyLogicApi";




const FuzzyNumberLine = (data) => {

    const arr = data.props.result;
    const m = data.props.m;
    const min = data.props.min;
    const all_pages = data.props.all_pages;
    const {fuzzylogic} = useContext(Context);
    const [count, setCount] = useState(1);

    const clickUp = async () => {
        if (count < all_pages) {

            setCount(count + 1)
            const formData = new FormData();
            const user = localStorage.getItem('uid')
            const f = fuzzylogic.FuzzyNumberFile

            formData.append('file', f)
            formData.append('data', JSON.stringify({currentPage: count, points: 100}))
            formData.append('user', JSON.stringify(user))

            const response = await fuzzynumber(formData)
            if (response.data.status === 'ok') {
                const data = {result: response.data.result,
                                m: response.data.params.max,
                                mi: response.data.params.min,
                                all_pages: response.data.all_pages}
                fuzzylogic.setFuzzyNumber(data);
                fuzzylogic.setIsData(true);

            }
        } else {
            setCount(count)
        }
    }

    const clickDown = async () => {
        if (count >= 0) {
            setCount(count - 1)
            const formData = new FormData();
            const user = localStorage.getItem('uid')
            const f = fuzzylogic.FuzzyNumberFile

            formData.append('file', f)
            formData.append('data', JSON.stringify({currentPage: count, points: 100}))
            formData.append('user', JSON.stringify(user))

            const response = await fuzzynumber(formData)
            if (response.data.status === 'ok') {
                const data = {result: response.data.result,
                                m: response.data.params.max,
                                mi: response.data.params.min,
                                all_pages: response.data.all_pages}
                fuzzylogic.setFuzzyNumber(data);
                fuzzylogic.setIsData(true);

            }
        } else {
            setCount(count)
        }
    }


    return (
        <div>
            <Chart style={{width: "600px"}} pannable zoomable={{mousewheel: {rate: 0.027}}}>
                <ChartTitle text="Нечеткое число" />
                <ChartTooltip format="y: {1}, x: {0}"/>
                <ChartSeries>
                    <ChartSeriesItem
                        type="scatterLine"
                        data={arr}
                    />
                </ChartSeries>
                <ChartXAxis>
                    <ChartXAxisItem
                        title={{
                        text: "Универсальное множество",
                        }}
                        max={m}
                        min={min}
                        labels={{
                            format: '#.0'
                        }}
                    />
                </ChartXAxis>
                <ChartYAxis>
                    <ChartYAxisItem
                        title={{
                        text: "Степень уверенности",
                        }}
                        max={1.0}
                        labels={{
                            format: '#.0'
                        }}
                    />
                </ChartYAxis>
            </Chart>
            <div className="switcher">
                <Button className="btns" onClick={clickDown}>Назад</Button>
                <Button className="btns" onClick={clickUp}>Вперед</Button>
            </div>
        </div>
    )
};

export default FuzzyNumberLine;




