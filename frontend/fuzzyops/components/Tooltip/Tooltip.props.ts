export interface CustomeTooltipProps {
	active: boolean,
	payload: array,
	label: string,
	defuzzNum: number | null
}

type array = p[];

interface p {
	payload: { x: number, y: number }
}
