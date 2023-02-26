import { CustomeTooltipProps } from './Tooltip.props';

export const CustomeTooltip = ({ active, payload, label, defuzzNum }: CustomeTooltipProps) => {
	if (active && payload && payload.length) {
		return (
			<div className="custom-tooltip">
				<p className="custom-tooltip">{`Универсальное множество : ${payload[0].payload.x}`}</p>
				<p className="label">{`Степень уверенности : ${payload[0].payload.y}`}</p>
				{ defuzzNum ?
					<p className="">{`Дифаззификация : ${defuzzNum}`}</p>
					:
					<p className="">{`Дифаззификация : Невозможно посчитать, попробуйте другой метод`}</p>
				}
				<p className="label">{label}</p>
			</div>
		);
	}

	return null;
};