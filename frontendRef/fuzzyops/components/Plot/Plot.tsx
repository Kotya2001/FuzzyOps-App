import { CartesianGrid, Tooltip, XAxis, YAxis, ScatterChart, Scatter } from 'recharts';
import { PlotProps } from './Plot.props';
import styles from './Plot.module.css';

export const Plot = ({ result, params }: PlotProps) => {

        

                
        return (
                <div className={styles.LoadContent}>
                        <ScatterChart
                                width={400}
                                height={400}
                                margin={{
                                top: 20,
                                right: 20,
                                bottom: 20,
                                left: 20,
                                }}
                        >
                                <CartesianGrid />
                                <XAxis type="number" dataKey="x" name="Универсальное множество" min={params.mi} max={params.m}/>
                                <YAxis type="number" dataKey="y" name="Степень уверенности"/>
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                <Scatter name="Нечеткое число" data={result} fill="#8884d8" isAnimationActive={false}/>
                        </ScatterChart>
                </div>
        );
};