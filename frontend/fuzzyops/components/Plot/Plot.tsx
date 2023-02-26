import { CartesianGrid, Tooltip, XAxis, YAxis, ScatterChart, Scatter } from 'recharts';
import { PlotProps } from './Plot.props';
import styles from './Plot.module.css';
import { CustomeTooltip } from '../Tooltip/Tooltip';



export const Plot = ({ result, params, name, ling, defuz_value }: PlotProps) => {

        const transform = () => {
                const arr = [];
                for (let i = 0; i <= result.length; i++) {
                        arr.push({ payload: {x: result[0].x, y: result[0].y}});
                }
                return arr;
        };

        const newArr = transform();

        return (
                <div className={styles.LoadContent}>
                        <ScatterChart
                                width={400}
                                height={400}
                                title={`${name}` + `${ling}` ? name : "Нечеткое число"}
                                margin={{
                                top: 20,
                                right: 20,
                                bottom: 20,
                                left: 20,
                                }}
                        >
                                <CartesianGrid strokeDasharray='3 3'/>
                                <XAxis type="number" dataKey="x" min={params.mi} max={params.m}/>
                                <YAxis type="number" dataKey="y"/>
                                <Tooltip content={<CustomeTooltip defuzzNum={defuz_value}
                                                                  label={`${name}` + `${ling}` ? name : "Нечеткое число"}
                                                                  active={true}
                                        payload={newArr}/>} />
                                <Scatter data={result} fill="#7653FC" isAnimationActive={false} line/>
                        </ScatterChart>
                </div>
        );
};