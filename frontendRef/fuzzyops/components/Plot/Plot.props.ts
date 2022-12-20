type Root = Root2[];

interface Root2 {
	x: number
	y: number
}

type Root3 = {
	m: number,
	mi: number
};

export interface PlotProps {
	result: Root,
	all_pages: number,
	params: Root3
}